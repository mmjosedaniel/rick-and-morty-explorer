#!/usr/bin/env python3
"""Validate repository documentation links, stable IDs, and Gherkin structure."""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path
from urllib.parse import unquote


REFERENCE_DEFINITION_RE = re.compile(
    r"^\s{0,3}\[([^\]]+)\]:\s*(\S.*?)\s*$", re.MULTILINE
)
REFERENCE_USAGE_RE = re.compile(r"(?<!!)\[([^\]\n]+)\]\[([^\]\n]*)\]")
HEADING_RE = re.compile(r"^#{1,6}\s+(.+?)\s*#*\s*$")
PLACEHOLDER_RE = re.compile(r"\b(?:TODO|TBD|FIXME)\b", re.IGNORECASE)
REQUIREMENT_RE = re.compile(
    r"\b(?:FR-(?:FE|BE)-\d{3}|NFR-\d{3}|OR-\d{3}|DEL-\d{3}|AC-\d{3})\b"
)
REFERENCE_PATTERNS = {
    "requirement": REQUIREMENT_RE,
    "ADR": re.compile(r"\bADR-\d{4}\b"),
    "decision gate": re.compile(r"\bDG-\d{3}\b"),
    "task": re.compile(r"\bTASK-\d{3}\b"),
    "SPEC rule": re.compile(r"\bSPEC-\d{3}\b"),
    "HS rule": re.compile(r"\bHS-\d{3}\b"),
    "DPL decision": re.compile(r"\bDPL-DEC-\d{3}\b"),
}
STATIC_GHERKIN_TAGS = {
    "SPEC",
    "HARD_SPEC",
    "planned",
    "minimum_assessment",
    "repository_baseline",
    "mandatory",
    "adopted_optional",
    "deferred_optional",
    "human_decision",
}


class Reporter:
    def __init__(self) -> None:
        self.errors: list[str] = []

    def error(self, path: Path, message: str) -> None:
        self.errors.append(f"{path.as_posix()}: {message}")


def read_utf8(path: Path, reporter: Reporter) -> str | None:
    try:
        return path.read_text(encoding="utf-8")
    except (OSError, UnicodeError) as exc:
        reporter.error(path, f"cannot read as UTF-8 ({exc})")
        return None


def validate_text_hygiene(path: Path, text: str, reporter: Reporter) -> None:
    if text.startswith("\ufeff"):
        reporter.error(path, "contains a UTF-8 byte-order mark")
    if PLACEHOLDER_RE.search(text):
        reporter.error(path, "contains TODO, TBD, or FIXME placeholder text")
    if path.suffix == ".md" and sum(
        1 for line in text.splitlines() if line.lstrip().startswith("```")
    ) % 2:
        reporter.error(path, "contains an unbalanced fenced code block")
    for line_number, line in enumerate(text.splitlines(), start=1):
        if line.rstrip() != line:
            reporter.error(path, f"line {line_number} has trailing whitespace")


def github_slug(text: str) -> str:
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"[`*_~]", "", text).strip().lower()
    text = "".join(character for character in text if character.isalnum() or character in " _-")
    return re.sub(r"\s+", "-", text)


def markdown_anchors(path: Path, reporter: Reporter) -> set[str]:
    text = read_utf8(path, reporter)
    if text is None:
        return set()
    anchors: set[str] = set()
    counts: dict[str, int] = {}
    for line in text.splitlines():
        match = HEADING_RE.match(line)
        if not match:
            continue
        base = github_slug(match.group(1))
        occurrence = counts.get(base, 0)
        slug = base if occurrence == 0 else f"{base}-{occurrence}"
        counts[base] = occurrence + 1
        anchors.add(slug)
    return anchors


def inline_link_targets(text: str) -> list[str]:
    targets: list[str] = []
    search_from = 0
    while True:
        opening = text.find("](", search_from)
        if opening < 0:
            return targets
        cursor = opening + 2
        depth = 1
        in_angle_destination = False
        while cursor < len(text):
            character = text[cursor]
            if character == "\\":
                cursor += 2
                continue
            if character == "<" and depth == 1:
                in_angle_destination = True
            elif character == ">" and in_angle_destination:
                in_angle_destination = False
            elif not in_angle_destination and character == "(":
                depth += 1
            elif not in_angle_destination and character == ")":
                depth -= 1
                if depth == 0:
                    targets.append(text[opening + 2 : cursor])
                    cursor += 1
                    break
            cursor += 1
        search_from = max(cursor, opening + 2)


def link_destination(raw_target: str) -> str:
    target = raw_target.strip()
    if target.startswith("<"):
        closing = target.find(">")
        return target[1:closing] if closing >= 0 else target[1:]

    depth = 0
    for index, character in enumerate(target):
        if character == "(":
            depth += 1
        elif character == ")" and depth:
            depth -= 1
        elif character.isspace() and depth == 0:
            return target[:index]
    return target


def normalize_reference_id(value: str) -> str:
    return " ".join(value.strip().lower().split())


def validate_link_target(
    repo: Path,
    source: Path,
    raw_target: str,
    anchor_cache: dict[Path, set[str]],
    reporter: Reporter,
) -> None:
    target = link_destination(raw_target)
    if not target or target.startswith(("http://", "https://", "mailto:")):
        return
    path_part, separator, anchor = target.partition("#")
    decoded_path = unquote(path_part)
    resolved = source if not decoded_path else (source.parent / decoded_path).resolve()
    try:
        resolved.relative_to(repo)
    except ValueError:
        reporter.error(source, f"relative link escapes the repository: {raw_target}")
        return
    if not resolved.exists():
        reporter.error(source, f"relative link does not resolve: {raw_target}")
        return
    if separator and anchor and resolved.is_file() and resolved.suffix.lower() == ".md":
        anchors = anchor_cache.setdefault(resolved, markdown_anchors(resolved, reporter))
        if unquote(anchor).lower() not in anchors:
            reporter.error(source, f"Markdown anchor does not resolve: {raw_target}")


def validate_markdown_links(
    repo: Path, markdown_paths: list[Path], reporter: Reporter
) -> None:
    anchor_cache: dict[Path, set[str]] = {}
    for path in markdown_paths:
        text = read_utf8(path, reporter)
        if text is None:
            continue

        definitions: dict[str, str] = {}
        for label, raw_target in REFERENCE_DEFINITION_RE.findall(text):
            normalized = normalize_reference_id(label)
            if normalized in definitions:
                reporter.error(path, f"reference link label is defined more than once: {label}")
                continue
            definitions[normalized] = raw_target
            validate_link_target(repo, path, raw_target, anchor_cache, reporter)

        for label, identifier in REFERENCE_USAGE_RE.findall(text):
            normalized = normalize_reference_id(identifier or label)
            if normalized not in definitions:
                reporter.error(path, f"reference link has no definition: {identifier or label}")

        for raw_target in inline_link_targets(text):
            validate_link_target(repo, path, raw_target, anchor_cache, reporter)


def defined_requirements(path: Path, text: str) -> set[str]:
    heading_ids = set(
        re.findall(
            r"^###\s+((?:FR-(?:FE|BE)|NFR|OR|DEL)-\d{3})\s+-",
            text,
            re.MULTILINE,
        )
    )
    acceptance_ids = set(
        re.findall(r"^- \[[ xX]\]\s+(AC-\d{3}):", text, re.MULTILINE)
    )
    return heading_ids | acceptance_ids


def require_contiguous(
    path: Path, label: str, values: list[int], reporter: Reporter
) -> None:
    if len(values) != len(set(values)):
        reporter.error(path, f"{label} definitions are not unique")
        return
    expected = list(range(1, max(values) + 1)) if values else []
    if sorted(values) != expected:
        reporter.error(path, f"{label} definitions are not contiguous: {sorted(values)}")


def validate_outline_blocks(path: Path, text: str, reporter: Reporter) -> int:
    lines = text.splitlines()
    scenario_count = sum(
        1 for line in lines if re.match(r"^\s*Scenario(?: Outline)?:", line)
    )
    for index, line in enumerate(lines):
        if not re.match(r"^\s*Scenario Outline:", line):
            continue
        block: list[str] = []
        for following in lines[index:]:
            if block and re.match(r"^\s*(?:Scenario(?: Outline)?:|Rule:)", following):
                break
            block.append(following)
        example_indices = [
            position
            for position, item in enumerate(block)
            if re.match(r"^\s*Examples:", item)
        ]
        body = block[: example_indices[0]] if example_indices else block
        placeholders = set(re.findall(r"<([^>]+)>", "\n".join(body)))
        if not example_indices:
            reporter.error(path, f"line {index + 1} outline has no Examples section")
            continue
        for example_number, example_index in enumerate(example_indices, start=1):
            end = (
                example_indices[example_number]
                if example_number < len(example_indices)
                else len(block)
            )
            table = [
                item
                for item in block[example_index + 1 : end]
                if re.match(r"^\s*\|.*\|\s*$", item)
            ]
            if not table:
                reporter.error(path, f"line {index + 1} Examples section has no header")
                continue
            header_cells = [cell.strip() for cell in table[0].strip().strip("|").split("|")]
            columns = set(header_cells)
            if len(columns) != len(header_cells) or "" in columns:
                reporter.error(path, f"line {index + 1} Examples header has empty or duplicate columns")
            if placeholders != columns:
                reporter.error(
                    path,
                    f"line {index + 1} placeholders {sorted(placeholders)} "
                    f"do not match Examples columns {sorted(columns)}",
                )
            data_rows = table[1:]
            if not data_rows:
                reporter.error(path, f"line {index + 1} Examples section has no data rows")
            for row in data_rows:
                cells = [cell.strip() for cell in row.strip().strip("|").split("|")]
                if len(cells) != len(header_cells):
                    reporter.error(
                        path,
                        f"line {index + 1} Examples row has {len(cells)} cells; "
                        f"expected {len(header_cells)}",
                    )
    return scenario_count


def tags_on_line(line: str) -> set[str]:
    return {value.removeprefix("@") for value in line.split() if value.startswith("@")}


def validate_known_tags(
    path: Path, line_number: int, tags: set[str], reporter: Reporter
) -> None:
    for tag in tags:
        if tag in STATIC_GHERKIN_TAGS:
            continue
        if any(pattern.fullmatch(tag) for pattern in REFERENCE_PATTERNS.values()):
            continue
        reporter.error(path, f"line {line_number} uses undocumented tag @{tag}")


def validate_gherkin_tags(path: Path, text: str, reporter: Reporter) -> None:
    feature_tags: set[str] = set()
    rule_tags: set[str] = set()
    pending_tags: set[str] = set()
    pending_line = 0

    for line_number, line in enumerate(text.splitlines(), start=1):
        stripped = line.strip()
        if stripped.startswith("@"):
            current_tags = tags_on_line(stripped)
            validate_known_tags(path, line_number, current_tags, reporter)
            pending_tags |= current_tags
            pending_line = pending_line or line_number
            continue

        if stripped.startswith("Feature:"):
            feature_tags = pending_tags
            pending_tags = set()
            expected_classifier = "HARD_SPEC" if path.name == "HARD_SPEC.feature" else "SPEC"
            if expected_classifier not in feature_tags or "planned" not in feature_tags:
                reporter.error(path, f"line {line_number} feature lacks @{expected_classifier} and @planned")
            pending_line = 0
            continue

        if stripped.startswith("Rule:"):
            rule_tags = pending_tags
            pending_tags = set()
            rule_ids = {
                tag for tag in rule_tags if re.fullmatch(r"(?:SPEC|HS)-\d{3}", tag)
            }
            if len(rule_ids) != 1:
                reporter.error(path, f"line {line_number} rule must have exactly one SPEC/HS ID")
            if "minimum_assessment" in rule_tags:
                reporter.error(
                    path,
                    f"line {pending_line or line_number} @minimum_assessment must be scenario-level",
                )
            if "deferred_optional" in rule_tags:
                if {"minimum_assessment", "repository_baseline"} & rule_tags:
                    reporter.error(path, f"line {line_number} deferred rule enters a readiness view")
            elif "repository_baseline" not in rule_tags:
                reporter.error(path, f"line {line_number} active rule lacks @repository_baseline")
            pending_line = 0
            continue

        if re.match(r"Scenario(?: Outline)?:", stripped):
            scenario_tags = pending_tags
            pending_tags = set()
            effective = feature_tags | rule_tags | scenario_tags
            if "deferred_optional" in effective:
                if {"minimum_assessment", "repository_baseline"} & effective:
                    reporter.error(path, f"line {line_number} deferred scenario enters a readiness view")
            elif "repository_baseline" not in effective:
                reporter.error(path, f"line {line_number} active scenario lacks @repository_baseline")

            if "minimum_assessment" in effective:
                if "minimum_assessment" not in scenario_tags:
                    reporter.error(path, f"line {line_number} minimum selector must be scenario-level")
                if "mandatory" not in effective:
                    reporter.error(path, f"line {line_number} minimum scenario lacks @mandatory")
                if "adopted_optional" in effective or any(
                    re.fullmatch(r"OR-\d{3}", tag) for tag in effective
                ):
                    reporter.error(path, f"line {line_number} optional scenario enters minimum view")

            if "adopted_optional" in effective:
                if "minimum_assessment" in effective:
                    reporter.error(path, f"line {line_number} adopted optional scenario enters minimum view")
                if not any(re.fullmatch(r"OR-\d{3}", tag) for tag in effective):
                    reporter.error(path, f"line {line_number} adopted optional scenario lacks an OR tag")
            pending_line = 0


def definitions(repo: Path, texts: dict[Path, str], reporter: Reporter) -> dict[str, set[str]]:
    requirements_path = repo / "docs" / "REQUIREMENTS.md"
    plan_path = repo / "docs" / "IMPLEMENTATION_PLAN.md"
    execution_path = repo / "docs" / "execution" / "decision-and-progress-log.md"
    required_paths = (requirements_path, plan_path, execution_path)
    for path in required_paths:
        if path not in texts:
            reporter.error(path, "required documentation file does not exist")

    requirement_ids = (
        defined_requirements(requirements_path, texts.get(requirements_path, ""))
        if requirements_path in texts
        else set()
    )
    adr_ids = {
        f"ADR-{match.group(1)}"
        for path in (repo / "docs" / "adrs").glob("[0-9][0-9][0-9][0-9]-*.md")
        if (match := re.match(r"(\d{4})-", path.name))
    }
    plan_text = texts.get(plan_path, "")
    gate_ids = set(re.findall(r"^\|\s*(DG-\d{3})\s*\|", plan_text, re.MULTILINE))
    task_matches = re.findall(r"^###\s+TASK-(\d{3})\s+-", plan_text, re.MULTILINE)
    require_contiguous(plan_path, "TASK", [int(value) for value in task_matches], reporter)
    task_ids = {f"TASK-{value}" for value in task_matches}

    spec_text = texts.get(repo / "docs" / "specs" / "SPEC.feature", "")
    hard_text = texts.get(repo / "docs" / "specs" / "HARD_SPEC.feature", "")
    spec_matches = re.findall(r"(?m)^\s+@SPEC-(\d{3})\b", spec_text)
    hard_matches = re.findall(r"(?m)^\s+@HS-(\d{3})\b", hard_text)
    require_contiguous(repo / "docs" / "specs" / "SPEC.feature", "SPEC", [int(value) for value in spec_matches], reporter)
    require_contiguous(repo / "docs" / "specs" / "HARD_SPEC.feature", "HS", [int(value) for value in hard_matches], reporter)
    spec_ids = {f"SPEC-{value}" for value in spec_matches}
    hard_ids = {f"HS-{value}" for value in hard_matches}

    dpl_text = texts.get(execution_path, "")
    dpl_matches = re.findall(r"^\|\s*DPL-DEC-(\d{3})\s*\|", dpl_text, re.MULTILINE)
    require_contiguous(execution_path, "DPL decision", [int(value) for value in dpl_matches], reporter)
    dpl_ids = {f"DPL-DEC-{value}" for value in dpl_matches}

    return {
        "requirement": requirement_ids,
        "ADR": adr_ids,
        "decision gate": gate_ids,
        "task": task_ids,
        "SPEC rule": spec_ids,
        "HS rule": hard_ids,
        "DPL decision": dpl_ids,
    }


def validate_references(
    texts: dict[Path, str], defined: dict[str, set[str]], reporter: Reporter
) -> None:
    for path, text in texts.items():
        for label, pattern in REFERENCE_PATTERNS.items():
            for reference in sorted(set(pattern.findall(text)) - defined[label]):
                reporter.error(path, f"references undefined {label} {reference}")

    tag_lines = "\n".join(
        line
        for path, text in texts.items()
        if path.suffix.lower() == ".feature"
        for line in text.splitlines()
        if line.lstrip().startswith("@")
    )
    tagged_requirements = set(REQUIREMENT_RE.findall(tag_lines))
    if tagged_requirements != defined["requirement"]:
        missing = sorted(defined["requirement"] - tagged_requirements)
        unexpected = sorted(tagged_requirements - defined["requirement"])
        if missing:
            reporter.error(Path("docs/specs"), f"requirements missing from Gherkin tags: {', '.join(missing)}")
        if unexpected:
            reporter.error(Path("docs/specs"), f"undefined Gherkin requirement tags: {', '.join(unexpected)}")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".", help="repository root (default: current directory)")
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    reporter = Reporter()
    owned_paths = {repo / "README.md", repo / "AGENTS.md"}
    docs_dir = repo / "docs"
    if docs_dir.is_dir():
        owned_paths.update(docs_dir.rglob("*.md"))
        owned_paths.update(docs_dir.rglob("*.feature"))
    skills_dir = repo / ".agents" / "skills"
    if skills_dir.is_dir():
        owned_paths.update(skills_dir.rglob("SKILL.md"))
    content_paths = sorted(path.resolve() for path in owned_paths if path.is_file())
    texts: dict[Path, str] = {}
    for path in content_paths:
        text = read_utf8(path, reporter)
        if text is None:
            continue
        texts[path] = text
        validate_text_hygiene(path, text, reporter)

    markdown_paths = [path for path in texts if path.suffix.lower() == ".md"]
    validate_markdown_links(repo, markdown_paths, reporter)

    scenario_count = 0
    for path, text in texts.items():
        if path.suffix.lower() != ".feature":
            continue
        validate_gherkin_tags(path, text, reporter)
        scenario_count += validate_outline_blocks(path, text, reporter)

    defined = definitions(repo, texts, reporter)
    validate_references(texts, defined, reporter)

    for error in reporter.errors:
        print(f"ERROR: {error}", file=sys.stderr)
    if reporter.errors:
        print(
            f"Documentation validation failed: {len(reporter.errors)} error(s), "
            f"{len(markdown_paths)} Markdown file(s), {scenario_count} scenario(s) checked.",
            file=sys.stderr,
        )
        return 1

    print(
        "Documentation validation passed: "
        f"{len(markdown_paths)} Markdown file(s), "
        f"{len(defined['requirement'])} requirement ID(s), "
        f"{len(defined['task'])} task(s), "
        f"{len(defined['SPEC rule'])} SPEC rule(s), "
        f"{len(defined['HS rule'])} HS rule(s), "
        f"{scenario_count} scenario(s)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

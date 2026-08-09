#!/usr/bin/env python3
"""Validate this repository's ADR portfolio using only the standard library."""

from __future__ import annotations

import argparse
import re
import sys
from dataclasses import dataclass
from datetime import date
from pathlib import Path
from urllib.parse import unquote


VALID_STATUSES = {"Proposed", "Accepted", "Rejected", "Deprecated", "Superseded"}
REQUIRED_SECTIONS = (
    "Context",
    "Decision drivers",
    "Considered options",
    "Decision",
    "Consequences",
    "Risks and mitigations",
    "Validation",
    "Evaluation",
    "References",
)
RUBRIC = {
    "Requirements traceability": 20,
    "Architectural fit and consistency": 20,
    "Options and trade-offs": 15,
    "Feasibility and proportionality": 15,
    "Quality attributes": 10,
    "Verifiability": 10,
    "Evolution and reversibility": 10,
}
ADR_FILENAME_RE = re.compile(r"^(\d{4})-([a-z0-9]+(?:-[a-z0-9]+)*)\.md$")
REQUIREMENT_RE = re.compile(r"\b(?:FR-(?:FE|BE)-\d{3}|NFR-\d{3}|OR-\d{3}|AC-\d{3})\b")
LINK_RE = re.compile(r"\[[^\]]*\]\(([^)]+)\)")
PLACEHOLDER_RE = re.compile(r"\b(?:TODO|TBD|FIXME)\b", re.IGNORECASE)


@dataclass(frozen=True)
class AdrResult:
    number: str
    filename: str
    status: str | None
    score: int | None
    recommendation: str | None
    related_requirements: frozenset[str]


class Reporter:
    def __init__(self) -> None:
        self.errors: list[str] = []
        self.warnings: list[str] = []

    def error(self, path: Path, message: str) -> None:
        self.errors.append(f"{path.as_posix()}: {message}")

    def warning(self, path: Path, message: str) -> None:
        self.warnings.append(f"{path.as_posix()}: {message}")


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
    if sum(1 for line in text.splitlines() if line.lstrip().startswith(chr(96) * 3)) % 2:
        reporter.error(path, "contains an unbalanced fenced code block")
    for line_number, line in enumerate(text.splitlines(), start=1):
        if line.rstrip() != line:
            reporter.error(path, f"line {line_number} has trailing whitespace")


def validate_links(path: Path, text: str, reporter: Reporter) -> None:
    for raw_target in LINK_RE.findall(text):
        target = raw_target.strip().strip("<>")
        if not target or target.startswith(("http://", "https://", "mailto:", "#")):
            continue
        target = unquote(target.split("#", 1)[0])
        if not target:
            continue
        resolved = (path.parent / target).resolve()
        if not resolved.exists():
            reporter.error(path, f"relative link does not resolve: {raw_target}")


def section_positions(text: str) -> dict[str, int]:
    return {
        match.group(1).strip(): match.start()
        for match in re.finditer(r"^##\s+(.+?)\s*$", text, re.MULTILINE)
    }


def parse_score(path: Path, text: str, reporter: Reporter) -> int | None:
    evaluation = re.search(
        r"^## Evaluation\s*$([\s\S]*?)(?=^##\s|\Z)", text, re.MULTILINE
    )
    if not evaluation:
        return None

    rows: dict[str, tuple[int, int]] = {}
    total: tuple[int, int] | None = None
    for line in evaluation.group(1).splitlines():
        if not line.lstrip().startswith("|"):
            continue
        cells = [cell.strip().strip("*") for cell in line.strip().strip("|").split("|")]
        if len(cells) < 3 or not cells[1].isdigit() or not cells[2].isdigit():
            continue
        name = cells[0]
        pair = (int(cells[1]), int(cells[2]))
        if name == "Total":
            total = pair
        else:
            rows[name] = pair

    for criterion, maximum in RUBRIC.items():
        if criterion not in rows:
            reporter.error(path, f"evaluation is missing rubric row: {criterion}")
            continue
        score, declared_maximum = rows[criterion]
        if declared_maximum != maximum:
            reporter.error(
                path,
                f"{criterion} maximum is {declared_maximum}; expected {maximum}",
            )
        if not 0 <= score <= maximum:
            reporter.error(path, f"{criterion} score {score} is outside 0-{maximum}")

    unexpected = sorted(set(rows) - set(RUBRIC))
    if unexpected:
        reporter.error(path, f"evaluation contains unexpected rows: {', '.join(unexpected)}")

    if set(rows) != set(RUBRIC):
        return None

    computed = sum(score for score, _ in rows.values())
    if total is None:
        reporter.error(path, "evaluation is missing the Total row")
        return None
    if total != (computed, 100):
        reporter.error(
            path,
            f"evaluation Total is {total[0]}/{total[1]}; expected {computed}/100",
        )
    return computed


def validate_adr(path: Path, reporter: Reporter) -> AdrResult | None:
    match = ADR_FILENAME_RE.fullmatch(path.name)
    if not match:
        reporter.error(path, "filename must use NNNN-english-kebab-case.md")
        return None
    number = match.group(1)
    text = read_utf8(path, reporter)
    if text is None:
        return None

    validate_text_hygiene(path, text, reporter)
    validate_links(path, text, reporter)

    title = re.search(r"^# ADR-(\d{4}):\s+\S.+$", text, re.MULTILINE)
    if not title:
        reporter.error(path, "H1 must use '# ADR-NNNN: Decision title'")
    elif title.group(1) != number:
        reporter.error(path, f"H1 ADR ID {title.group(1)} does not match filename {number}")

    status_match = re.search(r"^- Status:\s*(.+?)\s*$", text, re.MULTILINE)
    status = status_match.group(1) if status_match else None
    if status is None:
        reporter.error(path, "is missing '- Status:' metadata")
    elif status not in VALID_STATUSES:
        reporter.error(path, f"has invalid status: {status}")

    date_match = re.search(r"^- Date:\s*(\S+)\s*$", text, re.MULTILINE)
    if not date_match:
        reporter.error(path, "is missing '- Date:' metadata")
    else:
        try:
            parsed_date = date.fromisoformat(date_match.group(1))
            if parsed_date.isoformat() != date_match.group(1):
                raise ValueError
        except ValueError:
            reporter.error(path, f"date is not ISO YYYY-MM-DD: {date_match.group(1)}")

    positions = section_positions(text)
    for section in REQUIRED_SECTIONS:
        if section not in positions:
            reporter.error(path, f"is missing required section: {section}")
    present_order = [positions[name] for name in REQUIRED_SECTIONS if name in positions]
    if present_order != sorted(present_order):
        reporter.error(path, "required sections are not in the prescribed order")

    score = parse_score(path, text, reporter)
    recommendation_match = re.search(
        r"^\*\*Recommendation:\*\*\s*(.+?)\s*$", text, re.MULTILINE
    )
    recommendation = recommendation_match.group(1) if recommendation_match else None
    if recommendation is None:
        reporter.error(path, "evaluation is missing a Recommendation")

    related_match = re.search(r"^- Related requirements:\s*(.+?)\s*$", text, re.MULTILINE)
    if not related_match:
        reporter.error(path, "is missing '- Related requirements:' metadata")
        related = frozenset()
    else:
        related = frozenset(REQUIREMENT_RE.findall(related_match.group(1)))
        if not related:
            reporter.error(path, "Related requirements contains no recognized requirement IDs")

    return AdrResult(number, path.name, status, score, recommendation, related)


def recommendation_class(value: str | None) -> str | None:
    if value is None:
        return None
    normalized = value.strip().lower()
    for category in ("accept", "revise", "reject"):
        if normalized.startswith(category):
            return category
    return normalized.rstrip(".")


def parse_index(
    readme: Path, text: str, reporter: Reporter
) -> dict[str, tuple[str, str, int, str]]:
    entries: dict[str, tuple[str, str, int, str]] = {}
    row_re = re.compile(
        r"^\|\s*\[ADR-(\d{4})\]\(\./([^)]+)\)\s*\|.*?\|\s*"
        r"(Proposed|Accepted|Rejected|Deprecated|Superseded)\s*\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|",
        re.MULTILINE,
    )
    for match in row_re.finditer(text):
        number, filename, status, score, recommendation = match.groups()
        if number in entries:
            reporter.error(readme, f"decision index contains ADR-{number} more than once")
        entries[number] = (filename, status, int(score), recommendation.strip())
    return entries


def validate_index(
    readme: Path,
    text: str,
    results: list[AdrResult],
    reporter: Reporter,
) -> None:
    validate_text_hygiene(readme, text, reporter)
    validate_links(readme, text, reporter)
    entries = parse_index(readme, text, reporter)
    result_by_number = {result.number: result for result in results}

    for number, result in result_by_number.items():
        entry = entries.get(number)
        if entry is None:
            reporter.error(readme, f"decision index is missing ADR-{number}")
            continue
        filename, status, score, recommendation = entry
        if filename != result.filename:
            reporter.error(readme, f"ADR-{number} links to {filename}; expected {result.filename}")
        if result.status is not None and status != result.status:
            reporter.error(readme, f"ADR-{number} status is {status}; document says {result.status}")
        if result.score is not None and score != result.score:
            reporter.error(readme, f"ADR-{number} score is {score}; document says {result.score}")
        if recommendation_class(recommendation) != recommendation_class(result.recommendation):
            reporter.error(readme, f"ADR-{number} recommendation conflicts with its document")

    for number in sorted(set(entries) - set(result_by_number)):
        reporter.error(readme, f"decision index references missing ADR-{number}")


def defined_requirements(path: Path, reporter: Reporter) -> set[str]:
    text = read_utf8(path, reporter)
    if text is None:
        return set()
    functional = set(
        re.findall(
            r"^###\s+((?:FR-(?:FE|BE)|NFR|OR)-\d{3})\s+-",
            text,
            re.MULTILINE,
        )
    )
    acceptance = set(
        re.findall(r"^- \[[ xX]\]\s+(AC-\d{3}):", text, re.MULTILINE)
    )
    return functional | acceptance


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", default=".", help="repository root (default: current directory)")
    args = parser.parse_args()

    repo = Path(args.repo).resolve()
    adr_dir = repo / "docs" / "adrs"
    readme = adr_dir / "README.md"
    requirements_path = repo / "docs" / "REQUIREMENTS.md"
    reporter = Reporter()

    if not adr_dir.is_dir():
        reporter.error(adr_dir, "ADR directory does not exist")
    if not readme.is_file():
        reporter.error(readme, "ADR index does not exist")
    if not requirements_path.is_file():
        reporter.error(requirements_path, "requirements specification does not exist")

    adr_paths = sorted(adr_dir.glob("*.md")) if adr_dir.is_dir() else []
    adr_paths = [path for path in adr_paths if path.name != "README.md"]
    results = [
        result
        for path in adr_paths
        if (result := validate_adr(path, reporter)) is not None
    ]

    numbers = [int(result.number) for result in results]
    if len(numbers) != len(set(numbers)):
        reporter.error(adr_dir, "ADR numbers are not unique")
    if numbers and numbers != list(range(1, max(numbers) + 1)):
        reporter.error(adr_dir, f"ADR numbers are not sequential: {numbers}")

    if readme.is_file():
        readme_text = read_utf8(readme, reporter)
        if readme_text is not None:
            validate_index(readme, readme_text, results, reporter)

    definitions = defined_requirements(requirements_path, reporter)
    referenced = (
        set().union(*(result.related_requirements for result in results))
        if results
        else set()
    )
    for requirement in sorted(referenced - definitions):
        reporter.error(adr_dir, f"ADR metadata references undefined requirement {requirement}")
    uncovered = sorted(definitions - referenced)
    if uncovered:
        reporter.warning(
            requirements_path,
            "requirements not mapped in ADR metadata (may be delivery constraints): "
            + ", ".join(uncovered),
        )

    for warning in reporter.warnings:
        print(f"WARNING: {warning}")
    for error in reporter.errors:
        print(f"ERROR: {error}", file=sys.stderr)

    if reporter.errors:
        print(
            f"ADR validation failed: {len(reporter.errors)} error(s), "
            f"{len(reporter.warnings)} warning(s), {len(results)} ADR(s) checked.",
            file=sys.stderr,
        )
        return 1

    print(
        f"ADR validation passed: {len(results)} ADR(s), "
        f"{len(definitions)} requirement(s), {len(reporter.warnings)} warning(s)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

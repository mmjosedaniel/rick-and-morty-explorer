# UI Visual Foundations

- Status: Defined
- Date: 2026-08-09
- Governing UI decision: [DPL-DEC-006](../execution/decision-and-progress-log.md#decision-log)
- Related scope: NFR-002, NFR-005, AC-006, ADR-0009, TASK-010 through TASK-012, SPEC-007, HS-016
- UI documentation index: [UI design documentation](./README.md)

## Document role

This document defines the current color and typography direction for UI design, mockups, and future implementation. It is a reversible design decision, not product scope, architecture approval, implementation evidence, or a claim that the application currently renders these styles.

## Visual direction

Use a single dark visual theme named **Interdimensional Dark** for the initial application. It combines a restrained deep-space foundation with portal-inspired lime and cyan accents. Violet, yellow, and coral provide dimensional highlights and semantic feedback without turning every component into a decorative element.

The direction should evoke the energy, science-fiction setting, and portal imagery associated with *Rick and Morty* without copying the program logo or making the interface look like a promotional poster. The content remains readable and operational first; themed color and display typography provide character second.

An alternate light theme and theme switcher are outside the current UI design. Adding either requires a later reversible UI decision and complete contrast validation for the new pairings.

## Color system

### Core tokens

| Token | Visual name | Value | Role |
|---|---|---:|---|
| `background` | Space Void | `#070B14` | Application canvas and page background |
| `surface` | Cosmic Navy | `#0E1625` | Cards, panels, menus, and primary form surfaces |
| `surface-raised` | Nebula Blue | `#17243A` | Hovered or visually elevated surfaces |
| `border-subtle` | Orbit Line | `#263A55` | Decorative separators and non-essential boundaries |
| `border-control` | Comet Steel | `#537596` | Required input and control boundaries |
| `text-primary` | Mist White | `#F4F8F7` | Headings, body text, labels, and essential values |
| `text-secondary` | Moon Dust | `#B8C4CC` | Supporting text, helper copy, and the Unknown status |
| `primary` | Portal Lime | `#A8FF60` | Primary actions, selected controls, and active favorite emphasis |
| `primary-hover` | Portal Lime Deep | `#8FE64C` | Hover state for primary actions |
| `on-primary` | Portal Ink | `#081009` | Text and icons on Portal Lime surfaces |
| `secondary` | Plasma Cyan | `#38E8D2` | Links, focus rings, secondary emphasis, and data highlights |
| `on-secondary` | Plasma Ink | `#061412` | Text and icons on Plasma Cyan surfaces |
| `highlight` | Dimension Violet | `#A78BFA` | Restrained decorative and dimensional highlights |
| `on-highlight` | Dimension Ink | `#100B20` | Text and icons on Dimension Violet surfaces |
| `warning` | Solar Yellow | `#FFD166` | Warning and caution states |
| `on-warning` | Solar Ink | `#1D1400` | Text and icons on Solar Yellow surfaces |
| `danger` | Mutation Coral | `#FF6B7A` | Errors, destructive feedback, and the Dead status |
| `on-danger` | Mutation Ink | `#21080D` | Text and icons on Mutation Coral surfaces |
| `status-alive` | Lifeform Green | `#70E38F` | Alive status when paired with a visible text label |

### Decorative portal gradient

The optional portal gradient is:

```css
linear-gradient(135deg, #A8FF60 0%, #38E8D2 55%, #A78BFA 100%)
```

Use it only for small decorative portal motifs, hero accents, or focus artwork. Do not place body text, form controls, or status text directly on the gradient, and do not use it as the general page background.

### Color usage rules

- Keep most screen area in `background`, `surface`, and `surface-raised`; bright colors are accents rather than large-area fills.
- Use Portal Lime for the single highest-emphasis action or selected state in a component region.
- Use Plasma Cyan for keyboard focus, links, and secondary interactive emphasis. Links remain underlined so color is not their only cue.
- Reserve Dimension Violet for small highlights and illustrations, not primary actions or long text.
- Use Solar Yellow only for warnings and Mutation Coral only for errors, destructive feedback, or the Dead status.
- Present Alive, Dead, and Unknown with visible text or an icon plus text. Never communicate status through color alone.
- Use `border-control` for form and interactive boundaries that must remain identifiable. `border-subtle` is decorative and does not carry required meaning.
- Focused controls use a 2-pixel Plasma Cyan ring with a visible offset from the control boundary.

## Typography

### Font families

| Role | Family | Weights | Use |
|---|---|---|---|
| Display | [Bangers](https://fonts.google.com/specimen/Bangers) | 400 | Product title or one optional hero display only, at 44 pixels or larger |
| Interface | [Space Grotesk](https://fonts.google.com/specimen/Space%2BGrotesk) | 400, 500 | Section headings, card titles, body text, labels, buttons, inputs, filters, comments, and status text |

Fallback stacks:

```css
--font-display: "Bangers", "Arial Black", Impact, sans-serif;
--font-interface: "Space Grotesk", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

When font delivery is implemented, bundle or self-host only Bangers 400 and Space Grotesk 400/500 with the frontend and use `font-display: swap`. The DPL-DEC-006 visual choice avoids a runtime Google Fonts request so the selected presentation remains deterministic and does not add an unnecessary external dependency. The Google Fonts links below are selection and licensing references only; this documentation does not add a dependency or claim that font assets are installed.

### Responsive type scale

| Token | Mobile size / line height | Desktop size / line height | Family and weight | Intended use |
|---|---:|---:|---|---|
| `display` | `44 / 52 px` | `64 / 72 px` | Bangers 400 | Product title or one optional short hero statement |
| `heading-1` | `36 / 44 px` | `48 / 56 px` | Space Grotesk 500 | Primary page heading |
| `heading-2` | `28 / 36 px` | `32 / 40 px` | Space Grotesk 500 | Major page section |
| `heading-3` | `20 / 26 px` | `22 / 28 px` | Space Grotesk 500 | Card title, detail subsection, or comments heading |
| `body-large` | `18 / 28 px` | `18 / 28 px` | Space Grotesk 400 | Introductory or high-emphasis body copy |
| `body` | `16 / 24 px` | `16 / 24 px` | Space Grotesk 400 | Default body and comment text |
| `button` | `16 / 20 px` | `16 / 20 px` | Space Grotesk 500 | Text buttons and primary actions |
| `label` | `14 / 20 px` | `14 / 20 px` | Space Grotesk 500 | Form, filter, status, and metadata labels |
| `small` | `14 / 20 px` | `14 / 20 px` | Space Grotesk 400 | Secondary and helper text |
| `caption` | `12 / 16 px` | `12 / 16 px` | Space Grotesk 400 | Non-essential annotations only |

Use the mobile and desktop endpoints as a responsive range rather than creating abrupt typography-only breakpoints. Express implementation values in `rem`; `display`, `heading-1`, and `heading-2` may use `clamp()` between the documented endpoints. Other tokens remain stable across viewports.

### Typography rules

- Bangers is decorative. Never use it for navigation, cards, metadata, buttons, labels, filters, inputs, comments, validation, or error messages.
- Limit Bangers to one short product title or hero display per screen. Use Space Grotesk for every page heading.
- Keep body and essential control text at 14 pixels or larger. Reserve 12-pixel captions for non-essential annotations.
- Use weight 500 for hierarchy before introducing additional colors or larger sizes.
- Do not rely on the subtle `primary` to `primary-hover` color change as the only interaction cue; preserve shape, label, pointer, and keyboard-focus feedback.
- Keep headings short and body copy within approximately 60 to 75 characters per line on wide layouts.
- Do not force all interface text to uppercase. Preserve normal casing for names, values, controls, and comments.
- Allow browser text zoom and content reflow without clipping or truncating required information.

## Contrast validation

The selected pairings were checked with the WCAG relative-luminance contrast formula. The numeric thresholds used for review are 4.5:1 for normal text and 3:1 for meaningful control boundaries or large text. This evidence supports the palette choice but does not by itself claim full WCAG conformance for an application that has not been implemented.

| Foreground / background | Contrast | Review result |
|---|---:|---|
| `text-primary` / `background` | `18.38:1` | Passes normal-text threshold |
| `text-secondary` / `surface` | `10.18:1` | Passes normal-text threshold |
| `on-primary` / `primary` | `15.75:1` | Passes normal-text threshold |
| `on-primary` / `primary-hover` | `12.49:1` | Passes normal-text threshold |
| `on-secondary` / `secondary` | `12.22:1` | Passes normal-text threshold |
| `on-highlight` / `highlight` | `7.07:1` | Passes normal-text threshold |
| `on-warning` / `warning` | `12.64:1` | Passes normal-text threshold |
| `on-danger` / `danger` | `6.91:1` | Passes normal-text threshold |
| `border-control` / `surface-raised` | `3.22:1` | Passes non-text control threshold |

Recalculate contrast for every new combination, opacity, image overlay, gradient use, disabled state, and interaction state. A valid token pair does not guarantee that arbitrary combinations of these colors are accessible.

## References

- [UI field visibility and data constraints](./README.md#ui-field-visibility-decision)
- [Requirements specification](../REQUIREMENTS.md)
- [ADR-0009: Keep Frontend State Close to Its Owner](../adrs/0009-keep-frontend-state-close-to-its-owner.md)
- [TASK-012: Complete Responsive and Resilient UI States](../IMPLEMENTATION_PLAN.md#task-012---complete-responsive-and-resilient-ui-states)
- [SPEC-007 and UI rule routing](../specs/README.md#codex-rule-routing)
- [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)
- [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- [WCAG 2.2 non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)

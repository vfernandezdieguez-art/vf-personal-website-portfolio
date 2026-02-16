# UI Kit Definition

This file is the implementation guide for `/Users/viviana/repos/portfolio2026/src/app/components/ui-kit.tsx`.
Any UI change must follow this reference.

## Core tokens

- Colors (`Colors`):
  - `petroleo`: `#0E4E68`
  - `turquesa`: `#1A8E9F`
  - `coral`: `#D8614E`
  - `marfil`: `#FBF8F1`
  - `marfilDark`: `#F3F1EA`
  - `textDark`: `#2F3B40`
- Typography (`Typography`):
  - `title` for headings and display text
  - `body` for paragraph and utility text

## UI primitives

- `Pill`: uppercase rounded badge.
- `Heading`: semantic heading (`h1` to `h4`) with fixed scale.
- `BodyText`: paragraph text in `sm`, `md`, `lg`.
- `CardTitle`, `CardLabel`, `CardBody`: card text hierarchy.
- `BaseCard`: glass card container with optional hover behavior.
- `IconButton`: circular icon action.

## Composite components

- `StatItem`: KPI block with value, label, and sublabel.
- `ArtifactCard`: image + metadata card for clickable artifacts.
- `GlobalHeader`: fixed top navigation with language toggle and mobile menu.
- `SlideFooter`: fixed bottom navigation with slide progress and actions.
- `SectionHeader`: section intro wrapper (category, title, subtitle, description).

## Layout rules

- `FullCenteredLayout`:
  - max width `1440px`
  - horizontal spacing: `px-10` (mobile), `lg:px-24` (desktop)
  - top spacing: `pt-[40px]`, `lg:pt-[60px]`
  - bottom spacing: `pb-[160px]`, `lg:pb-[220px]`
- `SplitLayout`:
  - 12-column desktop grid
  - ratios: `5:7`, `7:5`, `6:6`
  - horizontal spacing aligned with `FullCenteredLayout`
  - gap rhythm: `gap-12`, `lg:gap-24`

## Icon and motion behavior

- Motion aliases:
  - `motion` from `motion/react`
  - `AnimatePresence` from `motion/react`
- `SafeIcon` fallback order:
  1. custom icon map
  2. `lucide-react` icon by name
  3. neutral fallback placeholder

## Mandatory change constraints

1. Reuse existing UI-kit components before creating new local style blocks.
2. Keep token usage consistent; do not add ad-hoc colors when equivalent tokens exist.
3. Preserve layout grid, max widths, and spacing rhythm.
4. Keep mobile + desktop behavior consistent when changing header/footer/layout.
5. Any typography changes must map to this system or update this file in the same change.

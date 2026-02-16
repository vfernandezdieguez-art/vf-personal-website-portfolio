# UI Kit Definition

This document describes the design and implementation contract for `src/app/components/ui-kit.tsx`.
Any UI change in this repository must preserve these definitions.

## Tokens

- Colors are defined in `Colors`:
  - `petroleo`: `#0E4E68`
  - `turquesa`: `#1A8E9F`
  - `coral`: `#D8614E`
  - `marfil`: `#FBF8F1`
  - `marfilDark`: `#F3F1EA`
  - `textDark`: `#2F3B40`
- Typography aliases are centralized in `Typography`:
  - `title`: serif display style
  - `body`: sans body style

## Primitive Components

- `Pill`: compact uppercase badge with rounded-full shape and tracking.
- `Heading`: semantic `h1..h4` generator with size scale by `level`.
- `BodyText`: body paragraph scale (`sm`, `md`, `lg`) with consistent leading.
- `CardTitle`, `CardLabel`, `CardBody`: card text primitives; keep hierarchy and case.
- `BaseCard`: glassmorphism card container with optional hover elevation.
- `IconButton`: circular icon action button.

## Composed Components

- `StatItem`: centered KPI block with strong numeric emphasis.
- `ArtifactCard`: preview card with image + metadata + hover treatment.
- `SectionHeader`: category chip + title + optional subtitle/description.
- `GlobalHeader`: fixed top nav with language switch, responsive desktop/mobile behavior.
- `SlideFooter`: fixed bottom nav with step indicator, arrows, and progress/restart action.

## Layout System

- `FullCenteredLayout`:
  - Max width: `1600px`
  - Horizontal padding: `px-8` (mobile), `lg:px-20` (desktop)
  - Top spacing: `pt-[40px]` / `lg:pt-[60px]`
  - Bottom spacing: `pb-[160px]` / `lg:pb-[220px]`
- `SplitLayout`:
  - 12-column desktop grid
  - Ratios: `5:7`, `7:5`, `6:6`
  - Gap: `gap-12` / `lg:gap-24`
  - Preserves same max width and horizontal rhythm as `FullCenteredLayout`

## Icons and Motion

- Motion exports:
  - `motion` (from `motion/react`)
  - `AnimatePresence` (from `motion/react`)
- `SafeIcon` resolution order:
  1. Custom inline SVG icon map
  2. `lucide-react` icon by name
  3. Neutral fallback square if icon is missing

## Change Rules (Mandatory)

1. Do not introduce ad-hoc colors if an equivalent token already exists.
2. Reuse UI-kit primitives before creating new local visual patterns.
3. Keep spacing aligned to current layout rhythm; do not break paddings/gaps used by layout components.
4. Preserve responsive behavior (mobile and desktop) in header, footer, and layout wrappers.
5. Prefer extending existing primitives/composed components instead of duplicating styles.

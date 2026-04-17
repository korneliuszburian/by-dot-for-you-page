# Design System Audit

## Tokens Present Today

- `src/design-tokens/colors.json` defines the current palette: transparent, base charcoal/granite, light, highlight brass/bone/rusted gold, accent fire/blood, text ember, and shadow deep.
- `src/design-tokens/fonts.json` defines one font stack: `["Cinzel", "serif"]`.
- `src/design-tokens/text-sizes.json`, `src/design-tokens/text-leading.json`, and `src/design-tokens/text-weights.json` define the text scale, leading, and weight tokens used by the type system.
- `src/design-tokens/spacing.json` defines a responsive spacing scale from `Zero` through `4XL`, plus combined ranges such as `S - M`, `M - L`, and `S - XL`.
- `src/design-tokens/effects.json` defines transition timings, hover lift, parallax depth, border radius, z-index, glow intensity, and backdrop blur values.
- `src/design-tokens/viewports.json` defines the fluid scale breakpoints: `330`, `760`, and `1230`.
- `src/css/global/variables.css` adds shell-level variables for `--gutter`, `--flow-space`, `--font-primary`, `--font-secondary`, `--leading-standard`, transition tokens, and wrapper widths.

## Shared UI Language

- The homepage menu at `/` is the current visual reference surface.
- `src/layouts/Layout.astro` is the shared shell: it loads global CSS, adds `ClientRouter`, and renders the full-page background video on every route.
- `src/components/MainMenu.astro` is the main reference composition: `GothicFrame` wraps the menu, `GothicButton` renders each action, and `Logo3D` sits above the frame.
- `src/components/GothicFrame.astro` exposes the frame contract through `variant`, `size`, and `background` props plus `data-gothic-frame` attributes.
- `src/components/GothicButton.astro` exposes the button contract through `variant`, `size`, `disabled`, `href`, `type`, `class`, and `onClick`.
- `src/components/Logo3D.astro` defines the interactive logo/media language through a Three.js canvas with hover-driven motion and glow.
- `src/pages/design-system.astro` exists as a route, but it is empty and builds to a blank page.

## Gaps

- Global styles consume `--color-light`, `--color-dark`, `--size-step-0`, and `--font-base`, but those names are not defined in the inspected `src/css/global/variables.css`.
- `GothicFrame` and `gothic-frame.css` depend on `--transition-gothic`, `--transition-stone`, `--shadow-deep`, `--shadow-inset-glow`, `--shadow-ember`, and `--gothic-border-*`, which are not established in the inspected token files.
- `GothicButton` hard-codes its own asset paths, sizing rules, hover colors, and disabled treatment inside the component stylesheet.
- `GothicButton` also imports Cinzel locally, even though the font is already declared in the shared font layer.
- `MainMenu` carries substantial component-local styling for layout, title treatment, nav spacing, and animation.
- `Logo3D` keeps its presentation, interaction, and rendering logic entirely inside the component, including inline sizing classes and a large embedded script.
- The inspected files show mixed naming between design tokens, CSS variables, and component-specific variables, with no single published contract tying them together.

## Missing Design-System Contracts

- There is no published mapping from the token files to the runtime CSS variable names used in global and component styles.
- `GothicButton` has a local implementation contract, but there is no centralized/shared contract for its six asset-backed variants, sizing rules, or state treatment.
- `GothicFrame` has a local implementation contract, but there is no centralized/shared contract for frame geometry, padding, border width, or background asset selection.
- `Logo3D` has a local implementation contract, but there is no centralized/shared contract for sizing, loading state, or interaction states.
- `Layout` has a local media treatment contract, but there is no centralized/shared contract for shell media beyond the background video currently used.
- `src/pages/design-system.astro` exists as a route, but it is empty and builds to a blank page.

## Preservation Rules

- Preserve the homepage menu as the current visual reference.
- Preserve the full-page background video shell in `Layout`.
- Preserve the existing asset-backed button, frame, and logo language on live surfaces.
- Preserve current route behavior for the live core while keeping the shared `Layout` shell behavior consistent across routes that use it, including placeholder routes.
- Treat component-local styling as the current implementation shape until a shared contract replaces it.

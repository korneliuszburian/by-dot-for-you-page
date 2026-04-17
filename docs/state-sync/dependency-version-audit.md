# Dependency / Version Audit

Scope: `package.json`, `package-lock.json`, `astro.config.mjs`, `npm outdated`, and `npm run build` as run in this checkout.

## Core Runtime Packages

| Package | Current | Update signal |
| --- | --- | --- |
| `astro` | `5.14.4` | `wanted: 5.18.1`, `latest: 6.1.7` |
| `react` | `19.2.0` | `wanted: 19.2.5`, `latest: 19.2.5` |
| `react-dom` | `19.2.0` | `wanted: 19.2.5`, `latest: 19.2.5` |
| `three` | `0.180.0` | `wanted: 0.180.0`, `latest: 0.184.0` |
| `@types/three` | `0.180.0` | `wanted: 0.180.0`, `latest: 0.184.0` |
| `slugify` | `1.6.6` | `wanted: 1.6.9`, `latest: 1.6.9` |

## Tooling Packages

| Package | Current | Update signal |
| --- | --- | --- |
| `@astrojs/check` | `0.9.5` | `wanted: 0.9.8`, `latest: 0.9.8` |
| `@astrojs/partytown` | `2.1.4` | `wanted: 2.1.7`, `latest: 2.1.7` |
| `@astrojs/react` | `4.4.0` | `wanted: 4.4.2`, `latest: 5.0.3` |
| `@astrojs/sitemap` | `3.6.0` | `wanted: 3.7.2`, `latest: 3.7.2` |
| `@astrojs/tailwind` | `6.0.2` | no drift reported by `npm outdated` |
| `tailwindcss` | `3.4.18` | `wanted: 3.4.19`, `latest: 4.2.2` |
| `postcss-nesting` | `13.0.2` | `wanted: 13.0.2`, `latest: 14.0.0` |
| `prettier` | `3.6.2` | `wanted: 3.8.3`, `latest: 3.8.3` |
| `prettier-plugin-astro` | `0.14.1` | no drift reported by `npm outdated` |
| `typescript` | `5.9.3` | `wanted: 5.9.3`, `latest: 6.0.3` |

`astro.config.mjs` currently wires `@astrojs/tailwind`, `@astrojs/react`, `@astrojs/partytown`, and `@astrojs/sitemap`, with `three` pre-optimized in Vite.

## Fresh Warnings

- `baseline-browser-mapping` reported that its data is over two months old and asked for `npm i baseline-browser-mapping@latest -D`.
- Browserslist reported that `caniuse-lite` data is 6 months old and asked for `npx update-browserslist-db@latest`.
- Tailwind reported `optimizeUniversalDefaults` as an experimental feature and warned that experimental features can change without semver guarantees.
- Vite warned that `matchHostname`, `matchPathname`, `matchPort`, and `matchProtocol` are imported but unused in Astro asset remote-pattern code.
- Vite warned that at least one chunk exceeds 500 kB after minification, with `Logo3D.astro_astro_type_script_index_0_lang.CIiVW4rV.js` called out.
- `@astrojs/sitemap` warned that the `site` config option is missing, so sitemap generation was skipped.
- `astro check` completed with `0 errors`, `0 warnings`, and `0 hints`.

## Upgrade Buckets

### Lower-risk maintenance candidates

- `@astrojs/check` `0.9.5 -> 0.9.8`
- `@astrojs/partytown` `2.1.4 -> 2.1.7`
- `@astrojs/sitemap` `3.6.0 -> 3.7.2`
- `react` and `react-dom` `19.2.0 -> 19.2.5`
- `slugify` `1.6.6 -> 1.6.9`
- `prettier` `3.6.2 -> 3.8.3`
- `tailwindcss` `3.4.18 -> 3.4.19`

### Higher-risk upgrades requiring extra validation

- `astro` `5.14.4 -> 6.1.7` because this is the major-line jump reported by `npm outdated`.
- `@astrojs/react` `4.4.0 -> 5.0.3` because the latest release is a new major line.
- `tailwindcss` `3.4.18 -> 4.2.2` because `@astrojs/tailwind` still declares a `^3.0.24` peer range.
- `postcss-nesting` `13.0.2 -> 14.0.0` because this is a major version jump.
- `typescript` `5.9.3 -> 6.0.3` because this is a major version jump.
- `three` and `@types/three` `0.180.0 -> 0.184.0` because rendering and type changes should be checked against the `Logo3D` surface.

## Notes

- The current lockfile shows installed versions that already differ from some `package.json` ranges, so the `npm outdated` output is the better source for drift.
- This audit groups upgrades by likely blast radius; it does not assert that any upgrade is safe without a follow-up validation pass.

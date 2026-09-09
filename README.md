# World of Harnesses

**Legacy project — continue at [The Build Bench](https://hitenjadeja.github.io/the-build-bench/).**

The canonical source is [`hitenjadeja/the-build-bench`](https://github.com/hitenjadeja/the-build-bench), maintained locally at `/Users/hiten/workspace/the-build-bench`. New catalog, discovery, and interface work belongs there. Read that repository's `AGENTS.md` and repo-scoped `$discover-harnesses` skill.

This repository preserves its history and former implementation. Its public GitHub Pages site is retired and the deployment workflow has been removed, so future pushes do not recreate a second catalog. The old website URL is intentionally unavailable.

The original `data/*.json` files remain frozen at this repository's final catalog snapshot (198 entries, 2026-09-08). For the unchanged legacy schema, use the [frozen JSON file](https://raw.githubusercontent.com/hitenjadeja/world-of-harnesses/main/data/harnesses.json) from GitHub. For current records, migrate to [Build Bench's versioned catalog](https://hitenjadeja.github.io/the-build-bench/catalog.json). [Compatibility details](redirect/data/README.md) describe both formats.

A prepared, undeployed `redirect/` recovery artifact is retained. `npm run validate:redirect` packages byte-for-byte frozen JSON exports and checks browser query/anchor handoff. Re-enabling this artifact requires an explicit restoration request. Build Bench restores search (`q`) and A–Z/Z–A name sorting; legacy category, availability, and star-sort settings have no equivalent and should be reselected using its controls.

## Historical documentation

The instructions below describe the frozen implementation. Do not run its refresh/discovery commands for ongoing maintenance.

A broad, verified snapshot of the AI agent harness ecosystem.

The current catalog combines a live, community-curated census with a separate primary-source search for recent, proprietary, and internal systems. It includes **Swamp**, Spotify's **Honk**, and the official **DeepSeek Harness** release, alongside coding agents, runtimes, orchestration frameworks, memory, sandboxes, observability, and evaluation infrastructure.

- [Browse the human-readable catalog](CATALOG.md)
- [Use the machine-readable catalog](data/harnesses.json)
- [Review independently discovered additions](data/additions.json)
- [Read the methodology and attribution](ATTRIBUTION.md)

## Website

The catalog includes a progressively enhanced single-page website: all entries are
pre-rendered into the initial HTML for resilient browsing and search discovery, while
client-side search, category filters, availability filters, sorting, and pagination
provide the interactive experience.

```sh
npm run build
npm run dev
```

The local site runs at `http://127.0.0.1:4173`. Set `SITE_URL` when building for a
different production hostname; it controls the canonical URL, social image URL,
structured data, robots sitemap reference, and sitemap location.

## Verification

```sh
npm test
npm run verify:links -- --additions-only
```

Refresh from the latest upstream census and rebuild the generated artifacts:

```sh
npm run refresh
```

No package installation is required; the scripts use Node.js built-ins only.

## Repeatable discovery

`refresh` updates the known upstream census; it does not discover projects outside
that source. Run the discovery workflow separately:

```sh
npm run discover -- --mode daily --days 7
npm run discover -- --mode weekly --days 30
```

The command generates the complete search plan from
`data/discovery-sources.json`: upstream deltas, generic launch-language searches,
community launch signals, recent GitHub repositories, and a rotating official-vendor
watchlist. Invoke the checked-in `$discover-harnesses` skill to execute the plan,
trace leads to primary sources, update `data/additions.json`, and record plausible
but unverified leads in `data/discovery-candidates.json`.

A daily Codex Scheduled task can invoke the skill against this project. The daily
run uses the seven-day window and rotating vendor batch; a weekly run should use the
30-day deep mode so every vendor is checked. The search report must record every lane,
including zero-result and blocked-source lanes.

## Scope

An entry must materially provide at least one harness concern: an agent loop, tool execution, context assembly, memory, permissions or safety boundaries, orchestration, execution infrastructure, or agent evaluation. The catalog includes adjacent projects when they provide one of those layers directly.

“Verified” means that a record passed schema and duplicate checks and that its catalog source or primary source was live on the snapshot date. It is not a security endorsement. No internet census can be literally complete; private systems and new experiments appear continuously.

## Contributing

Add primary-source-backed records to `data/additions.json`, run `npm run refresh`, then run the validation and link checks. Avoid mirrors, abandoned forks, prompt-only collections with no harness behavior, and projects whose only connection is using the word “harness.”

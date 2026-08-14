---
name: discover-harnesses
description: Discover, verify, and catalog newly launched AI agent harnesses and adjacent runtime infrastructure. Use for catalog refreshes, ecosystem searches, scheduled discovery sweeps, candidate triage, or when checking whether World of Harnesses missed a new product, repository, internal system, framework, orchestrator, memory layer, tool, or evaluation harness.
---

# Discover Harnesses

Run a coverage-driven search, trace every candidate to a primary source, and leave an auditable result even when no entry is added.

## Run the sweep

1. From the repository root, run:

   ```sh
   npm run discover -- --mode daily --days 7
   ```

   For the weekly deep sweep, use `--mode weekly --days 30`. Read the generated plan completely.

2. Execute every listed lane:

   - compare each upstream catalog for new records;
   - run all launch-language web queries with the plan's recency window;
   - run all community-signal queries, treating them only as leads;
   - run the GitHub queries with `gh search repos` or equivalent repository search;
   - run every vendor query selected by the daily rotation, or the complete watchlist in weekly mode.

3. Do not search only for names already known. Search the generic launch vocabulary in `data/discovery-sources.json`, including harness, coding agent, agentic development environment, orchestrator, runtime, background agent, and autonomous worker.

4. Record lane coverage and candidate dispositions. Include lanes with zero results so a partial search cannot be mistaken for a complete sweep.

## Triage candidates

Deduplicate against `data/harnesses.json`, `data/additions.json`, and `data/discovery-candidates.json` using canonical URL, repository, case-insensitive ID, and normalized name.

- Add a record only when an official repository, product page, documentation page, vendor announcement, or engineering post proves that it materially supplies a harness concern.
- Use community posts, search snippets, newsletters, and press coverage to discover leads, never as the sole verification source.
- Put plausible but unverified leads in `data/discovery-candidates.json` with the discovery date, signal URL, and missing evidence.
- Reject projects that are prompt-only collections, abandoned mirrors, generic AI lists, or products with no agent loop, tools, context, memory, safety, orchestration, execution, or evaluation role.

## Add verified entries

1. Add primary-source-backed records to `data/additions.json`.
2. Run `npm run refresh`, `npm run build`, `npm test`, and `npm run verify:links -- --additions-only`.
3. Summarize the queries run, sources checked, additions, deferred candidates, and rejections.
4. Follow `AGENTS.md`: commit and push validated changes unless the user says not to.

Never claim mathematical completeness. Report the search window and any blocked or unavailable source explicitly.

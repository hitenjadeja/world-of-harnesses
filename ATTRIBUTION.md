# Methodology and attribution

## Collection method

The catalog is built in two passes:

1. A broad baseline is adapted from [Ryan Alberts' best-of-Agent-Harnesses](https://github.com/RyanAlberts/best-of-Agent-Harnesses), using its live `harnesses.json` export.
2. A primary-source discovery pass adds projects absent from that snapshot, newly released systems, major proprietary harnesses, and publicly documented internal systems.

The second pass used GitHub repository search, exact repository metadata, vendor documentation, and engineering posts. On 2026-08-14, every independently added URL was checked for a successful response; GitHub additions were also checked against GitHub's repository metadata. Entries were deduplicated by a case-insensitive stable ID and by canonical URL.

## Important inclusions

- **Swamp** is included as an agent-facing deterministic automation and operational-workflow layer, even though it augments other coding agents rather than replacing their model loop.
- **Honk** is included because Spotify explicitly documents it as Claude Agent SDK wrapped in Spotify's own harness. It is marked `internal`, not presented as downloadable software.
- **DeepSeek Harness** is included from its official repository. It was released after the upstream catalog's recorded star snapshot.

## License and provenance

The baseline data and descriptions are adapted from `best-of-Agent-Harnesses`, copyright Ryan Alberts and contributors, licensed [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). This repository preserves that license for the combined catalog and identifies independently researched additions with `provenance: "independent-discovery"`.

Vendor names and descriptions identify their respective projects and do not imply endorsement. Star counts are point-in-time metadata, not quality scores.

# Frozen World of Harnesses JSON exports

The catalog moved to [The Build Bench](https://hitenjadeja.github.io/the-build-bench/). Its current [catalog.json](https://hitenjadeja.github.io/the-build-bench/catalog.json) uses the versioned Build Bench schema, with a `harnesses` array rather than the legacy `entries` array.

The World of Harnesses Pages site is retired. Its former `data/*.json` website URLs are unavailable. The final legacy catalog has 198 entries and a snapshot date of 2026-09-08; it will not receive new records or verification updates. Read the unchanged [frozen JSON from GitHub](https://raw.githubusercontent.com/hitenjadeja/world-of-harnesses/main/data/harnesses.json), or use the repository's `data/` directory.

- `harnesses.json`: final legacy catalog and category metadata.
- `additions.json`: original independent additions and provenance.
- `discovery-candidates.json` and `discovery-sources.json`: historical discovery configuration and state.

Existing consumers can switch to the raw GitHub URL to keep reading the frozen schema while adapting to [the canonical schema](https://github.com/hitenjadeja/the-build-bench/blob/main/data/harnesses.v1.schema.json). The undeployed recovery artifact copies the original JSON byte-for-byte and uses HTML redirects only for browser pages. It is retained for an explicitly requested restoration, not an active second site.

The original [attribution](https://github.com/hitenjadeja/world-of-harnesses/blob/main/ATTRIBUTION.md) and [license](https://github.com/hitenjadeja/world-of-harnesses/blob/main/LICENSE.md) remain with these exports. Their repository history is retained at [hitenjadeja/world-of-harnesses](https://github.com/hitenjadeja/world-of-harnesses).

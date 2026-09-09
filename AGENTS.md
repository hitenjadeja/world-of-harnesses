# Legacy project: maintain The Build Bench

- `hitenjadeja/the-build-bench` is the sole production source for <https://hitenjadeja.github.io/the-build-bench/>. Use its durable checkout at `/Users/hiten/workspace/the-build-bench` and read its `AGENTS.md` before catalog or interface work.
- This repository is retired from active maintenance. It retains the historical World of Harnesses implementation, research, and frozen JSON exports. Do not refresh its catalog, add entries, or develop a second interface here.
- For discovery, use the canonical repository's `.agents/skills/discover-harnesses/SKILL.md` and `data/harnesses.v1.json`. The local skill is only a handoff pointer.
- Changes here should be limited to retirement documentation and explicitly requested recovery work. Keep historical data and attribution intact. Never repoint this repository's Git remote to the unrelated canonical history.
- GitHub Pages is retired and its deployment workflow removed. Do not re-enable Pages or add catalog/deployment schedules without an explicit request to restore the old site.
- The prepared `redirect/` artifact and `npm run validate:redirect` remain available for recovery. They are not deployed. Historical JSON remains available through this GitHub repository; former Pages URLs are retired.
- Respect local-only preparation requests. When repository publication is authorized, use a repository-scoped commit and do not stage unrelated files. Catalog and interface releases belong to The Build Bench and must be verified there.
- Verify GitHub authentication with host keyring access before reporting an authentication problem; never initiate interactive login in the sandbox.

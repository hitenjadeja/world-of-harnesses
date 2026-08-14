import { readFile } from "node:fs/promises";

const args = process.argv.slice(2);

function option(name) {
  const index = args.indexOf(name);
  return index === -1 ? undefined : args[index + 1];
}

const mode = option("--mode") ?? "daily";
if (!new Set(["daily", "weekly"]).has(mode)) {
  throw new Error("--mode must be daily or weekly");
}

const sources = JSON.parse(await readFile("data/discovery-sources.json", "utf8"));
const catalog = JSON.parse(await readFile("data/harnesses.json", "utf8"));
const candidates = JSON.parse(
  await readFile("data/discovery-candidates.json", "utf8"),
);

const configuredDays = sources.default_days[mode];
const days = Number(option("--days") ?? configuredDays);
if (!Number.isInteger(days) || days < 1 || days > 365) {
  throw new Error("--days must be an integer between 1 and 365");
}

const generatedAt = new Date().toISOString().slice(0, 10);
const sinceDate = new Date(`${generatedAt}T00:00:00Z`);
sinceDate.setUTCDate(sinceDate.getUTCDate() - days);
const since = sinceDate.toISOString().slice(0, 10);
const epochDay = Math.floor(Date.parse(`${generatedAt}T00:00:00Z`) / 86_400_000);

function selectedVendors() {
  if (mode === "weekly") return sources.vendor_domains;
  const size = sources.vendor_rotation_size;
  const start = (epochDay * size) % sources.vendor_domains.length;
  return Array.from({ length: Math.min(size, sources.vendor_domains.length) }, (_, i) =>
    sources.vendor_domains[(start + i) % sources.vendor_domains.length],
  );
}

const plan = {
  generated_at: generatedAt,
  mode,
  days,
  since,
  known_entry_count: catalog.entries.length,
  deferred_candidate_count: candidates.length,
  upstream_catalogs: sources.upstream_catalogs,
  web_queries: sources.core_queries,
  community_queries: sources.community_queries,
  github_queries: sources.github_queries.map((query) => ({
    ...query,
    query: query.query.replaceAll("{since}", since),
  })),
  vendor_queries: selectedVendors().map((vendor) => ({
    id: `vendor-${vendor.domain}`,
    vendor: vendor.name,
    query: `site:${vendor.domain} (\"coding agent\" OR \"agent harness\" OR \"agent orchestrator\" OR \"agentic development environment\")`,
  })),
};

if (args.includes("--json")) {
  console.log(JSON.stringify(plan, null, 2));
  process.exit(0);
}

const lines = [
  "# Harness discovery plan",
  "",
  `Generated: ${plan.generated_at}`,
  `Mode: ${plan.mode}`,
  `Search window: ${plan.since} through ${plan.generated_at} (${plan.days} days)`,
  `Known entries: ${plan.known_entry_count}`,
  `Deferred candidates: ${plan.deferred_candidate_count}`,
  "",
  "## Upstream catalog deltas",
  "",
  ...plan.upstream_catalogs.map((source) => `- ${source.name}: ${source.url}`),
  "",
  "## Launch-language web queries",
  "",
  ...plan.web_queries.map((query) => `- [${query.id}] ${query.query}`),
  "",
  "## Community-signal queries",
  "",
  ...plan.community_queries.map((query) => `- [${query.id}] ${query.query}`),
  "",
  "## Recent GitHub repository queries",
  "",
  ...plan.github_queries.map(
    (query) =>
      `- [${query.id}] gh search repos '${query.query}' --limit 50 --json fullName,url,description,createdAt,updatedAt`,
  ),
  "",
  `## Official vendor queries (${mode === "daily" ? "daily rotation" : "complete watchlist"})`,
  "",
  ...plan.vendor_queries.map((query) => `- [${query.id}] ${query.query}`),
  "",
  "## Required run report",
  "",
  "Record every lane, query count, result count, verified addition, deferred candidate, rejection, blocked source, and the search window.",
];

console.log(lines.join("\n"));

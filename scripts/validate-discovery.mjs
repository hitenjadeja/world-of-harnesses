import { readFile } from "node:fs/promises";

const sources = JSON.parse(await readFile("data/discovery-sources.json", "utf8"));
const candidates = JSON.parse(
  await readFile("data/discovery-candidates.json", "utf8"),
);
const skill = await readFile(
  ".agents/skills/discover-harnesses/SKILL.md",
  "utf8",
);
const failures = [];

const queryGroups = [
  sources.core_queries,
  sources.community_queries,
  sources.github_queries,
];
const queries = queryGroups.flat();
const ids = new Set();

for (const query of queries) {
  if (!query.id || !query.query) failures.push("Every discovery query needs id and query");
  if (ids.has(query.id)) failures.push(`Duplicate discovery query id: ${query.id}`);
  ids.add(query.id);
}

if (sources.core_queries.length < 5) failures.push("Need at least five core queries");
if (sources.community_queries.length < 3) {
  failures.push("Need at least three community-signal queries");
}
if (sources.github_queries.length < 3) failures.push("Need at least three GitHub queries");
if (sources.vendor_domains.length < 15) failures.push("Vendor watchlist is too narrow");
if (!sources.vendor_domains.some((vendor) => vendor.domain === "spotify.com")) {
  failures.push("Spotify regression watch is missing");
}
if (!sources.community_queries.some((query) => query.query.includes("reddit.com"))) {
  failures.push("Reddit launch-signal lane is missing");
}
if (!Array.isArray(candidates)) failures.push("discovery-candidates.json must be an array");

for (const [index, candidate] of candidates.entries()) {
  for (const field of ["name", "url", "discovered_at", "signal_url", "reason"]) {
    if (typeof candidate[field] !== "string" || !candidate[field].trim()) {
      failures.push(`Candidate ${index} has invalid ${field}`);
    }
  }
  if (!candidate.url?.startsWith("https://")) {
    failures.push(`Candidate ${index} URL must use HTTPS`);
  }
}

for (const required of [
  "npm run discover",
  "data/discovery-candidates.json",
  "primary source",
  "community",
  "vendor",
]) {
  if (!skill.toLowerCase().includes(required.toLowerCase())) {
    failures.push(`Discovery skill is missing: ${required}`);
  }
}

if (failures.length) {
  console.error(`Discovery validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Validated ${queries.length} discovery queries, ${sources.vendor_domains.length} vendor domains, and ${candidates.length} deferred candidates.`,
);

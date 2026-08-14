import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile("data/harnesses.json", "utf8"));
const additions = JSON.parse(await readFile("data/additions.json", "utf8"));
const failures = [];
const ids = new Set();
const urls = new Set();
const categoryIds = new Set(catalog.categories.map((category) => category.id));
const allowedAvailability = new Set([
  "open-source",
  "source-available",
  "proprietary",
  "internal",
  "unclear",
]);

for (const [index, entry] of catalog.entries.entries()) {
  const label = `entries[${index}] (${entry.id ?? "missing id"})`;
  for (const field of ["id", "name", "url", "description", "category"]) {
    if (typeof entry[field] !== "string" || entry[field].trim() === "") {
      failures.push(`${label}: ${field} must be a non-empty string`);
    }
  }
  const id = entry.id?.toLowerCase();
  if (ids.has(id)) failures.push(`${label}: duplicate id ${entry.id}`);
  ids.add(id);
  if (urls.has(entry.url)) failures.push(`${label}: duplicate URL ${entry.url}`);
  urls.add(entry.url);
  if (!entry.url?.startsWith("https://")) failures.push(`${label}: URL must use HTTPS`);
  if (!categoryIds.has(entry.category)) failures.push(`${label}: unknown category`);
  if (!allowedAvailability.has(entry.availability)) {
    failures.push(`${label}: unknown availability ${entry.availability}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.verified_at)) {
    failures.push(`${label}: invalid verified_at date`);
  }
}

if (catalog.meta.project_count !== catalog.entries.length) {
  failures.push("meta.project_count does not match entries.length");
}
if (
  catalog.meta.upstream_project_count + catalog.meta.independent_addition_count !==
  catalog.entries.length
) {
  failures.push("upstream + additions counts do not match entries.length");
}
if (catalog.meta.independent_addition_count !== additions.length) {
  failures.push("meta.independent_addition_count does not match additions.json");
}

for (const requiredId of [
  "swamp-club/swamp",
  "spotify/honk",
  "deepseek-ai/deepseek-harness",
]) {
  if (!ids.has(requiredId)) failures.push(`required entry missing: ${requiredId}`);
}

const counted = Object.values(catalog.meta.category_counts).reduce(
  (sum, count) => sum + count,
  0,
);
if (counted !== catalog.entries.length) {
  failures.push("category counts do not sum to entries.length");
}

if (failures.length) {
  console.error(`Catalog validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Validated ${catalog.entries.length} unique entries across ${catalog.categories.length} categories. Required entries: Swamp, Honk, DeepSeek Harness.`,
);

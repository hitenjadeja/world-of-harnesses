import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const UPSTREAM_URL =
  "https://raw.githubusercontent.com/RyanAlberts/best-of-Agent-Harnesses/refs/heads/main/harnesses.json";
const today = new Date().toISOString().slice(0, 10);
const sourceArg = process.argv.indexOf("--source");

async function loadUpstream() {
  if (sourceArg !== -1) {
    const sourcePath = process.argv[sourceArg + 1];
    if (!sourcePath) throw new Error("--source requires a JSON file path");
    return JSON.parse(await readFile(resolve(sourcePath), "utf8"));
  }

  const response = await fetch(UPSTREAM_URL, {
    headers: { "user-agent": "world-of-harnesses-refresh" },
  });
  if (!response.ok) {
    throw new Error(`Upstream fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

const upstream = await loadUpstream();
const additions = JSON.parse(
  await readFile(resolve("data/additions.json"), "utf8"),
);

const categoryById = new Map(
  upstream.categories.map((category) => [category.id, category]),
);

function normalizeUpstream(project) {
  return {
    id: project.github_id,
    name: project.name,
    url: project.url,
    repository: project.github_id,
    description: project.description,
    category: project.category,
    category_title: project.category_title,
    availability:
      project.license_signal === "open-source"
        ? "open-source"
        : project.license_signal === "source-available"
          ? "source-available"
          : "unclear",
    license: project.license_signal,
    stars: project.stars,
    tags: project.tags ?? [],
    source_kind: "repository",
    source_url: project.url,
    verified_at: today,
    verification: "present-in-live-upstream-catalog",
    provenance: "RyanAlberts/best-of-Agent-Harnesses",
  };
}

function normalizeAddition(project) {
  const category = categoryById.get(project.category);
  if (!category) throw new Error(`Unknown category for ${project.id}: ${project.category}`);
  return {
    ...project,
    category_title: category.title,
    source_url: project.url,
    verification: "primary-source-checked",
    provenance: "independent-discovery",
  };
}

const entriesById = new Map();
for (const project of upstream.projects) {
  entriesById.set(project.github_id.toLowerCase(), normalizeUpstream(project));
}
for (const project of additions) {
  const key = project.id.toLowerCase();
  if (entriesById.has(key)) {
    throw new Error(`Addition duplicates an upstream entry: ${project.id}`);
  }
  entriesById.set(key, normalizeAddition(project));
}

const categoryOrder = new Map(
  upstream.categories.map((category, index) => [category.id, index]),
);
const entries = [...entriesById.values()].sort((a, b) => {
  const categoryDelta =
    categoryOrder.get(a.category) - categoryOrder.get(b.category);
  if (categoryDelta) return categoryDelta;
  const starsDelta = (b.stars ?? -1) - (a.stars ?? -1);
  return starsDelta || a.name.localeCompare(b.name);
});

const categoryCounts = Object.fromEntries(
  upstream.categories.map((category) => [
    category.id,
    entries.filter((entry) => entry.category === category.id).length,
  ]),
);
const availabilityCounts = entries.reduce((counts, entry) => {
  counts[entry.availability] = (counts[entry.availability] ?? 0) + 1;
  return counts;
}, {});

const catalog = {
  meta: {
    name: "World of Harnesses",
    description:
      "A broad catalog of AI agent harnesses and the runtime, orchestration, memory, evaluation, and infrastructure projects that shape them.",
    generated_at: today,
    project_count: entries.length,
    upstream_project_count: upstream.projects.length,
    independent_addition_count: additions.length,
    category_counts: categoryCounts,
    availability_counts: availabilityCounts,
    scope:
      "Publicly discoverable agent harnesses plus closely adjacent projects that materially provide an agent loop, tools, context, memory, safety, orchestration, execution, or evaluation. Includes publicly documented proprietary and internal systems.",
    caveat:
      "This is a researched census, not a claim of mathematical completeness. New and private harnesses appear continuously.",
    sources: [
      {
        name: "best-of-Agent-Harnesses",
        url: "https://github.com/RyanAlberts/best-of-Agent-Harnesses",
        license: upstream.meta.license,
        captured: upstream.meta.stars_captured,
      },
      {
        name: "Independent primary-source pass",
        url: "data/additions.json",
        captured: today,
      },
    ],
  },
  categories: upstream.categories.map((category) => ({
    ...category,
    count: categoryCounts[category.id],
  })),
  entries,
};

await writeFile(
  resolve("data/harnesses.json"),
  `${JSON.stringify(catalog, null, 2)}\n`,
);

const escapeCell = (value) =>
  String(value ?? "—")
    .replaceAll("|", "\\|")
    .replaceAll("\n", " ");
const availabilityLabel = {
  "open-source": "Open source",
  "source-available": "Source available",
  proprietary: "Proprietary",
  internal: "Internal",
  unclear: "Unclear",
};

const lines = [
  "# Harness catalog",
  "",
  `Verified snapshot: **${today}** · **${entries.length} entries** · **${upstream.categories.length} categories**`,
  "",
  "> Scope: agent harnesses plus adjacent runtimes, coding agents, orchestration, memory, tool, sandbox, observability, and evaluation infrastructure. “Verified” means the record passed schema/duplicate checks and its discovery source or primary source was live on the snapshot date; it is not a security endorsement.",
  "",
];

for (const category of upstream.categories) {
  const categoryEntries = entries.filter((entry) => entry.category === category.id);
  lines.push(`## ${category.title} (${categoryEntries.length})`, "");
  lines.push(category.subtitle, "");
  lines.push("| Project | Availability | Description |", "| --- | --- | --- |");
  for (const entry of categoryEntries) {
    lines.push(
      `| [${escapeCell(entry.name)}](${entry.url}) | ${availabilityLabel[entry.availability] ?? entry.availability} | ${escapeCell(entry.description)} |`,
    );
  }
  lines.push("");
}

await writeFile(resolve("CATALOG.md"), `${lines.join("\n")}\n`);
console.log(
  `Generated ${entries.length} entries (${upstream.projects.length} upstream + ${additions.length} independently verified).`,
);

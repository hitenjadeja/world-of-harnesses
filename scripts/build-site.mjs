import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const DEFAULT_SITE_URL = "https://hitenjadeja.github.io/world-of-harnesses/";
const siteUrl = new URL(process.env.SITE_URL || DEFAULT_SITE_URL);
if (!siteUrl.pathname.endsWith("/")) siteUrl.pathname += "/";

const root = resolve(import.meta.dirname, "..");
const catalog = JSON.parse(await readFile(resolve(root, "data/harnesses.json"), "utf8"));
const template = await readFile(resolve(root, "site.template.html"), "utf8");

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const titleCase = (value) =>
  String(value)
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const plainText = (value = "") =>
  String(value)
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");

const formatStars = (stars) => {
  if (!Number.isFinite(stars)) return "";
  if (stars >= 1000) {
    return `${new Intl.NumberFormat("en", { maximumFractionDigits: 1 }).format(stars / 1000)}k`;
  }
  return new Intl.NumberFormat("en").format(stars);
};

const categoryChips = [
  `<button class="filter-chip is-active" type="button" data-category="all" aria-pressed="true">All <span>${catalog.entries.length}</span></button>`,
  ...catalog.categories.map(
    (category) =>
      `<button class="filter-chip" type="button" data-category="${escapeHtml(category.id)}" aria-pressed="false">${escapeHtml(category.title.replace(/\s*\([^)]*\)/g, ""))} <span>${category.count}</span></button>`,
  ),
].join("\n");

const categoryFilters = [
  `<button class="filter-option is-active" type="button" data-category="all" aria-pressed="true"><span>All categories</span><strong>${catalog.entries.length}</strong></button>`,
  ...catalog.categories.map(
    (category) =>
      `<button class="filter-option" type="button" data-category="${escapeHtml(category.id)}" aria-pressed="false"><span>${escapeHtml(category.title)}</span><strong>${category.count}</strong></button>`,
  ),
].join("\n");

const cards = catalog.entries
  .map((entry, index) => {
    const searchText = [entry.name, plainText(entry.description), entry.category_title, ...(entry.tags ?? [])]
      .join(" ")
      .toLocaleLowerCase("en");
    const tags = (entry.tags ?? [])
      .slice(0, 4)
      .map((tag) => `<li>${escapeHtml(tag)}</li>`)
      .join("");
    const stars = formatStars(entry.stars);
    const sourceLabel = entry.repository ? "Repository" : titleCase(entry.source_kind || "Primary source");
    const availability = titleCase(entry.availability);

    return `
      <article class="catalog-card" data-index="${index}" data-category="${escapeHtml(entry.category)}" data-availability="${escapeHtml(entry.availability)}" data-stars="${entry.stars ?? -1}" data-name="${escapeHtml(entry.name.toLocaleLowerCase("en"))}" data-search="${escapeHtml(searchText)}">
        <div class="card-topline">
          <span class="availability availability--${escapeHtml(entry.availability)}"><span aria-hidden="true"></span>${escapeHtml(availability)}</span>
          ${stars ? `<span class="stars" aria-label="${entry.stars.toLocaleString("en")} GitHub stars"><svg aria-hidden="true" viewBox="0 0 16 16"><path d="m8 1.2 2 4.1 4.5.6-3.2 3.2.8 4.5L8 11.5l-4.1 2.1.8-4.5-3.2-3.2 4.5-.6L8 1.2Z"/></svg>${stars}</span>` : ""}
        </div>
        <div class="card-copy">
          <p class="card-category">${escapeHtml(entry.category_title)}</p>
          <h3><a href="${escapeHtml(entry.url)}" rel="noopener">${escapeHtml(entry.name)}<svg aria-hidden="true" viewBox="0 0 20 20"><path d="M6 14 14 6M8 6h6v6"/></svg></a></h3>
          <p>${escapeHtml(plainText(entry.description))}</p>
        </div>
        ${tags ? `<ul class="tag-list" aria-label="Tags">${tags}</ul>` : ""}
        <div class="card-footer">
          <span>${escapeHtml(entry.license || "License not stated")}</span>
          <span>${escapeHtml(sourceLabel)}</span>
          <span>Checked <time datetime="${escapeHtml(entry.verified_at)}">${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(`${entry.verified_at}T00:00:00Z`))}</time></span>
        </div>
      </article>`;
  })
  .join("\n");

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl.href}#website`,
      url: siteUrl.href,
      name: catalog.meta.name,
      description: catalog.meta.description,
      inLanguage: "en-GB",
    },
    {
      "@type": "CollectionPage",
      "@id": `${siteUrl.href}#webpage`,
      url: siteUrl.href,
      name: "World of Harnesses — verified AI agent harness catalog",
      description: catalog.meta.description,
      isPartOf: { "@id": `${siteUrl.href}#website` },
      mainEntity: { "@id": `${siteUrl.href}#dataset` },
      dateModified: catalog.meta.generated_at,
      inLanguage: "en-GB",
    },
    {
      "@type": "Dataset",
      "@id": `${siteUrl.href}#dataset`,
      name: "World of Harnesses catalog",
      description: catalog.meta.scope,
      url: siteUrl.href,
      dateModified: catalog.meta.generated_at,
      license: "https://creativecommons.org/licenses/by-sa/4.0/",
      isAccessibleForFree: true,
      keywords: [
        "AI agent harnesses",
        "coding agents",
        "agent orchestration",
        "LLM infrastructure",
        "agent evaluation",
      ],
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: new URL("data/harnesses.json", siteUrl).href,
        },
        {
          "@type": "DataDownload",
          encodingFormat: "text/markdown",
          contentUrl: new URL("CATALOG.md", siteUrl).href,
        },
      ],
      includedInDataCatalog: { "@id": `${siteUrl.href}#website` },
      measurementTechnique: "Community census followed by primary-source verification and deduplication",
      variableMeasured: ["project category", "availability", "license", "source", "verification date"],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl.href}#projects`,
      name: "Verified AI agent harnesses and infrastructure",
      numberOfItems: catalog.entries.length,
      itemListElement: catalog.entries.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: entry.url,
        name: entry.name,
      })),
    },
  ],
};

const replacements = {
  "{{SITE_URL}}": siteUrl.href,
  "{{SOCIAL_IMAGE_URL}}": new URL("assets/social-card.png", siteUrl).href,
  "{{UPDATED_ISO}}": catalog.meta.generated_at,
  "{{UPDATED_HUMAN}}": new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${catalog.meta.generated_at}T00:00:00Z`)),
  "{{PROJECT_COUNT}}": String(catalog.meta.project_count),
  "{{CATEGORY_COUNT}}": String(catalog.categories.length),
  "{{OPEN_SOURCE_COUNT}}": String(catalog.meta.availability_counts["open-source"] ?? 0),
  "{{CATEGORY_CHIPS}}": categoryChips,
  "{{CATEGORY_FILTERS}}": categoryFilters,
  "{{CARDS}}": cards,
  "{{SCHEMA}}": JSON.stringify(graph),
};

let html = template;
for (const [token, value] of Object.entries(replacements)) html = html.replaceAll(token, value);

await Promise.all([
  writeFile(resolve(root, "index.html"), html),
  writeFile(
    resolve(root, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${escapeHtml(siteUrl.href)}</loc>\n    <lastmod>${catalog.meta.generated_at}</lastmod>\n  </url>\n</urlset>\n`,
  ),
  writeFile(
    resolve(root, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", siteUrl).href}\n`,
  ),
]);

console.log(`Built ${catalog.entries.length} crawlable catalog cards for ${siteUrl.href}`);

import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const html = await readFile(resolve(root, "index.html"), "utf8");
const catalog = JSON.parse(await readFile(resolve(root, "data/harnesses.json"), "utf8"));
const failures = [];

const requireMatch = (pattern, message) => {
  if (!pattern.test(html)) failures.push(message);
};

requireMatch(/<title>[^<]{30,65}<\/title>/, "title must be descriptive and 30–65 characters");
requireMatch(/<meta name="description" content="[^"]{100,170}">/, "meta description must be 100–170 characters");
requireMatch(/<meta name="viewport" content="width=device-width, initial-scale=1">/, "mobile viewport metadata missing");
requireMatch(/<link rel="canonical" href="https:\/\//, "absolute canonical URL missing");
requireMatch(/<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">/, "robots preview directives missing");
requireMatch(/<script type="application\/ld\+json">/, "JSON-LD structured data missing");
requireMatch(/"@type":"Dataset"/, "Dataset structured data missing");
requireMatch(/<h1[^>]*>[^<]+/, "visible H1 missing");
requireMatch(/<main id="main-content"/, "main landmark missing");
requireMatch(/<dialog id="filter-dialog"/, "mobile filter dialog missing");
requireMatch(/<option value="name">Name A–Z<\/option>/, "ascending alphabetical sort option missing");
requireMatch(/<option value="name-desc">Name Z–A<\/option>/, "descending alphabetical sort option missing");

const cardCount = (html.match(/class="catalog-card"/g) || []).length;
if (cardCount !== catalog.entries.length) {
  failures.push(`expected ${catalog.entries.length} pre-rendered cards, found ${cardCount}`);
}

for (const asset of [
  "assets/app.js",
  "assets/styles.css",
  "assets/favicon.svg",
  "assets/favicon-48.png",
  "assets/apple-touch-icon.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/social-card.png",
  "site.webmanifest",
  "robots.txt",
  "sitemap.xml",
]) {
  try {
    await access(resolve(root, asset));
  } catch {
    failures.push(`missing site asset: ${asset}`);
  }
}

if (failures.length) {
  console.error(`Site validation failed (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validated SEO metadata, mobile controls, assets, and ${cardCount} crawlable cards.`);

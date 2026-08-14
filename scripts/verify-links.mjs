import { readFile } from "node:fs/promises";

const catalog = JSON.parse(await readFile("data/harnesses.json", "utf8"));
const additionsOnly = process.argv.includes("--additions-only");
const entries = additionsOnly
  ? catalog.entries.filter((entry) => entry.provenance === "independent-discovery")
  : catalog.entries;
const concurrency = 8;
let cursor = 0;
const results = [];

async function check(entry) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    let response = await fetch(entry.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "world-of-harnesses-link-check/1.0" },
    });
    if (response.status === 405) {
      response = await fetch(entry.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "world-of-harnesses-link-check/1.0" },
      });
    }
    return { entry, status: response.status, ok: response.status < 400 };
  } catch (error) {
    return { entry, status: 0, ok: false, error: error.message };
  } finally {
    clearTimeout(timeout);
  }
}

async function worker() {
  while (cursor < entries.length) {
    const entry = entries[cursor++];
    results.push(await check(entry));
  }
}

await Promise.all(Array.from({ length: concurrency }, () => worker()));
results.sort((a, b) => a.entry.name.localeCompare(b.entry.name));

const hardFailures = results.filter(
  (result) => !result.ok && ![0, 403, 429].includes(result.status),
);
const softFailures = results.filter(
  (result) => !result.ok && [0, 403, 429].includes(result.status),
);

for (const result of [...hardFailures, ...softFailures]) {
  console.error(
    `${result.status || "ERR"}\t${result.entry.name}\t${result.entry.url}${result.error ? `\t${result.error}` : ""}`,
  );
}

console.log(
  `Checked ${results.length} links: ${results.length - hardFailures.length - softFailures.length} live, ${softFailures.length} blocked/indeterminate, ${hardFailures.length} broken.`,
);
if (hardFailures.length) process.exit(1);

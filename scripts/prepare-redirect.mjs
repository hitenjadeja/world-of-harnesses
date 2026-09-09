import { copyFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const catalog = JSON.parse(await readFile(new URL('data/harnesses.json', root), 'utf8'));
if (catalog.meta.generated_at !== '2026-09-08' || catalog.entries.length !== 198) {
  throw new Error('Legacy JSON must remain the frozen 2026-09-08 snapshot with 198 entries.');
}
await mkdir(new URL('redirect/data/', root), { recursive: true });
for (const name of await readdir(new URL('data/', root))) {
  if (name.endsWith('.json')) {
    await copyFile(new URL(`data/${name}`, root), new URL(`redirect/data/${name}`, root));
  }
}
for (const name of ['ATTRIBUTION.md', 'LICENSE.md']) {
  await copyFile(new URL(name, root), new URL(`redirect/${name}`, root));
}
console.log(`Prepared redirect and frozen JSON exports in ${fileURLToPath(new URL('redirect/', root))}`);

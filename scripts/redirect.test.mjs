import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { redirectDestination } from '../redirect/redirect.js';

const root = new URL('../', import.meta.url);
const base = 'https://hitenjadeja.github.io/the-build-bench/';

test('legacy search, name sort, repeated filters, and catalog anchor survive redirect', () => {
  const query = '?q=AI-DLC+Workflows&sort=name-desc&availability=open-source&availability=internal';
  assert.equal(redirectDestination(`https://hitenjadeja.github.io/world-of-harnesses/${query}#catalog`), `${base}${query}#directory-results`);
});

test('anchors map, deep paths go home, and query cannot change destination', () => {
  assert.equal(redirectDestination('https://example.com/old#main-content'), `${base}#top`);
  assert.equal(redirectDestination('https://example.com/old#method'), `${base}#method-heading`);
  assert.equal(redirectDestination('https://example.com/old#custom'), `${base}#custom`);
  assert.equal(redirectDestination('https://example.com/nested/missing.html'), base);
  assert.equal(new URL(redirectDestination('https://example.com/?url=https://evil.example')).origin, 'https://hitenjadeja.github.io');
});

test('prepared JSON exports retain every original byte and JSON shape', async () => {
  for (const name of await readdir(new URL('data/', root))) {
    if (!name.endsWith('.json')) continue;
    const source = await readFile(new URL(`data/${name}`, root));
    const output = await readFile(new URL(`redirect/data/${name}`, root));
    assert.deepEqual(output, source, name);
    assert.doesNotThrow(() => JSON.parse(output));
  }
});

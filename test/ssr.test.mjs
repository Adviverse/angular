import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Asserted: SSR-safe import (no window/document), and structural client-only element import.
test('imports with no window/document (SSR-safe)', async () => {
  await import('@angular/compiler'); // JIT, so decorators evaluate in plain Node
  assert.equal(typeof window, 'undefined');
  assert.equal(typeof document, 'undefined');
  const m = await import('../dist/fesm2022/adviverse-angular.mjs');
  assert.ok(m.AdviverseAdComponent && m.AdviverseAdModule);
});

test('source: renders adviverse-ad, element imported only in browser-guarded hook', () => {
  const src = readFileSync(new URL('../src/adviverse-ad.ts', import.meta.url), 'utf8');
  assert.match(src, /<adviverse-ad \[attr\.tag\]="tag" \[attr\.sizes\]="sizes">/);
  assert.match(src, /standalone: true/);
  assert.match(src, /CUSTOM_ELEMENTS_SCHEMA/);
  assert.doesNotMatch(src, /^import .*@adviverse\/element/m);
  assert.match(src, /isPlatformBrowser\(this\.platformId\)\) void import\('@adviverse\/element'\)/);
});

test('dist is partial-Ivy (AOT-compatible), not raw decorators', () => {
  const out = readFileSync(new URL('../dist/fesm2022/adviverse-angular.mjs', import.meta.url), 'utf8');
  assert.match(out, /ɵɵngDeclareComponent/);
  assert.doesNotMatch(out, /^@Component/m);
});

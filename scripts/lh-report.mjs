// Краткий отчёт по lighthouse json: node scripts/lh-report.mjs <path.json>
import { readFileSync } from 'node:fs';

const r = JSON.parse(readFileSync(process.argv[2], 'utf8'));
const c = r.categories;
console.log(
  'perf:', Math.round(c.performance.score * 100),
  '| a11y:', Math.round(c.accessibility.score * 100),
  '| bp:', Math.round(c['best-practices'].score * 100),
  '| seo:', Math.round(c.seo.score * 100),
);
console.log(
  'LCP:', r.audits['largest-contentful-paint'].displayValue,
  '| TBT:', r.audits['total-blocking-time'].displayValue,
  '| CLS:', r.audits['cumulative-layout-shift'].displayValue,
  '| FCP:', r.audits['first-contentful-paint'].displayValue,
);
const failing = Object.values(r.audits).filter(
  (a) => a.score !== null && a.score < 0.9 && a.scoreDisplayMode === 'binary',
);
for (const a of failing) console.log('FAIL:', a.id, '—', a.title);
const lcpEl = r.audits['largest-contentful-paint-element']?.details?.items?.[0]?.items?.[0]?.node?.snippet;
if (lcpEl) console.log('LCP element:', lcpEl.slice(0, 120));

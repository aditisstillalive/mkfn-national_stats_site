// Hands in Angka Nusantara, a national statistics site for Indonesia (Node 22, standard library only).
//
// The site is app/: static HTML, CSS and ES modules with no build step, its data held in its own files, so nothing it
// runs, styles or shows comes over the network. This program copies app/ and screenshots/ into the output directory
// (/output in the grader, or MAKEFUN_OUTPUT_DIR elsewhere) and writes dossier.json with the kit's unchanged
// buildDossier, which the gate rebuilds and compares byte for byte. It reads nothing but this repository and writes
// the same bytes on every run.
//
//   node serve.ts                                   # view the site at http://localhost:8080
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const repoRoot = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The scorer's caps: 160 KiB of source text, 3–4 screenshots of at most 256 KiB, and app/ within 993 entries, 16 MiB.
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function copyDirectory(name: string): void {
  const from = join(repoRoot, name);
  mkdirSync(join(outputDir, name), { recursive: true });
  if (existsSync(from)) cpSync(from, join(outputDir, name), { recursive: true });
}

function countScreenshots(): number {
  const dir = join(repoRoot, 'screenshots');
  return existsSync(dir) ? readdirSync(dir).filter((f) => /\.(png|jpe?g)$/i.test(f) && !f.startsWith('.')).length : 0;
}

mkdirSync(outputDir, { recursive: true });
copyDirectory('app');
copyDirectory('screenshots');
const shots = countScreenshots();
if (shots < 3 || shots > CAPS.screenshots.max) {
  console.warn(`screenshots/ holds ${shots} images; the gate wants 3 or 4.`);
}
writeFileSync(join(outputDir, 'dossier.json'), buildDossier(outputDir, CAPS));

import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = f => readFileSync(join(ROOT, f), "utf8");
const html = read("index.html"), css = read("styles.css"), js = read("app.js");
const SITE = "https://robertpezdirc8-prog.github.io/river-kolpa-apartments/";
const MAX_KB = { tile: 220, full: 420, font: 60 };

const ok = [], bad = [];
const pass = m => ok.push(m);
const fail = m => bad.push(m);
const need = (cond, msg) => (cond ? pass : fail)(msg);

/* 1. JS se mora razčleniti — brez izvajanja */
try { new vm.Script(js); pass("app.js se razčleni"); }
catch (e) { fail(`app.js: ${e.message}`); }

/* 2. vsaka dobesedna pot do datoteke mora obstajati */
const refs = new Set();
for (const src of [html, css, js])
  for (const m of src.matchAll(/assets\/[\w-]+\.[a-z]{3,4}/g)) refs.add(m[0]);
for (const r of refs) need(existsSync(join(ROOT, r)), r + " obstaja");

/* 3. vsaka fotografija v GAL mora imeti izvirnik, ploščico in rezervo v jpg */
const names = [...js.matchAll(/\{f:"([\w-]+)"/g)].map(m => m[1]);
need(names.length > 20, `GAL našel ${names.length} fotografij`);
for (const n of new Set(names)) {
  need(existsSync(join(ROOT, `assets/${n}.webp`)), `${n}: izvirnik`);
  need(existsSync(join(ROOT, `assets/t/${n}.webp`)), `${n}: ploščica za srcset`);
  need(existsSync(join(ROOT, `assets/${n}.jpg`)), `${n}: rezerva .jpg`);
}

/* 4. glava mora govoriti resnico o naslovu, sicer predogled na Facebooku odpove */
const esc = SITE.replace(/[/.]/g, "\\$&");
need(new RegExp(`rel="canonical" href="${esc}"`).test(html), "canonical je absoluten");
need(new RegExp(`property="og:url" content="${esc}"`).test(html), "og:url je absoluten");
need(new RegExp(`property="og:image" content="${esc}assets/[\\w-]+\\.jpg"`).test(html), "og:image je absoluten in obstaja");
need(/"url":"https:/.test(html), "JSON-LD ima absoluten url");

/* 5. teža: ena prevelika ploščica pojede ves prihranek */
for (const f of readdirSync(join(ROOT, "assets/t")))
  need(statSync(join(ROOT, "assets/t", f)).size / 1024 <= MAX_KB.tile, `ploscica ${f} ≤ ${MAX_KB.tile} kB`);
for (const f of readdirSync(join(ROOT, "assets")).filter(x => /\.(webp|jpg)$/.test(x)))
  need(statSync(join(ROOT, "assets", f)).size / 1024 <= MAX_KB.full, `slika ${f} ≤ ${MAX_KB.full} kB`);

/* 6. thing, ki ga Pages pokvari: relativna pot do sredstva v glavi */
need(/href="styles\.css"/.test(html), "slovnica je relativna (mora biti, zaradi podpoti Pages)");
need(/href="fonts\.css"/.test(html), "fonts.css je priklopljen");
need(existsSync(join(ROOT, ".nojekyll")), ".nojekyll prisoten");

/* 7. pisave morajo biti gostovane doma: obiskovalec sme za podatki o sebi povpraševati le pri nas */
for (const host of ["fonts.googleapis.com", "fonts.gstatic.com"])
  need(![html, css, js].some(s => s.includes(host)), `nobena referenca na ${host}`);
const fcss = read("fonts.css");
const used = new Set([...fcss.matchAll(/url\("(fonts\/[^"]+)"\)/g)].map(m => m[1]));
need(used.size >= 4, `fonts.css napove ${used.size} datotek`);
for (const u of used) {
  const p = join(ROOT, u);
  need(existsSync(p), u + " obstaja");
  if (!existsSync(p)) continue;
  const buf = readFileSync(p);
  /* pravi začetni bajti so edini dokaz, da git ali kak prepisovalec ni pokvaril binarne datoteke */
  need(buf.subarray(0, 4).toString("latin1") === "wOF2", `${u}: veljavna glava woff2`);
  need(buf.length / 1024 <= MAX_KB.font, `${u} ≤ ${MAX_KB.font} kB`);
}
const onDisk = readdirSync(join(ROOT, "fonts")).filter(f => f.endsWith(".woff2"));
for (const f of onDisk) need(used.has(`fonts/${f}`), `fonts/${f} je v fonts.css napovedana`);
need(onDisk.length > 0 && readdirSync(join(ROOT, "fonts")).some(f => /^OFL-.*\.txt$/.test(f)),
  "licenca OFL je priložena pisavam");
for (const m of html.matchAll(/rel="preload"[^>]*href="([\w./-]+\.woff2)"/g))
  need(existsSync(join(ROOT, m[1])), `prednaložena ${m[1]} obstaja`);

console.log(ok.map(m => "  OK  " + m).join("\n"));
if (bad.length) console.log("\n" + bad.map(m => "  NAP " + m).join("\n"));
console.log(bad.length ? `\nZAPRT: ${bad.length} napak` : `\nODPRTO: ${ok.length} preizkusov uspelo`);
process.exit(bad.length ? 1 : 0);

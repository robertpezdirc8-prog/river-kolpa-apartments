import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
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

/* 8. ista fotografija pod dvema imenoma — napaka, ki jo je lastnik že prijavil. Oko je ne
      vidi na hitro, prstni odtisk vsebine pa: dve datoteki z enakimi bajti, od njiju ena laže. */
const digest = f => createHash("md5").update(readFileSync(join(ROOT, f))).digest("hex");
const byHash = new Map();
const allImgs = [
  ...readdirSync(join(ROOT, "assets")).filter(x => /\.(webp|jpg)$/.test(x)).map(x => `assets/${x}`),
  ...readdirSync(join(ROOT, "assets/t")).map(x => `assets/t/${x}`)
];
for (const f of allImgs) {
  const h = digest(f);
  if (byHash.has(h)) fail(`enaka vsebina v dveh datotekah: ${byHash.get(h)} in ${f}`);
  else byHash.set(h, f);
}
need(byHash.size === allImgs.length, `${allImgs.length} fotografij, nobena se ne podvaja po vsebini`);

const cards = [...js.matchAll(/<article class="unit">([\s\S]*?)<\/article>/g)].map(m => m[1]);
need(cards.length === 2, `uporabnik vidi ${cards.length} kartic enot`);
const cardImgs = cards.map(c => (c.match(/img\("([\w-]+)"/) || [])[1]);
need(cardImgs.every(Boolean), "obe kartici enot imata sliko");
need(new Set(cardImgs.map(n => digest(`assets/${n}.webp`))).size === cardImgs.length,
  `sliki na karticah enot nista ista fotografija (${cardImgs.join(", ")})`);
for (const c of cards) need(/class="unit-cap"/.test(c), "kartica enote ima napis, kaj slika prikazuje");

/* 9. stran oglašuje dva naslova v Gribljah. Kadar ena lokacija izgubi slike ali svoj pogled,
      gost v meniju vidi prazen naslov — zato se mora pogodba med podatki in pogledi preizkusiti. */
const galE = [...js.matchAll(/\{f:"([\w-]+)",\s*g:"([\w-]+)"(?:,\s*lok:"([\w-]+)")?/g)]
  .map(m => ({ f: m[1], g: m[2], lok: m[3] || "70" }));
need(galE.length === names.length, `vseh ${names.length} fotografij je razčlenjenih z oznako vsebine`);

const lokiSrc = (js.match(/const LOKI = \[[\s\S]*?\n\];/) || [""])[0];
const loki = [...lokiSrc.matchAll(/id:\s*"([\w-]+)",\s*naslov:\s*"([^"]+)",\s*pogled:\s*"([\w-]+)"/g)]
  .map(m => ({ id: m[1], naslov: m[2], pogled: m[3] }));
need(loki.length === 2, `ponudba ima ${loki.length} naslova`);

const znani = new Set([...loki.map(l => l.id), "reka"]);
for (const g of galE) need(znani.has(g.lok), `${g.f}: lokacija "${g.lok}" je napovedana v LOKI`);

for (const l of loki) {
  const n = galE.filter(g => g.lok === l.id).length;
  need(n >= 6, `${l.naslov} ima ${n} fotografij v arhivu`);
  need(new RegExp(`\\b${l.pogled}:\\s*\\{`).test(js), `${l.naslov}: pogled "${l.pogled}" obstaja`);
  const o = (js.match(/const ORDER = \[([^\]]*)\]/) || ["", ""])[1];
  need(o.includes(`"${l.pogled}"`), `${l.naslov} je v glavnem meniju`);
}

const vArhivu = new Set(galE.map(g => g.f));
for (const m of lokiSrc.matchAll(/(?:zunanja|notranja):\s*\[([^\]]*)\]/g))
  for (const n of m[1].split(",").map(s => s.trim().replace(/^"|"$/g, "")).filter(Boolean))
    need(vArhivu.has(n), `kartica lokacije kaže na ${n}, ki je v arhivu`);
for (const m of lokiSrc.matchAll(/slika:\s*"([\w-]+)"/g))
  need(vArhivu.has(m[1]), `naslovna fotografija lokacije ${m[1]} je v arhivu`);

/* Na naslovu 30 b števila oseb ne poznamo, zato ga ne sme izgovoriti nobena vrstica,
   ki ga opisuje — ne zapis lokacije, ne podpis fotografije, ne besedilo pogleda. */
const o30 = [
  (lokiSrc.match(/id:\s*"30b"[\s\S]*?\n  \}/) || [""])[0],
  ...(js.match(/\{f:"[\w-]+",\s*g:"[\w-]+",\s*lok:"30b",[^\n]*/g) || []),
  (js.match(/\n  p30:\s*\{[\s\S]*?\n  \},/) || [""])[0]
].join("\n");
need(o30.length > 200 && !/\boseb\b/i.test(o30), "30 b ne navaja števila oseb");
need(/dva samostojna apartmaja/i.test(o30), "30 b je zapisana kot dva apartmaja");

/* Kopalnico sme obljubiti samo hiša, katere kopalnica je tudi fotografirana. Kar gost ne more
   videti, ne sme biti napisano samostojno — sicer strani verjame tisto, česar ne vemo. */
for (const l of loki) {
  const pogled = (js.match(new RegExp(`\\n  ${l.pogled}:\\s*\\{[\\s\\S]*?\\n  \\},`)) || [""])[0];
  const zapis = (lokiSrc.match(new RegExp(`id:\\s*"${l.id}"[\\s\\S]*?\\n  \\}`)) || [""])[0];
  const dokaz = galE.some(g => g.lok === l.id && /kopalnic/i.test(g.f + " " + g.t));
  const obljuba = /kopalnic/i.test(pogled + zapis);
  need(!obljuba || dokaz,
    `${l.naslov}: kopalnica je ${obljuba ? "obljubljena" : "neobljubljena"} in ${dokaz ? "fotografirana" : "nefotografirana"}`);
}

/* Identifikacija ponudnika v nogi je pravni podatek, ne okras. Vpis v poslovnem registru
   (AJPES, izpostava Novo mesto): LOGIS APARTMENTS, Majda Pezdirc s.p., Griblje 30 B, 8332
   Gradac — matična 9057641000, davčna SI97033910. Številka podružnice ni številka subjekta. */
need(/matična št\. 9057641000/.test(html), "noga navaja matično številko subjekta 9057641000");
need(/davčna št\. SI97033910/.test(html), "noga navaja davčno številko SI97033910");
need(!/9057641002/.test(html), "v nogi ni matične številke podružnice namesto številke subjekta");

const opcije = (js.match(/const ENOTE_OPTS = \[([\s\S]*?)\n\];/) || ["", ""])[1];
for (const l of loki) need(opcije.includes(l.naslov), `obrazec ponuja enote na naslovu ${l.naslov}`);

/* Isti obrazec ponuja "oba apartmaja" in vpraša za število oseb. Če se number sklene
   pred vsoto enot, devetčlanska skupina ne more oddati povpraševanja. */
const osebMeja = +(js.match(/const OSEBE_MAX = (\d+)/) || [])[1];
need(osebMeja >= 12, `polje za osebe sega do ${osebMeja}, kar pokrije 7 + 5`);
need(/več kot \$\{OSEBE_MAX\}/.test(js), "skupina nad mejo lahko to napiše, namesto da utone");
need(/b\.dataset\.lok !== galLok/.test(js), "galerija filtrira hkrati po vsebini in po lokaciji");
need(/id="galEmpty"/.test(js) && /class="gal-empty"/.test(js), "prazna kombinacija filtrov je napovedana");

/* Na ozkem zaslonu je meni ena drsna vrstica: odprtje pogleda mora pripeljati aktivni gumb
   v vidno polje, rob pa mora napovedati, da se za njim še kaj nadaljuje. */
need(/odpriNaAktivnem\(nav\)/.test(js), "odprt pogled pripelje aktivni gumb v vidno polje");
need(/\.nav\.ima-desno/.test(css) && /"ima-desno"/.test(js), "drsna vrstica napove, da se nadaljuje za robom");
need(/if \(!a\)[\s\S]{0,220}left: 0/.test(js), "meni se brez aktivnega gumba vrne na začetek");
const zbled = Number((js.match(/const ZBLED = (\d+)/) || [])[1]);
need(zbled > 0 && css.includes(`calc(100% - ${zbled}px)`), `drsenje upošteva enak rob, kot ga zbledi css (${zbled} px)`);

/* Razred "on" je barva, ki je bralnik zaslona ne vidi — odprt pogled mora v meniju nositi
   tudi aria-current, sicer poslušec ne ve, kje je. */
need(/nav\.querySelectorAll\("button"\)[\s\S]{0,300}setAttribute\("aria-current", "page"\)[\s\S]{0,120}removeAttribute\("aria-current"\)/.test(js),
  "meni bralniku pove, kateri pogled je odprt, in oznako tudi odstrani");

/* Meni je na telefonu najpogostejši gib, a gumbi so podedovali namizno višino 34 px.
   Cilj za prst ima spodnjo mejo, sicer je meni najmanjši gumb na strani. */
const pasPrst = (css.match(/@media \(max-width:900px\)\{([\s\S]*?)\n\}/) || ["", ""])[1];
const gumbiPrst = [...pasPrst.matchAll(/\.nav button\s*\{([^}]*)\}/g)].map(m => m[1]);
const tabiPrst = [...pasPrst.matchAll(/\.tab\s*\{([^}]*)\}/g)].map(m => m[1]);
const vsaj44 = (pravila) => pravila.some(v => /min-height:\s*(4[4-9]|[5-9]\d)px/.test(v)) &&
  !pravila.some(v => /min-height:\s*\d+px/.test(v) && !/min-height:\s*(4[4-9]|[5-9]\d)px/.test(v));
need(vsaj44(gumbiPrst), "meni ima na telefonu gumb, visok vsaj 44 px");
need(gumbiPrst.some(v => /align-items:center/.test(v)),
  "meni pri višini 44 px obdrži besedilo v sredini gumba");
need(vsaj44(tabiPrst), "zavihki enot imajo na telefonu gumb, visok vsaj 44 px");

/* Glava se na ožjih zaslonih zlomi v dva pasu, zato mora odmik vsebine slediti njeni izmerjeni
   višini, ne oceni. Stalna vrednost je v preteklosti vsebino potisnila pod meni. */
const odmiki = [...css.matchAll(/\.view\s*\{[^}]*padding(?:-top)?\s*:\s*([^;}]+)/g)].map(m => m[1]);
need(odmiki.length >= 3 && odmiki.every(v => /var\(--tb/.test(v)),
  `vsi ${odmiki.length} odmiki vsebine pod glavo se merijo po njeni izmerjeni višini`);
need(/\.nav button\{[\s\S]{0,240}white-space:nowrap/.test(css), "napisi v meniju se ne prelomijo na dve vrsti");
need(/\.place\{[^}]*grid-template-rows:\s*minmax\(150px/.test(css), "fotografija na kartici hiše se ne stisne pod 150 px");

/* Identifikacija ponudnika je pravni podatek: če ne ustre v vrstico, se prelomi, ne skrajša. */
need(!/\.foot-right \.legal\{[^}]*text-overflow:\s*ellipsis/.test(css), "identifikacija ponudnika se ne reže s tripičjem");
need(/Ponudnik:\s*LOGIS APARTMENTS/.test(html), "noga označi LOGIS APARTMENTS kot ime ponudnika");

/* V kad se kade, na terasi pa je jacuzzi. Ime datoteke ostane, ker povezuje kodo s sliko na disku;
   vse, kar je napisano obiskovalcu, mora govoriti o jacuzziju. */
const vidno = js.replace(/\bf:\s*"[a-z0-9-]+"/g, "") + html;
need(!/masažn|\bkad\b|kadjo/i.test(vidno), "vidno besedilo več ne omenja masažne kadi");
need(/jacuzzi/i.test(js) && /jacuzzi/i.test(html), "obe datoteki govorita o jacuzziju");

/* Beseda, ki se drugje piše s č, š ali ž, brez šumnikov je videti kot tipkarski spodrsljaj,
   ne kot poenostavitev. Dovoljene so samo besede, ki so tudi brez šumnikov pravilna slovenska
   beseda: se (sklonitev), vas (množina vasi), konca (rodilnik besede konec). */
const SUMNIKI = (w) => w.replace(/č/g, "c").replace(/š/g, "s").replace(/ž/g, "z");
const DRUGACE = new Map();
const VIRI = [["app.js", js], ["index.html", html], ["styles.css", css]];
for (const [, vir] of VIRI) {
  for (const b of vir.split(/[^\p{L}]+/u)) {
    if (b && /[ČŠŽčšž]/.test(b)) DRUGACE.set(SUMNIKI(b).toLowerCase(), b);
  }
}
const DOVOLJENE = new Set(["se", "vas", "konca"]);
const brezSumnikov = [];
for (const [ime, vir] of VIRI) {
  for (const b of vir.split(/[^\p{L}]+/u)) {
    const k = b && b.toLowerCase();
    if (!k || /[ČŠŽčšž]/.test(b) || !DRUGACE.has(k) || DOVOLJENE.has(k)) continue;
    brezSumnikov.push(`${ime}: ${b} namesto ${DRUGACE.get(k)}`);
  }
}
need(brezSumnikov.length === 0,
  `nobena beseda ne izgubi šumnikov${brezSumnikov.length ? " — " + [...new Set(brezSumnikov)].slice(0, 4).join(", ") : ""}`);

/* Primerjava zgoraj ujame samo besede, ki se drugje pišejo s šumniki. Besede, ki nastopijo
   enkrat same, mora varovati seznam: to so spodrsljaji, ki smo jih že pobrisali. */
const PONOVLJENI = ["blizina", "ozje", "garazo"];
const vrnjeni = PONOVLJENI.filter(b => new RegExp(`\\b${b}\\b`, "i").test(js + html + css));
need(vrnjeni.length === 0, `popravljenih napak ni nazaj${vrnjeni.length ? " — " + vrnjeni.join(", ") : ""}`);

/* 10. glava mora obljubiti obe nastanitvi, sicer delitelj na Facebooku pokaže staro ponudbo */
need((html.match(/"@type":"LodgingBusiness"/g) || []).length === loki.length,
  `JSON-LD napove ${loki.length} nastanitvi`);
for (const l of loki) need(html.includes(l.naslov), `glava vsebuje naslov ${l.naslov}`);
need((html.match(/GeoCoordinates/g) || []).length === 1,
  "geografske koordinate ima samo naslov, ki jih ima potrjene");

console.log(ok.map(m => "  OK  " + m).join("\n"));
if (bad.length) console.log("\n" + bad.map(m => "  NAP " + m).join("\n"));
console.log(bad.length ? `\nZAPRT: ${bad.length} napak` : `\nODPRTO: ${ok.length} preizkusov uspelo`);
process.exit(bad.length ? 1 : 0);

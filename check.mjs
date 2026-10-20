import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = dirname(fileURLToPath(import.meta.url));
const read = f => readFileSync(join(ROOT, f), "utf8");
const html = read("index.html"), css = read("styles.css"), js = read("app.js"), jez = read("jeziki.js");
const SITE = "https://robertpezdirc8-prog.github.io/river-kolpa-apartments/";
const MAX_KB = { tile: 220, full: 420, font: 60 };

const ok = [], bad = [];
const pass = m => ok.push(m);
const fail = m => bad.push(m);
const need = (cond, msg) => (cond ? pass : fail)(msg);

/* 1. JS se mora razčleniti — brez izvajanja */
for (const [dat, vir] of [["app.js", js], ["jeziki.js", jez]]) {
  try { new vm.Script(vir); pass(`${dat} se razčleni`); }
  catch (e) { fail(`${dat}: ${e.message}`); }
}

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
   vse, kar je napisano obiskovalcu, mora govoriti o jacuzziju. Prevoda sta besedilo, ki ga
   gost vidi enako kot slovenščina, zato spadata v isti pregled. */
const izbrisiSlike = (s) => s.replace(/\bf:\s*"[a-z0-9-]+"/g, "");
const vidno = izbrisiSlike(js) + izbrisiSlike(jez) + html;
need(!/masažn|\bkad\b|kadjo/i.test(vidno), "vidno besedilo več ne omenja masažne kadi");
need(/jacuzzi/i.test(js) && /jacuzzi/i.test(html), "obe datoteki govorita o jacuzziju");

/* Parkirišče je odprt prostor za avto, garaža zaprt. Gostje imajo parkirišče, garaže pa ne,
   zato beseda ne sme nastopiti v nobeni trditvi. Ime datoteke na disku je lahko tudi takšno,
   ker samo povezuje kodo s fotografijo — to je že zgoraj izvzeto iz `vidno`. */
need(!/gara[žz]/i.test(vidno), "vidno besedilo ne obljublja garaže");
need(/parkiri[sš][cč]/i.test(js) && /parkiri[sš][cč]/i.test(html),
  "obe datoteki obljubita parkirišče, ne garaže");

/* Stran oglašuje samo našo ponudbo. Imena drugih ponudnikov in njihovih znamenitosti so
   reklama zanje — gost jih najde sam, mi pa ne smemo voziti prometa na njihov račun.
   Seznam je enaka varovalka kot prepoved garaže: če ime zopet pride v besedilo, se vrata
   zaprejo. V pogledu Okolica je pod karticami stal seznam razdalj do njih — niti CSS ga ne
   sme več poznati, sicer se vrne skupaj z razredom, ki ga nihče več ne uporablja. */
const TUJE = ["Gostilna Kapušin", "Martinkova domačija", "Trčkova domačija", "Stoničev grad",
  "Maleričeva hiša", "grad Pobrežje", "najdišče Kučar", "Stari mlin", "letalo DC-3"];
for (const t of TUJE) need(!vidno.includes(t), `vidno besedilo ne omenja drugega ponudnika (${t})`);
need(!/class="distlist"/.test(js) && !/\.distlist/.test(css),
  "seznama razdalj do drugih ponudnikov ni ne v kodi ne v slogu");

/* Vsaka zunanja povezava mora voditi na našo ponudbo: lastna objava na Bookingu, lastni
   Facebook, zemljevid naših naslovov, WhatsApp in e-pošta — plus identifikatorji shem, ki jih
   bere le stroj. Tuja domena pomeni, da stran pripelje goste nekemu drugemu. */
const SVOJI = ["wa.me", "booking.com/hotel/si/holiday-house-kolpa", "google.com/maps",
  "robertpezdirc8-prog.github.io", "facebook.com/p/RIVER-KOLPA", "schema.org", "w3.org"];
const povezave = [...new Set(`${js}\n${jez}\n${html}`.match(/https?:\/\/[^\s"'()<>]+/g) || [])];
const tujePovezave = povezave.filter((u) => !SVOJI.some((s) => u.includes(s)));
need(tujePovezave.length === 0,
  `nobena od ${povezave.length} zunanjih povezav ne vodi na tujo ponudbo` +
  (tujePovezave.length ? ` (najdeno: ${tujePovezave.join(", ")})` : ""));

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
   enkrat same, mora varovati seznam: to so spodrsljaji, ki smo jih že pobrisali. Slovene
   ključi slovarja so isti napis, ki ga vidi gost, zato pregled vključuje tudi jezikovno datoteko. */
const PONOVLJENI = ["blizina", "ozje"];
const vrnjeni = PONOVLJENI.filter(b => new RegExp(`\\b${b}\\b`, "i").test(js + jez + html + css));
need(vrnjeni.length === 0, `popravljenih napak ni nazaj${vrnjeni.length ? " — " + vrnjeni.join(", ") : ""}`);

/* ── 10. jezikovna prevajalna plast ───────────────────────────────
   Predloge ostanejo slovenske, prevedene so samo besede, ki jih vidi gost. Ker se ključi
   berejo iz slovarja in ne iz predlog, je celotno verigo mogoče preveriti pred izpisom:
   ključ, ki ga koda nikoli ne zapiše, je mrtav; napis, ki ga koda zapiše, slovar pa ga ne
   pozna, pa gostu ostane v slovenščini. Oboje je tu zajeto. */
const SLOVAR = (ime) => {
  const zaj = jez.match(new RegExp(`const ${ime} = \\{([\\s\\S]*?)\\n\\};`));
  if (!zaj) return null;
  try { return vm.runInNewContext("({" + zaj[1] + "})"); } catch (e) { return null; }
};
const KJ = (ime) => {
  const zaj = jez.match(new RegExp(`const ${ime} = \\{([\\s\\S]*?)\\n\\};`));
  if (!zaj) return [];
  return [...zaj[1].matchAll(/^[ \t]*"((?:[^"\\]|\\.)*)"[ \t]*:/gm)].map(m => m[1]);
};
/* Napis, ki ga zavrne že sam mehanizem, ne more imeti prevoda: take ključe je treba
   pobrisati, sicer ustvarjajo lažen občutek pokritosti. */
const vztraj = jez.match(/const NEVED = \[([\s\S]*?)\n  \];/);
const PRESKOC = vztraj ? vm.runInNewContext("[" + vztraj[1] + "]") : [];
const DE = SLOVAR("DE_JEZIK"), EN = SLOVAR("EN_JEZIK");
need(!!DE && !!EN, "oba slovarja se razčlenita kot predmet s samimi besedili");
if (DE && EN) {
  const normal = (s) => s.replace(/\s+/g, " ").trim();
  const kd = KJ("DE_JEZIK"), ke = KJ("EN_JEZIK");
  need(kd.length === Object.keys(DE).length && ke.length === Object.keys(EN).length,
    `v slovarjih se noben ključ ne podvaja (nemški ${kd.length}, angleški ${ke.length})`);
  need(kd.length >= 150 && ke.length >= 150,
    `nemški slovar ima ${kd.length}, angleški ${ke.length} napisov`);

  const vsi = [...new Set([...kd, ...ke])];
  const manjkajoco = vsi.filter(k => !Object.hasOwn(DE, k) || !Object.hasOwn(EN, k));
  need(manjkajoco.length === 0, `oba jezika pokrijeta enak seznam napisov` +
    (manjkajoco.length ? ` — manjka: ${manjkajoco.slice(0, 3).join(" | ")}` : ""));

  /* Ključ se išče po normaliziranem napisu; če ima on sam odvečen presledek, ga nikoli
     ni mogoče najti, prevajalnik pa molči. */
  const umazani = vsi.filter(k => normal(k) !== k);
  need(umazani.length === 0, `ključi so brez odvečnih presledkov` +
    (umazani.length ? ` — ${umazani.slice(0, 3).map(k => JSON.stringify(k)).join(" | ")}` : ""));

  /* Vsak ključ mora biti dobesedno tisti napis, ki ga predloga zapiše, sicer je slovar
     napisal kdo iz misli in prevod na strani nikoli ne zaživi. Dolg stavek je v kodi lahko
     sestavljen iz več dobesedij, zapetih z "+", izpisana besedilna vrsta pa je ena sama —
     zato pred iskanjem združimo vejice sestavljanja. Konstante, ki so v kodi zapisane
     dobesedno, nadomestimo z njihovo vrednostjo: "več kot ${OSEBE_MAX}" se izpiše kot
     "več kot 12". Dvigne-li lastnik mejo, mora slediti tudi slovar, sicer vrata ostanejo zaprta. */
  const KONST = [...js.matchAll(/const ([A-Z_][A-Z0-9_]*) = ("[^"]*"|\d+(?:\.\d+)?);/g)];
  need(KONST.some(m => m[1] === "OSEBE_MAX"), "izvor pozna dobesedno mejo za osebe");
  let izvor = [js, html, css].join("\n").replace(/["']\s*\+\s*["']/g, "");
  for (const [, ime, vred] of KONST) izvor = izvor.split("${" + ime + "}").join(vred.replace(/^"|"$/g, ""));
  const VIR_SLO = normal(izvor);
  const brezVira = vsi.filter(k => !VIR_SLO.includes(normal(k)));
  need(brezVira.length === 0, `vseh ${vsi.length} ključev je v slovenski predlogi` +
    (brezVira.length ? ` — ne najdem: ${brezVira.slice(0, 3).join(" | ")}` : ""));

  need(PRESKOC.length >= 5, `mehanizem pozna ${PRESKOC.length} vzorcev, ki jih preskoči`);
  const mrtvi = vsi.filter(k => PRESKOC.some(re => re.test(normal(k))));
  need(mrtvi.length === 0, `noben ključ ne stoji za vzorcem, ki ga prevajalnik preskoči` +
    (mrtvi.length ? ` — ${mrtvi.slice(0, 3).join(" | ")}` : ""));

  /* Jacuzzi je na terasi, ne v kopalnici, in pri nas se vedno imenuje jacuzzi. V tujem jeziku
     ne sme zamočiti na "kad", "masažno kad" ali "hot tub": seznam je zapisan eksplicitno, ker
     sta "bathroom" in "bathing spot" (kopalnica, naravno kopališče) na strani zakonita. */
  const TUJE_ZA_JACUZZI = /(Badewanne|Massagebad|Whirlpool|hot ?tub|bathtub|\bkad\b|masažn)/i;
  const zamenjano = [];
  for (const [ime, o] of [["nemški", DE], ["angleški", EN]])
    for (const [k, v] of Object.entries(o))
      if (typeof v === "string" && TUJE_ZA_JACUZZI.test(v)) zamenjano.push(`${ime}: ${k} → ${v}`);
  need(zamenjano.length === 0, "jacuzzi ostane jacuzzi v vsakem jeziku" +
    (zamenjano.length ? ` — ${zamenjano.slice(0, 2).join(" | ")}` : ""));

  /* "Kontakt" in "Kanu" se v nemščini pišeta enako kot v slovenščini, "jacuzzi" pa v angleščini.
     Izjema je kratka namenoma: vse drugo, kar ponovi slovenski napis, je sumljivo. */
  const ENAKO = new Set(["de:Kontakt", "de:Kanu", "en:jacuzzi"]);
  const odvec = [...ENAKO].filter((z) => {
    const [koda, k] = z.split(":");
    const o = koda === "de" ? DE : EN;
    return !o || normal(o[k]) !== normal(k);
  });
  need(odvec.length === 0, `izjema za enak prevod ne pokriva napisa, ki je v resnici preveden` +
    (odvec.length ? ` — ${odvec.join(" | ")}` : ""));
  for (const [ime, koda, o] of [["nemški", "de", DE], ["angleški", "en", EN]]) {
    const prazni = Object.entries(o).filter(([, v]) => typeof v !== "string" || normal(v) === "");
    const ponovljeni = Object.entries(o).filter(([k, v]) => normal(v) === normal(k) && !ENAKO.has(koda + ":" + k));
    const robovi = Object.entries(o).filter(([, v]) => typeof v === "string" && normal(v) !== v);
    need(prazni.length === 0, `${ime} slovar nima praznega prevoda` +
      (prazni.length ? ` — ${prazni.slice(0, 3).map(([k]) => k).join(" | ")}` : ""));
    need(ponovljeni.length === 0, `${ime} prevod nikoli ne ponovi slovenskega napisa` +
      (ponovljeni.length ? ` — ${ponovljeni.slice(0, 3).map(([k]) => k).join(" | ")}` : ""));
    need(robovi.length === 0, `${ime} prevodi so čisti na robovih in v sredini` +
      (robovi.length ? ` — ${robovi.slice(0, 3).map(([k]) => k).join(" | ")}` : ""));
  }

  /* Naslov zavihka je navadno besedilno vozlišče v glavi, zato ga opazovalec prevede sam —
     a samo tedaj, kadar ima slovar tudi te napise. */
  const nazivi = [...js.matchAll(/title:\s*"([^"]+)"/g)].map(m => m[1]);
  const brezNaziva = nazivi.filter(t => !Object.hasOwn(DE, t) || !Object.hasOwn(EN, t));
  need(nazivi.length >= 8 && brezNaziva.length === 0,
    `vsi ${nazivi.length} naslovi zavihka imata prevod` +
    (brezNaziva.length ? ` — manjka: ${brezNaziva.join(" | ")}` : ""));

  /* Atributi, ki jih gost vidi (alt, aria-label, placeholder, title), so napisi tako kot
     besedilo in morajo biti v obeh slovarjih — ali pa jih mehanizem spusti čez vzorec.
     Predlogi z razčlenjevanjem (${...}) tu ne moremo slediti, zato jih spustimo. */
  const atributni = [...new Set([...(js + "\n" + html).matchAll(/(?:alt|aria-label|placeholder|title)="([^"]+)"/g)].map(m => m[1]))]
    .filter(v => !v.includes("${") && /[A-Za-zÀ-ž]/.test(v));
  const brezAtributa = atributni.filter(v =>
    !Object.hasOwn(DE, v) && !Object.hasOwn(EN, v) && !PRESKOC.some(re => re.test(v)));
  need(atributni.length >= 10 && brezAtributa.length === 0,
    `vsi ${atributni.length} vidnih atributov sta v slovarjih ali za vzorcem` +
    (brezAtributa.length ? ` — manjka: ${brezAtributa.slice(0, 3).join(" | ")}` : ""));

  /* Placeholder je napis na polju in ne vsebina polja: zato prevajanje atributov sme
     preskočiti le kodo in predloge, ne pa TEXTAREA, sicer vzorčno sporočilo ostane
     slovensko tudi nemškemu gostu. */
  need(/const atributi = \(el\) => \{\n    if \(PRESKOCI_ATR\.has\(el\.tagName\)\) return;/.test(jez),
    "prevajanje atributov uporablja ožji seznam preskokov kot besedilo");

  /* Podocene so številke, prevajalnik pa številk ne prevaja — a decimalno ločilo se
     razlikuje: slovenščina in nemščina pišeta vejico, angleščina piko. Gostu ne sme ostati
     "Location 8,5". Pravila ni mogoče preizkusiti čez slovar, ker se brezčrkovni napisi
     ustavijo že pred iskanjem po njem. Zato se zažene dejanski kos kode iz mehanizma, in
     sicer nad tistimi številkami, ki jih zapiše predloga. */
  const LOČILO = jez.match(/const DECIMALNA = (\/[^\n]+\/[a-z]*);/);
  const VEO = jez.match(/if \(j === "en"\) \{([\s\S]*?)\n    \}/);
  need(!!LOČILO && !!VEO, "mehanizem pozna pretvorbo decimalnega ločila za angleščino");
  if (LOČILO && VEO) {
    const številke = [...new Set([...js.matchAll(/"(\d+,\d+)"/g)].map(m => m[1]))];
    need(številke.length >= 2,
      `predloga izpiše ${številke.length} decimalni števili, da ima preizkus kaj preveriti`);
    /* Izoliran kontekst, kot pri slovarjih zgoraj: prevzame se vzorec in veja iz mehanizma,
       ne njuna parafraza, da pravilo ne ostane zeleno po izbrisanem delu kode. */
    let prevedene = null;
    try {
      prevedene = JSON.parse(vm.runInNewContext(
        "const DECIMALNA = " + LOČILO[1] + ";\n" +
        "const po_ločilu = (n) => {" + VEO[1] + "\n    return n;\n};\n" +
        "JSON.stringify(ŠTEVILKE.map(po_ločilu))", { ŠTEVILKE: številke }));
    } catch (e) { prevedene = null; }
    need(Array.isArray(prevedene) && prevedene.length === številke.length,
      "veja za angleščino se izvede brez napake");
    const pravilne = številke.map((z, i) => !!prevedene && prevedene[i] === z.replace(",", "."));
    need(pravilne.length > 0 && pravilne.every(Boolean),
      `angleščina decimalno vejico zamenja s piko` +
      (pravilne.every(Boolean) ? "" : ` — ostalo: ${številke.filter((z, i) => !pravilne[i]).join(", ")}`));
    /* Vrstni red je nosilen: brezčrkovni napisi se ustavijo pred iskanjem po slovarju,
       zato mora pretvorba teči pred tem preskokom, sicer se nikoli ne zgodi. */
    need(jez.indexOf('if (j === "en")') < jez.indexOf("if (!črke(n) ||"),
      "decimalno ločilo se pretvori pred preskokom brezčrkovnih napisov");
    /* Nemščina vejico piše tako kot slovenščina, zato sme ločilo menjati samo angleščina. */
    need(!/j === "de"[\s\S]{0,120}DECIMALNA/.test(jez),
      "mehanizem ne spreminja števil v nemščini");
  }

  /* Robna presledka predloginega napisa nista okrasna: sta ločnica do sosednjega elementa,
     npr. "<span>ob reki <em>Kolpi</em>" in "<b>Majda</b> · odgovorimo". Ključi se v slovarju
     pišejo brez njih — tako zahteva pravilo zgoraj —, zato jih mora mehanizem vrniti, sicer
     gostu dve besedi zrasteva v eno: "an derKolpa". */
  const tvegani = [...new Set([...js.matchAll(/>([A-Za-zÀ-ž][^<>]{2,40}?) <[a-zA-Z]/g)].map(m => normal(m[1])))]
    .filter(k => Object.hasOwn(DE, k));
  need(tvegani.length >= 2,
    `v predlogi je ${tvegani.length} prevedljivih napisov, ki se morajo končati s presledkom`);
  const ROB = jez.match(/return \(\/\^\\s\/[^\n]*/);
  need(!!ROB, "mehanizem ob izpisu vrne robna presledka izvirnika");
  if (ROB && tvegani.length) {
    const izpis = (napis) => vm.runInNewContext(
      "(() => { const n = normal(napis); " + ROB[0] + " })()",
      { napis, normal, slovar: DE });
    const zlit = [];
    for (const k of tvegani) {
      if (izpis(k + " ") !== DE[k] + " ") zlit.push(`konec: ${JSON.stringify(izpis(k + " "))}`);
      if (izpis(" " + k) !== " " + DE[k]) zlit.push(`začetek: ${JSON.stringify(izpis(" " + k))}`);
      if (izpis(k) !== DE[k]) zlit.push(`brez robov: ${JSON.stringify(izpis(k))}`);
    }
    need(zlit.length === 0, `noben preveden napis ne izgubi ločilnega presledka` +
      (zlit.length ? ` — ${zlit.slice(0, 3).join(" | ")}` : ""));
  }
}

/* Stikalo je edini novi kos vmesnika: trije gumbi v nogi, vsak z imenom za bralnik, ki
   vsebuje tudi napis na gumbu (WCAG 2.5.3), in označen privzeti jezik. */
need(/<html lang="sl">/.test(html), "stran se napove kot slovenska");
need(/class="langs" id="langs" role="group" aria-label="Jezik"/.test(html),
  "skupina za izbiro jezika je napovedana bralniku");
const jezikovniGumbi = [...html.matchAll(/data-jezik="([a-z]{2})" aria-pressed="(true|false)" aria-label="([^"]+)">([^<]+)<\/button>/g)]
  .map(m => ({ koda: m[1], stisnjen: m[2], metka: m[3], napis: m[4] }));
need(jezikovniGumbi.length === 3, `v nogi je ${jezikovniGumbi.length} jezikovnih gumbov`);
need(jezikovniGumbi.map(g => g.koda).join(",") === "sl,de,en",
  "gumbi ponudijo slovenščino, nemščino in angleščino v tem vrstnem redu");
need(jezikovniGumbi.filter(g => g.stisnjen === "true").map(g => g.koda).join() === "sl",
  "privzeto je označen slovenski gumb");
for (const g of jezikovniGumbi) {
  /* Oznaka jezika je začetek njegovega imena: SL / Slovenščina, DE / Deutsch, EN / English.
     Tako je napis na gumbu del imena, ki ga bere bralnik (WCAG 2.5.3), ne pa tudi beseda,
     ki bi jo morali prevajati — ime jezika v seznamu ostane vedno v svojem jeziku. */
  need(g.napis === g.koda.toUpperCase(), `gumb ${g.koda}: napis je kratka oznaka jezika`);
  need(g.metka.toLowerCase().startsWith(g.napis.toLowerCase()),
    `gumb ${g.koda}: ime za bralnik se začne z napisom na gumbu`);
  need(PRESKOC.some(re => re.test(g.metka)),
    `gumb ${g.koda}: ime jezika ("${g.metka}") ostane neprevedeno in par drži v vseh jezikih`);
}

/* Prevajalec mora teči za predlogo: sicer prvi izpis ostane nepreveden, dokler ga gost
   sam ne premakne. */
const nalozeni = [...html.matchAll(/<script src="([\w.]+)"><\/script>/g)].map(m => m[1]);
need(nalozeni.join(",") === "app.js,jeziki.js", "jeziki.js se naloži za app.js");
need(/const PRIVZET = "sl"/.test(jez), "slovenščina ostane privzeti jezik in prvi izpis");
/* Karta zapisanih izvirnikov nastane šele ob prvi spremembi, zato mora biti spremenljivka,
   ne konstanta — sicer brskalnik javi TypeError šele, ko gost prvič klikne DE. */
need(/let karta = IZV_A\.get\(el\)/.test(jez), "karta atributov je zapisljiva spremenljivka");
/* Preklop nazaj morajo napisati sami: ker predloge nikoli ne vrnemo v DOM, edino zapomnjen
   izvirnik ve, kaj je bilo na mestu pred prevodom. */
need(/if \(jezik === PRIVZET\) \{[\s\S]{0,140}n\.data = zapis\[0\]/.test(jez),
  "vrnitev v slovenščino obnovi izvirnik besedila");
need(/if \(jezik === PRIVZET\) \{[\s\S]{0,220}el\.setAttribute\(a, rec\[0\]\)/.test(jez),
  "vrnitev v slovenščino obnovi izvirnik atributa");
need(/const SLOVARJI = \{ de: DE_JEZIK, en: EN_JEZIK \}/.test(jez),
  "mehanizem nikoli ne ponudi jezika, za katerega slovarja ni");
for (const a of ["alt", "aria-label", "placeholder", "title"])
  need(new RegExp(`const ATRIBI = \\[[^\\]]*"${a}"`).test(jez), `atribut ${a} gre skozi slovar`);

/* Gumb za jezik je na telefonu najpomembnejši nov gib — enaka meja za prst kot pri meniju. */
const jezGumbiCSS = [...pasPrst.matchAll(/\.langs button\s*\{([^}]*)\}/g)].map(m => m[1]);
need(vsaj44(jezGumbiCSS), "stikalo za jezik ima na telefonu gumb, visok vsaj 44 px");
need(jezGumbiCSS.some(v => /justify-content:center/.test(v)),
  "napis jezikovnega gumba je na telefonu poravnan v sredino");

/* 11. glava mora obljubiti obe nastanitvi, sicer delitelj na Facebooku pokaže staro ponudbo */
need((html.match(/"@type":"LodgingBusiness"/g) || []).length === loki.length,
  `JSON-LD napove ${loki.length} nastanitvi`);
for (const l of loki) need(html.includes(l.naslov), `glava vsebuje naslov ${l.naslov}`);
need((html.match(/GeoCoordinates/g) || []).length === 1,
  "geografske koordinate ima samo naslov, ki jih ima potrjene");

console.log(ok.map(m => "  OK  " + m).join("\n"));
if (bad.length) console.log("\n" + bad.map(m => "  NAP " + m).join("\n"));
console.log(bad.length ? `\nZAPRT: ${bad.length} napak` : `\nODPRTO: ${ok.length} preizkusov uspelo`);
process.exit(bad.length ? 1 : 0);

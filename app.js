/* River Kolpa Apartments — enostranska navigacija v globino */

const INFO = {
  name: "River Kolpa Apartments",
  owner: "Majda Pezdirc",
  address: "Griblje 70, SI-8332 Gradac",
  phone: "+38640858732",
  phoneTxt: "040 858 732",
  email: "majda.pezdirc@gmail.com",
  whatsapp: "38640858732",
  booking: "https://www.booking.com/hotel/si/holiday-house-kolpa.sl.html",
  map: "https://www.google.com/maps/search/?api=1&query=Griblje+70+8332+Gradac+Slovenija"
};

const ic = {
  wave:'<svg viewBox="0 0 24 24" fill="none"><path d="M2 15c3-3 5 1.5 8-1s5 1.5 8-1 4 1.5 4 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  bed:'<svg viewBox="0 0 24 24" fill="none"><path d="M3 18v-7h18v7M3 11V6M21 11v-2a2 2 0 0 0-2-2h-7v4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  wifi:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 9a13 13 0 0 1 16 0M7 12.5a8.5 8.5 0 0 1 10 0M10 16a4 4 0 0 1 4 0" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="12" cy="19" r="1.2" fill="currentColor"/></svg>',
  ac:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  car:'<svg viewBox="0 0 24 24" fill="none"><path d="M4 16v-3l2-5h12l2 5v3M4 16h16M7.5 16v2M16.5 16v2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  fire:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3c1 3-2 4-2 7a2 2 0 0 0 4 0c0-1 2 2 2 4a4 4 0 0 1-8 0c0-5 4-6 4-11z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  water:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" stroke="currentColor" stroke-width="1.7"/></svg>',
  paw:'<svg viewBox="0 0 24 24" fill="none"><circle cx="8" cy="8" r="2" fill="currentColor"/><circle cx="16" cy="8" r="2" fill="currentColor"/><circle cx="5" cy="13" r="1.8" fill="currentColor"/><circle cx="19" cy="13" r="1.8" fill="currentColor"/><path d="M12 12c3 0 5 2.2 5 4.5S15 20 12 20s-5-1.2-5-3.5S9 12 12 12z" fill="currentColor"/></svg>',
  bike:'<svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="17" r="3.4" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="17" r="3.4" stroke="currentColor" stroke-width="1.7"/><path d="M6 17l4-8h5l-4 8M14 9l1.5-3H18" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  phone:'<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  mail:'<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.7"/><path d="M3.5 7l8.5 6 8.5-6" stroke="currentColor" stroke-width="1.7"/></svg>',
  chat:'<svg viewBox="0 0 24 24" fill="none"><path d="M21 12a9 9 0 0 1-13.2 8L3 21l1.1-4.6A9 9 0 1 1 21 12z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="1.7"/></svg>',
  star:'<svg viewBox="0 0 24 24" fill="none"><path d="M12 3l2.7 5.7 6.3.8-4.6 4.3 1.2 6.2L12 17l-5.6 3 1.2-6.2L3 9.5l6.3-.8L12 3z" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  kitchen:'<svg viewBox="0 0 24 24" fill="none"><path d="M7 3v8a2.5 2.5 0 0 0 5 0V3M9.5 11v10M17 3c-1.5 2-2 3.5-2 6h4c0-2.5-.5-4-2-6zM17 9v12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
};

/* Fotografije so iz lastnega arhiva nastanitve. w/h je prava velikost datoteke v px.
   lok pove, na katerem naslovu je posnetek: 70, 30b ali reka. Vpis je samo tam, kjer
   odstopa od 70, ker je večina arhiva iz Gribljah 70; LOK() spodaj doda privzetek. */
const GAL = [
  {f:"terasa-studio",  g:"vrt",   w:1600, h:720,  t:"Pokrita terasa z jedilno mizo in kotom za sprostitev"},
  {f:"letna-kuhinja",  g:"vrt",   w:1600, h:732,  t:"Letna kuhinja pod lesenim nadstreškom"},
  {f:"pergola-vrt",    g:"vrt",   w:1600, h:894,  t:"Pergola z belimi zavesami in jedilno mizo"},
  {f:"letna-kuhinja-detajl", g:"vrt", w:1448, h:1086, t:"Letna kuhinja s ploščo za kuho, umivalnikom in orodjem na steni"},
  {f:"miza-pergola",   g:"vrt",   w:1600, h:720,  t:"Pogled s pergole na vrt z ležalnikoma"},
  {f:"terasa-pregled", g:"vrt",   w:1536, h:1024, t:"Pergola z dolgo mizo in staro črpalko, uta v ozadju"},
  {f:"jacuzzi-terasa", g:"vrt",   w:963,  h:947,  t:"Vrtni kot z žarom in jacuzzijem"},
  {f:"gugal",          g:"vrt",   w:1023, h:1537, t:"Viseči kokon med bršljanom"},
  {f:"vrt-05",         g:"vrt",   w:404,  h:900,  t:"Ležalnik ob zunanji kuhinji"},
  {f:"noter-01",       g:"noter", w:900,  h:405,  t:"Odprt dnevni prostor z jedilnico in kuhinjo"},
  {f:"noter-02",       g:"noter", w:900,  h:405,  t:"Kutna zofa pod lesenimi gredami"},
  {f:"noter-03",       g:"noter", w:900,  h:405,  t:"Opremljena kuhinja"},
  {f:"hodnik-kisa",    g:"noter", w:1600, h:1200, t:"Kurilni kot s pečjo na drva in pogledom v sobo"},
  {f:"noter-10",       g:"noter", w:900,  h:405,  t:"Predel za sedenje z ravnim televizorjem"},
  {f:"soba-main",      g:"noter", w:1200, h:900,  t:"Soba s tremi posteljami"},
  {f:"soba-otroci",    g:"noter", w:1200, h:900,  t:"Soba z dvema nadstavnima postelama"},
  {f:"soba-kisa",      g:"noter", w:1080, h:977,  t:"Kot s štedilnikom na drva"},
  {f:"miza",           g:"izkus", w:844,  h:1600, t:"Pogrnjena miza pod leseno pergolo"},
  {f:"izkus-01",       g:"izkus", w:900,  h:557,  t:"Domača pogača iz lastne peči"},
  {f:"vrt-pregled",    g:"izkus", w:1080, h:498,  t:"Vrt s pergolo, jacuzzijem in dvema ležalnikoma"},
  {f:"masazna-kad",    g:"izkus", w:1600, h:721,  t:"Jacuzzi z mehurčki pod visečimi cvetlicami"},
  {f:"uta-dan",        g:"izkus", w:1600, h:648,  t:"Uta z jacuzzijem in lesenima ležalnikoma"},
  {f:"noc",            g:"izkus", w:720,  h:1600, t:"Jacuzzi na lesenem odru ob mraku"},
  {f:"vrt-lezniki",    g:"izkus", w:1080, h:570,  t:"Dva ležalnika pred jacuzzijem"},
  {f:"uta-noc",        g:"izkus", w:1600, h:720,  t:"Uta zvečer, čez vrt poteka vrsta lučk"},
  {f:"zunanjost-30b",  g:"vrt",   lok:"30b", w:1600, h:721, t:"Hiša z nadstreškom in jacuzzijem"},
  {f:"travnik-30b",    g:"vrt",   lok:"30b", w:1600, h:900, t:"Travnik pred hišo z nogometnimi vrati in ležalniki"},
  {f:"kopalnica-30b",  g:"noter", lok:"30b", w:861,  h:1600, t:"Kopalnica s tušem, umivalnikom in strojem za perilo"},
  {f:"soba-30b-a",     g:"noter", lok:"30b", w:1092, h:1441, t:"Spalnica z zakonsko posteljo in omaro"},
  {f:"soba-30b-b",     g:"noter", lok:"30b", w:1051, h:1496, t:"Spalnica z zakonsko posteljo in pobarvanim lesenim stropom"},
  {f:"soba-30b-c",     g:"noter", lok:"30b", w:1600, h:805,  t:"Soba z zakonsko in enojno posteljo"},
  {f:"kuhinja-30b",    g:"noter", lok:"30b", w:1080, h:1457, t:"Kuhinja s pečico, štedilnikom in jedilno mizo"},
  {f:"hodnik-30b",     g:"noter", lok:"30b", w:937,  h:1359, t:"Predprostor z omaro za obutev in ogledalom"},
  {f:"reka-01",        g:"reka",  lok:"reka", w:900,  h:600,  t:"Reka Kolpa poleti z naravnim kopališčem"},
  {f:"reka-02",        g:"reka",  lok:"reka", w:900,  h:600,  t:"Kopanje v Kolpi"},
  {f:"reka-03",        g:"reka",  lok:"reka", w:900,  h:758,  t:"Brisače in senca na rečnem bregu"},
  {f:"reka-04",        g:"reka",  lok:"reka", w:900,  h:491,  t:"Kajak po Kolpi"},
  {f:"reka-05",        g:"reka",  lok:"reka", w:900,  h:600,  t:"Skok v reko z naravne police"},
  {f:"reka-06",        g:"reka",  lok:"reka", w:900,  h:900,  t:"Plitvina, kjer voda seže do pasu"},
  {f:"reka-07",        g:"reka",  lok:"reka", w:900,  h:531,  t:"Naravni vodni tobogan"},
  {f:"reka-08",        g:"reka",  lok:"reka", w:900,  h:900,  t:"Prodnat breg s pogledom na nasprotno stran"}
];

const LOKI = [
  {
    id: "70", naslov: "Griblje 70", pogled: "units",
    address: "Griblje 70, SI-8332 Gradac",
    map: "https://www.google.com/maps/search/?api=1&query=Griblje+70+8332+Gradac+Slovenija",
    booking: "https://www.booking.com/hotel/si/holiday-house-kolpa.sl.html",
    enote: "dva apartmaja · 7 in 5 oseb",
    glava: "Prenovljena hiša z dvema enotama",
    lede: "Ločena vhoda in terasi, skupen ograjen vrt s pergolo, letno kuhinjo in jacuzzijem. " +
          "Do naravnega kopališča na Kolpi je deset minut hoje po ravni poti.",
    facts: [["2","samostojni enoti"],["7 + 5","oseb"],["10 min","hoje do reke"],["10 / 10","8 mnenj"]],
    zunanja: ["terasa-pregled", "letna-kuhinja"],
    notranja: ["noter-01", "soba-main", "soba-otroci", "noter-03", "hodnik-kisa", "soba-kisa"],
    slika: "terasa-pregled"
  },
  {
    id: "30b", naslov: "Griblje 30 b", pogled: "p30",
    address: "Griblje 30 b, SI-8332 Gradac",
    map: "https://www.google.com/maps/search/?api=1&query=Griblje+30+b+8332+Gradac+Slovenija",
    booking: "",
    enote: "dva apartmaja",
    glava: "Hiša s teraso, jacuzzijem in travnikom",
    lede: "Dva samostojna apartmaja v urejeni hiši. Na voljo sta kuhinja s pečico in štedilnikom " +
          "ter kopalnica s tušem in pralnim strojem, pred hišo pa nadstrešena terasa z jacuzzijem " +
          "in travnik z nogometnimi vrati.",
    facts: [["2","samostojna apartmaja"],["jacuzzi","pod nadstreškom"],["travnik","z nogometnimi vrati"],["tuš","in pralni stroj"]],
    zunanja: ["zunanjost-30b", "travnik-30b"],
    notranja: ["soba-30b-a", "soba-30b-b", "soba-30b-c", "kuhinja-30b", "kopalnica-30b", "hodnik-30b"],
    slika: "zunanjost-30b"
  }
];

/* Privzetek je namenoma izrecen: večina arhiva je iz Gribljah 70, novejši vpisi nosijo lok.
   Reka ni naslov, ampak skupna vsebina obeh hiš, zato nosi lastno oznako. */
const LOK = g => g.lok || "70";
const LOK_N = Object.fromEntries([["reka", "Reka Kolpa"], ...LOKI.map(l => [l.id, l.naslov])]);
const GAL_ŠT = id => GAL.filter(g => LOK(g) === id).length;

/* Reka ni naslov, ampak skupna vsebina obeh hiš, zato ima svojo vrstico vsebin in ne lokacije. */
const LOK_TABS = [
  {id:"vse", label:"Obe hiši"},
  {id:"70", label:"Griblje 70"},
  {id:"30b", label:"Griblje 30 b"}
];

/* Enote, ki jih sme obrazec ponuditi. Pri 30 b števila oseb ne vemo, zato je zapisan
   samo naslov — gost naj razpored preveri, ne da bi ga stran obljubila. */
const ENOTE_OPTS = [
  "Griblje 70 — apartma za 7 oseb",
  "Griblje 70 — studio za 5 oseb",
  "Griblje 70 — oba apartmaja",
  "Griblje 30 b — en apartma",
  "Griblje 30 b — oba apartmaja",
  "Še ne vem — svetujte"
];

/* 7 + 5, kar sprejme Griblje 70. Obrazec ponuja tudi oba apartmaja hkrati, zato stropa
   ne sme postaviti nižje — sicer bi devetčlanska skupina morala lagati ali oditi. */
const OSEBE_MAX = 12;

const TABS = [
  {id:"vse", label:"Vse"},
  {id:"vrt", label:"Vrt in hiša"},
  {id:"noter", label:"Notranjost"},
  {id:"izkus", label:"Doživetja"},
  {id:"reka", label:"Reka"}
];

const AMEN = [
  [ic.wifi, "Brezplačen WiFi"],
  [ic.car, "Brezplačno parkirišče, brez rezervacije"],
  [ic.ac, "Klimatska naprava in ogrevanje"],
  [ic.fire, "Štedilnik na drva"],
  [ic.kitchen, "Popolnoma opremljena kuhinja"],
  [ic.water, "Jacuzzi na vrtu, proti doplačilu"],
  [ic.wave, "Kanu, kajak in SUP v bližini"],
  [ic.paw, "Hišni ljubljenčki dovoljeni, doplačilo 20 €"],
  [ic.bed, "Ograjen vrt in travnik za otroke"],
  [ic.star, "Masaža po predhodnem dogovoru"]
];

const REVIEWS = {
  score: "10",
  count: "8 mnenj",
  subs: [
    ["Čistoča", "10"], ["Udobje", "10"], ["Storitve", "10"],
    ["Lokacija", "8,5"], ["Osebje", "10"], ["Cena / kakovost", "9,1"]
  ],
  quotes: [
    {text:"Izjemno lepo opremljena in čista počitniška hišica, ki nudi popolno zasebnost s popolnoma ograjenim vrtom.", name:"Avan", from:"Slovenija"},
    {text:"Zelo prijazna in topla gostiteljica, lepo stanovanje in prostorna terasa z veliko zasebnosti, zelo dobro opremljena letna kuhinja.", name:"Matija", from:"Slovenija"},
    {text:"Krasen apartma, Majda je super gostiteljica, okolica je prekrasna, do najbližjega kopališča se sprehodiš po prelepi, mirni poti med polji.", name:"Živa", from:"Slovenija"}
  ]
};

const RULES = [
  ["Prijava in odjava", [
    "Prijava med 15.00 in 22.00, odjava med 9.30 in 10.00",
    "Prosimo, vnaprej sporočite predvideni čas prihoda",
    "Za prijavo ni starostnih omejitev"
  ]],
  ["Otroci in posteljice", [
    "Otroci vseh starosti so dobrodošli",
    "Posteljice in dodatna ležišča v tej nastanitvi niso na voljo",
    "Cena je odvisna od števila oseb, zato pri povpraševanju navedite starost otrok"
  ]],
  ["Hišni ljubljenčki in kajenje", [
    "Ljubljenčki so dovoljeni ob predhodni najavi, doplačilo 20 € na bivanje",
    "Kajenje v vseh prostorih je prepovedano",
    "Zabave, dekliščine in fantovščine niso dovoljene",
    "Nočni mir med 22.00 in 6.00"
  ]],
  ["Rezervacija in plačilo", [
    "Neposredna rezervacija po telefonu ali e-pošti, brez provizije",
    "Če rezervirate prek Booking.com, plačilo ureja Booking.com",
    "Pravila odpovedi se razlikujejo po terminu in enoti — potrdimo ob povpraševanju",
    "Turistična taksa Občine Črnomelj: 2,00 € na osebo na dan"
  ]]
];

const FAQ = [
  ["Koliko gostov se namesti?", "V Gribljah 70 je apartma s sedmimi ležišči v dveh spalnicah in studio za do pet oseb. V Gribljah 30 b sta dva apartmaja, njuna razpored ležišč pa potrdimo ob povpraševanju. Za večje skupine so na voljo vse štiri enote hkrati."],
  ["Ali imate bazen?", "Ne. Namesto bazena je reka — naravno kopališče v Kolpi je deset minut hoje po ravni poti. Na vrtu je jacuzzi, ki je na voljo proti doplačilu."],
  ["Ali je parkirišče brezplačno?", "Da. Brezplačno zasebno parkirišče je tik ob hiši in ga ni treba rezervirati."],
  ["Kdaj je najboljši termin?", "Od maja do septembra je voda prijetno topla in dnevi dolgi. Jeseni je pokrajina barvita in mirna, pozimi pa se hiša ogreva s klimatsko napravo in štedilnikom na drva."],
  ["Kako do vas?", "Griblje so na cesti med Metliko in Gradcem, blizu mejnega prehoda s Hrvaško. Natančen naslov in zemljevid izbrane hiše dobite ob potrditvi rezervacije."],
  ["Sta oba naslova ena nastanitev?", "Ne. Griblje 70 in Griblje 30 b sta dve ločeni hiši v istem kraju, vsaka s svojima apartmajema. Pri povpraševanju navedite, katero hišo želite — če je zasedena, preverimo še razpoložljivost v drugi."]
];

/* ── pomožne funkcije ──────────────────────── */
const DIM = Object.fromEntries(GAL.map(g => [g.f, [g.w, g.h]]));
/* ploščice v 640 px različici zadostujejo do približno 2400 px širokih zaslonov; nad tem bralec sam
   vzame izvirnik, ker mu srcset po navedeni širini ne ponudi dovolj goste kandidata */
const IMG_SIZES = "(max-width:640px) 50vw, (max-width:900px) 30vw, 26vw";
const img = (f, alt, cls = "") => {
  const d = DIM[f];
  return `<img src="assets/${f}.webp" srcset="assets/t/${f}.webp 640w, assets/${f}.webp ${d ? d[0] : 1868}w" sizes="${IMG_SIZES}" onerror="this.src='assets/${f}.jpg'" alt="${alt}"${d ? ` width="${d[0]}" height="${d[1]}"` : ""} ${cls ? `class="${cls}"` : ""} loading="lazy">`;
};

const galCount = n => `${n} ${n === 1 ? "fotografija" : n === 2 ? "fotografiji" : n === 3 || n === 4 ? "fotografije" : "fotografij"}`;

function door(view, title, sub, photo) {
  return `<button class="door" data-go="${view}" data-flat="1">
    ${img(photo, "")}
    <span><b>${title}</b><i>${sub}</i></span></button>`;
}

function fact(n, l) { return `<div class="fact"><b>${n}</b><span>${l}</span></div>`; }

/* Prehod med hišama: obe lokaciji morata biti na dosegu enega klika, sicer gost
   pomoti enega naslova za drug in rezervira napačno hišo. */
function xlink(lok, dodatni) {
  const sama = LOKI.find(l => l.id === lok);
  const druga = LOKI.find(l => l.id !== lok);
  return `<div class="xlink">
    <button class="btn btn-ghost" data-go="${druga.pogled}" data-flat="1">Druga hiša: ${druga.naslov}</button>
    <button class="btn btn-ghost" data-go="gallery" data-flat="1" data-glok="${lok}">Fotografije ${sama.naslov}</button>
    ${dodatni ? `<button class="btn btn-ghost" data-go="${dodatni[1]}" data-flat="1">${dodatni[0]}</button>` : ""}
    <a class="btn btn-ghost" href="${sama.map}" target="_blank" rel="noopener">Zemljevid ${sama.naslov}</a>
  </div>`;
}

function stripCard(icon, tag, title, text, photo, view, tab) {
  return `<button class="card" data-go="${view}" data-flat="1"${tab ? ` data-gtab="${tab}"` : ""}>${img(photo, "")}
    <i>${ic[icon] || ""}<span>${tag}</span></i>
    <div><h3>${title}</h3><p>${text}</p></div></button>`;
}

function quote(q) {
  return `<figure class="quote"><blockquote>${q.text}</blockquote><figcaption>${q.name} · ${q.from}</figcaption></figure>`;
}

/* Determinističen prah v zraku — brez Math.random, da se razpored ne menja med nalaganji. */
const MOTES = Array.from({ length: 16 }, (_, i) => {
  const r = n => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5453; return x - Math.floor(x); };
  return `<i class="mote" style="left:${(4 + r(1) * 92).toFixed(1)}%;top:${(34 + r(2) * 64).toFixed(1)}%;--t:${(19 + r(3) * 17).toFixed(1)}s;--dl:-${(r(4) * 26).toFixed(1)}s;--x:${((r(5) - .5) * 13).toFixed(1)}vw;--y:${(-26 - r(6) * 32).toFixed(1)}vh;--o:${(.32 + r(7) * .5).toFixed(2)}"></i>`;
}).join("");

const amb = () => `<div class="amb" aria-hidden="true">
  <b class="glow glow-a"></b><b class="glow glow-b"></b><b class="rays"></b>${MOTES}<b class="vig"></b>
</div>`;

const HERO_SHOTS = ["terasa-studio", "jacuzzi-terasa", "letna-kuhinja"];

/* ── pogledi ───────────────────────────────── */
const VIEWS = {
  home: {
    label: "Domov",
    title: "River Kolpa Apartments — dve hiši ob reki Kolpi, Griblje",
    render: () => `
    <div class="hero">
      ${HERO_SHOTS.map((s, i) => `<img class="${i === 0 ? "lead on" : `off${i}`}" src="assets/${s}.webp" alt="${i === 0 ? "Pokrita terasa River Kolpa Apartments v Gribljah" : ""}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy" aria-hidden="true"'} decoding="async">`).join("")}
    </div>
    ${amb()}
    <div class="home-grid">
      <div class="home-top">
        <div class="home-title">
          <p class="eyebrow" data-rv style="--d:80ms">Griblje · Bela krajina · Slovenija</p>
          <h1 class="big" tabindex="-1">
            <span class="mask" style="--d:180ms"><span>Dve hiši</span></span>
            <span class="mask" style="--d:320ms"><span>ob reki <em class="uline">Kolpi<svg viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M4 8.6C42 3.4 96 2.2 196 6.4" pathLength="100"/></svg></em></span></span>
          </h1>
          <p class="lede" data-rv style="--d:520ms">Štirje samostojni apartmaji v dveh hišah v Gribljah ob reki Kolpi.
          Vsaka hiša ima teraso, jacuzzi in urejen vrt, obe pa vodi ista gostiteljica —
          izberite tisto, ki je prosta v vašem terminu.</p>
          <div class="chips" data-rv style="--d:640ms">
            <span class="chip"><b>4</b> apartmaji v dveh hišah</span>
            <span class="chip"><b>2</b> naslova v Gribljah</span>
            <span class="chip"><b>Jacuzzi</b> in urejen vrt</span>
            <span class="chip"><b>10 / 10</b> · 8 mnenj</span>
          </div>
          <div class="cta-row" data-rv style="--d:760ms">
            <button class="btn btn-solid" data-go="booking" data-flat="1">Preverite proste termine</button>
            <button class="btn btn-ghost" data-go="places" data-flat="1">Izberite hišo</button>
          </div>
        </div>
        <aside class="home-aside">
          <div data-rv style="--d:880ms">${quote(REVIEWS.quotes[2])}</div>
          <p class="hosted" data-rv style="--d:1000ms">Vodi jo <b>${INFO.owner}</b> · odgovorimo v nekaj urah,
          po telefonu in prek WhatsAppa tudi v soboto.</p>
        </aside>
      </div>
      <div class="doors" data-rv style="--d:900ms">
        ${door("places","Lokaciji","Griblje 70 in Griblje 30 b","zunanjost-30b")}
        ${door("garden","Vrt in jacuzzi","Terasa, žar, letna kuhinja","jacuzzi-terasa")}
        ${door("river","Reka Kolpa","Kopališče deset minut hoje","reka-01")}
        ${door("area","Okolica","Vasi, kleti in poti","reka-04")}
        ${door("gallery","Galerija",`${GAL.length} fotografij`,"noter-01")}
        ${door("booking","Prosti termini","Povpraševanje in kontakt","noc")}
      </div>
    </div>`
  },

  places: {
    label: "Lokaciji",
    title: "Lokaciji — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="col">
      <div data-rv style="--d:60ms">
        <p class="eyebrow">Dva naslovov</p>
        <h2 class="mid" tabindex="-1" style="margin:12px 0 8px">Ista zasnova, dve hiši</h2>
        <p class="lede">Majda Pezdirc gosti v dveh hišah v Gribljah, vsaka z dvema samostojnima
        apartmajema. Obe imata teraso, jacuzzi in urejen vrt, zato je izkušnja
        enaka — razlikujeta se razpored prostorov in zunanjost.</p>
      </div>
      <div class="places" data-rv style="--d:200ms">
        ${LOKI.map(l => `
        <article class="place">
          ${img(l.slika, l.glava)}
          <div class="place-body">
            <p class="place-kicker">${l.naslov}</p>
            <h3>${l.glava}</h3>
            <p class="place-meta">${l.enote} · ${galCount(GAL_ŠT(l.id))} v galeriji</p>
            <p class="place-lede">${l.lede}</p>
            <div class="facts place-facts">${l.facts.map(f => fact(f[0], f[1])).join("")}</div>
            <div class="place-cta">
              <button class="btn btn-solid" data-go="${l.pogled}" data-flat="1">Oglejte si hišo</button>
              <button class="btn btn-ghost" data-go="gallery" data-flat="1" data-glok="${l.id}">Fotografije</button>
              <a class="btn btn-ghost" href="${l.map}" target="_blank" rel="noopener">Zemljevid</a>
            </div>
          </div>
        </article>`).join("")}
      </div>
      <p class="fineprint" data-rv style="--d:300ms">Obe hiši sta v istem kraju, vsaka ima svoj vstop in svoj travnik.
      Natančen naslov izbrane hiše pošljemo ob potrditvi rezervacije.</p>
    </div>`
  },

  units: {
    label: "Griblje 70",
    title: "Griblje 70 — dva apartmaja — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="units-wrap">
    <p class="eyebrow" data-rv style="--d:60ms">Nastanitev · ${LOKI[0].naslov}</p>
    <h2 class="mid" tabindex="-1" data-rv style="margin:12px 0 8px;--d:140ms">Dva samostojna apartmaja</h2>
    <p class="lede" data-rv style="--d:240ms">Prenovljena hiša ima dve samostojni enoti, vsaka s svojim vhodom in
    svojo teraso. Spodaj sta razpored ležišč in opis opreme posamezne enote.</p>
    <div class="unitcols" data-rv style="--d:340ms">
      <article class="unit">
        ${img("noter-01","Odprt dnevni prostor z jedilnico in kuhinjo")}
        <span class="unit-cap">Dnevni prostor apartmaja</span>
        <div class="unit-body">
          <h3>Apartma z dvema spalnicama</h3>
          <p class="unit-meta">7 oseb · 7 ležišč · lastna terasa</p>
          <dl>
            <div><dt>Spalnice</dt><dd>V eni sobi tri postelje, v drugi dve nadstavni —
            skupaj sedem ležišč in velika omara za stvari.</dd></div>
            <div><dt>Dnevni del</dt><dd>Kutna zofa, jedilna miza pod lesenimi gredami,
            raven televizor, klimatska naprava, ogrevanje in štedilnik na drva.</dd></div>
            <div><dt>Kuhinja</dt><dd>Štedilnik na plin s pečico in indukcijska plošča,
            dva hladilnika, mikrovalna, aparat za palačinke, blender, kavni aparat in kotliček.</dd></div>
          </dl>
        </div>
      </article>
      <article class="unit">
        ${img("terasa-studio","Pokrita terasa z jedilno mizo in kotom za sprostitev")}
        <span class="unit-cap">Pokrita terasa ob hiši</span>
        <div class="unit-body">
          <h3>Studio s teraso</h3>
          <p class="unit-meta">5 oseb · nadstavna postelja in raztegljiv kavč</p>
          <dl>
            <div><dt>Ležišča</dt><dd>Nadstavna postelja in raztegljiv kavč — udobno za
            štiri do pet oseb.</dd></div>
            <div><dt>Zunanji prostor</dt><dd>Lastna terasa z mizo in stoli, obrnjena v vrt.</dd></div>
            <div><dt>Oprema</dt><dd>Klimatska naprava, ogrevanje,
            brezplačen WiFi in parkirišče tik ob hiši.</dd></div>
            <div><dt>Skupno</dt><dd>Vrt, jacuzzi, letna kuhinja in žar so skupni za obe enoti;
            vsaka družina ima svoj del terase.</dd></div>
          </dl>
        </div>
      </article>
    </div>
    <div class="amenbar">${AMEN.map(a=>`<div>${a[0]}<span>${a[1]}</span></div>`).join("")}</div>
    ${xlink("70", ["Vrt in jacuzzi", "garden"])}
    </div>`
  },

  p30: {
    label: "Griblje 30 b",
    title: "Griblje 30 b — dva apartmaja — River Kolpa Apartments",
    render: () => {
      const l = LOKI.find(x => x.id === "30b");
      return `
    ${amb()}
    <div class="units-wrap">
    <p class="eyebrow" data-rv style="--d:60ms">Nastanitev · ${l.naslov}</p>
    <h2 class="mid" tabindex="-1" data-rv style="margin:12px 0 8px;--d:140ms">${l.glava}</h2>
    <p class="lede" data-rv style="--d:240ms">${l.lede}</p>
    <div class="placegrid" data-rv style="--d:340ms">
      ${l.notranja.map(f => `<figure class="ph">${img(f, GAL.find(g => g.f === f).t)}<figcaption>${GAL.find(g => g.f === f).t}</figcaption></figure>`).join("")}
    </div>
    <div class="facts" data-rv style="--d:420ms">${l.facts.map(f => fact(f[0], f[1])).join("")}</div>
    <p class="fineprint" data-rv style="--d:500ms">Vse fotografije so iz našega arhiva. Katera soba je v
    katerem apartmaju in kateri od obeh apartmajev je v vašem terminu prost, preverimo ob
    povpraševanju — razporeda, ki ga nimamo potrjenega, na strani ne objavljamo.</p>
    ${xlink("30b")}
    </div>`;
    }
  },

  garden: {
    label: "Vrt",
    title: "Vrt in jacuzzi — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="split">
      <div class="stack">
        <figure class="figure">${img("letna-kuhinja","Letna kuhinja pod nadstreškom")}<figcaption>Letna kuhinja</figcaption></figure>
        <figure class="figure">${img("jacuzzi-terasa","Vrt z jacuzzijem in žarom")}<figcaption>Jacuzzi in žar</figcaption></figure>
      </div>
      <div class="copy">
        <p class="eyebrow" data-rv style="--d:60ms">${LOKI[0].naslov} · Zunaj</p>
        <h2 class="mid" tabindex="-1" data-rv style="--d:140ms">Večer, ki se ne konča</h2>
        <p class="lede" data-rv style="--d:240ms">Pod pergolo z belimi zavesami je dolga miza, ob njej letna
        kuhinja s ploščo za kuho in umivalnikom. Za vogalom sta žar in jacuzzi, naprej pa urejena
        trata z dvema ležalnikoma in gugalnim kokonom med bršljanom — vse blizu terase.</p>
        <div class="facts" data-rv style="--d:340ms">
          ${fact("8","pri mizi pod pergolo")}
          ${fact("6","oseb v jacuzziju")}
          ${fact("2","ležalnika in gugalnik")}
          ${fact("100 %","ograjen vrt")}
        </div>
        <p class="fineprint">Jacuzzi je na voljo proti doplačilu; dogovorimo se ob rezervaciji,
        da ga pred prihodom ogrejemo.</p>
        ${xlink("70")}
      </div>
    </div>`
  },

  river: {
    label: "Reka Kolpa",
    title: "Reka Kolpa — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="split">
      <div class="copy">
        <p class="eyebrow" data-rv style="--d:60ms">Reka</p>
        <h2 class="mid" tabindex="-1" data-rv style="--d:140ms">Deset minut hoje do vode</h2>
        <p class="lede" data-rv style="--d:240ms">Naravno kopališče z urejenim bregom in plitvinami je deset minut
        hoje po ravni poti med polji. Voda se poleti segreje nad dvajsetimi stopinjami,
        ob reki pa vodita učna in kolesarska pot. Namesto bazena v vrtu je na voljo kar cela reka.</p>
        <div class="facts" data-rv style="--d:340ms">
          ${fact("10 min","hoje do kopališča")}
          ${fact("> 20 °C","voda poleti")}
          ${fact("Kanu","in SUP, izposoja v bližini")}
          ${fact("Ribolov","v bližini, z dovoljenjem")}
        </div>
        <div class="cta-row" data-rv style="--d:440ms">
          <button class="btn btn-ghost" data-go="gallery" data-flat="1">Fotografije reke</button>
        </div>
      </div>
      <div class="rivergrid" data-rv style="--d:200ms">
        <b class="cauc" aria-hidden="true"></b>
        ${img("reka-01","Kolpa poleti z naravnim kopališčem")}
        ${img("reka-05","Skok v reko z naravne police")}
        ${img("reka-07","Naravni vodni tobogan")}
        ${img("reka-06","Plitvina, kjer voda seže do pasu")}
      </div>
    </div>`
  },

  area: {
    label: "Okolica",
    title: "Okolica — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="col">
      <div>
        <p class="eyebrow" data-rv style="--d:60ms">Kaj naprej</p>
        <h2 class="mid" tabindex="-1" data-rv style="margin:12px 0 8px;--d:140ms">Dolina, ki živi po ritmu reke</h2>
        <p class="lede" data-rv style="--d:240ms">Od hiše je deset minut hoje do kolpske plaže. Naprej so
        belokranjske vasi, vinske kleti in poti, ki peljejo ob vodi ali po hribu.</p>
      </div>
      <div class="strip" data-rv style="--d:340ms">
        ${stripCard("wave","Ob reki","Kopališča in kanu","Belokranjska riviera — kopanje, kajak in SUP; do vode je deset minut hoje.","reka-02","river")}
        ${stripCard("bike","Aktivno","Pohodništvo in kolesarjenje","Pot ob Kolpi, Gradac, Adlešiči in Vinjska cesta; začetne točke so v kraju.","vrt-05","gallery","reka")}
        ${stripCard("fire","Izročilo","Vasi in domače kmetije","Bučno olje, vino, kruh in sir — večinoma na voljo ves teden.","uta-dan","gallery","izkus")}
        ${stripCard("pin","Lokacija","Na meji s Hrvaško","Nekdanji prehodi ob reki so spet odprti — zvečer sta v igri dve državi.","miza","gallery","reka")}
      </div>
    </div>`
  },

  gallery: {
    label: "Galerija",
    title: "Galerija — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="col">
      <div class="gal-head" data-rv style="--d:60ms">
        <div>
          <p class="eyebrow" id="galMeta">${galCount(GAL.length)} iz lastnega arhiva</p>
          <h2 class="mid" tabindex="-1" style="margin:10px 0 4px">Pogled naokoli</h2>
        </div>
        <div class="tabsets">
          <div class="tabs" id="galLoks" role="group" aria-label="Filtriraj fotografije po hiši">
            ${LOK_TABS.map((t,i)=>`<button class="tab${i===0?" on":""}" data-lok="${t.id}" aria-pressed="${i===0}">${t.label}</button>`).join("")}
          </div>
          <div class="tabs" id="galTabs" role="group" aria-label="Filtriraj fotografije po vsebini">
            ${TABS.map((t,i)=>`<button class="tab${i===0?" on":""}" data-tab="${t.id}" aria-pressed="${i===0}">${t.label}</button>`).join("")}
          </div>
        </div>
      </div>
      <div class="gal-empty" id="galEmpty" hidden>
        <p id="galEmptyTxt"></p>
        <button class="btn btn-ghost" id="galReset">Pokaži vse fotografije</button>
      </div>
      <div class="gal" id="gal" data-tab="vse" data-lok="vse" data-rv style="--d:180ms">
        ${GAL.map((g,i)=>`<button data-lb="${i}" data-g="${g.g}" data-lok="${LOK(g)}" aria-label="Odpri fotografijo: ${g.t}">
          ${img(g.f, g.t)}
        </button>`).join("")}
      </div>
    </div>`
  },

  booking: {
    label: "Prosti termini",
    title: "Prosti termini in kontakt — River Kolpa Apartments",
    render: () => `
    ${amb()}
    <div class="book">
      <div class="copy">
        <p class="eyebrow" data-rv style="--d:60ms">Kontakt</p>
        <h2 class="mid" tabindex="-1" data-rv style="--d:140ms">Preverite proste termine</h2>
        <p class="lede" data-rv style="--d:240ms">Najhitreje po telefonu ali prek WhatsAppa. Cene so odvisne od
        termina in števila oseb, zato jih ne objavljamo naslepo — pošljite povpraševanje
        ali preverite razpoložljivost hiše v Gribljah 70 na Booking.com.</p>
        <div class="contact-list" data-rv style="--d:340ms">
          <a href="tel:${INFO.phone}">${ic.phone}<span>${INFO.phoneTxt}</span><small>Pokličite</small></a>
          <a id="waLink" href="${waHref()}" target="_blank" rel="noopener">${ic.chat}<span>WhatsApp</span><small>Odgovor v nekaj urah</small></a>
          <a href="mailto:${INFO.email}">${ic.mail}<span>${INFO.email}</span><small>E-pošta</small></a>
          <a href="${INFO.booking}" target="_blank" rel="noopener">${ic.star}<span>Booking.com</span><small>${LOKI[0].naslov}</small></a>
          ${LOKI.map(l => `<a href="${l.map}" target="_blank" rel="noopener">${ic.pin}<span>${l.address}</span><small>Zemljevid</small></a>`).join("")}
        </div>
        <div class="score" data-rv style="--d:440ms">
          <div class="score-num"><b>${REVIEWS.score}</b><span>od 10 · ${REVIEWS.count}</span></div>
          <ul class="subs">${REVIEWS.subs.map(s=>`<li><span>${s[0]}</span><b>${s[1]}</b></li>`).join("")}</ul>
        </div>
        <div class="quotes" data-rv style="--d:540ms">${REVIEWS.quotes.slice(0,2).map(quote).join("")}</div>
      </div>

      <div class="side" data-rv style="--d:300ms">
        <form class="form" id="rfq" novalidate>
          <h3>Povpraševanje</h3>
          <p class="note">Izpolnite obrazec in odprl se bo vaš e-poštni program ali WhatsApp s
          pripravljenim sporočilom. Pri enoti navedite hišo — Griblje 70 ali Griblje 30 b —
          da vam takoj odgovorimo z razpoložljivostjo prav te hiše. Odgovorimo v nekaj urah.</p>
          <div class="fgrid">
            <label>Ime in priimek<input name="ime" required placeholder="Janez Novak"></label>
            <label>Telefon ali e-pošta<input name="kontakt" required placeholder="041 234 567"></label>
            <label>Prihod<input name="prihod" type="date" required></label>
            <label>Odhod<input name="odhod" type="date" required></label>
            <label>Število oseb<select name="osebe">${Array.from({length: OSEBE_MAX}, (_, i) => i + 1).map(n=>`<option${n===4?" selected":""}>${n}</option>`).join("")}<option>več kot ${OSEBE_MAX}</option></select></label>
            <label>Enota<select name="enota">${ENOTE_OPTS.map(o=>`<option>${o}</option>`).join("")}</select></label>
          </div>
          <label style="margin-top:12px">Sporočilo<textarea name="spor" placeholder="Zanima naju termin v juliju, prihajava z dvema otrokoma in psom."></textarea></label>
          <div class="submit-row">
            <button class="btn btn-solid" type="submit">Pošlji po e-pošti</button>
            <button class="btn btn-ghost" type="button" id="waBtn">Pošlji prek WhatsAppa</button>
          </div>
          <p class="err" id="rfqErr" role="alert" hidden>Potrebujete ime, kontakt, datum prihoda in odhoda.</p>
        </form>

        <div class="acc">
          <details>
            <summary>Hišna pravila</summary>
            ${RULES.map(r=>`<div class="acc-g"><h4>${r[0]}</h4><ul>${r[1].map(i=>`<li>${i}</li>`).join("")}</ul></div>`).join("")}
          </details>
          <details>
            <summary>Pogosta vprašanja</summary>
            ${FAQ.map(q=>`<div class="acc-g"><h4>${q[0]}</h4><p>${q[1]}</p></div>`).join("")}
          </details>
        </div>
      </div>
    </div>`
  }
};

const ORDER = ["places","units","p30","river","area","gallery"];

/* ── sporočilo za povpraševanje ────────────── */
const slDate = (s) => s ? `${+s.slice(8, 10)}. ${+s.slice(5, 7)}. ${+s.slice(0, 4)}` : "";

function waHref(d) {
  const t = d
    ? `Zanima me bivanje v River Kolpa Apartments.\nIme: ${d.ime}\nKontakt: ${d.kontakt}\nPrihod: ${slDate(d.prihod)}\nOdhod: ${slDate(d.odhod)}\nOseb: ${d.osebe}\nEnota: ${d.enota}` + (d.spor ? `\n\n${d.spor}` : "")
    : "Zanima me bivanje v River Kolpa Apartments v Gribljah.\nTermin:\nŠtevilo oseb:";
  return `https://wa.me/${INFO.whatsapp}?text=${encodeURIComponent(t)}`;
}

/* ── krmiljenje globine ────────────────────── */
const stage = document.getElementById("stage");
const back  = document.getElementById("back");
const nav   = document.getElementById("nav");
const trail = document.getElementById("trail");
const live  = document.getElementById("live");
let stack = ["home"];
let userAction = false;

nav.innerHTML = ORDER
  .map(v => `<button data-go="${v}" data-flat="1">${VIEWS[v].label}</button>`).join("");

/* ── drsenje vrstic ───────────────────────────
   Na ozkem zaslonu se meni in filtri zložijo v eno vrstico, ki se nadaljuje za robom. Brez
   tega obiskovalec ne vidi, da je za "Reka Kolpa" še Galerija, in ne ve, kje v meniju stoji. */
/* ZBLED mora ostati enak širini roba v maski v styles.css — sicer preverjamo vidnost po
   drugem pasu, kot ga dejansko zbledimo. */
const ZBLED = 46;
const roboveDrske = el => {
  const preseg = el.scrollWidth - el.clientWidth;
  el.classList.toggle("ima-levo", el.scrollLeft > 4);
  el.classList.toggle("ima-desno", el.scrollLeft < preseg - 4);
};
const osveziRobove = () => document.querySelectorAll(".nav, .tabs").forEach(roboveDrske);
const odpriNaAktivnem = el => {
  const a = el.querySelector(".on, [aria-current=\"page\"]");
  if (!a) {
    /* dom in rezervacija nimata svojega gumba — takrat se vrstica vrne na začetek,
       sicer ostane na repu menija in obiskovalec ne vidi prvih gumbov */
    el.scrollTo({ left: 0, behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth" });
    roboveDrske(el);
    return;
  }
  roboveDrske(el);
  const preseg = el.scrollWidth - el.clientWidth;
  if (preseg <= 0) return;
  const r = a.getBoundingClientRect(), n = el.getBoundingClientRect();
  const z = el.scrollLeft, levi = r.left - n.left, desni = r.right - n.left;
  /* če je gumb že v celoti zunaj zbledenega roba, ne drsimo — vsako ponovno drsenje ob
     prebarvanju deluje kot trzanje menija */
  const robL = el.classList.contains("ima-levo") ? ZBLED : 0;
  const robD = el.classList.contains("ima-desno") ? ZBLED : 0;
  if (levi >= robL && desni <= el.clientWidth - robD) return;
  el.scrollTo({
    left: Math.max(0, Math.min(preseg, z + levi - (el.clientWidth - r.width) / 2)),
    behavior: matchMedia("(prefers-reduced-motion:reduce)").matches ? "auto" : "smooth"
  });
};
addEventListener("scroll", e => {
  if (e.target instanceof Element && (e.target.classList.contains("nav") || e.target.classList.contains("tabs")))
    roboveDrske(e.target);
}, { passive: true, capture: true });
addEventListener("resize", osveziRobove);

function mount(view) {
  if (stage.querySelector(`[data-view="${view}"]`)) return;
  const el = document.createElement("section");
  el.className = "view is-ahead";
  el.dataset.view = view;
  el.setAttribute("aria-hidden", "true");
  el.inert = true;
  el.innerHTML = VIEWS[view].render();
  stage.appendChild(el);
  requestAnimationFrame(() => requestAnimationFrame(() => {
    /* če je vmes novejši paint že razglasil drug pogled, smemo razglasiti tudi tega —
       sicer ostanejo razredli is-in in is-behind hkrati in se animacije prekrivajo */
    if (el._out || stack[stack.length - 1] !== view) return;
    el.classList.remove("is-ahead");
    el.classList.add("is-in");
    countUp(el);
  }));
}

function paint() {
  const top = stack[stack.length - 1];
  stage.querySelectorAll(".view").forEach(el => {
    const i = stack.indexOf(el.dataset.view);
    el.classList.remove("is-in", "is-behind", "is-ahead");
    if (i === -1) {
      /* element je že razpisan za odstranitev — ne podvojiti roka, sicer izbrise sveže nameščen pogled */
      el.classList.add("is-ahead");
      if (el._out) return;
      el._out = setTimeout(() => { el._out = 0; el.remove(); }, 700);
      return;
    }
    clearTimeout(el._out);
    el._out = 0;
    const isTop = i === stack.length - 1;
    el.classList.add(isTop ? "is-in" : "is-behind");
    el.setAttribute("aria-hidden", String(!isTop));
    el.inert = !isTop;
  });

  back.classList.toggle("show", stack.length > 1);
  nav.querySelectorAll("button").forEach(b => {
    const odprt = b.dataset.go === top;
    b.classList.toggle("on", odprt);
    /* Razred "on" je samo barva; bralnik zaslona mora vedeti, kateri pogled je odprt. */
    if (odprt) b.setAttribute("aria-current", "page");
    else b.removeAttribute("aria-current");
  });
  odpriNaAktivnem(nav);
  requestAnimationFrame(osveziRobove);

  trail.innerHTML = stack.map((v, i) => {
    const label = i === 0 ? "Domov" : VIEWS[v].label;
    const last = i === stack.length - 1;
    return `<button data-go="${v}" data-flat="1"${last ? ' aria-current="page"' : ""}>${label}</button>` +
      (last ? "" : '<span aria-hidden="true">›</span>');
  }).join("");
  trail.querySelectorAll("button").forEach(b => {
    b.disabled = b.dataset.go === top;
  });

  document.title = VIEWS[top].title;
  const url = "#" + top;
  const state = { stack: stack.slice() };
  if (userAction) history.pushState(state, "", url);
  else history.replaceState(state, "", url);

  if (userAction) {
    const h = stage.querySelector(`[data-view="${top}"] h1[tabindex="-1"], [data-view="${top}"] h2[tabindex="-1"]`);
    if (h) h.focus({ preventScroll: true });
    live.textContent = VIEWS[top].label;
  }
  userAction = false;
}

function setStack(next) {
  if (next[next.length - 1] === stack[stack.length - 1] && next.length === stack.length) return;
  stack = next;
  userAction = true;
  mount(stack[stack.length - 1]);
  paint();
  wire(stack[stack.length - 1]);
}
const go = (view, flat) => {
  if (!VIEWS[view]) return;
  if (view === "home") return setStack(["home"]);
  setStack(flat ? ["home", view] : [...stack, view]);
};
const pop = () => { if (stack.length > 1) setStack(stack.slice(0, -1)); };

/* ── obnašanje posameznih pogledov ─────────── */
function wire(view) {
  if (view === "gallery") wireGallery();
  if (view === "booking") wireForm();
}

/* ── razpored galerije: vsaka vrsta zapolni širino, ploščice ohranijo razmerje slike ── */
const GAL_MINH = 110;  /* pod to mejo rajši pustimo galerijo, da drsi, kot pa slike zdrobimo */
const GAL_MAXH = 560;
const GAL_MINW = 90;   /* ožje od tega pokončna slika postane rez, ki ga ni več mogoče brati */
const GAL_SLIM = 0.6;  /* pokončna slika je lahko obrezana toliko, da je še videti kot slika in ne kot stolpec */
const GAL_W = 1;       /* ponesrečen prekop pri prelomu vrstice stane več kot en piksel praznine */
const GAL_BAND = 0.86; /* col, v katerem višine vrstic nihajo: ožje deluje zmedeno, širše pa pusti luknje */

const galAr = (ar, h) => Math.max(ar, Math.max(GAL_MINW, GAL_SLIM * h) / h);
const galRowW = (ars, h, gap) => ars.reduce((s, ar) => s + galAr(ar, h) * h, 0) + gap * (ars.length - 1);

/* višina vrstice, pri kateri skupina slik točno zapolni širino polja */
function galFitH(ars, W, gap) {
  let h = (W - GAL_W - gap * (ars.length - 1)) / ars.reduce((a, b) => a + b, 0);
  for (let i = 0; i < 12; i++) {
    const w = galRowW(ars, h, gap);
    if (w <= W - GAL_W) break;
    h *= (W - GAL_W) / w;
  }
  return h;
}

/* razreži po vrsticah: vrsta se ustavi, ko bi naslednja slika njeno višino spustila pod mejo.
   Višine nikoli ne omejujemo na ciljno — takšna vrsta ne zapolni širine in pusti luknjo. */
function galRows(ars, hMax, W, gap) {
  const low = hMax * GAL_BAND;
  const rows = [];
  let cur = [];
  for (const ar of ars) {
    if (cur.length && galFitH([...cur, ar], W, gap) < low) { rows.push(cur); cur = []; }
    cur.push(ar);
  }
  if (cur.length) rows.push(cur);
  return rows.map(a => ({ a, h: Math.min(GAL_MAXH, galFitH(a, W, gap)) }));
}

/* na ozkem zaslonu vrste ne iščemo po višini — zaporedje jih pove samo, da se vrstica ne raztegne čez zaslon */
const galChunk = (ars, n) => { const r = []; for (let i = 0; i < ars.length; i += n) r.push(ars.slice(i, i + n)); return r; };

/* dve zelo široki sliki v par sestavita trak, ki ga ni več mogoče brati — tak par razpade na posamezni sliki.
   Meja je namenoma nižja od GAL_MINH: na telefonu par pri ~100 px še vedno deluje, razpad pa podvoji dolžino seznama. */
const GAL_CAPMIN = 84;
function galCapRows(ars, cap, W, gap) {
  const out = [];
  for (const chunk of galChunk(ars, cap)) {
    if (chunk.length > 1 && galFitH(chunk, W, gap) < GAL_CAPMIN) for (const ar of chunk) out.push([ar]);
    else out.push(chunk);
  }
  return out.map(a => ({ a, h: Math.min(GAL_MAXH, galFitH(a, W, gap)) }));
}

function galLayout() {
  const gal = document.getElementById("gal");
  if (!gal) return;
  const btns = [...gal.querySelectorAll("button")];
  const vis = btns.filter(b => !b.hidden);
  if (!vis.length) return;

  const cs = getComputedStyle(gal);
  /* na ozkem zaslonu CSS pove, koliko slik je najdlje v vrsti; tam galerija ne skriva prostora, ampak drsi */
  const cap = parseInt(cs.getPropertyValue("--gal-cap"), 10) || 0;
  /* do 900 px pogled ni raztegnjen po višini, zato višina polja ni omejitev — ne smemo stisniti vrstic v minimum */
  const flow = parseFloat(cs.flexGrow) <= 0;
  const W = Math.round(gal.clientWidth);
  const H = cap || flow ? Infinity : Math.max(240, gal.clientHeight);
  const key = `${W}x${H}x${gal.dataset.tab}x${gal.dataset.lok}x${vis.length}x${cap}`;
  if (key === gal._key) return;
  gal._key = key;

  const gap = parseFloat(cs.columnGap) || 10;
  const ars = vis.map(b => { const g = GAL[+b.dataset.lb]; return g.w / g.h; });
  const maxH = Math.min(H, GAL_MAXH);

  const total = hh => { const r = galRows(ars, hh, W, gap); return r.reduce((s, x) => s + x.h, 0) + gap * (r.length - 1); };
  /* skupna višina s ciljno višino vrstice ne raste zvezno (groupiranje je skokovito), zato kandidate preletimo
     od največje navzdol in vzamemo prvo, ki še zmore prostor — binarno iskanje bi lahko zlezlo na prelom */
  let hMax = GAL_MINH, used = -1;
  if (cap) hMax = GAL_MAXH;
  else if (flow) hMax = Math.round(Math.max(GAL_MINH, Math.min(220, W / 5)));  /* ~5 slik v vrsti, ostalo naj zapolni višina */
  else {
    for (let hh = maxH; hh >= GAL_MINH; hh -= 8) {
      const t = total(hh);
      if (t <= H) { used = t; hMax = hh; break; }
    }
    /* če ne zmore niti najnižja vrstica, galerija preprosto drsi */
  }
  /* če vrstic zmanjka, praznega pasu raje ne puščamo pod steno: blok centriramo */
  gal.style.alignContent = used >= 0 ? "center" : "flex-start";
  const rows = cap
    ? galCapRows(ars, cap, W, gap)
    : galRows(ars, hMax, W, gap);

  let n = 0;
  for (const r of rows) for (const ar of r.a) {
    const b = vis[n++];
    if (!b) return;
    b.style.width = Math.floor(galAr(ar, r.h) * r.h) + "px";
    b.style.height = Math.round(r.h) + "px";
  }
}

let galTab = "vse";
let galLok = "vse";

function galFilter() {
  const gal = document.getElementById("gal");
  if (!gal) return;
  gal.dataset.tab = galTab;
  gal.dataset.lok = galLok;
  const chips = (id, key, val) => {
    const row = document.getElementById(id);
    if (!row) return;
    row.querySelectorAll(".tab").forEach(b => {
      const on = b.dataset[key] === val;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
    });
  };
  chips("galTabs", "tab", galTab);
  chips("galLoks", "lok", galLok);
  let n = 0;
  gal.querySelectorAll("button").forEach(b => {
    b.hidden = (galTab !== "vse" && b.dataset.g !== galTab) ||
               (galLok !== "vse" && b.dataset.lok !== galLok);
    if (!b.hidden) n++;
  });
  /* prazna kombinacija je velaven odgovor, ne napaka: brez sporočila se zdi, da galerija ni naložila */
  const empty = document.getElementById("galEmpty");
  if (empty) {
    empty.hidden = n > 0;
    if (!n) {
      const drugje = GAL.filter(g => (galTab === "vse" || g.g === galTab) &&
                                     (galLok === "vse" || LOK(g) !== galLok)).length;
      document.getElementById("galEmptyTxt").textContent =
        `Za ${LOK_N[galLok]} te vsebine v arhivu še ni.` +
        (drugje ? ` Drugje imamo ${galCount(drugje)}.` : "");
    }
  }
  const meta = document.getElementById("galMeta");
  if (meta) meta.textContent = n ? `${galCount(n)} iz lastnega arhiva` : "v tej izbiri ni fotografij";
  gal._key = "";
  galLayout();
}

function wireGallery() {
  const gal = document.getElementById("gal");
  if (!gal) return;
  if (!gal.dataset.wired) {
    gal.dataset.wired = "1";
    gal.parentElement.querySelector(".tabsets").addEventListener("click", e => {
      const t = e.target.closest("[data-tab]");
      if (t) { galTab = t.dataset.tab; galFilter(); return; }
      const l = e.target.closest("[data-lok]");
      if (l) { galLok = l.dataset.lok; galFilter(); }
    });
    new ResizeObserver(() => galLayout()).observe(gal);
    document.getElementById("galReset").addEventListener("click", () => {
      galTab = "vse"; galLok = "vse"; galFilter();
    });
  }
  galFilter();
}

function wireForm() {
  const f = document.getElementById("rfq");
  if (!f || f.dataset.wired) return;
  f.dataset.wired = "1";
  const err = document.getElementById("rfqErr");
  const wa = document.getElementById("waLink");
  const fields = () => Object.fromEntries(new FormData(f).entries());
  /* ISO datum se primerja po abecedi enako kot po času, zato ga ne pretvarjamo v Date */
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const danes = iso(new Date());
  f.elements.prihod.min = f.elements.odhod.min = danes;
  const valid = () => ["ime", "kontakt", "prihod", "odhod"].every(n => f.elements[n].value) &&
    f.elements.prihod.value >= danes && f.elements.odhod.value >= f.elements.prihod.value;

  const sync = () => {
    const [a, b] = [f.elements.prihod, f.elements.odhod];
    /* na prihodu meja ostane današnji dan — če bi jo premaknili na izbrani datum, se polje zaklene
       in ga kupec ne more več popraviti na zgodnejši termin */
    b.min = a.value && a.value > danes ? a.value : danes;
    if (a.value && b.value) b.setCustomValidity(a.value > b.value ? "Odhod mora biti za prihodom." : "");
    err.hidden = true;
  };
  f.addEventListener("input", sync);

  /* polje, zaradi katerega obrazec še ne gre ven — vrstni red je enak kot pri veljavnosti */
  const pokvarjeno = () => ["ime", "kontakt", "prihod", "odhod"].find(n => !f.elements[n].value) ||
    (f.elements.prihod.value < danes ? "prihod" : f.elements.odhod.value < f.elements.prihod.value ? "odhod" : null);

  const send = () => {
    if (valid()) return fields();
    err.hidden = false;
    /* na telefonu se drsi celoten pogled, ne okno: brez drsenja sporočilo ostane pod prstom
       in kupec ne ve, kaj ga zadržuje. Fokus brez drsenja, sicer tekmuje z zgornjo potezo.
       Obrazec je novalidate — nativni mehurček bi govoril jezik brskalnika, gumb WhatsApp
       pa nativnega preverjanja sploh ne sproži, zato bi bilo opozoril dve različici */
    err.scrollIntoView({ behavior: "smooth", block: "center" });
    const bad = pokvarjeno();
    if (bad) f.elements[bad].focus({ preventScroll: true });
    return null;
  };
  f.addEventListener("submit", e => {
    e.preventDefault();
    const d = send();
    if (!d) return;
    const body = `Pozdravljeni,\n\n${d.spor || "Zanima me bivanje v River Kolpa Apartments."}\n\n` +
      `Ime: ${d.ime}\nKontakt: ${d.kontakt}\nPrihod: ${slDate(d.prihod)}\nOdhod: ${slDate(d.odhod)}\n` +
      `Oseb: ${d.osebe}\nEnota: ${d.enota}\n\nLep pozdrav,\n${d.ime}`;
    location.href = `mailto:${INFO.email}?subject=${encodeURIComponent("Povpraševanje " + slDate(d.prihod) + " — " + d.ime)}&body=${encodeURIComponent(body)}`;
  });
  document.getElementById("waBtn").addEventListener("click", () => {
    const d = send();
    if (!d) return;
    const text = d.spor ? `${d.spor}\n\n` : "";
    location.href = waHref({ ...d, spor: text ? d.spor : "" });
  });
  wa.addEventListener("click", () => { if (valid()) wa.href = waHref(fields()); });
}

/* ── lightbox ──────────────────────────────── */
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbCap = document.getElementById("lbCap");
let lbi = 0;
let lbList = [];
let lbOpener = null;

function showLb(i) {
  lbi = (i + lbList.length) % lbList.length;
  const g = lbList[lbi];
  lbImg.src = `assets/${g.f}.jpg`;
  lbImg.alt = g.t;
  lbCap.textContent = `${lbi + 1} / ${lbList.length} — ${g.t}${LOK(g) !== "70" ? ` · ${LOK_N[LOK(g)]}` : ""}`;
  /* naslednja se naloži šele, ko je trenutna na zaslonu, da z njo ne tekmuje za pas */
  lbImg.onload = () => { new Image().src = `assets/${lbList[(lbi + 1) % lbList.length].f}.jpg`; };
}
function openLb(i, from) {
  const visible = [...document.querySelectorAll("#gal button:not([hidden])")].map(b => +b.dataset.lb);
  const list = visible.length ? visible : GAL.map((_, n) => n);
  lbList = list.map(n => GAL[n]);
  showLb(Math.max(0, list.indexOf(i)));
  lbOpener = from || document.activeElement;
  if (!lb.open) lb.showModal();
}
lb.addEventListener("close", () => { if (lbOpener && lbOpener.isConnected) lbOpener.focus({ preventScroll: true }); });
document.getElementById("lbClose").onclick = () => lb.close();
document.getElementById("lbPrev").onclick = () => showLb(lbi - 1);
document.getElementById("lbNext").onclick = () => showLb(lbi + 1);
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });

/* ── dogodki ───────────────────────────────── */
document.addEventListener("click", e => {
  const t = e.target.closest("[data-lb]");
  if (t) { openLb(+t.dataset.lb, t); return; }
  const g = e.target.closest("[data-go]");
  if (g) {
    e.preventDefault();
    if (g.dataset.gtab) galTab = g.dataset.gtab;
    if (g.dataset.glok) galLok = g.dataset.glok;
    go(g.dataset.go, g.dataset.flat === "1");
  }
});
back.onclick = pop;
document.addEventListener("keydown", e => {
  if (lb.open) {
    if (e.key === "ArrowLeft") showLb(lbi - 1);
    if (e.key === "ArrowRight") showLb(lbi + 1);
    return;
  }
  if (e.key === "Escape") pop();
});
/* ročno vpisan ali zunanji #pogled: ujame stanje brez novega zapisa v zgodovini */
window.addEventListener("hashchange", () => {
  const v = location.hash.replace("#", "");
  if (!VIEWS[v] || v === stack[stack.length - 1]) return;
  stack = v === "home" ? ["home"] : ["home", v];
  mount(stack[stack.length - 1]);
  paint();
  wire(stack[stack.length - 1]);
});
window.addEventListener("popstate", e => {
  /* Chrome in Safari ob vsakem prelomu zavihka posljeta tudi prazen popstate; takrat namen
     pove kar #v naslovu, ki ga ujame hashchange. Brez tega bi zgodovina prepisala URL nazaj. */
  const s = Array.isArray(e.state?.stack) ? e.state.stack.filter(v => VIEWS[v]) : null;
  if (!s) return;
  stack = s;
  mount(stack[stack.length - 1]);
  paint();
  wire(stack[stack.length - 1]);
});

/* odmik vsebine pod vrhnjo in spodnjo vrstico, ki se na ozkih zaslonih prelamljata */
const topbarEl = document.querySelector(".topbar");
const footEl = document.querySelector(".foot");
const syncBars = () => {
  document.documentElement.style.setProperty("--tb", Math.round(topbarEl.getBoundingClientRect().height) + "px");
  document.documentElement.style.setProperty("--fb", Math.round(footEl.getBoundingClientRect().height) + "px");
};
new ResizeObserver(syncBars).observe(topbarEl);
new ResizeObserver(syncBars).observe(footEl);
syncBars();
osveziRobove();

/* ── številke, paralaksa, nagib ploščic ────── */
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;

function countUp(view) {
  if (calm) return;
  view.querySelectorAll(".fact b").forEach((b, i) => {
    const raw = b.textContent.trim();
    const m = raw.match(/^\d+(?:[.,]\d+)?/);
    if (!m) return;
    const target = parseFloat(m[0].replace(",", "."));
    const dec = (m[0].split(/[.,]/)[1] || "").length;
    const tail = raw.slice(m[0].length);
    const dur = 880 + i * 90;
    const t0 = performance.now();
    const step = now => {
      const p = Math.min(1, (now - t0) / dur);
      const v = target * (1 - Math.pow(1 - p, 3));
      b.textContent = (dec ? v.toFixed(dec).replace(".", ",") : String(Math.round(v))) + tail;
      if (p < 1) requestAnimationFrame(step);
      else b.textContent = raw;
    };
    requestAnimationFrame(step);
  });
}

if (fine && !calm) {
  let queued = false, nx = 0, ny = 0, tilt = null, tx = 0, ty = 0;
  addEventListener("pointermove", e => {
    nx = e.clientX / innerWidth - .5;
    ny = e.clientY / innerHeight - .5;
    const d = e.target.closest ? e.target.closest(".door") : null;
    if (d !== tilt) {
      if (tilt) { tilt.style.removeProperty("--rx"); tilt.style.removeProperty("--ry"); }
      tilt = d;
    }
    if (tilt) {
      const r = tilt.getBoundingClientRect();
      tx = ((e.clientY - r.top) / r.height - .5) * -7;
      ty = ((e.clientX - r.left) / r.width - .5) * 7;
    }
    if (!queued) {
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        const h = stage.querySelector('.view[data-view="home"]');
        if (h) { h.style.setProperty("--px", nx.toFixed(3)); h.style.setProperty("--py", ny.toFixed(3)); }
        if (tilt) { tilt.style.setProperty("--rx", tx.toFixed(2) + "deg"); tilt.style.setProperty("--ry", ty.toFixed(2) + "deg"); }
      });
    }
  }, { passive: true });
}

const start = decodeURIComponent(location.hash.slice(1));
stack = VIEWS[start] && start !== "home" ? ["home", start] : ["home"];
mount(stack[0]);
if (stack.length > 1) mount(stack[1]);
paint();
wire(stack[stack.length - 1]);

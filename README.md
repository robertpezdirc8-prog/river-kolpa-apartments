# River Kolpa Apartments

Statična promocijska stran za dva apartmaja ob Kolpi v Gribljah. Brez odvisnosti,
brez gradbenega koraka, brez okvirja: tri datoteke in mapa slik.

```
index.html     glava, nosilna lupina, JSON-LD
styles.css     videz in prelomi
app.js         vsebina pogledov in obnašanje (usmerjanje, galerija, obrazec)
assets/        izvirne slike (webp + rezerva v jpg)
assets/t/      ploščice 640 px za srcset
fonts.css      @font-face za doma z gostovane pisave
fonts/         woff2 nabora latin in latin-ext, licenca OFL
serve.mjs      lokalni predogled
check.mjs      predpotisna vrata
```

## Predogled

```
node serve.mjs 8731      # http://localhost:8731
```

## Pred vsakim potisom

```
node check.mjs           # izstopi z 1, če kaj štrli
```

Vrata preverijo razčlenjevanje JS, obstoj vsake referencirane slike, trojico
izvirnik / ploščica / rezerva za vse fotografije v galeriji, absolutne naslove v
glavi, težo posamezne datoteke in to, da nobena pisava ne prihaja več od tretjega
ponudnika. Isti klic teče tudi v GitHub Actions (`.github/workflows/preverba.yml`),
zato potis, ki ga lokalno ne preverite, dobi rdečo oznako kar na GitHubu.

## Pisave

Cormorant Garamond in Manrope sta gostovani v mapi `fonts/`, obe pod licenco SIL Open
Font License 1.1; besedilo licence je priloženo. Obe družini sta variabilni, zato
šest datotek pokrije vse uporabljene teže. Izvirnik obeh je `github.com/google/fonts`;
če kdaj zamenjate pisavo ali teže, jih snemite z `node` skripto, ki razčleni CSS
storitve Google Fonts po naborih `latin` in `latin-ext` in združi enake bajte.

Stran zato ob obisku ne vzpostavi nobene zunanje povezave. To ni le hitrost: preklic
Google Fonts na strežnik Googla posreduje naslov IP in glavo odjemalca, kar je za
poslovno stran v Uniji zbiranje osebnih podatkov brez podlage.

## Objava

Branch `main` GitHub Pages streže neposredno iz korena repozitorija. Ni gradbenega
koraka: potis na `main` je objava, Actions samo preverijo, da objava ni pokvarjena.
Stran je enostranska z usmerjanjem po zavihkih (`#gallery`, `#booking` …), zato Pages
ne potrebuje nobenega preusmerjevalnega pravila.

## Dolgi, ki jih je treba vedeti

- Vsebina je v `app.js` zapisana kot predloge. To je zavedna odločitev: stran ima
  en sam dokument in nobenega strežnika. Urejanje v HTML ni mogoče.
- `assets/og.jpg` in absolutni naslovi v `index.html` so vezani na trenutno domeno
  Pages. Ob preklopu na lastno domeno je treba štiri napisane naslove v glavi, dva v
  JSON-LD in enega v `check.mjs` zamenjati naenkrat.
- `aggregateRating` v JSON-LD prihaja z lastne strani. Google samopredstavljene ocene
  obravnava kot kršitev pravil za bogate zadetke in jih lahko ne upošteva.

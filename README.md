# River Kolpa Apartments

Statična promocijska stran za dva apartmaja ob Kolpi v Gribljah. Brez odvisnosti,
brez gradbenega koraka, brez okvirja: tri datoteke in mapa slik.

```
index.html     glava, nosilna lupina, JSON-LD
styles.css     videz in prelomi
app.js         vsebina pogledov in obnašanje (usmerjanje, galerija, obrazec)
assets/        izvirne slike (webp + rezerva v jpg)
assets/t/      ploščice 640 px za srcset
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
glavi in težo posamezne datoteke.

## Objava

Branch `main` GitHub Pages streže neposredno iz korena repozitorija. Ni gradnje in
ni CI: potis na `main` je objava. Stran je enostranska z usmerjanjem po zavihkih
(`#gallery`, `#booking` …), zato Pages ne potrebuje nobenega preusmerjevalnega
pravila.

## Dolgi, ki jih je treba vedeti

- Vsebina je v `app.js` zapisana kot predloge. To je zavedna odločitev: stran ima
  en sam dokument in nobenega strežnika. Urejanje v HTML ni mogoče.
- `assets/og.jpg` in absolutni naslovi v `index.html` so vezani na trenutno domeno
  Pages. Ob preklopu na lastno domeno je treba štiri napisane naslove v glavi, dva v
  JSON-LD in enega v `check.mjs` zamenjati naenkrat.
- `aggregateRating` v JSON-LD prihaja z lastne strani. Google samopredstavljene ocene
  obravnava kot kršitev pravil za bogate zadetke in jih lahko ne upošteva.

/* River Kolpa Apartments — nemščina in angleščina za tuje goste.
   ──────────────────────────────────────────────────────────────
   Predloge v app.js ostanejo slovenske; prevedena je samo beseda, ki jo gost vidi.
   Slovar je vezan na slovenski napis in ne na ime spremenljivke, ker se napisi v predlogah
   rodijo že izpisani — sicer bi bilo treba prepisati vsako vrstico predloge.
   Prevajanje teče za izrisom (MutationObserver), zato ga ne sme pozabiti noben nov napis:
   niti odtis v nogi, niti števec fotografij, niti naslov zavihka.
   Kadar napis ostane slovenski, se samodejno zabeleži v JEZIKI.manjka(); z ?jezik=audit
   se izpiše v konzolo, da se luknja v slovarju pokaže namesto da jo zaspi gost. */

/*---------------------------- NEMŠČINA ------------------------------*/
const DE_JEZIK = {
  /* okvir strani: glava, noga, stikala */
  "River Kolpa Apartments — dve hiši ob reki Kolpi, Griblje": "River Kolpa Apartments — Zwei Häuser an der Kolpa, Griblje",
  "River Kolpa Apartments — štirje apartmaji v dveh hišah ob Kolpi, Griblje, Bela krajina": "River Kolpa Apartments — Vier Apartments in zwei Häusern an der Kolpa, Griblje, Bela Krajina",
  "River Kolpa Apartments — domov": "River Kolpa Apartments — zur Startseite",
  "Griblje · Bela krajina": "Griblje · Weißkrain",
  "Preskoči na vsebino": "Zum Inhalt springen",
  "Glavna navigacija": "Hauptnavigation",
  "Nazaj na prejšnji pogled": "Zurück zur vorherigen Ansicht",
  "Nazaj": "Zurück",
  "Prosti termini": "Freie Termine",
  "Trenutna lokacija": "Aktueller Standort",
  "Jezik": "Sprache",
  "Ponudnik: LOGIS APARTMENTS, Majda Pezdirc s.p. · Griblje 30 B, 8332 Gradac · matična št. 9057641000 · davčna št. SI97033910": "Anbieter: LOGIS APARTMENTS, Majda Pezdirc s.p. · Griblje 30 B, 8332 Gradac · Firmenbuch-Nr. 9057641000 · USt-IdNr. SI97033910",
  "Fotografija v polni velikosti": "Foto in voller Größe",
  "Zapri": "Schließen",
  "Prejšnja fotografija": "Vorheriges Foto",
  "Naslednja fotografija": "Nächstes Foto",
  "Domov": "Start",
  "Lokaciji": "Häuser",
  "Lokaciji — River Kolpa Apartments": "Häuser — River Kolpa Apartments",
  "Galerija": "Galerie",
  "Galerija — River Kolpa Apartments": "Galerie — River Kolpa Apartments",
  "Vrt": "Garten",
  "Vrt in jacuzzi — River Kolpa Apartments": "Garten und Jacuzzi — River Kolpa Apartments",
  "Vrt in jacuzzi": "Garten und Jacuzzi",
  "Reka Kolpa": "Kolpa",
  "Reka Kolpa — River Kolpa Apartments": "Kolpa — River Kolpa Apartments",
  "Reka": "Fluss",
  "Okolica": "Umgebung",
  "Okolica — River Kolpa Apartments": "Umgebung — River Kolpa Apartments",
  "Prosti termini in kontakt — River Kolpa Apartments": "Freie Termine und Kontakt — River Kolpa Apartments",
  "Griblje 70 — dva apartmaja — River Kolpa Apartments": "Griblje 70 — zwei Apartments — River Kolpa Apartments",
  "Griblje 30 b — dva apartmaja — River Kolpa Apartments": "Griblje 30 b — zwei Apartments — River Kolpa Apartments",

  /* naslovnica */
  "Dve hiši": "Zwei Häuser",
  "ob reki": "an der",
  "Kolpi": "Kolpa",
  "Griblje · Bela krajina · Slovenija": "Griblje · Weißkrain · Slowenien",
  "Štirje samostojni apartmaji v dveh hišah v Gribljah ob reki Kolpi. Vsaka hiša ima teraso, jacuzzi in urejen vrt, obe pa vodi ista gostiteljica — izberite tisto, ki je prosta v vašem terminu.":
    "Vier unabhängige Apartments in zwei Häusern in Griblje an der Kolpa. Jedes Haus hat Terrasse, Jacuzzi und gepflegten Garten, beide führt dieselbe Gastgeberin — wählen Sie das Haus, das zu Ihrem Termin frei ist.",
  "apartmaji v dveh hišah": "Apartments in zwei Häusern",
  "naslova v Gribljah": "Adressen in Griblje",
  "in urejen vrt": "und gepflegter Garten",
  "· 8 mnenj": "· 8 Bewertungen",
  "8 mnenj": "8 Bewertungen",
  "Preverite proste termine": "Verfügbare Termine prüfen",
  "Izberite hišo": "Haus wählen",
  "Vodi jo": "Ihre Gastgeberin",
  "· odgovorimo v nekaj urah, po telefonu in prek WhatsAppa tudi v soboto.":
    "· wir antworten innerhalb weniger Stunden, samstags auch telefonisch und per WhatsApp.",
  "Griblje 70 in Griblje 30 b": "Griblje 70 und Griblje 30 b",
  "Terasa, žar, letna kuhinja": "Terrasse, Grill, Sommerküche",
  "Kopališče deset minut hoje": "Strandbad in zehn Gehminuten",
  "Vasi, kleti in poti": "Dörfer, Keller und Wege",
  "Povpraševanje in kontakt": "Anfrage und Kontakt",

  /* obe hiši */
  "Dva naslovov": "Zwei Adressen",
  "Ista zasnova, dve hiši": "Gleiche Idee, zwei Häuser",
  "Majda Pezdirc gosti v dveh hišah v Gribljah, vsaka z dvema samostojnima apartmajema. Obe imata teraso, jacuzzi in urejen vrt, zato je izkušnja enaka — razlikujeta se razpored prostorov in zunanjost.":
    "Majda Pezdirc empfängt in zwei Häusern in Griblje, jedes mit zwei unabhängigen Apartments. Beide haben Terrasse, Jacuzzi und gepflegten Garten — der Aufenthalt ist gleich, nur der Grundriss und die Außenseite unterscheiden sich.",
  "Oglejte si hišo": "Haus ansehen",
  "Fotografije": "Fotos",
  "Zemljevid": "Karte",
  "Druga hiša:": "Zweites Haus:",
  "v galeriji": "in der Galerie",
  "Obe hiši sta v istem kraju, vsaka ima svoj vstop in svoj travnik. Natančen naslov izbrane hiše pošljemo ob potrditvi rezervacije.":
    "Beide Häuser stehen im selben Ort, jedes hat einen eigenen Eingang und eine eigene Wiese. Die genaue Adresse des gewählten Hauses senden wir mit der Buchungsbestätigung.",
  "dva apartmaja · 7 in 5 oseb": "zwei Apartments · 7 und 5 Personen",
  "dva apartmaja": "zwei Apartments",
  "Prenovljena hiša z dvema enotama": "Renoviertes Haus mit zwei Einheiten",
  "Ločena vhoda in terasi, skupen ograjen vrt s pergolo, letno kuhinjo in jacuzzijem. Do naravnega kopališča na Kolpi je deset minut hoje po ravni poti.":
    "Zwei getrennte Eingänge und Terrassen, gemeinsamer umzäunter Garten mit Pergola, Sommerküche und Jacuzzi. Zum Naturbad an der Kolpa sind es zehn Minuten auf ebenem Weg.",
  "samostojni enoti": "unabhängige Einheiten",
  "oseb": "Personen",
  "hoje do reke": "Gehzeit zum Fluss",
  "Hiša s teraso, jacuzzijem in travnikom": "Haus mit Terrasse, Jacuzzi und Wiese",
  "Dva samostojna apartmaja v urejeni hiši. Na voljo sta kuhinja s pečico in štedilnikom ter kopalnica s tušem in pralnim strojem, pred hišo pa nadstrešena terasa z jacuzzijem in travnik z nogometnimi vrati.":
    "Zwei unabhängige Apartments in einem gepflegten Haus. Küche mit Backofen und Herd sowie Bad mit Dusche und Waschmaschine sind vorhanden, davor eine überdachte Terrasse mit Jacuzzi und eine Wiese mit Fußballtoren.",
  "samostojna apartmaja": "unabhängige Apartments",
  "pod nadstreškom": "unter dem Vordach",
  "z nogometnimi vrati": "mit Fußballtoren",
  "in pralni stroj": "und Waschmaschine",
  "travnik": "Wiese",
  "tuš": "Dusche",
  /* V slovenski predlogi je napisana mala začetnica, nemščina pa samostalnik piše z veliko. */
  "jacuzzi": "Jacuzzi",

  /* Griblje 70 */
  "Nastanitev ·": "Unterkunft ·",
  "Dva samostojna apartmaja": "Zwei unabhängige Apartments",
  "Prenovljena hiša ima dve samostojni enoti, vsaka s svojim vhodom in svojo teraso. Spodaj sta razpored ležišč in opis opreme posamezne enote.":
    "Das renovierte Haus hat zwei unabhängige Einheiten, jede mit eigenem Eingang und eigener Terrasse. Unten stehen die Aufteilung der Schlafplätze und die Ausstattung der einzelnen Einheit.",
  "Dnevni prostor apartmaja": "Wohnraum des Apartments",
  "Apartma z dvema spalnicama": "Apartment mit zwei Schlafzimmern",
  "7 oseb · 7 ležišč · lastna terasa": "7 Personen · 7 Schlafplätze · eigene Terrasse",
  "Spalnice": "Schlafzimmer",
  "V eni sobi tri postelje, v drugi dve nadstavni — skupaj sedem ležišč in velika omara za stvari.":
    "In einem Zimmer drei Betten, im zweiten zwei Etagenbetten — zusammen sieben Schlafplätze und ein großer Schrank.",
  "Dnevni del": "Wohnbereich",
  "Kutna zofa, jedilna miza pod lesenimi gredami, raven televizor, klimatska naprava, ogrevanje in štedilnik na drva.":
    "Ecksofa, Esstisch unter Holzbalken, Flachbild-TV, Klimaanlage, Heizung und Holzofen.",
  "Kuhinja": "Küche",
  "Štedilnik na plin s pečico in indukcijska plošča, dva hladilnika, mikrovalna, aparat za palačinke, blender, kavni aparat in kotliček.":
    "Gasherd mit Backofen und Induktionsfeld, zwei Kühlschränke, Mikrowelle, Palatschinken-Gerät, Mixer, Kaffeemaschine und Wasserkocher.",
  "Pokrita terasa ob hiši": "Überdachte Terrasse am Haus",
  "Studio s teraso": "Studio mit Terrasse",
  "5 oseb · nadstavna postelja in raztegljiv kavč": "5 Personen · Etagenbett und Schlafsofa",
  "Ležišča": "Schlafplätze",
  "Nadstavna postelja in raztegljiv kavč — udobno za štiri do pet oseb.":
    "Etagenbett und ausziehbares Sofa — bequem für vier bis fünf Personen.",
  "Zunanji prostor": "Außenbereich",
  "Lastna terasa z mizo in stoli, obrnjena v vrt.": "Eigene Terrasse mit Tisch und Stühlen, zum Garten hin.",
  "Oprema": "Ausstattung",
  "Klimatska naprava, ogrevanje, brezplačen WiFi in parkirišče tik ob hiši.":
    "Klimaanlage, Heizung, kostenfreies WLAN und ein Parkplatz direkt am Haus.",
  "Skupno": "Gemeinsam",
  "Vrt, jacuzzi, letna kuhinja in žar so skupni za obe enoti; vsaka družina ima svoj del terase.":
    "Garten, Jacuzzi, Sommerküche und Grill werden von beiden Einheiten genutzt; jede Familie hat ihren eigenen Terrassenteil.",

  /* Griblje 30 b */
  "Vse fotografije so iz našega arhiva. Katera soba je v katerem apartmaju in kateri od obeh apartmajev je v vašem terminu prost, preverimo ob povpraševanju — razporeda, ki ga nimamo potrjenega, na strani ne objavljamo.":
    "Alle Fotos stammen aus unserem eigenen Archiv. Welcher Raum zu welchem Apartment gehört und welches der beiden Apartments zu Ihrem Termin frei ist, prüfen wir bei der Anfrage — eine Aufteilung, die wir nicht bestätigt haben, veröffentlichen wir nicht.",

  /* vrt */
  "· Zunaj": "· Außenbereich",
  "Večer, ki se ne konča": "Ein Abend, der nicht enden will",
  "Pod pergolo z belimi zavesami je dolga miza, ob njej letna kuhinja s ploščo za kuho in umivalnikom. Za vogalom sta žar in jacuzzi, naprej pa urejena trata z dvema ležalnikoma in gugalnim kokonom med bršljanom — vse blizu terase.":
    "Unter der Pergola mit weißen Vorhängen steht ein langer Tisch, daneben die Sommerküche mit Kochplatte und Spüle. Hinter der Ecke liegen Grill und Jacuzzi, weiter vorn der gepflegte Rasen mit zwei Liegen und einer Hängeschaukel im Efeu — alles nahe der Terrasse.",
  "pri mizi pod pergolo": "Plätze am Tisch unter der Pergola",
  "oseb v jacuzziju": "Personen im Jacuzzi",
  "ležalnika in gugalnik": "Zwei Liegen und Hängeschaukel",
  "ograjen vrt": "umzäunter Garten",
  "Jacuzzi je na voljo proti doplačilu; dogovorimo se ob rezervaciji, da ga pred prihodom ogrejemo.":
    "Der Jacuzzi ist gegen Aufpreis verfügbar; wir vereinbaren das bei der Buchung, damit er vor Ihrer Ankunft warm ist.",
  "Letna kuhinja": "Sommerküche",
  "Jacuzzi in žar": "Jacuzzi und Grill",

  /* reka */
  "Deset minut hoje do vode": "Zehn Gehminuten bis zum Wasser",
  "Naravno kopališče z urejenim bregom in plitvinami je deset minut hoje po ravni poti med polji. Voda se poleti segreje nad dvajsetimi stopinjami, ob reki pa vodita učna in kolesarska pot. Namesto bazena v vrtu je na voljo kar cela reka.":
    "Das Naturbad mit gepflegtem Ufer und flachen Stellen ist zehn Minuten entfernt, auf ebenem Weg zwischen den Feldern. Das Wasser erwärmt sich im Sommer auf über zwanzig Grad, am Fluss führen ein Lehrpfad und ein Radweg entlang. Statt eines Pools im Garten steht der ganze Fluss zur Verfügung.",
  "hoje do kopališča": "Gehzeit zum Strandbad",
  "voda poleti": "Wassertemperatur im Sommer",
  "in SUP, izposoja v bližini": "und SUP, Verleih in der Nähe",
  "v bližini, z dovoljenjem": "in der Nähe, mit Erlaubnis",
  "Kanu": "Kanu",
  "Ribolov": "Angeln",
  "Fotografije reke": "Fotos vom Fluss",

  /* okolica */
  "Kaj naprej": "Wie es weitergeht",
  "Dolina, ki živi po ritmu reke": "Ein Tal, das im Rhythmus des Flusses lebt",
  "Od hiše je deset minut hoje do kolpske plaže. Naprej so belokranjske vasi, vinske kleti in poti, ki peljejo ob vodi ali po hribu.":
    "Vom Haus sind es zehn Gehminuten zum Kolpa-Strand. Dahinter liegen die Dörfer der Bela Krajina, Weinkeller und Wege, die am Wasser entlang oder den Hügel hinauf führen.",
  "Ob reki": "Am Fluss",
  "Kopališča in kanu": "Baden und Kanu",
  "Belokranjska riviera — kopanje, kajak in SUP; do vode je deset minut hoje.":
    "Riviera der Bela Krajina — Schwimmen, Kajak und SUP; zum Wasser sind es zehn Gehminuten.",
  "Aktivno": "Aktiv",
  "Pohodništvo in kolesarjenje": "Wandern und Radfahren",
  "Pot ob Kolpi, Gradac, Adlešiči in Vinjska cesta; začetne točke so v kraju.":
    "Kolpa-Weg, Gradac, Adlešiči und Weinstraße; die Startpunkte liegen im Ort.",
  "Izročilo": "Brauchtum",
  "Vasi in domače kmetije": "Dörfer und Bauernhöfe",
  "Bučno olje, vino, kruh in sir — večinoma na voljo ves teden.":
    "Kürbiskernöl, Wein, Brot und Käse — meist die ganze Woche verfügbar.",
  "Lokacija": "Lage",
  "Na meji s Hrvaško": "An der Grenze zu Kroatien",
  "Nekdanji prehodi ob reki so spet odprti — zvečer sta v igri dve državi.":
    "Die ehemaligen Übergänge am Fluss sind wieder offen — abends sind zwei Länder im Spiel.",

  /* galerija */
  "Pogled naokoli": "Blick nach allen Seiten",
  "Filtriraj fotografije po hiši": "Fotos nach Haus filtern",
  "Filtriraj fotografije po vsebini": "Fotos nach Inhalt filtern",
  "Obe hiši": "Beide Häuser",
  "Vse": "Alle",
  "Vrt in hiša": "Garten und Haus",
  "Notranjost": "Innenräume",
  "Doživetja": "Erlebnisse",
  "iz lastnega arhiva": "aus dem eigenen Archiv",
  "v tej izbiri ni fotografij": "in dieser Auswahl sind keine Fotos",
  "Za": "Für",
  "te vsebine v arhivu še ni.": "haben wir diese Bilder noch nicht im Archiv.",
  "Drugje imamo": "An anderer Stelle haben wir",
  "Pokaži vse fotografije": "Alle Fotos zeigen",
  "fotografija": "Bild",
  "fotografiji": "Bilder",
  "fotografije": "Bilder",
  "fotografij": "Bilder",

  /* rezervacija in kontakt */
  "Kontakt": "Kontakt",
  "Najhitreje po telefonu ali prek WhatsAppa. Cene so odvisne od termina in števila oseb, zato jih ne objavljamo naslepo — pošljite povpraševanje ali preverite razpoložljivost hiše v Gribljah 70 na Booking.com.":
    "Am schnellsten telefonisch oder per WhatsApp. Die Preise hängen vom Termin und der Personenzahl ab, deshalb nennen wir sie nicht pauschal — senden Sie eine Anfrage oder prüfen Sie die Verfügbarkeit des Hauses in Griblje 70 auf Booking.com.",
  "Pokličite": "Anrufen",
  "Odgovor v nekaj urah": "Antwort in wenigen Stunden",
  "E-pošta": "E-Mail",
  "od 10 ·": "von 10 ·",
  "Povpraševanje": "Anfrage",
  "Izpolnite obrazec in odprl se bo vaš e-poštni program ali WhatsApp s pripravljenim sporočilom. Pri enoti navedite hišo — Griblje 70 ali Griblje 30 b — da vam takoj odgovorimo z razpoložljivostjo prav te hiše. Odgovorimo v nekaj urah.":
    "Füllen Sie das Formular aus, dann öffnet Ihr E-Mail-Programm oder WhatsApp mit einer fertigen Nachricht. Geben Sie bei der Einheit das Haus an — Griblje 70 oder Griblje 30 b — damit wir Ihnen sofort die Verfügbarkeit genau dieses Hauses nennen können. Wir antworten in wenigen Stunden.",
  "Ime in priimek": "Name",
  "Janez Novak": "Max Mustermann",
  "Telefon ali e-pošta": "Telefon oder E-Mail",
  "Prihod": "Anreise",
  "Odhod": "Abreise",
  "Število oseb": "Personenanzahl",
  "več kot 12": "mehr als 12",
  "Enota": "Einheit",
  "Sporočilo": "Nachricht",
  "Zanima naju termin v juliju, prihajava z dvema otrokoma in psom.":
    "Wir interessieren uns für einen Termin im Juli, kommen mit zwei Kindern und einem Hund.",
  "Pošlji po e-pošti": "Per E-Mail senden",
  "Pošlji prek WhatsAppa": "Per WhatsApp senden",
  "Potrebujete ime, kontakt, datum prihoda in odhoda.":
    "Sie brauchen Name, Kontakt sowie An- und Abreisedatum.",
  "Hišna pravila": "Hausregeln",
  "Pogosta vprašanja": "Häufige Fragen",
  "Griblje 70 — apartma za 7 oseb": "Griblje 70 — Apartment für 7 Personen",
  "Griblje 70 — studio za 5 oseb": "Griblje 70 — Studio für 5 Personen",
  "Griblje 70 — oba apartmaja": "Griblje 70 — beide Apartments",
  "Griblje 30 b — en apartma": "Griblje 30 b — ein Apartment",
  "Griblje 30 b — oba apartmaja": "Griblje 30 b — beide Apartments",
  "Še ne vem — svetujte": "Ich bin noch unsicher — bitte beraten",

  /* oprema */
  "Brezplačen WiFi": "Kostenfreies WLAN",
  "Brezplačno parkirišče, brez rezervacije": "Kostenfreie Parkplätze, ohne Reservierung",
  "Klimatska naprava in ogrevanje": "Klimaanlage und Heizung",
  "Štedilnik na drva": "Holzofen",
  "Popolnoma opremljena kuhinja": "Voll ausgestattete Küche",
  "Jacuzzi na vrtu, proti doplačilu": "Jacuzzi im Garten, gegen Aufpreis",
  "Kanu, kajak in SUP v bližini": "Kanu, Kajak und SUP in der Nähe",
  "Hišni ljubljenčki dovoljeni, doplačilo 20 €": "Haustiere erlaubt, Aufpreis 20 €",
  "Ograjen vrt in travnik za otroke": "Umzäunter Garten und Wiese für Kinder",
  "Masaža po predhodnem dogovoru": "Massage nach Vereinbarung",

  /* ocene */
  "Čistoča": "Sauberkeit",
  "Udobje": "Komfort",
  "Storitve": "Service",
  "Osebje": "Personal",
  "Cena / kakovost": "Preis / Leistung",
  "Slovenija": "Slowenien",
  "Izjemno lepo opremljena in čista počitniška hišica, ki nudi popolno zasebnost s popolnoma ograjenim vrtom.":
    "Ferienhaus mit außergewöhnlich schöner Ausstattung und sehr sauber, dank völlig umzäuntem Garten absolute Privatsphäre.",
  "Zelo prijazna in topla gostiteljica, lepo stanovanje in prostorna terasa z veliko zasebnosti, zelo dobro opremljena letna kuhinja.":
    "Sehr freundliche und herzliche Gastgeberin, schöne Wohnung und große Terrasse mit viel Privatsphäre, sehr gut ausgestattete Sommerküche.",
  "Krasen apartma, Majda je super gostiteljica, okolica je prekrasna, do najbližjega kopališča se sprehodiš po prelepi, mirni poti med polji.":
    "Wunderschönes Apartment, Majda ist eine großartige Gastgeberin, die Gegend ist herrlich, zum nächsten Bad führt ein schöner, ruhiger Weg zwischen den Feldern.",

  /* pravila */
  "Prijava in odjava": "Anreise und Abreise",
  "Prijava med 15.00 in 22.00, odjava med 9.30 in 10.00": "Anreise zwischen 15.00 und 22.00, Abreise zwischen 9.30 und 10.00",
  "Prosimo, vnaprej sporočite predvideni čas prihoda": "Bitte teilen Sie uns die voraussichtliche Ankunftszeit vorab mit",
  "Za prijavo ni starostnih omejitev": "Für die Anreise gibt es keine Altersbeschränkung",
  "Otroci in posteljice": "Kinder und Gitterbetten",
  "Otroci vseh starosti so dobrodošli": "Kinder aller Altersgruppen sind willkommen",
  "Posteljice in dodatna ležišča v tej nastanitvi niso na voljo": "Gitterbetten und Zustellbetten sind in dieser Unterkunft nicht verfügbar",
  "Cena je odvisna od števila oseb, zato pri povpraševanju navedite starost otrok":
    "Der Preis hängt von der Personenzahl ab, bitte geben Sie bei der Anfrage das Alter der Kinder an",
  "Hišni ljubljenčki in kajenje": "Haustiere und Rauchen",
  "Ljubljenčki so dovoljeni ob predhodni najavi, doplačilo 20 € na bivanje":
    "Haustiere sind nach Vorankündigung erlaubt, Aufpreis 20 € pro Aufenthalt",
  "Kajenje v vseh prostorih je prepovedano": "In allen Räumen ist Rauchen verboten",
  "Zabave, dekliščine in fantovščine niso dovoljene": "Feiern, Junggesellinnen- und Junggesellenabschiede sind nicht erlaubt",
  "Nočni mir med 22.00 in 6.00": "Nachtruhe zwischen 22.00 und 6.00",
  "Rezervacija in plačilo": "Buchung und Zahlung",
  "Neposredna rezervacija po telefonu ali e-pošti, brez provizije":
    "Direktbuchung per Telefon oder E-Mail, ohne Provision",
  "Če rezervirate prek Booking.com, plačilo ureja Booking.com":
    "Bei einer Buchung über Booking.com wickelt Booking.com die Zahlung ab",
  "Pravila odpovedi se razlikujejo po terminu in enoti — potrdimo ob povpraševanju":
    "Die Stornobedingungen unterscheiden sich nach Termin und Einheit — wir bestätigen sie bei der Anfrage",
  "Turistična taksa Občine Črnomelj: 2,00 € na osebo na dan":
    "Ortstaxe der Gemeinde Črnomelj: 2,00 € pro Person und Nacht",

  /* pogosta vprašanja */
  "Koliko gostov se namesti?": "Wie viele Gäste finden Platz?",
  "V Gribljah 70 je apartma s sedmimi ležišči v dveh spalnicah in studio za do pet oseb. V Gribljah 30 b sta dva apartmaja, njuna razpored ležišč pa potrdimo ob povpraševanju. Za večje skupine so na voljo vse štiri enote hkrati.":
    "In Griblje 70 gibt es ein Apartment mit sieben Schlafplätzen in zwei Schlafzimmern und ein Studio für bis zu fünf Personen. In Griblje 30 b sind zwei Apartments, ihre Aufteilung der Schlafplätze bestätigen wir bei der Anfrage. Für größere Gruppen stehen alle vier Einheiten gleichzeitig zur Verfügung.",
  "Ali imate bazen?": "Haben Sie einen Pool?",
  "Ne. Namesto bazena je reka — naravno kopališče v Kolpi je deset minut hoje po ravni poti. Na vrtu je jacuzzi, ki je na voljo proti doplačilu.":
    "Nein. Statt des Pools gibt es den Fluss — das Naturbad in der Kolpa ist zehn Minuten auf ebenem Weg entfernt. Im Garten steht ein Jacuzzi, der gegen Aufpreis verfügbar ist.",
  "Ali je parkirišče brezplačno?": "Sind die Parkplätze kostenlos?",
  "Da. Brezplačno zasebno parkirišče je tik ob hiši in ga ni treba rezervirati.":
    "Ja. Der kostenlose private Parkplatz liegt direkt am Haus und muss nicht reserviert werden.",
  "Kdaj je najboljši termin?": "Wann ist die beste Zeit?",
  "Od maja do septembra je voda prijetno topla in dnevi dolgi. Jeseni je pokrajina barvita in mirna, pozimi pa se hiša ogreva s klimatsko napravo in štedilnikom na drva.":
    "Von Mai bis September ist das Wasser angenehm warm und die Tage sind lang. Im Herbst ist die Landschaft bunt und ruhig, im Winter heizt das Haus mit Klimagerät und Holzofen.",
  "Kako do vas?": "Wie finde ich Sie?",
  "Griblje so na cesti med Metliko in Gradcem, blizu mejnega prehoda s Hrvaško. Natančen naslov in zemljevid izbrane hiše dobite ob potrditvi rezervacije.":
    "Griblje liegen an der Straße zwischen Metlika und Gradac, nahe dem Grenzübergang nach Kroatien. Die genaue Adresse und die Karte des gewählten Hauses erhalten Sie mit der Buchungsbestätigung.",
  "Sta oba naslova ena nastanitev?": "Sind beide Adressen eine Unterkunft?",
  "Ne. Griblje 70 in Griblje 30 b sta dve ločeni hiši v istem kraju, vsaka s svojima apartmajema. Pri povpraševanju navedite, katero hišo želite — če je zasedena, preverimo še razpoložljivost v drugi.":
    "Nein. Griblje 70 und Griblje 30 b sind zwei getrennte Häuser im selben Ort, jedes mit seinen Apartments. Geben Sie bei der Anfrage an, welches Haus Sie möchten — ist es belegt, prüfen wir die Verfügbarkeit im anderen.",

  /* napisi ob fotografijah */
  "Pokrita terasa z jedilno mizo in kotom za sprostitev": "Überdachte Terrasse mit Esstisch und Sitzecke",
  "Letna kuhinja pod lesenim nadstreškom": "Sommerküche unter Holzvordach",
  "Pergola z belimi zavesami in jedilno mizo": "Pergola mit weißen Vorhängen und Esstisch",
  "Letna kuhinja s ploščo za kuho, umivalnikom in orodjem na steni": "Sommerküche mit Kochplatte, Spüle und Werkzeug an der Wand",
  "Pogled s pergole na vrt z ležalnikoma": "Blick von der Pergola auf den Garten mit zwei Liegen",
  "Pergola z dolgo mizo in staro črpalko, uta v ozadju": "Pergola mit langem Tisch und alter Pumpe, Hütte im Hintergrund",
  "Vrtni kot z žarom in jacuzzijem": "Gartenecke mit Grill und Jacuzzi",
  "Viseči kokon med bršljanom": "Hängender Cocoon-Sessel zwischen dem Efeu",
  "Ležalnik ob zunanji kuhinji": "Liege neben der Außenküche",
  "Odprt dnevni prostor z jedilnico in kuhinjo": "Offener Wohnraum mit Essplatz und Küche",
  "Kutna zofa pod lesenimi gredami": "Ecksofa unter Holzbalken",
  "Opremljena kuhinja": "Ausgestattete Küche",
  "Kurilni kot s pečjo na drva in pogledom v sobo": "Heizecke mit Holzofen und Blick ins Zimmer",
  "Predel za sedenje z ravnim televizorjem": "Sitzecke mit Flachbild-TV",
  "Soba s tremi posteljami": "Zimmer mit drei Betten",
  "Soba z dvema nadstavnima postelama": "Zimmer mit zwei Etagenbetten",
  "Kot s štedilnikom na drva": "Ecke mit Holzofen",
  "Pogrnjena miza pod leseno pergolo": "Gedeckter Tisch unter der Holzpergola",
  "Domača pogača iz lastne peči": "Selbstgebackenes Fladenbrot (pogača) aus dem eigenen Ofen",
  "Vrt s pergolo, jacuzzijem in dvema ležalnikoma": "Garten mit Pergola, Jacuzzi und zwei Liegen",
  "Jacuzzi z mehurčki pod visečimi cvetlicami": "Jacuzzi mit Sprudelluft unter hängenden Blumen",
  "Uta z jacuzzijem in lesenima ležalnikoma": "Hütte mit Jacuzzi und zwei Holzliegen",
  "Jacuzzi na lesenem odru ob mraku": "Jacuzzi auf der Holzplattform in der Dämmerung",
  "Dva ležalnika pred jacuzzijem": "Zwei Liegen vor dem Jacuzzi",
  "Uta zvečer, čez vrt poteka vrsta lučk": "Hütte am Abend, eine Lichterkette zieht sich durch den Garten",
  "Hiša z nadstreškom in jacuzzijem": "Haus mit Vordach und Jacuzzi",
  "Travnik pred hišo z nogometnimi vrati in ležalniki": "Wiese vor dem Haus mit Fußballtoren und Liegen",
  "Kopalnica s tušem, umivalnikom in strojem za perilo": "Bad mit Dusche, Waschbecken und Waschmaschine",
  "Spalnica z zakonsko posteljo in omaro": "Schlafzimmer mit Doppelbett und Schrank",
  "Spalnica z zakonsko posteljo in pobarvanim lesenim stropom": "Schlafzimmer mit Doppelbett und bemalter Holzdecke",
  "Soba z zakonsko in enojno posteljo": "Zimmer mit Doppel- und Einzelbett",
  "Kuhinja s pečico, štedilnikom in jedilno mizo": "Küche mit Backofen, Herd und Esstisch",
  "Predprostor z omaro za obutev in ogledalom": "Vorraum mit Schuhschrank und Spiegel",
  "Reka Kolpa poleti z naravnim kopališčem": "Die Kolpa im Sommer mit dem Naturbad",
  "Kopanje v Kolpi": "Schwimmen in der Kolpa",
  "Brisače in senca na rečnem bregu": "Handtücher und Schatten am Flussufer",
  "Kajak po Kolpi": "Kajak auf der Kolpa",
  "Skok v reko z naravne police": "Sprung in den Fluss von einem natürlichen Felsband",
  "Plitvina, kjer voda seže do pasu": "Flache Stelle, das Wasser reicht bis zur Hüfte",
  "Naravni vodni tobogan": "Natürliche Wasserrutsche",
  "Prodnat breg s pogledom na nasprotno stran": "Steiniges Ufer mit Blick auf die gegenüberliegende Seite",
  "Pokrita terasa River Kolpa Apartments v Gribljah": "Überdachte Terrasse der River Kolpa Apartments in Griblje",
  "Letna kuhinja pod nadstreškom": "Sommerküche unter dem Vordach",
  "Vrt z jacuzzijem in žarom": "Garten mit Jacuzzi und Grill",
  "Kolpa poleti z naravnim kopališčem": "Die Kolpa im Sommer mit dem Naturbad"
};

/*---------------------------- ANGLEŠČINA ----------------------------*/
const EN_JEZIK = {
  "River Kolpa Apartments — dve hiši ob reki Kolpi, Griblje": "River Kolpa Apartments — two houses on the Kolpa river, Griblje",
  "River Kolpa Apartments — štirje apartmaji v dveh hišah ob Kolpi, Griblje, Bela krajina": "River Kolpa Apartments — four apartments in two houses on the Kolpa, Griblje, Bela Krajina",
  "River Kolpa Apartments — domov": "River Kolpa Apartments — home",
  "Griblje · Bela krajina": "Griblje · Bela Krajina",
  "Preskoči na vsebino": "Skip to content",
  "Glavna navigacija": "Main navigation",
  "Nazaj na prejšnji pogled": "Back to the previous view",
  "Nazaj": "Back",
  "Prosti termini": "Availability",
  "Trenutna lokacija": "Current location",
  "Jezik": "Language",
  "Ponudnik: LOGIS APARTMENTS, Majda Pezdirc s.p. · Griblje 30 B, 8332 Gradac · matična št. 9057641000 · davčna št. SI97033910": "Provider: LOGIS APARTMENTS, Majda Pezdirc s.p. · Griblje 30 B, 8332 Gradac · company reg. no. 9057641000 · VAT no. SI97033910",
  "Fotografija v polni velikosti": "Photo at full size",
  "Zapri": "Close",
  "Prejšnja fotografija": "Previous photo",
  "Naslednja fotografija": "Next photo",
  "Domov": "Home",
  "Lokaciji": "Houses",
  "Lokaciji — River Kolpa Apartments": "Houses — River Kolpa Apartments",
  "Galerija": "Gallery",
  "Galerija — River Kolpa Apartments": "Gallery — River Kolpa Apartments",
  "Vrt": "Garden",
  "Vrt in jacuzzi — River Kolpa Apartments": "Garden and jacuzzi — River Kolpa Apartments",
  "Vrt in jacuzzi": "Garden and jacuzzi",
  "Reka Kolpa": "Kolpa River",
  "Reka Kolpa — River Kolpa Apartments": "Kolpa River — River Kolpa Apartments",
  "Reka": "River",
  "Okolica": "Around us",
  "Okolica — River Kolpa Apartments": "Around us — River Kolpa Apartments",
  "Prosti termini in kontakt — River Kolpa Apartments": "Availability and contact — River Kolpa Apartments",
  "Griblje 70 — dva apartmaja — River Kolpa Apartments": "Griblje 70 — two apartments — River Kolpa Apartments",
  "Griblje 30 b — dva apartmaja — River Kolpa Apartments": "Griblje 30 b — two apartments — River Kolpa Apartments",

  "Dve hiši": "Two houses",
  "ob reki": "on the",
  "Kolpi": "Kolpa",
  "Griblje · Bela krajina · Slovenija": "Griblje · Bela Krajina · Slovenia",
  "Štirje samostojni apartmaji v dveh hišah v Gribljah ob reki Kolpi. Vsaka hiša ima teraso, jacuzzi in urejen vrt, obe pa vodi ista gostiteljica — izberite tisto, ki je prosta v vašem terminu.":
    "Four self-contained apartments in two houses in Griblje, on the Kolpa river. Each house has a terrace, a jacuzzi and a well-kept garden, and both are run by the same host — pick the one that is free on your dates.",
  "apartmaji v dveh hišah": "apartments in two houses",
  "naslova v Gribljah": "addresses in Griblje",
  "in urejen vrt": "and a well-kept garden",
  "· 8 mnenj": "· 8 reviews",
  "8 mnenj": "8 reviews",
  "Preverite proste termine": "Check available dates",
  "Izberite hišo": "Choose a house",
  "Vodi jo": "Hosted by",
  "· odgovorimo v nekaj urah, po telefonu in prek WhatsAppa tudi v soboto.":
    "· we reply within a few hours, by phone and WhatsApp on Saturdays too.",
  "Griblje 70 in Griblje 30 b": "Griblje 70 and Griblje 30 b",
  "Terasa, žar, letna kuhinja": "Terrace, grill, summer kitchen",
  "Kopališče deset minut hoje": "A swimming spot ten minutes on foot",
  "Vasi, kleti in poti": "Villages, wine cellars and trails",
  "Povpraševanje in kontakt": "Enquiry and contact",

  "Dva naslovov": "Two addresses",
  "Ista zasnova, dve hiši": "The same idea, two houses",
  "Majda Pezdirc gosti v dveh hišah v Gribljah, vsaka z dvema samostojnima apartmajema. Obe imata teraso, jacuzzi in urejen vrt, zato je izkušnja enaka — razlikujeta se razpored prostorov in zunanjost.":
    "Majda Pezdirc hosts in two houses in Griblje, each with two self-contained apartments. Both have a terrace, a jacuzzi and a well-kept garden, so the stay feels the same — they differ in the layout of the rooms and in how they look from outside.",
  "Oglejte si hišo": "See this house",
  "Fotografije": "Photos",
  "Zemljevid": "Map",
  "Druga hiša:": "Other house:",
  "v galeriji": "in the gallery",
  "Obe hiši sta v istem kraju, vsaka ima svoj vstop in svoj travnik. Natančen naslov izbrane hiše pošljemo ob potrditvi rezervacije.":
    "Both houses are in the same village, each with its own entrance and its own meadow. We send the exact address of the house you chose with the booking confirmation.",
  "dva apartmaja · 7 in 5 oseb": "two apartments · 7 and 5 people",
  "dva apartmaja": "two apartments",
  "Prenovljena hiša z dvema enotama": "Renovated house with two units",
  "Ločena vhoda in terasi, skupen ograjen vrt s pergolo, letno kuhinjo in jacuzzijem. Do naravnega kopališča na Kolpi je deset minut hoje po ravni poti.":
    "Two separate entrances and two terraces, a shared fenced garden with a pergola, a summer kitchen and a jacuzzi. The natural swimming spot on the Kolpa is a ten-minute walk on a flat path.",
  "samostojni enoti": "separate units",
  "oseb": "people",
  "hoje do reke": "walk to the river",
  "Hiša s teraso, jacuzzijem in travnikom": "House with a terrace, jacuzzi and meadow",
  "Dva samostojna apartmaja v urejeni hiši. Na voljo sta kuhinja s pečico in štedilnikom ter kopalnica s tušem in pralnim strojem, pred hišo pa nadstrešena terasa z jacuzzijem in travnik z nogometnimi vrati.":
    "Two self-contained apartments in a tidy house. There is a kitchen with an oven and a cooker, a bathroom with a shower and a washing machine, and in front of the house a covered terrace with a jacuzzi and a meadow with football goals.",
  "samostojna apartmaja": "self-contained apartments",
  "pod nadstreškom": "under the roof",
  "z nogometnimi vrati": "with football goals",
  "in pralni stroj": "and a washing machine",
  "travnik": "meadow",
  "tuš": "shower",
  /* Angleščima zadošča pisava iz predloge; zapis je izrecen, da ga pariteta ne šteje za luknjo. */
  "jacuzzi": "jacuzzi",

  "Nastanitev ·": "Stay ·",
  "Dva samostojna apartmaja": "Two self-contained apartments",
  "Prenovljena hiša ima dve samostojni enoti, vsaka s svojim vhodom in svojo teraso. Spodaj sta razpored ležišč in opis opreme posamezne enote.":
    "The renovated house has two independent units, each with its own entrance and its own terrace. Below you will find the bed layout and the amenities of each unit.",
  "Dnevni prostor apartmaja": "Living room of the apartment",
  "Apartma z dvema spalnicama": "Apartment with two bedrooms",
  "7 oseb · 7 ležišč · lastna terasa": "7 people · 7 beds · own terrace",
  "Spalnice": "Bedrooms",
  "V eni sobi tri postelje, v drugi dve nadstavni — skupaj sedem ležišč in velika omara za stvari.":
    "Three beds in one room, two bunk beds in the other — seven beds in all, plus a large wardrobe.",
  "Dnevni del": "Living area",
  "Kutna zofa, jedilna miza pod lesenimi gredami, raven televizor, klimatska naprava, ogrevanje in štedilnik na drva.":
    "A corner sofa, a dining table under wooden beams, a flat-screen TV, air conditioning, heating and a wood stove.",
  "Kuhinja": "Kitchen",
  "Štedilnik na plin s pečico in indukcijska plošča, dva hladilnika, mikrovalna, aparat za palačinke, blender, kavni aparat in kotliček.":
    "Gas cooker with an oven and an induction hob, two fridges, a microwave, a pancake maker, a blender, a coffee machine and a kettle.",
  "Pokrita terasa ob hiši": "Covered terrace by the house",
  "Studio s teraso": "Studio with a terrace",
  "5 oseb · nadstavna postelja in raztegljiv kavč": "5 people · bunk bed and sofa bed",
  "Ležišča": "Beds",
  "Nadstavna postelja in raztegljiv kavč — udobno za štiri do pet oseb.":
    "A bunk bed and a sofa bed — comfortable for four to five people.",
  "Zunanji prostor": "Outdoor space",
  "Lastna terasa z mizo in stoli, obrnjena v vrt.": "Its own terrace with a table and chairs, facing the garden.",
  "Oprema": "Equipment",
  "Klimatska naprava, ogrevanje, brezplačen WiFi in parkirišče tik ob hiši.":
    "Air conditioning, heating, free WiFi and parking right next to the house.",
  "Skupno": "Shared",
  "Vrt, jacuzzi, letna kuhinja in žar so skupni za obe enoti; vsaka družina ima svoj del terase.":
    "The garden, jacuzzi, summer kitchen and grill are shared by both units; each family gets its own part of the terrace.",

  "Vse fotografije so iz našega arhiva. Katera soba je v katerem apartmaju in kateri od obeh apartmajev je v vašem terminu prost, preverimo ob povpraševanju — razporeda, ki ga nimamo potrjenega, na strani ne objavljamo.":
    "Every photo is from our own archive. Which room belongs to which apartment, and which of the two apartments is free on your dates, we check when you send an enquiry — we do not publish a layout we have not confirmed.",

  "· Zunaj": "· Outdoors",
  "Večer, ki se ne konča": "An evening that does not want to end",
  "Pod pergolo z belimi zavesami je dolga miza, ob njej letna kuhinja s ploščo za kuho in umivalnikom. Za vogalom sta žar in jacuzzi, naprej pa urejena trata z dvema ležalnikoma in gugalnim kokonom med bršljanom — vse blizu terase.":
    "Under the pergola with white curtains there is a long table, next to it a summer kitchen with a hob and a sink. Around the corner sit the grill and the jacuzzi, and beyond them a mown lawn with two sunbeds and a hanging cocoon swing among the ivy — all close to the terrace.",
  "pri mizi pod pergolo": "seats at the table under the pergola",
  "oseb v jacuzziju": "people in the jacuzzi",
  "ležalnika in gugalnik": "two sunbeds and a swing",
  "ograjen vrt": "fenced garden",
  "Jacuzzi je na voljo proti doplačilu; dogovorimo se ob rezervaciji, da ga pred prihodom ogrejemo.":
    "The jacuzzi is available for a surcharge; we arrange it when you book, so it is warm before you arrive.",
  "Letna kuhinja": "Summer kitchen",
  "Jacuzzi in žar": "Jacuzzi and grill",

  "Deset minut hoje do vode": "Ten minutes on foot to the water",
  "Naravno kopališče z urejenim bregom in plitvinami je deset minut hoje po ravni poti med polji. Voda se poleti segreje nad dvajsetimi stopinjami, ob reki pa vodita učna in kolesarska pot. Namesto bazena v vrtu je na voljo kar cela reka.":
    "The natural bathing spot, with a well-kept bank and shallow water, is a ten-minute walk along a flat path between the fields. In summer the water warms to above twenty degrees, and an educational trail and a cycle path run along the river. Instead of a pool in the garden there is a whole river.",
  "hoje do kopališča": "walk to the bathing spot",
  "voda poleti": "water in summer",
  "in SUP, izposoja v bližini": "and SUP, rented nearby",
  "v bližini, z dovoljenjem": "nearby, with a permit",
  "Kanu": "Canoe",
  "Ribolov": "Fishing",
  "Fotografije reke": "Photos of the river",

  "Kaj naprej": "What comes next",
  "Dolina, ki živi po ritmu reke": "A valley that lives by the rhythm of the river",
  "Od hiše je deset minut hoje do kolpske plaže. Naprej so belokranjske vasi, vinske kleti in poti, ki peljejo ob vodi ali po hribu.":
    "From the house it is ten minutes on foot to the Kolpa beach. Beyond it lie the villages of Bela Krajina, wine cellars and paths that follow the water or go up the hill.",
  "Ob reki": "By the river",
  "Kopališča in kanu": "Swimming spots and canoeing",
  "Belokranjska riviera — kopanje, kajak in SUP; do vode je deset minut hoje.":
    "The Bela Krajina riviera — swimming, kayaking and SUP; ten minutes on foot to the water.",
  "Aktivno": "Active",
  "Pohodništvo in kolesarjenje": "Hiking and cycling",
  "Pot ob Kolpi, Gradac, Adlešiči in Vinjska cesta; začetne točke so v kraju.":
    "The Kolpa path, Gradac, Adlešiči and the Wine Road; the starting points are in the village.",
  "Izročilo": "Tradition",
  "Vasi in domače kmetije": "Villages and family farms",
  "Bučno olje, vino, kruh in sir — večinoma na voljo ves teden.":
    "Pumpkin-seed oil, wine, bread and cheese — mostly available all week.",
  "Lokacija": "Location",
  "Na meji s Hrvaško": "On the border with Croatia",
  "Nekdanji prehodi ob reki so spet odprti — zvečer sta v igri dve državi.":
    "The old crossings along the river are open again — in the evening two countries are in play.",

  "Pogled naokoli": "A look around",
  "Filtriraj fotografije po hiši": "Filter photos by house",
  "Filtriraj fotografije po vsebini": "Filter photos by subject",
  "Obe hiši": "Both houses",
  "Vse": "All",
  "Vrt in hiša": "Garden and house",
  "Notranjost": "Inside",
  "Doživetja": "Experiences",
  "iz lastnega arhiva": "from our own archive",
  "v tej izbiri ni fotografij": "this selection has no photos",
  "Za": "For",
  "te vsebine v arhivu še ni.": "we do not have these photos in the archive yet.",
  "Drugje imamo": "At the other address we have",
  "Pokaži vse fotografije": "Show all photos",
  "fotografija": "photo",
  "fotografiji": "photos",
  "fotografije": "photos",
  "fotografij": "photos",

  "Kontakt": "Contact",
  "Najhitreje po telefonu ali prek WhatsAppa. Cene so odvisne od termina in števila oseb, zato jih ne objavljamo naslepo — pošljite povpraševanje ali preverite razpoložljivost hiše v Gribljah 70 na Booking.com.":
    "Fastest by phone or WhatsApp. Prices depend on the dates and the number of people, so we do not publish a general price list — send an enquiry, or check the availability of the house at Griblje 70 on Booking.com.",
  "Pokličite": "Call",
  "Odgovor v nekaj urah": "Reply within hours",
  "E-pošta": "Email",
  "od 10 ·": "out of 10 ·",
  "Povpraševanje": "Enquiry",
  "Izpolnite obrazec in odprl se bo vaš e-poštni program ali WhatsApp s pripravljenim sporočilom. Pri enoti navedite hišo — Griblje 70 ali Griblje 30 b — da vam takoj odgovorimo z razpoložljivostjo prav te hiše. Odgovorimo v nekaj urah.":
    "Fill in the form and your email program or WhatsApp will open with the message ready. At the unit, please name the house — Griblje 70 or Griblje 30 b — so we can reply straight away with the availability of that house. We answer within a few hours.",
  "Ime in priimek": "Full name",
  "Janez Novak": "John Smith",
  "Telefon ali e-pošta": "Phone or email",
  "Prihod": "Arrival",
  "Odhod": "Departure",
  "Število oseb": "Number of people",
  "več kot 12": "more than 12",
  "Enota": "Unit",
  "Sporočilo": "Message",
  "Zanima naju termin v juliju, prihajava z dvema otrokoma in psom.":
    "We are interested in a stay in July, coming with two children and a dog.",
  "Pošlji po e-pošti": "Send by email",
  "Pošlji prek WhatsAppa": "Send by WhatsApp",
  "Potrebujete ime, kontakt, datum prihoda in odhoda.":
    "You need to give a name, contact, arrival date and departure date.",
  "Hišna pravila": "House rules",
  "Pogosta vprašanja": "Common questions",
  "Griblje 70 — apartma za 7 oseb": "Griblje 70 — apartment for 7 people",
  "Griblje 70 — studio za 5 oseb": "Griblje 70 — studio for 5 people",
  "Griblje 70 — oba apartmaja": "Griblje 70 — both apartments",
  "Griblje 30 b — en apartma": "Griblje 30 b — one apartment",
  "Griblje 30 b — oba apartmaja": "Griblje 30 b — both apartments",
  "Še ne vem — svetujte": "Not sure yet — please advise",

  "Brezplačen WiFi": "Free WiFi",
  "Brezplačno parkirišče, brez rezervacije": "Free parking, no reservation needed",
  "Klimatska naprava in ogrevanje": "Air conditioning and heating",
  "Štedilnik na drva": "Wood-burning stove",
  "Popolnoma opremljena kuhinja": "Fully equipped kitchen",
  "Jacuzzi na vrtu, proti doplačilu": "Jacuzzi in the garden, for a surcharge",
  "Kanu, kajak in SUP v bližini": "Canoe, kayak and SUP nearby",
  "Hišni ljubljenčki dovoljeni, doplačilo 20 €": "Pets allowed, 20 € surcharge",
  "Ograjen vrt in travnik za otroke": "Fenced garden and meadow for children",
  "Masaža po predhodnem dogovoru": "Massage by arrangement",

  "Čistoča": "Cleanliness",
  "Udobje": "Comfort",
  "Storitve": "Service",
  "Osebje": "Staff",
  "Cena / kakovost": "Price / quality",
  "Slovenija": "Slovenia",
  "Izjemno lepo opremljena in čista počitniška hišica, ki nudi popolno zasebnost s popolnoma ograjenim vrtom.":
    "A holiday house that is beautifully equipped and very clean, with complete privacy thanks to a fully fenced garden.",
  "Zelo prijazna in topla gostiteljica, lepo stanovanje in prostorna terasa z veliko zasebnosti, zelo dobro opremljena letna kuhinja.":
    "A very kind and warm hostess, a nice apartment and a spacious terrace with plenty of privacy, and a summer kitchen equipped very well.",
  "Krasen apartma, Majda je super gostiteljica, okolica je prekrasna, do najbližjega kopališča se sprehodiš po prelepi, mirni poti med polji.":
    "A lovely apartment, Majda is a great host, the surroundings are beautiful, and you walk to the nearest bathing spot along a lovely, quiet path between the fields.",

  "Prijava in odjava": "Check-in and check-out",
  "Prijava med 15.00 in 22.00, odjava med 9.30 in 10.00": "Check-in between 15.00 and 22.00, check-out between 9.30 and 10.00",
  "Prosimo, vnaprej sporočite predvideni čas prihoda": "Please tell us your expected arrival time in advance",
  "Za prijavo ni starostnih omejitev": "There is no age limit for check-in",
  "Otroci in posteljice": "Children and cots",
  "Otroci vseh starosti so dobrodošli": "Children of all ages are welcome",
  "Posteljice in dodatna ležišča v tej nastanitvi niso na voljo": "Cots and extra beds are not available in this accommodation",
  "Cena je odvisna od števila oseb, zato pri povpraševanju navedite starost otrok":
    "The price depends on the number of people, so please state the children's age in your enquiry",
  "Hišni ljubljenčki in kajenje": "Pets and smoking",
  "Ljubljenčki so dovoljeni ob predhodni najavi, doplačilo 20 € na bivanje":
    "Pets are allowed with prior notice, a surcharge of 20 € per stay",
  "Kajenje v vseh prostorih je prepovedano": "Smoking is not allowed in any of the rooms",
  "Zabave, dekliščine in fantovščine niso dovoljene": "Parties, hen and stag do celebrations are not allowed",
  "Nočni mir med 22.00 in 6.00": "Quiet hours between 22.00 and 6.00",
  "Rezervacija in plačilo": "Booking and payment",
  "Neposredna rezervacija po telefonu ali e-pošti, brez provizije":
    "Direct booking by phone or email, no commission",
  "Če rezervirate prek Booking.com, plačilo ureja Booking.com":
    "If you book through Booking.com, payment is handled by Booking.com",
  "Pravila odpovedi se razlikujejo po terminu in enoti — potrdimo ob povpraševanju":
    "Cancellation rules differ by week and by unit — we confirm them when you enquire",
  "Turistična taksa Občine Črnomelj: 2,00 € na osebo na dan":
    "Tourist tax of the Municipality of Črnomelj: 2.00 € per person per night",

  "Koliko gostov se namesti?": "How many guests fit?",
  "V Gribljah 70 je apartma s sedmimi ležišči v dveh spalnicah in studio za do pet oseb. V Gribljah 30 b sta dva apartmaja, njuna razpored ležišč pa potrdimo ob povpraševanju. Za večje skupine so na voljo vse štiri enote hkrati.":
    "At Griblje 70 there is an apartment with seven beds in two bedrooms and a studio for up to five people. At Griblje 30 b there are two apartments, and we confirm their bed layout when you enquire. For larger groups all four units are available at the same time.",
  "Ali imate bazen?": "Do you have a pool?",
  "Ne. Namesto bazena je reka — naravno kopališče v Kolpi je deset minut hoje po ravni poti. Na vrtu je jacuzzi, ki je na voljo proti doplačilu.":
    "No. Instead of a pool there is the river — the natural bathing spot in the Kolpa is ten minutes along a flat path. In the garden there is a jacuzzi, available for a surcharge.",
  "Ali je parkirišče brezplačno?": "Is parking free?",
  "Da. Brezplačno zasebno parkirišče je tik ob hiši in ga ni treba rezervirati.":
    "Yes. Free private parking is right next to the house and does not need to be reserved.",
  "Kdaj je najboljši termin?": "When is the best time to come?",
  "Od maja do septembra je voda prijetno topla in dnevi dolgi. Jeseni je pokrajina barvita in mirna, pozimi pa se hiša ogreva s klimatsko napravo in štedilnikom na drva.":
    "From May to September the water is pleasantly warm and the days are long. In autumn the landscape is colourful and calm, and in winter the house is warmed by the air conditioning and the wood stove.",
  "Kako do vas?": "How do I find you?",
  "Griblje so na cesti med Metliko in Gradcem, blizu mejnega prehoda s Hrvaško. Natančen naslov in zemljevid izbrane hiše dobite ob potrditvi rezervacije.":
    "Griblje lie on the road between Metlika and Gradac, close to the border crossing into Croatia. You get the exact address and a map of the chosen house with the booking confirmation.",
  "Sta oba naslova ena nastanitev?": "Are the two addresses one accommodation?",
  "Ne. Griblje 70 in Griblje 30 b sta dve ločeni hiši v istem kraju, vsaka s svojima apartmajema. Pri povpraševanju navedite, katero hišo želite — če je zasedena, preverimo še razpoložljivost v drugi.":
    "No. Griblje 70 and Griblje 30 b are two separate houses in the same village, each with its own apartments. In your enquiry, please say which house you want — if it is taken, we also check availability in the other one.",

  "Pokrita terasa z jedilno mizo in kotom za sprostitev": "Covered terrace with a dining table and a relaxing corner",
  "Letna kuhinja pod lesenim nadstreškom": "Summer kitchen under a wooden roof",
  "Pergola z belimi zavesami in jedilno mizo": "Pergola with white curtains and a dining table",
  "Letna kuhinja s ploščo za kuho, umivalnikom in orodjem na steni": "Summer kitchen with a hob, a sink and tools on the wall",
  "Pogled s pergole na vrt z ležalnikoma": "View from the pergola onto the garden with two sunbeds",
  "Pergola z dolgo mizo in staro črpalko, uta v ozadju": "Pergola with a long table and an old pump, a hut in the background",
  "Vrtni kot z žarom in jacuzzijem": "Garden corner with a grill and a jacuzzi",
  "Viseči kokon med bršljanom": "Hanging cocoon swing among the ivy",
  "Ležalnik ob zunanji kuhinji": "Sunbed beside the outdoor kitchen",
  "Odprt dnevni prostor z jedilnico in kuhinjo": "Open living space with a dining area and a kitchen",
  "Kutna zofa pod lesenimi gredami": "Corner sofa under wooden beams",
  "Opremljena kuhinja": "Equipped kitchen",
  "Kurilni kot s pečjo na drva in pogledom v sobo": "Heating corner with a wood stove and a view into the room",
  "Predel za sedenje z ravnim televizorjem": "Seating area with a flat-screen TV",
  "Soba s tremi posteljami": "Room with three beds",
  "Soba z dvema nadstavnima postelama": "Room with two bunk beds",
  "Kot s štedilnikom na drva": "Corner with a wood stove",
  "Pogrnjena miza pod leseno pergolo": "Laid table under the wooden pergola",
  "Domača pogača iz lastne peči": "Home-baked flatbread (pogača) from our own oven",
  "Vrt s pergolo, jacuzzijem in dvema ležalnikoma": "Garden with a pergola, a jacuzzi and two sunbeds",
  "Jacuzzi z mehurčki pod visečimi cvetlicami": "Bubble jacuzzi under hanging flowers",
  "Uta z jacuzzijem in lesenima ležalnikoma": "Hut with a jacuzzi and two wooden sunbeds",
  "Jacuzzi na lesenem odru ob mraku": "Jacuzzi on the wooden platform at dusk",
  "Dva ležalnika pred jacuzzijem": "Two sunbeds in front of the jacuzzi",
  "Uta zvečer, čez vrt poteka vrsta lučk": "The hut at night, a line of lights across the garden",
  "Hiša z nadstreškom in jacuzzijem": "House with a covered terrace and a jacuzzi",
  "Travnik pred hišo z nogometnimi vrati in ležalniki": "Meadow in front of the house with football goals and sunbeds",
  "Kopalnica s tušem, umivalnikom in strojem za perilo": "Bathroom with a shower, a washbasin and a washing machine",
  "Spalnica z zakonsko posteljo in omaro": "Bedroom with a double bed and a wardrobe",
  "Spalnica z zakonsko posteljo in pobarvanim lesenim stropom": "Bedroom with a double bed and a painted wooden ceiling",
  "Soba z zakonsko in enojno posteljo": "Room with a double and a single bed",
  "Kuhinja s pečico, štedilnikom in jedilno mizo": "Kitchen with an oven, a cooker and a dining table",
  "Predprostor z omaro za obutev in ogledalom": "Entrance hall with a shoe cabinet and a mirror",
  "Reka Kolpa poleti z naravnim kopališčem": "The Kolpa river in summer, with its natural bathing spot",
  "Kopanje v Kolpi": "Swimming in the Kolpa",
  "Brisače in senca na rečnem bregu": "Towels and shade on the river bank",
  "Kajak po Kolpi": "Kayaking on the Kolpa",
  "Skok v reko z naravne police": "Jumping into the river from a natural ledge",
  "Plitvina, kjer voda seže do pasu": "Shallow water that reaches your waist",
  "Naravni vodni tobogan": "A natural water slide",
  "Prodnat breg s pogledom na nasprotno stran": "Stony bank looking across to the other side",
  "Pokrita terasa River Kolpa Apartments v Gribljah": "Covered terrace of River Kolpa Apartments in Griblje",
  "Letna kuhinja pod nadstreškom": "Summer kitchen under the roof",
  "Vrt z jacuzzijem in žarom": "Garden with a jacuzzi and a grill",
  "Kolpa poleti z naravnim kopališčem": "The Kolpa in summer, with its natural bathing spot"
};

/*---------------------------- mehanizem ------------------------------*/
const JEZIKI = (() => {
  const SLOVARJI = { de: DE_JEZIK, en: EN_JEZIK };
  const IME = { sl: "Slovenščina", de: "Deutsch", en: "English" };
  const PRIVZET = "sl";
  const SHRAMBA = "rk-jezik";
  const ATRIBI = ["alt", "aria-label", "placeholder", "title"];
  const PRESKOCI = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "TEXTAREA"]);
  /* Besedilo znotraj polja piše gost sam in se ga ne dotikamo; njegov placeholder pa je
     napis, ki ga gost vidi, zato se pri atributih preskoči le koda in predloge. */
  const PRESKOCI_ATR = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE"]);

  /* Tisto, kar se v vsakem jeziku piše enako: imena, naslovi, številke, enote. Brez te
     liste bi vsak prevod zahteval še svoj prazni zapis. */
  const NEVED = [
    /^(SL|DE|EN)$/,
    /^(Slovenščina|Deutsch|English)$/,
    /^(Griblje \d+ ?b?|River Kolpa Apartments|LOGIS APARTMENTS|Majda Pezdirc|Bela krajina|Gradac|Črnomelj|Booking\.com|Facebook|WhatsApp|WiFi|Jacuzzi)$/,
    /^Griblje \d+ ?b?, SI-\d+ Gradac$/,
    /^\d+(?:[.,]\d+)?\s*(?:min|°C|%)?$/,
    /^>\s?\d+ °C$/,
    /^\+?\d[\d\s/.:-]{6,}$/,
    /* Imeni gostov iz mnenj in e-poštni naslov ponudnika se ne prevajata nikoli. Seznam je
       ekspliciten, ker bi vzorec »beseda z veliko začetnico« pobrišal tudi "Vrt", "Reka" in
       "Galerija", ki se prevajati morajo. */
    /^(Avan|Matija|Živa)$/,
    /^[\w.+-]+@[\w-]+(?:\.[\w-]+)+$/
  ];

  const normal = (s) => s.replace(/\s+/g, " ").trim();
  const črke = (s) => /\p{L}/u.test(s);

  let jezik = PRIVZET;
  const MANJKA = new Set();
  const IZV_T = new WeakMap();   /* besedilno vozlišče  -> [slovensko, izpisano] */
  const IZV_A = new WeakMap();   /* element             -> Map(atribut -> [slovensko, izpisano]) */

  /* Števila se ne prevajajo, a decimalno ločilo se razlikuje: slovenščina in nemščina
     pišeta vejico, angleščina piko. Zato gre ta pretvorba skozi mehanizem, ne skozi slovar. */
  const DECIMALNA = /^(\d+),(\d+)$/;

  const poišči = (napis, j) => {
    const slovar = SLOVARJI[j];
    if (!slovar) return napis;
    const n = normal(napis);
    if (j === "en") {
      const ločena = DECIMALNA.exec(n);
      if (ločena) return ločena[1] + "." + ločena[2];
    }
    if (!črke(n) || NEVED.some((re) => re.test(n))) return napis;
    if (!Object.prototype.hasOwnProperty.call(slovar, n)) { MANJKA.add(n); return napis; }
    /* Robna presledka izvirnika nista okrasna: sta ločnica do sosednjega elementa, zaklepana
       v predlogi ("ob reki <em>Kolpi</em>", "<b>Majda</b> · odgovorimo"). Ključi se pišejo
       brez njih, zato jih je treba vrniti, sicer gostu besediso zraste v "an derKolpa". */
    return (/^\s/.test(napis) ? " " : "") + slovar[n] + (/\s$/.test(napis) ? " " : "");
  };

  /* Napisov v skriptih in v poljih ne gledamo: tam besede ne vidi gost. */
  const slovr = (n) => !n.parentElement || !PRESKOCI.has(n.parentElement.tagName);

  const besedilo = (n) => {
    if (!slovr(n)) return;
    const star = n.data;
    const zapis = IZV_T.get(n);
    /* Vrnitev v slovenščino: napis, ki smo ga mi prepisali, dobi svoj izvirnik nazaj. Brez
       tega bi gost po skoku z DE na SL ostal v nemščini do osvežitve strani. */
    if (jezik === PRIVZET) {
      if (zapis && zapis[1] === star && zapis[0] !== star) { n.data = zapis[0]; IZV_T.delete(n); }
      return;
    }
    const slo = zapis && zapis[1] === star ? zapis[0] : star;
    const novi = poišči(slo, jezik);
    if (novi !== star) { n.data = novi; IZV_T.set(n, [slo, novi]); }
  };

  const atributi = (el) => {
    if (PRESKOCI_ATR.has(el.tagName)) return;
    let karta = IZV_A.get(el);
    for (const a of ATRIBI) {
      const star = el.getAttribute(a);
      if (star == null || !črke(star)) continue;
      const rec = karta && karta.get(a);
      if (jezik === PRIVZET) {
        if (rec && rec[1] === star && rec[0] !== star) { el.setAttribute(a, rec[0]); karta.delete(a); }
        continue;
      }
      const slo = rec && rec[1] === star ? rec[0] : star;
      const novi = poišči(slo, jezik);
      if (novi !== star) {
        if (!karta) { karta = new Map(); IZV_A.set(el, karta); }
        karta.set(a, [slo, novi]);
        el.setAttribute(a, novi);
      }
    }
  };

  const vozlišče = (n) => {
    if (n.nodeType === 3) return besedilo(n);
    if (n.nodeType !== 1) return;
    if (PRESKOCI.has(n.tagName)) return;
    atributi(n);
    const w = document.createTreeWalker(n, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    for (let k = w.nextNode(); k; k = w.nextNode())
      k.nodeType === 3 ? besedilo(k) : atributi(k);
  };

  const osvetli = () => vozlišče(document.documentElement);

  /* Novo ali premenjeno v DOM-u gre naravnost skozi slovar; nič se ne zgodi dvakrat,
     ker se pisava zamenja samo, če se njena vsebina dejansko spremeni. */
  new MutationObserver((popraski) => {
    if (jezik === PRIVZET) return;
    for (const p of popraski) {
      if (p.type === "attributes") { atributi(p.target); continue; }
      if (p.type === "characterData") { besedilo(p.target); continue; }
      p.addedNodes.forEach(vozlišče);
    }
  }).observe(document.documentElement, {
    subtree: true, childList: true, characterData: true,
    attributes: true, attributeFilter: ATRIBI
  });

  const gumbi = [...document.querySelectorAll("#langs button")];
  const oznaci = () => gumbi.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.jezik === jezik)));

  const shrani = (j) => { try { localStorage.setItem(SHRAMBA, j); } catch (e) { } };
  const preberi = () => { try { return localStorage.getItem(SHRAMBA); } catch (e) { return null; } };

  const nastavi = (j) => {
    if (j === jezik || !IME[j]) return;
    jezik = j;
    document.documentElement.lang = j;
    shrani(j);
    oznaci();
    MANJKA.clear();
    osvetli();
    const živi = document.getElementById("live");
    if (živi) živi.textContent = IME[j];
  };

  const stikalo = document.getElementById("langs");
  if (stikalo)
    stikalo.addEventListener("click", (e) => {
      const b = e.target.closest("[data-jezik]");
      if (b) nastavi(b.dataset.jezik);
    });

  const shranjen = preberi();
  if (shranjen && IME[shranjen] && shranjen !== PRIVZET) nastavi(shranjen);
  else oznaci();

  if (/[?&]jezik=audit/.test(location.search)) {
    const izpis = () => console[MANJKA.size ? "warn" : "log"](
      MANJKA.size ? `MANJKA PREVODA (${jezik}): ${MANJKA.size} — ` + [...MANJKA].join(" | ") : `jezik ${jezik}: brez luknj`
    );
    setInterval(izpis, 1200);
    addEventListener("error", izpis);
  }

  return {
    get jezik() { return jezik; },
    nastavi,
    manjka: () => [...MANJKA]
  };
})();

// Grener og klasser etter NHFs konkurranseregler (sist endret 25.08.2026) og ID- og vaksinasjonsreglement (18.11.2022).
// Distanser er NM/GP-klassene; andre løp kan ha egne klasser etter avtale med TD.
// plan: hvilken planmal grenen bruker. snow: false = barmark.
window.NHF_RULES_URL = "https://www.sleddog.no/p/71218/lover-og-regler";

window.COMMON_RULES = [
  "Alle norske deltakere må ha gyldig startlisens fra NHF fra dagen de fyller 13 år, enten årslisens eller engangslisens. Lisensen kjøpes i Min idrett. Lavterskelløp og treningsklasser er unntatt.",
  "Hunden må være minst 18 måneder på løpsdagen (12 måneder i miljøklasser).",
  "Alle hunder må ha avlesbar mikrochip. Chipnummer og dato skal stå i vaksinasjonsattesten.",
  "Gyldig vaksine mot valpesyke, parvovirus og smittsom leverbetennelse er påkrevd. Gyldig i 3 år for hunder over 1 år, med mindre annet er oppgitt.",
  "Vaksine mot kennelhoste anbefales (gyldig 1 år). Husk karenstid etter vaksinering.",
  "Fluorprodukter på ski, pulk og slede er forbudt i alle disipliner.",
];

window.GRENER = [
  {id:"slede-sprint", group:"Slede", name:"Slede sprint", plan:"sprint", snow:true,
   classes:[
     {name:"2-spann", dogs:"2 hunder", km:[4,6]},
     {name:"4-spann", dogs:"3–4 hunder", km:[6,10]},
     {name:"6-spann", dogs:"4–6 hunder", km:[10,14]},
     {name:"8-spann", dogs:"5–8 hunder", km:[14,18]},
     {name:"Åpen klasse", dogs:"minst 7 hunder", km:[20,30]},
   ],
   rules:["Hjelm er påbudt for junior og aldersbestemte klasser, og i fellesstart og stafett.","Sleden skal ha brems, frontbøyle, snøanker og sledetrekk.","Alle seler skal være polstret rundt halsen og på brystet."],
   tips:["Sprint handler om fart og glede. Hold øktene korte og stopp mens hundene fortsatt vil mer.","Tren starter og passeringer, det er der mange løp avgjøres.","Bygg grunnlaget med rolige turer før du legger inn fart."]},
  {id:"slede-md", group:"Slede", name:"Slede mellomdistanse", plan:"mellom", snow:true,
   classes:[
     {name:"6-spann (MD6)", dogs:"5–6 hunder", km:[30,80]},
     {name:"12-spann (MD12)", dogs:"8–12 hunder", km:[30,100]},
     {name:"Junior 4–6-spann", dogs:"4–6 hunder", km:[20,30]},
   ],
   rules:["NM i mellomdistanse kjøres over minst 3 heat eller dager.","Sleden skal ha brems, frontbøyle, snøanker og sledetrekk.","Hundene skal ha bakline og nakkeline (lederhunder kan unntas)."],
   tips:["Langturene er viktigst. Øk lengden gradvis, cirka 10 % i uka.","Øv på å gi mat og vann underveis, og hvordan hundene spiser når de er slitne.","Sjekk poter og sele etter hver lange tur."]},
  {id:"slede-ld", group:"Slede", name:"Slede langdistanse", plan:"lang", snow:true,
   classes:[
     {name:"Junior", dogs:"5–6 hunder", km:[100,200]},
     {name:"Begrenset klasse", dogs:"6–8 hunder", km:[200,600]},
     {name:"Åpen klasse", dogs:"9–18 hunder", km:[300,1200]},
   ],
   rules:["Senior i langdistanse må være fylt 18 år på løpets første dag.","Juniorer under 18 må ha skriftlig tillatelse fra foresatte.","Løp med obligatorisk hvile og sjekkpunkter følger løpets egen invitasjon."],
   tips:["Tren på å kjøre i mørket og å hvile ute med hundene.","Test alt utstyr og all mat på lange turer før løpet.","Back-to-back-turer lærer hundene å gå videre etter hvile."]},
  {id:"pulk", group:"Nordisk stil", name:"Pulk", plan:"sprint", snow:true, pulk:true,
   classes:[
     {name:"Pulk 1-spann, senior kvinner", dogs:"1 hund", km:[10,10]},
     {name:"Pulk 1-spann, senior menn", dogs:"1 hund", km:[15,15]},
     {name:"Pulk 1-spann, junior 17–20", dogs:"1 hund", km:[10,10]},
     {name:"Pulk 1-spann, GP 13–16 år", dogs:"1 hund", km:[5,5]},
     {name:"Combined senior (pulk + snøre)", dogs:"1 hund", km:[15,15]},
     {name:"Combined junior (pulk + snøre)", dogs:"1 hund", km:[10,10]},
   ],
   rules:["Pulken skal være minst 110 cm lang for 1–2 hunder, og minst 145 cm for 3 eller flere.","1-spann skal bruke stivt drag. Med liner eller 3+ hunder skal pulken ha brems.","Under −15 °C er løp over 15 km ikke tillatt. Under −18 °C avlyses løpet."],
   tips:["Pulkvekten følger hundens vekt. Vei hunden jevnlig, så vet du hvor mye pulken skal veie.","Tren med riktig vekt i pulken tidlig, så hunden blir vant til lasten.","Skiteknikk betyr mye. Tren deg selv også!"]},
  {id:"snore", group:"Nordisk stil", name:"Snørekjøring (skijøring)", plan:"sprint", snow:true,
   classes:[
     {name:"1-spann senior", dogs:"1 hund", km:[15,15]},
     {name:"1-spann junior 17–20", dogs:"1 hund", km:[12,15]},
     {name:"1-spann GP 13–16 år", dogs:"1 hund", km:[5,7.5]},
     {name:"Stafett (per etappe)", dogs:"1 hund", km:[5,5]},
   ],
   rules:["Under −15 °C er løp over 15 km ikke tillatt. Under −18 °C avlyses løpet."],
   tips:["Tren på kommandoer for høyre, venstre og stopp før sesongen.","Skiteknikk og egen form avgjør mye. Logg dine egne økter også."]},
  {id:"canicross", group:"Barmark", name:"Snøreløping (canicross)", plan:"sprint", snow:false,
   classes:[{name:"1 hund", dogs:"1 hund", km:[2.5,5]}],
   rules:["Det skal alltid være en strikk mellom hundens sele og ditt hoftebelte.","Du skal løpe bak hunden og ikke trekke den eller løpe foran.","Over 16 °C kortes distansen ned, over 18 °C utsettes eller avlyses løpet.","Sko som kan skade hundene er ikke tillatt."],
   tips:["Tren i kjølige timer. Hunder tåler varme mye dårligere enn oss.","Ha med vann, og la hunden kjøle seg ned i bekker og vann.","Bruk god sele og en strikk med demping."]},
  {id:"sykkel", group:"Barmark", name:"Sykkel 1 hund", plan:"sprint", snow:false,
   classes:[{name:"1 hund", dogs:"1 hund", km:[2.5,10]}],
   rules:["Hjelm er påbudt.","Sykkelen skal ha brems på begge hjul.","Hunden skal være festet med en elastisk line uten metalldeler i din ende.","Over 16 °C kortes distansen ned, over 18 °C utsettes eller avlyses løpet."],
   tips:["Hold igjen nedover, så hunden ikke får for høy fart.","Lær hunden å gå til siden for møtende."]},
  {id:"sparkesykkel", group:"Barmark", name:"Sparkesykkel", plan:"sprint", snow:false,
   classes:[{name:"1 hund", dogs:"1 hund", km:[2.5,7]},{name:"2 hunder", dogs:"2 hunder", km:[2.5,7]}],
   rules:["Hjelm er påbudt. For 2 hunder kreves hjelm med MIPS, downhill-hjelm eller tilsvarende.","Over 16 °C kortes distansen ned, over 18 °C utsettes eller avlyses løpet."],
   tips:["Sparkesykkel er en fin start for nybegynnere med 1–2 hunder.","Øv på stopp og venting før du øker farten."]},
  {id:"vogn", group:"Barmark", name:"Vogn", plan:"sprint", snow:false,
   classes:[{name:"4-spann", dogs:"3–4 hunder", km:[5,7]},{name:"8-spann", dogs:"6–8 hunder", km:[5,12]},{name:"4-spann junior", dogs:"3–4 hunder", km:[5,7]}],
   rules:["Helhjelm med ansiktsbeskyttelse (downhill, cross eller lignende) er påbudt.","Vogna skal ha bremser, knaste terrengdekk og sikkerhetsline med panikk-krok.","Anbefalt minstevekt på vogna: 25 kg for 4-spann, 45 kg for 8-spann.","Det er forbudt å transportere hund på vogna.","Over 16 °C kortes distansen ned, over 18 °C utsettes eller avlyses løpet."],
   tips:["Vogn er tungt for hundene. Hold øktene korte når det er mildt.","Nakkeline på lederhundene er påbudt."]},
];

// Pulkvekt: hundenes vekt × faktor. Vekten inkluderer pulk, sele, drag og trekkreimer.
window.PULK_FACTORS = {1:0.7, 2:0.7, 3:0.6, 4:0.5, 5:0.5};

// Startlisens (NHF, sesongen 2026/2027). Kilde: sleddog.no/p/71252/lisensinformasjon
window.LICENSE = {
  buy: "https://www.minidrett.no/lisens/?sports=406",
  info: "https://www.sleddog.no/p/71252/lisensinformasjon",
  facts: [
    "Årslisens over 17 år: 720 kr (13–17 år: 250 kr). Gjelder hele sesongen, 1. mai–30. april, og gir ulykkesforsikring for deg på både trening og løp.",
    "For årslisens må du være medlem i en klubb tilknyttet NHF og ha bestått Ren utøver.",
    "Engangslisens over 17 år: 325 kr (13–17 år: 100 kr). Gjelder i to dager, og du er ikke forsikret på trening.",
    "NM krever årslisens og medlemskap i en norsk hundekjørerklubb.",
    "Forsikringen gjelder deg, ikke hunden.",
  ],
};

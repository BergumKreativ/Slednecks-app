/* Planmaler over 11 uker. Hver mal er laget for en grunndistanse og skaleres etter brukerens løp i buildPlan().
   Økt: [navn, km, hm, merknad, snø, nøkkeløkt]. hm = null betyr at høydemetrene regnes ut fra løpets stigning per km.
   "H" = hvile, "E" = egentrening, "R" = løpsdagen. */
const H="H", E="E", R="R";
const TEMPLATES={
 // Mellomdistanse, laget for 60 km / 1500 hm
 mellom:{label:"Mellomdistanse",base:60,baseHm:1500,weeks:[
  {f:"Grunnlag",d:[H,["Rolig",12,150,"test hundene"],E,["Bakker",10,250,"rolig opp, gå ned"],H,["Langtur",25,500,"rolig"],["Rolig",12,150]]},
  {f:"Grunnlag",d:[H,["Rolig",12,150],E,["Bakker",12,300],H,["Langtur",30,650,"snacks hver time"],["Rolig",12,150]]},
  {f:"Grunnlag",d:[H,["Rolig",14,200],E,["Bakker",12,350],H,["Langtur",32,700],["Rolig",15,200]]},
  {f:"Lett uke",d:[H,["Lett",10,100],H,["Lett",10,150],H,["Kort langtur",20,400],["Lett eller hvile",10,100]]},
  {f:"Spesifikt",d:[H,["Rolig",15,200],E,["Bakker",12,400],H,["Langtur",35,800,"på slede hvis snø",1],["Back-to-back",20,400,"",1]]},
  {f:"Spesifikt – toppuke",d:[H,["Rolig",15,200],E,["Bakker",14,400],H,["Langtur",40,900,"start i mørket",1],["Back-to-back",20,400,"",1]]},
  {f:"Spesifikt",d:[H,["Rolig",15,200],E,["Bakker",12,350],H,["Langtur",30,650,"",1],["Rolig",15,200]]},
  {f:"Generalprøve",d:[H,["Rolig",12,150],E,["Lett",10,150],H,["Generalprøve",48,1100,"alt som på løpsdagen",1,1],H]},
  {f:"Hent deg inn",d:[H,H,["Lett",10,100,"sjekk poter og rygg"],H,H,["Langtur",25,500,"",1],["Rolig",12,150,"",1]]},
  {f:"Nedtrapping",d:[H,["Rolig",15,300],H,["Lett",10,150],H,["Rolig",15,300,"siste langtur, kort og lett",1],H]},
  {f:"Løpsuke",d:[H,["Kort",8,100,"litt fart, glade hunder"],H,["Kort",6,50],["Hvile / reise",0,0],R,["Hvile og restitusjon",0,0]]},
 ]},
 // Sprint og korte løp, laget for 10 km
 sprint:{label:"Sprint / kort",base:10,weeks:[
  {f:"Grunnlag",d:[H,["Rolig",6,null],E,["Korte drag",5,null,"6–8 drag, lange pauser"],H,["Langtur",15,null,"rolig"],["Rolig",6,null]]},
  {f:"Grunnlag",d:[H,["Rolig",6,null],E,["Korte drag",5,null,"8–10 drag"],H,["Langtur",16,null,"rolig"],["Rolig",6,null]]},
  {f:"Grunnlag",d:[H,["Rolig",7,null],E,["Fartslek",6,null],H,["Langtur",18,null],["Rolig",6,null]]},
  {f:"Lett uke",d:[H,["Lett",5,null],H,["Fart",4,null,"kort og morsomt"],H,["Langtur",10,null],["Lett",4,null]]},
  {f:"Spesifikt",d:[H,["Intervaller",6,null,"løpsfart"],["Rolig",6,null],E,H,["Langtur",16,null,"",1],["Rolig",6,null]]},
  {f:"Spesifikt – toppuke",d:[H,["Intervaller",7,null,"løpsfart"],["Rolig",6,null],["Fart",6,null,"starttrening"],H,["Langtur",18,null,"",1],["Rolig",6,null]]},
  {f:"Spesifikt",d:[H,["Intervaller",6,null,"løpsfart"],["Rolig",6,null],E,H,["Langtur",15,null,"",1],["Rolig",5,null]]},
  {f:"Generalprøve",d:[H,["Rolig",6,null],E,["Lett",4,null],H,["Generalprøve",10,null,"løpsdistansen i løpsfart",1,1],H]},
  {f:"Hent deg inn",d:[H,H,["Lett",5,null,"sjekk poter og rygg"],H,H,["Langtur",12,null,"",1],["Rolig",5,null]]},
  {f:"Nedtrapping",d:[H,["Fart",5,null,"korte drag"],H,["Lett",4,null],H,["Rolig",8,null,"",1],H]},
  {f:"Løpsuke",d:[H,["Kort",4,null,"litt fart, glade hunder"],H,["Kort",3,null],["Hvile / reise",0,0],R,["Hvile og restitusjon",0,0]]},
 ]},
 // Langdistanse, laget for 300 km
 lang:{label:"Langdistanse",base:300,weeks:[
  {f:"Grunnlag",d:[H,["Rolig",20,null],E,["Bakker",15,null,"rolig opp, gå ned"],H,["Langtur",50,null,"rolig, snacks hver time"],["Rolig",20,null]]},
  {f:"Grunnlag",d:[H,["Rolig",20,null],E,["Bakker",18,null],H,["Langtur",60,null],["Rolig",25,null]]},
  {f:"Grunnlag",d:[H,["Rolig",25,null],E,["Bakker",20,null],H,["Langtur",45,null],["Back-to-back",40,null,"trening på å gå videre på slitne bein"]]},
  {f:"Lett uke",d:[H,["Lett",15,null],H,["Lett",15,null],H,["Kort langtur",35,null],["Lett eller hvile",15,null]]},
  {f:"Spesifikt",d:[H,["Rolig",25,null],E,["Bakker",20,null],["Campingtur",60,null,"pakk sleden som på løpet",1],["Campingtur dag 2",60,null,"hvil 4–6 t mellom etappene",1],H]},
  {f:"Spesifikt – toppuke",d:[H,["Rolig",25,null],E,["Langtur",50,null],H,["Etappe",80,null,"start i mørket",1],["Etappe",80,null,"back-to-back",1]]},
  {f:"Spesifikt",d:[H,["Rolig",25,null],E,["Bakker",20,null],H,["Langtur",60,null,"",1],["Rolig",25,null]]},
  {f:"Generalprøve",d:[H,["Rolig",20,null],E,["Lett",15,null],["Generalprøve",100,null,"etapper og pauser som på løpet",1,1],["Generalprøve dag 2",60,null,"",1],H]},
  {f:"Hent deg inn",d:[H,H,["Lett",15,null,"sjekk poter og rygg"],H,H,["Langtur",50,null,"",1],["Rolig",20,null]]},
  {f:"Nedtrapping",d:[H,["Rolig",25,null],H,["Lett",15,null],H,["Rolig",30,null,"siste langtur, kort og lett",1],H]},
  {f:"Løpsuke",d:[H,["Kort",15,null,"litt fart, glade hunder"],H,["Kort",10,null],["Hvile / reise",0,0],R,["Hvile og restitusjon",0,0]]},
 ]},
};
const PLAN_WEEKS=11;
// Gren lagres i race_type som "grenId|klasse". Eldre verdier (Slede/Barmark/Nordisk/Sprint) tolkes ut fra distansen.
const GREN=id=>(window.GRENER||[]).find(g=>g.id===id);
function grenFor(p){
  const id=String(p.raceType||"").split("|")[0], km=Number(p.raceKm)||0;
  if(GREN(id))return GREN(id);
  if(id==="Barmark")return GREN("canicross");
  if(id==="Nordisk")return GREN("pulk");
  if(id==="Sprint"||km<25)return GREN("slede-sprint");
  return GREN(km>100?"slede-ld":"slede-md");
}
const grenClass=p=>String(p.raceType||"").split("|")[1]||"";
const planTypeFor=p=>p.planType&&TEMPLATES[p.planType]?p.planType:grenFor(p).plan;
// PLAN[uke].d[dag] = [tekst, km, hm, nøkkeløkt, egen]
let PLAN=[];
function buildPlan(){
  const p=S.profile, t=TEMPLATES[planTypeFor(p)], raceKm=Number(p.raceKm)||t.base, raceHm=Number(p.raceHm)||0;
  const fk=t===TEMPLATES.lang?Math.min(1.5,Math.max(0.7,raceKm/t.base)):raceKm/t.base;
  const perKm=raceKm?raceHm/raceKm:0, barmark=!grenFor(p).snow, custom=p.planCustom||{}, start=planStart();
  PLAN=t.weeks.map((w,wi)=>({f:w.f,d:w.d.map((x,di)=>{
    const own=custom[iso(addDays(start,wi*7+di))];
    if(own)return[own[0],Number(own[1])||0,Number(own[2])||0,0,1];
    if(x===H)return["Hvile",0,0];
    if(x===E)return["Egentrening – styrke, kjerne og bein",0,0];
    if(x===R)return[`${p.raceName||"Løpet"} ${fmtKm(raceKm)} km${raceHm?` / ${raceHm} hm`:""}`,raceKm,raceHm,1];
    let [name,km,hm,note,snow,key]=x;
    if(!km)return[name,0,0];
    if(barmark){snow=0;if(/slede|snø/.test(note||""))note=""}
    const k=Math.max(2,Math.round(km*fk));
    const h=hm==null?Math.round(k*perKm*(/Bakker/.test(name)?1.5:1)/50)*50:Math.round(hm*raceHm/t.baseHm/50)*50;
    return[`${snow?"❄ ":""}${name} ${k} km${note?" – "+note:""}`,k,h,key?1:0];
  })}));
}
const TYPES=["Sykkeljøring","Canicross","Sparkesykkel","Vogn / ATV","Hundekjøring","Pulk","Skijøring","Gåtur","Kløvtur","Kløvtrening","Kjettingtrekk","Annet"];
const ALIAS={"Terrengsykkel":"Sykkeljøring","Sykkel":"Sykkeljøring","El-sykkel":"Sykkeljøring","Løping":"Canicross","Tur":"Gåtur","Kløv":"Kløvtur","Slede":"Hundekjøring","Vogn":"Vogn / ATV"};
// Egne økter (kategori "meg") har egne typer, og teller ikke mot hundenes ukemål
const MY_TYPES=["Løping","Styrke","Ski","Sykkel","Fjelltur / gåtur","Mobilitet / yoga","Svømming","Annet"];
const ACTIVE_WITH_DOG=["Canicross","Skijøring","Sykkeljøring","Gåtur","Kløvtur","Pulk"];
// Økttyper der vekten på lasten føres
const LOAD_LABEL={"Kløvtur":"Vekt i kløven (kg)","Kløvtrening":"Vekt i kløven (kg)","Kjettingtrekk":"Kjettingvekt (kg)"};
const KROPP=[[3,"Sterk"],[2,"Ok"],[1,"Sliten"]];
const isMe=s=>s.kategori==="meg";
const typeOf=(t,kat)=>kat==="meg"?(MY_TYPES.includes(t)?t:"Annet"):ALIAS[t]||(TYPES.includes(t)?t:"Annet");
const dogS=()=>S.sessions.filter(s=>!isMe(s)), meS=()=>S.sessions.filter(isMe);
const DAYS=["man","tir","ons","tor","fre","lør","søn"];
const MOODS=[[3,"Stram line"],[2,"Ok"],[1,"Slakk"]];

const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const parse=s=>{const [y,m,d]=String(s).split("-").map(Number);return new Date(y,m-1,d)};
const addDays=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const monday=d=>{const x=new Date(d);x.setHours(0,0,0,0);x.setDate(x.getDate()-(x.getDay()+6)%7);return x};
const isoWeek=d=>{const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-y)/864e5+1)/7)};
const fmtD=d=>d.toLocaleDateString("nb-NO",{day:"numeric",month:"short"}).replace(".","");
const fmtKm=n=>(Math.round((Number(n)||0)*10)/10).toLocaleString("nb-NO");
const fmtMin=m=>{m=Math.round(Number(m)||0);const h=Math.floor(m/60),r=m%60;return h?`${h} t ${r} min`:`${r} min`};
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
// Ikoner (icons.js) og seksjonsoverskrifter med farge per område: dog, me, wx, trail, plan, health
const icon=(n,cls)=>`<svg class="ic${cls?" "+cls:""}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${(window.ICONS||{})[n]||""}</svg>`;
const sh=(ic,title,theme,style)=>`<h2 class="sh t-${theme}"${style?` style="${style}"`:""}><span class="shi">${icon(ic)}</span>${title}</h2>`;
const sum=(a,f)=>a.reduce((x,y)=>x+(Number(y[f])||0),0);
const todayD=()=>{const t=new Date();t.setHours(0,0,0,0);return t};

/* Supabase */
const CFG=window.SLEDNECKS_CONFIG||{};
const sb=CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase?window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey):null;
const rowToSession=r=>({id:r.id,dato:r.dato,type:r.type,km:Number(r.km)||0,hm:r.hm||0,min:r.min||0,hunder:r.hunder||[],motivasjon:r.motivasjon||{},kommentar:r.kommentar||"",kategori:r.kategori==="meg"?"meg":"hund",rpe:r.rpe||null,kropp:r.kropp||null,last_kg:r.last_kg!=null?Number(r.last_kg):null,temp:r.temp!=null?Number(r.temp):null,rh:r.rh!=null?Number(r.rh):null,rute:Array.isArray(r.rute)?r.rute:null,kilde:r.kilde||"",bilder:Array.isArray(r.bilder)?r.bilder:[]});
const ok=r=>{if(r.error)throw r.error;return r.data};

const S={view:"hjem",sessions:[],profile:{raceDate:iso(addDays(new Date(),84)),raceName:"",raceKm:30,raceHm:0,raceId:"",raceType:"",planType:"",planCustom:{},dogInfo:{},dogs:[]},isNew:false,user:null,authReady:false,loaded:false,loginEmail:"",loginSent:false};
try{const v=location.hash.slice(1);if(["hjem","logg","plan","innst"].includes(v))S.view=v}catch(e){}

async function loadAll(){
  const [p,o]=await Promise.all([sb.from("profiles").select("race_date,race_name,race_km,race_hm,race_id,race_type,plan_type,plan_custom,dog_info,my_goals,cover,nickname,dogs").maybeSingle(),sb.from("okter").select("*").order("dato")]);
  const prof=ok(p);
  if(prof)S.profile={raceDate:prof.race_date||S.profile.raceDate,raceName:prof.race_name||"",raceKm:Number(prof.race_km)||S.profile.raceKm,raceHm:Number(prof.race_hm)||0,raceId:prof.race_id||"",raceType:prof.race_type||"",planType:prof.plan_type||"",planCustom:prof.plan_custom||{},dogInfo:prof.dog_info||{},myGoals:Array.isArray(prof.my_goals)?prof.my_goals:[],cover:prof.cover||"",nickname:prof.nickname||"",dogs:Array.isArray(prof.dogs)?prof.dogs.slice():[]};
  else{
    ok(await sb.from("profiles").insert(profileRow(S.profile)));
    S.isNew=true;S.view="velkommen";
  }
  S.sessions=ok(o).map(rowToSession);
  S.loaded=true;render();
}
const profileRow=p=>({race_date:p.raceDate,race_name:p.raceName,race_km:p.raceKm,race_hm:p.raceHm,race_id:p.raceId,race_type:p.raceType,plan_type:p.planType,dogs:p.dogs});
async function refresh(){try{await loadAll()}catch(e){toast(errText(e))}}

function planStart(){return addDays(monday(parse(S.profile.raceDate)),-70)}
function planWeekIdx(date){const i=Math.round((monday(date)-planStart())/864e5/7);return i>=0&&i<PLAN_WEEKS?i:-1}
function planDay(date){const i=planWeekIdx(date);if(i<0)return null;const d=(date.getDay()+6)%7;return{w:i,d,item:PLAN[i].d[d]}}
const weekTotals=i=>{const d=PLAN[i].d;return{km:d.reduce((a,x)=>a+x[1],0),hm:d.reduce((a,x)=>a+x[2],0),n:d.filter(x=>x[1]>0).length}};
const byWeek=(list=dogS())=>{const m={};for(const s of list){const k=iso(monday(parse(s.dato)));(m[k]=m[k]||[]).push(s)}return m};

function render(){
  if(bigMap){bigMap.remove();bigMap=null}
  buildPlan();
  document.body.classList.toggle("anon",!S.user);
  document.querySelectorAll(".tab").forEach(t=>{if(t.dataset.v===S.view)t.setAttribute("aria-current","page");else t.removeAttribute("aria-current")});
  const app=document.getElementById("app");
  if(!sb)app.innerHTML=vSetup();
  else if(!S.authReady)app.innerHTML=`<p class="empty">Laster …</p>`;
  else if(!S.user)app.innerHTML=S.view==="personvern"?vPrivacy():vLogin();
  else app.innerHTML=({hjem:vHome,logg:vLog,plan:vPlan,innst:vSettings,hund:vDog,velkommen:vWelcome,personvern:vPrivacy,kart:vMap})[S.view]()+footer();
  bind();
}

function vSetup(){
  return `<section class="login"><h1 class="brand cond">Slednecks<span>.</span></h1>
  <p class="notice">Appen er ikke koblet til databasen ennå. Fyll inn Supabase-adressen og «anon public»-nøkkelen i <b>config.js</b>.</p></section>`;
}

function vLogin(){
  return `<section class="login"><h1 class="brand cond">Slednecks<span>.</span></h1><p class="muted" style="margin-top:6px">Treningslogg for deg og hunden</p>
  ${S.loginSent?`<p class="notice">Vi har sendt en e-post til <b>${esc(S.loginEmail)}</b>. Åpne den på denne enheten og trykk på lenken for å logge inn.</p>
    <p style="margin-top:14px"><button class="btn ghost" id="l-back">Bruk en annen e-post</button></p>`
  :`<div class="field"><label for="l-email">E-post</label><input id="l-email" type="email" autocomplete="email" value="${esc(S.loginEmail)}" placeholder="navn@eksempel.no"></div>
    <div class="actions"><button class="btn" id="l-send">Send innloggingslenke</button></div>
    <p class="small muted" style="margin-top:10px">Ingen passord. Du får en lenke på e-post, og holder deg innlogget på denne enheten.</p>`}
  <p class="err" id="lErr" hidden></p>
  <p class="small muted" style="margin-top:28px"><button type="button" class="linkbtn" data-goto="personvern">Personvern</button> · versjon ${esc(APP_VERSION)}</p></section>`;
}

/* Testversjon: versjonsnummer, bunntekst, tilbakemelding, velkomst og personvern */
const APP_VERSION=window.APP_VERSION||"dev";
const VIEW_NAMES={hjem:"Oversikt",logg:"Logg",plan:"Plan",innst:"Profil",hund:"Hundeside",velkommen:"Velkommen",personvern:"Personvern",kart:"Kart"};
function footer(){
  return `<p class="foot small muted"><button type="button" class="linkbtn" id="fbOpen">Gi tilbakemelding</button> · <button type="button" class="linkbtn" data-goto="velkommen">Kom i gang</button> · <button type="button" class="linkbtn" data-goto="personvern">Personvern</button><br>Testversjon ${esc(APP_VERSION)}</p>`;
}
function openFeedback(){
  const kinds=[["feil","Noe virker ikke"],["vanskelig","Vanskelig å forstå"],["onske","Ønske eller idé"],["annet","Annet"]];
  let kind="feil";
  const draw=()=>{panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">Gi tilbakemelding</h2><button class="btn ghost" id="fbClose">Lukk</button></div>
  <p class="small muted" style="margin-top:6px">Alt er nyttig, også små ting. Vi ser hvilken side du var på (${esc(VIEW_NAMES[S.view]||S.view)}) og hvilken versjon du bruker.</p>
  <div class="field"><span class="flabel">Hva gjelder det?</span><div class="chips">${kinds.map(([v,l])=>`<button type="button" class="chip" data-fbk="${v}" aria-pressed="${kind===v}">${l}</button>`).join("")}</div></div>
  <div class="field"><label for="fb-text">Beskriv</label><textarea id="fb-text" style="min-height:120px" placeholder="${kind==="feil"?"Hva gjorde du, og hva skjedde?":"Skriv fritt …"}"></textarea></div>
  <p class="err" id="fbErr" hidden></p>
  <div class="actions"><button class="btn" id="fbSend">Send</button></div>`;
  const txt=panel.querySelector("#fb-text");
  panel.querySelector("#fbClose").onclick=closeForm;
  panel.querySelectorAll("[data-fbk]").forEach(b=>b.onclick=()=>{const v=txt.value;kind=b.dataset.fbk;draw();panel.querySelector("#fb-text").value=v});
  panel.querySelector("#fbSend").onclick=async()=>{
    const tekst=panel.querySelector("#fb-text").value.trim();
    if(!tekst)return showErr("fbErr",{message:"Skriv litt om hva det gjelder."});
    const btn=panel.querySelector("#fbSend");btn.disabled=true;
    try{ok(await sb.from("tilbakemeldinger").insert({type:kind,tekst,side:VIEW_NAMES[S.view]||S.view,versjon:APP_VERSION,enhet:navigator.userAgent.slice(0,200)}));closeForm();toast("Takk for tilbakemeldingen!")}
    catch(e){btn.disabled=false;showErr("fbErr",e)}
  };};
  draw();sheet.classList.add("open");
}
function vWelcome(){
  const ios=/iPhone|iPad/.test(navigator.userAgent);
  return `<section class="welcome"><h1 class="brand cond">Velkommen<span>!</span></h1>
  <p>Slednecks er en treningslogg for deg og hunden. Alt fra turer og kløv til canicross og sledeløp.</p>
  <p class="notice">Dette er en <b>testversjon</b>. Takk for at du er med og gjør appen bedre! Ting kan endre seg underveis.</p>
  <ol class="steps">
   <li><b>Legg appen på hjem-skjermen.</b> ${ios?"I Safari: trykk Del-knappen, og så «Legg til på Hjem-skjerm».":"I Chrome: trykk ⋮-menyen, og så «Legg til på startskjermen». På iPhone: Safari → Del → «Legg til på Hjem-skjerm»."}</li>
   <li><b>Sett opp profilen.</b> Velg et løp fra kalenderen eller lag ditt eget mål, velg gren og legg inn hundene dine. Da får du en treningsplan.</li>
   <li><b>Fyll inn info om hundene.</b> Trykk på en hund på Oversikt for å legge inn vekt, chip og vaksiner. Appen sier fra om noe mangler.</li>
   <li><b>Før økter med +.</b> Velg «Med hunder» eller «Bare meg». Din egen trening holdes adskilt fra hundenes.</li>
   <li><b>Slå på været.</b> På Oversikt ser du varmerisiko for hundene og når det er best å trene.</li>
   <li><b>Si hva du synes.</b> Nederst på hver side finner du «Gi tilbakemelding». Feil, ting som er vanskelige og ønsker er like nyttige.</li>
  </ol>
  <p class="small muted">Tips: Ta en backup innimellom under Profil → Backup.</p>
  <div class="actions"><button class="btn" id="wlGo">${S.isNew?"Sett opp profilen":"Til oversikten"}</button></div></section>`;
}
function vPrivacy(){
  return `<section class="prose"><div class="actions" style="margin-top:4px"><button class="btn ghost" id="pvBack">← Tilbake</button></div>
  <h1 class="cond" style="font-size:2.2rem;margin-top:12px">Personvern</h1>
  <p class="small muted">Sist oppdatert 23. oktober 2026 · testversjon</p>
  <h3>Hvem er ansvarlig</h3><p>Eilin Bergum (Bergum Kreativ) er ansvarlig for Slednecks. Spørsmål sendes til <a href="mailto:eilin@eilinbergum.com">eilin@eilinbergum.com</a>.</p>
  <h3>Hva vi lagrer</h3><ul>
   <li>E-postadressen din, for å logge deg inn.</li>
   <li>Det du fører inn: økter, mål, treningsplan, løp, hunder og hundeinfo (som vekt, chip-ID og vaksiner).</li>
   <li>Føremeldinger du publiserer for andre brukere.</li>
   <li>Tilbakemeldinger du sender, med hvilken side du var på, versjon og type enhet og nettleser.</li></ul>
  <p>Vi samler ikke inn noe annet, og bruker ikke sporing, reklame eller analyseverktøy.</p>
  <h3>Hvor dataene ligger</h3><p>Dataene lagres hos Supabase, på servere i EU (Irland). Bare du har tilgang til dine egne data i appen. Den ansvarlige kan se dem i databasen ved behov for feilretting og drift.</p>
  <h3>Føremeldinger</h3><p>Føremeldinger du publiserer (sted på kartet, føre, kommentar og visningsnavnet ditt hvis du har satt et) vises for alle innloggede brukere i 14 dager. E-postadressen din vises aldri. Du kan slette dine egne meldinger når som helst.</p>
  <h3>Posisjon og vær</h3><p>Viser du været, spør appen om posisjonen din. Den lagres bare på din enhet, og sendes avrundet (omtrent 100 meter) til Meteorologisk institutt (MET Norway) for å hente værvarselet.</p>
  <h3>Andre tjenester</h3><p>Appen ligger på GitHub Pages, og bruker skrifttyper fra Google Fonts og programkode fra jsDelivr. Disse tjenestene ser IP-adressen din når appen lastes, slik det er for nettsider flest.</p>
  <h3>Hvorfor</h3><p>Vi behandler opplysningene for å gi deg tjenesten du har bedt om (personvernforordningen artikkel 6 nr. 1 bokstav b), og tilbakemeldinger for å forbedre appen.</p>
  <h3>Dine rettigheter</h3><p>Du kan når som helst laste ned alle øktene dine under Profil → Backup, rette det du har ført inn, og slette kontoen din under Profil → Konto. Da slettes profilen, hundene og alle øktene dine. Du kan også klage til Datatilsynet.</p>
  <h3>Hvor lenge</h3><p>Dataene lagres så lenge du har konto. Tilbakemeldinger beholdes uten kobling til deg etter at kontoen er slettet.</p></section>`;
}

function goalRow(label,done,goal,fmt,unit){
  const pct=goal?Math.min(100,done/goal*100):0;
  return `<div class="goalrow"><div class="row"><span><span class="v">${fmt(done)}</span> <span class="of muted">av ${fmt(goal)} ${unit}</span></span><span class="small ${pct>=100?"badge-ok":"muted"}">${pct>=100?"Nådd ✓":Math.round(pct)+" %"}</span></div>
  <div class="bar" role="img" aria-label="${label}: ${Math.round(pct)} prosent"><span style="width:${pct}%"></span></div><p class="small muted" style="margin-top:3px">${label}</p></div>`;
}

/* Føremeldinger fra brukerne og skiløyper fra Kartverket (Turrutebasen, åpne data via WFS) */
const FORE=["Nysnø","Pakket","Nypreparert","Skare","Isete","Slaps","Lite snø","Barmark / gjørme"];
const LOYPE=["Hundeløype","Skiløype","Sti / vei","Fjell / åpent"];
const REP={list:[],at:0,loading:false};
let bigMap=null, trailLayer=null, pickMarker=null;
const TRAIL_CACHE={};
async function loadReports(force){
  if(REP.loading||(!force&&Date.now()-REP.at<5*60e3))return;
  REP.loading=true;
  try{REP.list=ok(await sb.from("foremeldinger").select("*").gte("created_at",new Date(Date.now()-14*864e5).toISOString()).order("created_at",{ascending:false}).limit(500));REP.at=Date.now()}
  catch(e){REP.at=Date.now()}
  REP.loading=false;
  if(S.view==="hjem"||S.view==="kart")render();
}
function ago(t){
  const m=Math.round((Date.now()-new Date(t))/60000);
  if(m<60)return m<=1?"nå nettopp":`for ${m} min siden`;
  const h=Math.round(m/60);if(h<24)return `for ${h} ${h===1?"time":"timer"} siden`;
  const d=Math.round(h/24);return `for ${d} ${d===1?"dag":"dager"} siden`;
}
const ageClass=t=>{const h=(Date.now()-new Date(t))/36e5;return h<=24?"fresh":h<=72?"recent":"old"};
function kmBetween(a,b){const r=x=>x*Math.PI/180,dLat=r(b.lat-a.lat),dLon=r(b.lon-a.lon);const h=Math.sin(dLat/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dLon/2)**2;return 12742*Math.asin(Math.sqrt(h))}
function reportHtml(r,withDel){
  return `<div class="rep"><div class="row"><b>${esc(r.fore||"Føremelding")}</b><span class="small muted">${ago(r.created_at)}</span></div>
   <p class="small">${[r.loype,r.sted].filter(Boolean).map(esc).join(" · ")}${r.kjort?` · <b>nylig kjørt/preparert</b>`:""}</p>
   ${r.tekst?`<p class="small">${esc(r.tekst)}</p>`:""}
   <p class="small muted">– ${esc(r.navn||"Anonym")}${withDel&&r.user_id===S.user.id?` · <button type="button" class="linkbtn" data-delrep="${esc(r.id)}">Slett</button>`:""}</p></div>`;
}
function foreCard(){
  if(!REP.at){loadReports();return `<p class="small muted center">Henter føremeldinger …</p>`}
  const pos=savedPos(), near=pos?REP.list.filter(r=>kmBetween(pos,r)<=50):REP.list, recent=near.filter(r=>Date.now()-new Date(r.created_at)<3*864e5);
  return `<div class="wx card t-trail">${recent.length?`<p><b>${recent.length} ${recent.length===1?"melding":"meldinger"}</b> ${pos?"innen 50 km":"i hele landet"} siste 3 dager</p>${reportHtml(recent[0],false)}`:`<p class="small muted">Ingen føremeldinger ${pos?"i nærheten":""} siste 3 dager. Vær den første til å melde om føret!</p>`}
   <div class="actions"><button type="button" class="btn line" data-goto="kart">Åpne kartet</button></div></div>`;
}
function vMap(){
  return `${sh("route","Føre og løyper","trail","margin-top:6px")}
  <p class="muted small">Trykk på kartet for å velge sted, og meld om føret. Meldingene vises for alle brukere i 14 dager.</p>
  <div id="bigmap" class="map big" role="application" aria-label="Kart med løyper og føremeldinger"></div>
  <div class="legend" style="margin-top:8px"><span><b style="background:var(--good)"></b>Siste døgn</span><span><b style="background:var(--warn)"></b>1–3 dager</span><span><b style="background:var(--muted)"></b>Eldre</span><span><b style="background:#1f6feb"></b>Skiløype</span></div>
  <label class="small" style="display:block;margin-top:6px"><input type="checkbox" id="trailToggle" ${S.trails!==false?"checked":""} style="width:auto;margin-right:6px">Vis skiløyper fra Kartverket (zoom inn)</label>
  <div class="actions"><button class="btn" id="reportHere">Meld føre her</button><button class="btn line" id="mapMe">Der jeg er</button></div>
  <p class="small muted" id="mapHint" style="margin-top:6px"></p>
  <h3 style="margin-top:18px">Meldinger i kartutsnittet</h3><div id="repList" class="list"></div>
  <p class="small muted" style="margin-top:14px">Løyper: © Kartverket (Turrutebasen). Ikke alle løyper er med, og hundeløyper mangler de fleste steder. Meld gjerne om løyper du kjenner. Løypestatus fra Sporet og Hundesporet er ikke med ennå.</p>`;
}
async function loadTrails(){
  if(!bigMap||S.trails===false||bigMap.getZoom()<11){if(trailLayer)trailLayer.clearLayers();document.getElementById("mapHint")&&(document.getElementById("mapHint").textContent=S.trails!==false&&bigMap&&bigMap.getZoom()<11?"Zoom inn for å se skiløyper.":"");return}
  const b=bigMap.getBounds(), q=v=>Math.round(v*20)/20, key=[q(b.getSouth()),q(b.getWest()),q(b.getNorth()),q(b.getEast())].join(",");
  let lines=TRAIL_CACHE[key];
  if(!lines){
    try{
      const url=`https://wfs.geonorge.no/skwms1/wfs.turogfriluftsruter?service=WFS&version=2.0.0&request=GetFeature&typeNames=app:Skil%C3%B8ype&count=400&bbox=${key},urn:ogc:def:crs:EPSG::4258`;
      const xml=new DOMParser().parseFromString(await (await fetch(url)).text(),"application/xml");
      lines=[...xml.getElementsByTagName("app:Skiløype")].map(f=>{
        const t=n=>(f.getElementsByTagName(n)[0]||{}).textContent||"";
        const parts=[...f.getElementsByTagName("gml:posList")].map(pl=>{const v=pl.textContent.trim().split(/\s+/).map(Number),o=[];for(let i=0;i+1<v.length;i+=2)o.push([v[i],v[i+1]]);return o});
        return{name:t("app:rutenavn"),prep:t("app:preparering"),who:t("app:vedlikeholdsansvarlig"),parts};
      });
      TRAIL_CACHE[key]=lines;
    }catch(e){lines=[]}
  }
  if(!bigMap)return;
  trailLayer.clearLayers();
  const PREP={PM:"maskinpreparert",PS:"preparert med scooter",U:"upreparert"};
  for(const l of lines)for(const part of l.parts)L.polyline(part,{color:"#1f6feb",weight:3,opacity:.8}).addTo(trailLayer).bindPopup(`<b>${esc(l.name||"Skiløype")}</b>${l.prep?`<br>${esc(PREP[l.prep]||l.prep)}`:""}${l.who?`<br><span class="small">${esc(l.who)}</span>`:""}`);
  const h=document.getElementById("mapHint");if(h)h.textContent=lines.length?`${lines.length} skiløyper i utsnittet.`:"Ingen skiløyper fra Kartverket her.";
}
function bindMap(){
  const el=document.getElementById("bigmap");if(!el||!window.L)return;
  const pos=savedPos();
  bigMap=L.map(el,{scrollWheelZoom:true}).setView(pos?[pos.lat,pos.lon]:[61.5,10.5],pos?11:5);
  L.tileLayer(KARTVERKET,{maxZoom:18,attribution:'© <a href="https://www.kartverket.no/" target="_blank" rel="noopener">Kartverket</a>'}).addTo(bigMap);
  trailLayer=L.layerGroup().addTo(bigMap);
  const col={fresh:"#2E8B57",recent:"#D99A00",old:"#888"};
  for(const r of REP.list)L.circleMarker([r.lat,r.lon],{radius:8,color:"#fff",weight:2,fillColor:col[ageClass(r.created_at)],fillOpacity:1}).addTo(bigMap).bindPopup(reportHtml(r,true));
  bigMap.on("popupopen",e=>{const b=e.popup.getElement().querySelector("[data-delrep]");if(b)b.onclick=()=>delReport(b.dataset.delrep)});
  bigMap.on("click",e=>{if(pickMarker)pickMarker.remove();pickMarker=L.marker(e.latlng).addTo(bigMap);document.getElementById("reportHere").textContent="Meld føre ved markøren"});
  const list=()=>{const b=bigMap.getBounds(),inView=REP.list.filter(r=>b.contains([r.lat,r.lon])).slice(0,30);const el=document.getElementById("repList");if(el){el.innerHTML=inView.length?inView.map(r=>reportHtml(r,true)).join(""):`<p class="small muted">Ingen meldinger her siste 14 dager.</p>`;el.querySelectorAll("[data-delrep]").forEach(b=>b.onclick=()=>delReport(b.dataset.delrep))}};
  let t=null;bigMap.on("moveend",()=>{list();clearTimeout(t);t=setTimeout(loadTrails,400)});
  setTimeout(()=>{bigMap&&bigMap.invalidateSize();list();loadTrails()},50);
  document.getElementById("trailToggle").onchange=e=>{S.trails=e.target.checked;loadTrails()};
  document.getElementById("reportHere").onclick=()=>{const c=pickMarker?pickMarker.getLatLng():bigMap.getCenter();openReport(c.lat,c.lng)};
  document.getElementById("mapMe").onclick=()=>{if(!navigator.geolocation)return;navigator.geolocation.getCurrentPosition(p=>{try{localStorage.setItem("sn-pos",JSON.stringify({lat:p.coords.latitude,lon:p.coords.longitude}))}catch(e){}if(bigMap)bigMap.setView([p.coords.latitude,p.coords.longitude],13)},()=>toast("Fikk ikke tilgang til posisjonen"))};
}
async function delReport(id){if(!confirm("Slette føremeldingen?"))return;try{ok(await sb.from("foremeldinger").delete().eq("id",id));toast("Meldingen er slettet");await loadReports(true)}catch(e){toast(errText(e))}}
function openReport(lat,lon){
  const V={fore:"",loype:"Hundeløype",kjort:false};
  const draw=()=>{panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">Meld føre</h2><button class="btn ghost" id="rpClose">Lukk</button></div>
  <p class="small muted" style="margin-top:6px">Meldingen vises for alle brukere i 14 dager${S.profile.nickname?`, signert «${esc(S.profile.nickname)}»`:", uten navn (du kan sette et visningsnavn under Profil)"}.</p>
  <div class="field"><label for="rp-sted">Sted</label><input id="rp-sted" maxlength="60" placeholder="F.eks. Sjusjøen, hundeløypa mot Elgåsen" value="${esc(V.sted||"")}"></div>
  <div class="field"><span class="flabel">Løype</span><div class="chips">${LOYPE.map(x=>`<button type="button" class="chip" data-rl="${x}" aria-pressed="${V.loype===x}">${x}</button>`).join("")}</div></div>
  <div class="field"><span class="flabel">Føre</span><div class="chips">${FORE.map(x=>`<button type="button" class="chip" data-rf="${x}" aria-pressed="${V.fore===x}">${x}</button>`).join("")}</div></div>
  <div class="field"><label><input type="checkbox" id="rp-kjort" ${V.kjort?"checked":""} style="width:auto;margin-right:8px">Løypa er nylig kjørt eller preparert</label></div>
  <div class="field"><label for="rp-txt">Kommentar</label><textarea id="rp-txt" maxlength="400" placeholder="Snødybde, is på vann, beitedyr, vindfall …">${esc(V.tekst||"")}</textarea></div>
  <p class="err" id="rpErr" hidden></p><div class="actions"><button class="btn" id="rpSend">Publiser melding</button></div>`;
  const keep=()=>{V.sted=panel.querySelector("#rp-sted").value;V.tekst=panel.querySelector("#rp-txt").value;V.kjort=panel.querySelector("#rp-kjort").checked};
  panel.querySelector("#rpClose").onclick=closeForm;
  panel.querySelectorAll("[data-rl]").forEach(b=>b.onclick=()=>{keep();V.loype=b.dataset.rl;draw()});
  panel.querySelectorAll("[data-rf]").forEach(b=>b.onclick=()=>{keep();V.fore=b.dataset.rf;draw()});
  panel.querySelector("#rpSend").onclick=async()=>{keep();
    if(!V.fore)return showErr("rpErr",{message:"Velg hvordan føret er."});
    const btn=panel.querySelector("#rpSend");btn.disabled=true;
    try{ok(await sb.from("foremeldinger").insert({lat,lon,sted:V.sted.trim(),loype:V.loype,fore:V.fore,kjort:V.kjort,tekst:V.tekst.trim(),navn:S.profile.nickname||""}));closeForm();if(pickMarker){pickMarker.remove();pickMarker=null}toast("Takk! Meldingen er publisert");await loadReports(true)}
    catch(e){btn.disabled=false;showErr("rpErr",e)}};};
  draw();sheet.classList.add("open");
}

/* Bilder lagres privat i Supabase Storage (bøtta «bilder») under <bruker-id>/… og vises med lenker som varer en time.
   Før opplasting skaleres bildet ned og lagres som JPEG. Det sparer plass og fjerner posisjonsdata (EXIF) fra kameraet. */
const IMG={urls:{},pending:{}};
async function shrink(file,max){
  let img=await createImageBitmap(file,{imageOrientation:"from-image"}).catch(()=>null);
  if(!img)img=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=()=>rej(new Error("Bildet kunne ikke leses."));i.src=URL.createObjectURL(file)});
  const f=Math.min(1,max/Math.max(img.width,img.height)), c=document.createElement("canvas");
  c.width=Math.round(img.width*f);c.height=Math.round(img.height*f);
  c.getContext("2d").drawImage(img,0,0,c.width,c.height);
  return await new Promise(r=>c.toBlob(r,"image/jpeg",0.82));
}
async function uploadImage(file,folder,max){
  const blob=await shrink(file,max), path=`${S.user.id}/${folder}/${newId()}.jpg`;
  ok(await sb.storage.from("bilder").upload(path,blob,{contentType:"image/jpeg"}));
  IMG.urls[path]={url:URL.createObjectURL(blob),exp:Date.now()+3500e3};
  return path;
}
async function removeImages(paths){paths=(paths||[]).filter(Boolean);if(paths.length)await sb.storage.from("bilder").remove(paths)}
let urlTimer=null;
function loadImgs(){
  document.querySelectorAll("img[data-path]").forEach(i=>{const c=IMG.urls[i.dataset.path];if(c&&c.exp>Date.now()){if(i.src!==c.url)i.src=c.url}else IMG.pending[i.dataset.path]=1});
  if(!Object.keys(IMG.pending).length||!sb)return;
  clearTimeout(urlTimer);urlTimer=setTimeout(async()=>{
    const paths=Object.keys(IMG.pending);IMG.pending={};
    const r=await sb.storage.from("bilder").createSignedUrls(paths,3600);
    (r.data||[]).forEach(x=>{if(x.signedUrl)IMG.urls[x.path]={url:x.signedUrl,exp:Date.now()+3500e3}});
    document.querySelectorAll("img[data-path]").forEach(i=>{const c=IMG.urls[i.dataset.path];if(c)i.src=c.url});
  },20);
}
const imgTag=(path,cls,alt)=>`<img class="${cls}" data-path="${esc(path)}" alt="${esc(alt||"")}">`;
const allImagePaths=()=>[...S.sessions.flatMap(s=>s.bilder||[]),...Object.values(S.profile.dogInfo||{}).map(i=>i.photo),S.profile.cover].filter(Boolean);

function vHome(){
  const t=todayD(), race=parse(S.profile.raceDate), days=Math.round((race-t)/864e5);
  const bw=byWeek(), mon=monday(t), wk=bw[iso(mon)]||[], idx=planWeekIdx(t), pd=planDay(t);
  const hero=days>0?`<div class="count cond">${days}<small>${days===1?"dag":"dager"} til løpet</small></div>`:days===0?`<div class="count cond">Løpsdag<small>lykke til!</small></div>`:`<div class="count cond">Løpet er kjørt</div>`;
  let goals;
  if(idx>=0){const g=weekTotals(idx);
    goals=goalRow("Kilometer",sum(wk,"km"),g.km,fmtKm,"km")+goalRow("Høydemeter",sum(wk,"hm"),g.hm,v=>Math.round(v).toLocaleString("nb-NO"),"hm")+goalRow("Økter",wk.length,g.n,v=>String(v),"");
  }else{
    const ps=planStart(), until=Math.round((ps-t)/864e5);
    goals=`<p style="margin-top:12px"><span class="cond" style="font-size:1.7rem;font-weight:700">${fmtKm(sum(wk,"km"))} km</span> <span class="muted">denne uka · ${Math.round(sum(wk,"hm"))} hm · ${wk.length} økter</span></p>
    ${until>0?`<p class="small muted" style="margin-top:6px">Planen og ukemålene starter ${ps.toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"})}.</p>`:""}`;
  }
  let next=null;for(let i=0;i<77&&!next;i++){const d=addDays(t,i),p=planDay(d);if(p&&p.item[1]>=25&&!(i===0&&dogS().some(s=>s.dato===iso(d))))next={d,txt:p.item[0]}}
  const todayDone=S.sessions.some(s=>s.dato===iso(t));
  return `<div class="home">
  ${S.profile.cover?`<div class="cover">${imgTag(S.profile.cover,"","Forsidebilde")}</div>`:""}
  <section class="hero">${hero}</section><p class="race center">${esc(S.profile.raceName||"Løpet")} ${race.toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"})} – ${fmtKm(S.profile.raceKm)} km${S.profile.raceHm?` og ${S.profile.raceHm} høydemeter`:""}</p>
  ${progressCard(t)}
  ${trail(bw,t)}
  <section class="week">
    <div class="row"><h3>Ukemål uke ${isoWeek(t)}</h3><span class="small muted">${idx>=0?esc(PLAN[idx].f):""}</span></div>
    ${goals}
    <div class="next">
      <div><p class="lab muted">I dag</p><p class="what">${esc(pd?pd.item[0]:"Ingen plan")}${todayDone?' <span class="badge-ok">✓</span>':""}</p></div>
      <div><p class="lab muted">Neste langtur</p><p class="what">${next?`${DAYS[(next.d.getDay()+6)%7]} ${fmtD(next.d)}: ${esc(next.txt.replace(/^❄ /,""))}`:"–"}</p></div>
    </div>
  </section>
  ${sh("route","Føre og løyper","trail")}
  ${foreCard()}
  ${sh("cloud-sun","Vær og varme","wx")}
  ${weatherCard()}
  ${sh("paw-print","Hundene","dog")}
  ${S.profile.dogs.length?`<div class="dogs t-dog">${S.profile.dogs.map(dogCard).join("")}</div>`:`<p class="notice">Legg til hundene dine under Profil.</p>`}
  <div class="row center" style="margin-top:28px">${sh("person-standing","Deg","me","margin:0")}<button class="btn ghost sm" id="addMe">+ Egen økt</button></div>
  ${meCard(t)}
  ${sh("trending-up","Uke for uke","plan")}
  ${chart(bw)}</div>`;
}

/* Vær fra MET Norway (yr). Posisjonen hentes fra nettleseren og huskes på denne enheten. */
const W={data:null,err:"",loading:false,at:0};
function savedPos(){try{return JSON.parse(localStorage.getItem("sn-pos")||"null")}catch(e){return null}}
async function loadWeather(force){
  const pos=savedPos();
  if(W.loading||!pos||(!force&&(W.err||W.data&&Date.now()-W.at<30*60e3)))return;
  W.loading=true;
  try{
    const r=await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${pos.lat.toFixed(3)}&lon=${pos.lon.toFixed(3)}`);
    if(!r.ok)throw new Error(String(r.status));
    const d=await r.json();
    W.data=d.properties.timeseries.slice(0,30).map(x=>({t:new Date(x.time),temp:x.data.instant.details.air_temperature,rh:x.data.instant.details.relative_humidity,wind:x.data.instant.details.wind_speed}));
    W.at=Date.now();W.err="";
  }catch(e){W.err="fetch"}
  W.loading=false;render();
}
function askPos(){
  if(!navigator.geolocation){W.err="denied";render();return}
  navigator.geolocation.getCurrentPosition(p=>{try{localStorage.setItem("sn-pos",JSON.stringify({lat:p.coords.latitude,lon:p.coords.longitude}))}catch(e){}loadWeather(true)},()=>{W.err="denied";render()},{maximumAge:3600e3,timeout:15000});
}
const wxNow=()=>W.data&&(W.data.find(x=>x.t>=new Date(Date.now()-30*60e3))||W.data[0]);
// Varmerisiko for trekk og aktiv trening. Bygger på NHFs barmarksgrenser (16 og 18 °C) og «150-regelen»
// (temperatur i °F + luftfuktighet i %). Veiledende: hunder tåler varme ulikt.
function heatRisk(temp,rh){
  const sum=temp*9/5+32+(rh||0);
  const lvl=temp>18?3:(temp>16||sum>=150)?2:(temp>10||sum>=145)?1:0;
  return {lvl,sum:Math.round(sum)};
}
const RISK=[
  {t:"Gode forhold",c:"ok",tips:["Vanlig trening. Ha likevel med vann på lengre turer."]},
  {t:"Tilpass treningen",c:"warn",tips:["Kortere økter og roligere tempo.","Gi vann ofte, i små mengder.","Velg skygge og løyper med bekker eller vann der hunden kan kjøle seg ned."]},
  {t:"Høy varmerisiko",c:"bad",tips:["Tren tidlig om morgenen eller sent på kvelden.","Hold øktene korte og rolige, og stopp før hunden blir sliten.","Over 16 °C kortes barmarksløp ned etter NHFs regler."]},
  {t:"For varmt for trekk",c:"bad",tips:["Ikke trekktrening nå. NHF avlyser barmarksløp over 18 °C.","Rolig tur i skygge, bading eller hvile i stedet."]},
];
const HEAT_SIGNS="Tegn på overoppheting: kraftig pesing, bred og mørk tunge, sikling, vingling eller at hunden vil stoppe. Stopp, finn skygge og kjøl ned med vann (ikke iskaldt). Kontakt veterinær ved tvil.";
function weatherCard(){
  if(!savedPos())return `<div class="wx card t-wx"><p class="small muted">Se temperatur, luftfuktighet og varmerisiko for hundene der du er, og når det er best å trene.</p>
    ${W.err==="denied"?`<p class="small err">Fikk ikke tilgang til posisjonen. Slå på stedstjenester for nettleseren og prøv igjen.</p>`:""}
    <div class="actions"><button class="btn line" id="wxPos">Vis vær der jeg er</button></div></div>`;
  if(!W.data)return `<div class="wx"><p class="small muted">${W.err?"Fikk ikke hentet været. Prøv igjen senere.":"Henter vær …"}</p>${W.err?`<div class="actions"><button class="btn ghost sm" id="wxRetry">Prøv igjen</button></div>`:""}</div>`;
  const now=wxNow(), r=heatRisk(now.temp,now.rh), R=RISK[r.lvl];
  const next=W.data.filter(x=>x.t>new Date()&&x.t<new Date(Date.now()+24*3600e3));
  const best=next.filter(x=>x.t.getHours()>=5&&x.t.getHours()<=22).reduce((a,x)=>!a||heatRisk(x.temp,x.rh).sum<heatRisk(a.temp,a.rh).sum?x:a,null);
  const hh=d=>d.toLocaleTimeString("nb-NO",{hour:"2-digit",minute:"2-digit"});
  return `<div class="wx card t-wx"><div class="row"><b>${icon("thermometer","sm")} Vær nå</b><span class="pill ${R.c}">${R.t}</span></div>
   <div class="wxnow"><span class="cond">${fmtKm(now.temp)}°</span><span>${Math.round(now.rh)} % fuktighet<br>${fmtKm(now.wind)} m/s vind</span></div>
   <div class="wxbar" aria-label="Varmerisiko neste 24 timer">${next.map(x=>`<i class="r${heatRisk(x.temp,x.rh).lvl}" title="${hh(x.t)}: ${fmtKm(x.temp)}°, ${Math.round(x.rh)} %"></i>`).join("")}</div>
   <p class="small muted">Neste 24 timer${best&&r.lvl>0?` · svalest/tørrest kl. ${hh(best.t)}: ${fmtKm(best.temp)}°, ${Math.round(best.rh)} %`:""}</p>
   <ul class="small">${R.tips.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>
   ${r.lvl>0?`<p class="small muted">${esc(HEAT_SIGNS)}</p>`:""}
   <p class="small muted" style="margin-top:6px">Veiledende: rase, pels, form og tilvenning betyr mye. Data fra <a href="https://www.met.no/" target="_blank" rel="noopener">MET Norway</a>.</p></div>`;
}

/* Belastning: siste 7 dager mot snittet av de 4 ukene før (akutt mot kronisk).
   Hund: km. Deg: minutter × anstrengelse. Toleransen kan justeres per hund, fordi raser og individer tåler ulikt. */
const TOLERANCE={lav:{t:"Lav",warn:1.2,high:1.4},normal:{t:"Normal",warn:1.3,high:1.5},hoy:{t:"Høy",warn:1.5,high:1.8}};
function loadStatus(list,val,tol){
  const t=todayD(), a0=addDays(t,-6), c0=addDays(t,-34);
  const inR=(s,from,to)=>{const d=parse(s.dato);return d>=from&&d<to};
  const acute=list.filter(s=>inR(s,a0,addDays(t,1))).reduce((x,s)=>x+val(s),0);
  const chronic=list.filter(s=>inR(s,c0,a0)).reduce((x,s)=>x+val(s),0)/4;
  const T=TOLERANCE[tol]||TOLERANCE.normal;
  if(chronic<=0)return{acute,chronic,ratio:null,lvl:0,t:acute?"For lite historikk ennå. Varsel kommer etter et par uker med logging.":""};
  const ratio=acute/chronic;
  const lvl=ratio>=T.high?2:ratio>=T.warn?1:0;
  const pct=Math.round((ratio-1)*100);
  return{acute,chronic,ratio,lvl,t:lvl===2?`Kraftig økning: ${pct} % mer enn vanlig siste uke. Vurder en roligere uke.`:lvl===1?`Økning på ${pct} % mot vanlig. Følg med på hvordan kroppen tar det.`:ratio<0.6?"Mindre enn vanlig siste uke. Bygg opp igjen gradvis.":"Belastningen er jevn."};
}
const dogLoad=n=>loadStatus(dogS().filter(s=>(s.hunder||[]).includes(n)),s=>Number(s.km)||0,dogInfo(n).tolerance);
const meLoad=()=>loadStatus(meS(),s=>(Number(s.min)||0)*(Number(s.rpe)||5),"normal");
function loadBox(L,unit){
  if(!L.t)return "";
  const max=Math.max(L.acute,L.chronic,1);
  return `<div class="load"><p class="small ${L.lvl===2?"err":L.lvl===1?"warntext":"muted"}">${L.lvl?"⚠ ":""}${esc(L.t)}</p>
   ${L.ratio!=null?`<div class="lbar"><span>Siste 7 dager</span><div class="bar"><span class="${L.lvl===2?"hi":L.lvl===1?"mid":""}" style="width:${L.acute/max*100}%"></span></div><b>${unit(L.acute)}</b></div>
   <div class="lbar"><span>Vanlig uke</span><div class="bar"><span class="base" style="width:${L.chronic/max*100}%"></span></div><b>${unit(L.chronic)}</b></div>`:""}</div>`;
}
function meCard(t){
  const mon=monday(t), wk=meS().filter(s=>parse(s.dato)>=mon), d28=meS().filter(s=>parse(s.dato)>addDays(t,-28));
  const withDog=dogS().filter(s=>parse(s.dato)>=mon&&ACTIVE_WITH_DOG.includes(typeOf(s.type)));
  const rpes=wk.map(s=>s.rpe).filter(Boolean), avg=rpes.length?Math.round(rpes.reduce((a,b)=>a+b,0)/rpes.length*10)/10:null;
  const goals=goalsHtml();
  if(!meS().length&&!withDog.length)return `<p class="notice">Logg din egen trening her, som løping, styrke og ski. Den holdes adskilt fra hundenes ukemål. Trykk «+ Egen økt» for å starte.</p>${goals}`;
  return `<div class="stats t-me" style="margin-top:10px"><div><span class="cond">${wk.length}</span><small>økter denne uka</small></div><div><span class="cond">${fmtMin(sum(wk,"min")).replace(" min","m").replace(" t ","t ")}</span><small>tid</small></div>
   <div><span class="cond">${avg!=null?String(avg).replace(".",","):"–"}</span><small>snitt anstrengelse</small></div><div><span class="cond">${d28.length}</span><small>økter siste 4 uker</small></div></div>
   ${loadBox(meLoad(),v=>Math.round(v)+" p")}
   ${withDog.length?`<p class="small muted" style="margin-top:8px">I tillegg har du vært aktiv med hundene i ${fmtMin(sum(withDog,"min"))} denne uka (canicross, skijøring, sykkel, gåtur, kløv).</p>`:""}${goals}`;
}
/* Egne mål, f.eks. fjelltur med tung sekk. Fremgang regnes fra egne økter av samme type. */
function goalSessions(g){
  const own=meS().filter(s=>!g.type||typeOf(s.type,"meg")===g.type);
  const walk=g.type==="Fjelltur / gåtur"?dogS().filter(s=>["Gåtur","Kløvtur"].includes(typeOf(s.type))):[];
  return {own,walk};
}
function goalProgress(g){
  const {own,walk}=goalSessions(g), all=[...own,...walk];
  const best=(list,f)=>list.reduce((a,s)=>Math.max(a,Number(s[f])||0),0);
  const done=own.some(s=>(!g.km||s.km>=g.km)&&(!g.hm||s.hm>=g.hm)&&(!g.kg||(s.last_kg||0)>=g.kg));
  return {km:best(all,"km"),hm:best(all,"hm"),kg:best(own,"last_kg"),done};
}
/* Forslag til plan mot et eget mål: én langtur i uka som bygges opp mot målet, lettere uke hver 4. uke,
   nedtrapping uka før, og styrke to ganger i uka. Starter fra det du allerede har gått. */
function goalPlan(g){
  if(!g.km&&!g.kg&&!g.hm)return [];
  const p=goalProgress(g), now=monday(todayD()), end=g.date?monday(parse(g.date)):null;
  const N=Math.min(16,Math.max(4,end?Math.round((end-now)/864e5/7)+1:10));
  // Langt unna: planen starter 16 uker før målet
  const start=end&&end>addDays(now,(N-1)*7)?addDays(end,-(N-1)*7):now;
  const k0=g.km?Math.max(p.km,g.km*0.4):0, kg0=g.kg?Math.max(p.kg,g.kg*0.4):0;
  const hmPerKm=g.km&&g.hm?g.hm/g.km:0;
  const r1=x=>Math.round(x*2)/2;
  return Array.from({length:N},(_,i)=>{
    const from=addDays(start,i*7);
    if(i===N-1)return{from,goal:true,txt:`Målet: ${g.name}`};
    if(i===N-2&&N>4)return{from,txt:`Nedtrapping: kort tur${g.km?` ${fmtKm(r1(g.km*0.4))} km`:""}${g.kg?` med ${fmtKm(r1(g.kg*0.7))} kg`:""}. Spar kreftene.`};
    const f=Math.min(1,i/Math.max(1,N-3)), easy=(i+1)%4===0;
    const km=g.km?r1((k0+(g.km*0.9-k0)*f)*(easy?0.7:1)):0, kg=g.kg?r1((kg0+(g.kg-kg0)*f)*(easy?0.8:1)):0;
    const hm=hmPerKm?Math.round(km*hmPerKm/50)*50:0;
    return{from,easy,txt:`${easy?"Lett uke: ":""}Langtur${km?` ${fmtKm(km)} km`:""}${hm?`, ${hm} hm`:""}${kg?` med ${fmtKm(kg)} kg sekk`:""}`};
  });
}
function goalsHtml(){
  const gs=S.profile.myGoals||[];
  const bar=(label,v,goal,unit)=>{const pct=Math.min(100,v/goal*100);return `<div class="gbar"><div class="row small"><span>${label}</span><span class="muted">${fmtKm(v)} / ${fmtKm(goal)} ${unit}</span></div><div class="bar"><span style="width:${pct}%"></span></div></div>`};
  return `<div class="row center" style="margin-top:18px"><h3 class="t-me">${icon("target","sm")} Mine mål</h3><button class="btn ghost sm" id="addGoal">+ Nytt mål</button></div>
  ${gs.length?gs.map(g=>{const p=goalProgress(g),days=g.date?Math.round((parse(g.date)-todayD())/864e5):null;
    return `<button type="button" class="goal t-me" data-goal="${esc(g.id)}"><div class="row"><b>${esc(g.name)}</b><span class="small ${p.done?"badge-ok":"muted"}">${p.done?"Nådd ✓":days!=null?(days>=0?`om ${days} dager`:"datoen er passert"):""}</span></div>
     <p class="small muted">${esc(g.type||"Alle typer")}${g.date?` · ${parse(g.date).toLocaleDateString("nb-NO",{day:"numeric",month:"long",year:"numeric"})}`:""}</p>
     ${g.km?bar("Lengste tur",p.km,g.km,"km"):""}${g.hm?bar("Mest stigning",p.hm,g.hm,"hm"):""}${g.kg?bar("Tyngste sekk",p.kg,g.kg,"kg"):""}
     ${!g.km&&!g.hm&&!g.kg?`<p class="small muted">Sett distanse, høydemeter eller sekkvekt for å følge fremgangen.</p>`:p.done?"":(()=>{const gp=goalPlan(g),w=gp.find(x=>x.from<=todayD()&&addDays(x.from,7)>todayD());return w?`<p class="small" style="margin-top:8px"><b>Denne uka:</b> ${esc(w.txt)}</p>`:gp.length?`<p class="small muted" style="margin-top:8px">Planen starter ${gp[0].from.toLocaleDateString("nb-NO",{day:"numeric",month:"long"})}. Til da: tren som vanlig.</p>`:""})()}</button>`}).join("")
  :`<p class="small muted" style="margin-top:6px">For eksempel: «Galdhøpiggen med 12 kg sekk» – 15 km, 1300 hm og 12 kg. Fremgangen regnes fra øktene du logger.</p>`}`;
}
function openGoal(g){
  const e=g||{type:"Fjelltur / gåtur"};
  panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">${g?"Endre mål":"Nytt mål"}</h2><button class="btn ghost" id="gClose">Lukk</button></div>
  <div class="field"><label for="g-name">Mål</label><input id="g-name" value="${esc(e.name||"")}" maxlength="60" placeholder="F.eks. Galdhøpiggen med 12 kg sekk"></div>
  <div class="field"><label for="g-type">Type økt som teller</label><select id="g-type">${MY_TYPES.map(t=>`<option ${e.type===t?"selected":""}>${t}</option>`).join("")}</select></div>
  <div class="field grid3"><div><label for="g-km">Km</label><input id="g-km" inputmode="decimal" value="${e.km||""}" placeholder="–"></div>
   <div><label for="g-hm">Høydemeter</label><input id="g-hm" inputmode="numeric" value="${e.hm||""}" placeholder="–"></div>
   <div><label for="g-kg">Sekk (kg)</label><input id="g-kg" inputmode="decimal" value="${e.kg||""}" placeholder="–"></div></div>
  <div class="field"><label for="g-date">Når (valgfritt)</label><input id="g-date" type="date" value="${esc(e.date||"")}"></div>
  <p class="small muted" style="margin-top:8px">Målet er nådd når én økt av denne typen har minst denne distansen, stigningen og sekkvekten.</p>
  ${g&&goalPlan(g).length?`<h3 style="margin-top:18px">Forslag til plan</h3>
   <p class="small muted">Én langtur i uka som bygges opp fra det du har gått til nå, lett uke hver 4. uke og nedtrapping før målet. I tillegg: styrke for bein, kjerne og rygg to ganger i uka, gjerne en kortere tur med hunden.</p>
   <div class="list">${goalPlan(g).map((w,i)=>`<div class="lrow${w.goal?" goalrow":""}"><span class="small muted" style="flex:0 0 64px">Uke ${i+1}<br>${fmtD(w.from)}</span><span${w.easy?' class="muted"':""}>${w.goal?"<b>":""}${esc(w.txt)}${w.goal?"</b>":""}</span></div>`).join("")}</div>`:""}
  <p class="err" id="gErr" hidden></p>
  <div class="actions">${g?`<button class="btn del" id="gDel">Slett</button>`:""}<button class="btn" id="gSave">Lagre mål</button></div>`;
  sheet.classList.add("open");
  const put=async list=>{try{ok(await sb.from("profiles").update({my_goals:list}).eq("user_id",S.user.id));S.profile.myGoals=list;closeForm();render();toast("Målet er lagret")}catch(err){showErr("gErr",err)}};
  const $=id=>panel.querySelector("#"+id);
  $("gClose").onclick=closeForm;
  $("gSave").onclick=()=>{
    const name=$("g-name").value.trim();if(!name)return showErr("gErr",{message:"Gi målet et navn."});
    const v={id:e.id||newId(),name,type:$("g-type").value,km:num($("g-km").value)||null,hm:Math.round(num($("g-hm").value))||null,kg:num($("g-kg").value)||null,date:$("g-date").value||""};
    const list=(S.profile.myGoals||[]).filter(x=>x.id!==v.id);put(g?(S.profile.myGoals||[]).map(x=>x.id===v.id?v:x):[...list,v]);
  };
  const d=$("gDel");if(d)d.onclick=()=>{if(confirm("Slette målet?"))put((S.profile.myGoals||[]).filter(x=>x.id!==e.id))};
}
function progressCard(t){
  const ps=planStart(), race=parse(S.profile.raceDate), end=addDays(monday(race),6);
  const total=PLAN.reduce((a,_,i)=>a+weekTotals(i).km,0);
  const inPlan=dogS().filter(s=>{const d=parse(s.dato);return d>=ps&&d<=end});
  const done=sum(inPlan,"km"), fk=Math.min(1,done/total);
  const span=Math.round((race-ps)/864e5), gone=Math.min(span,Math.max(0,Math.round((t-ps)/864e5))), ft=span?gone/span:0;
  const wkNo=Math.min(PLAN.length,Math.max(0,Math.floor((t-ps)/864e5/7)+1));
  const R1=56,R2=40,C1=2*Math.PI*R1,C2=2*Math.PI*R2;
  const started=t>=ps;
  const before=sum(dogS().filter(s=>parse(s.dato)<ps),"km");
  const ahead=started&&gone>0?(fk-ft):0;
  const status=!started?`Planen starter ${ps.toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"})}.`
    :ahead>=0.03?"Du ligger foran planen.":ahead<=-0.08?"Du ligger litt bak planen.":"Du ligger i rute.";
  return `<section class="prog" aria-label="Fremdrift mot løpet">
    <svg viewBox="0 0 132 132" width="132" height="132" role="img" aria-label="${Math.round(fk*100)} prosent av planlagte kilometer, ${Math.round(ft*100)} prosent av tiden">
      <circle cx="66" cy="66" r="${R1}" fill="none" stroke="var(--soft)" stroke-width="13"/>
      <circle cx="66" cy="66" r="${R1}" fill="none" stroke="var(--accent)" stroke-width="13" stroke-linecap="round" stroke-dasharray="${(C1*fk).toFixed(1)} ${C1.toFixed(1)}" transform="rotate(-90 66 66)"/>
      <circle cx="66" cy="66" r="${R2}" fill="none" stroke="var(--soft)" stroke-width="8"/>
      <circle cx="66" cy="66" r="${R2}" fill="none" stroke="var(--ink)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(C2*ft).toFixed(1)} ${C2.toFixed(1)}" transform="rotate(-90 66 66)"/>
      <text x="66" y="68" text-anchor="middle" style="font:700 26px 'Barlow Condensed',sans-serif;fill:var(--ink)">${Math.round(fk*100)}%</text>
      <text x="66" y="84" text-anchor="middle" style="font:500 10.5px 'Barlow',sans-serif;fill:var(--muted)">av planen</text>
    </svg>
    <div>
      <h3>${icon("flag","sm")} Mot målet</h3>
      <div class="li"><span class="sw" style="background:var(--accent)"></span><span><span class="big">${fmtKm(done)}</span> <span class="muted">av ${total} km kjørt</span></span></div>
      <div class="li"><span class="sw" style="background:var(--ink)"></span><span><span class="big">${started?`Uke ${wkNo}`:"Uke 0"}</span> <span class="muted">av ${PLAN.length}</span></span></div>
      <p class="small" style="margin-top:10px">${status}</p>
      ${before?`<p class="small muted" style="margin-top:4px">${fmtKm(before)} km trent før planen startet.</p>`:""}
    </div>
  </section>`;
}

/* Hundeprofiler. Lagres i profiles.dog_info, med hundens navn som nøkkel. */
const VACCINES=[
  {id:"DHP",name:"Valpesyke, parvo og hepatitt (DHP)",years:3},
  {id:"KH",name:"Kennelhoste (Pi + Bordetella)",years:1},
  {id:"Rabies",name:"Rabies",years:null},
  {id:"Annet",name:"Annet",years:null},
];
const BCS=[[1,"avmagret"],[2,"svært tynn"],[3,"tynn"],[4,"ideell, slank"],[5,"ideell"],[6,"litt over"],[7,"tung"],[8,"fet"],[9,"svært fet"]];
const vacName=id=>(VACCINES.find(v=>v.id===id)||{name:id}).name;
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const dogInfo=n=>(S.profile.dogInfo||{})[n]||{};
const byDateDesc=a=>(a||[]).slice().sort((x,y)=>x.d<y.d?1:x.d>y.d?-1:0);
const lastWeight=n=>byDateDesc(dogInfo(n).weights).find(w=>w.kg)||null;
const addYears=(s,y)=>{const d=parse(s);d.setFullYear(d.getFullYear()+y);return iso(d)};
function vaccineStatus(v){
  if(!v.until)return{c:"",t:"Ingen utløpsdato"};
  const days=Math.round((parse(v.until)-todayD())/864e5);
  if(days<0)return{c:"bad",t:`Utløpt ${parse(v.until).toLocaleDateString("nb-NO")}`};
  if(days<=60)return{c:"warn",t:`Går ut om ${days} ${days===1?"dag":"dager"}`};
  return{c:"ok",t:`Gyldig til ${parse(v.until).toLocaleDateString("nb-NO")}`};
}
function ageMonths(born,at){const b=parse(born),a=at||todayD();let m=(a.getFullYear()-b.getFullYear())*12+a.getMonth()-b.getMonth();if(a.getDate()<b.getDate())m--;return m}
const ageText=m=>m<24?`${m} mnd`:`${Math.floor(m/12)} år${m%12?` og ${m%12} mnd`:""}`;
function dogWarnings(n){
  const i=dogInfo(n), w=[], race=S.profile.raceDate;
  if(!i.chip)w.push("Mangler chip-ID");
  const latest=type=>byDateDesc((i.vaccines||[]).filter(v=>v.type===type))[0];
  const dhp=latest("DHP"), kh=latest("KH");
  if(!dhp)w.push("Mangler DHP-vaksine");
  else{const st=vaccineStatus(dhp);if(st.c==="bad"||st.c==="warn")w.push(`DHP: ${st.t.toLowerCase()}`);else if(dhp.until&&dhp.until<race)w.push("DHP går ut før løpet")}
  if(kh){const st=vaccineStatus(kh);if(st.c==="bad"||st.c==="warn")w.push(`Kennelhoste: ${st.t.toLowerCase()}`);else if(kh.until&&kh.until<race)w.push("Kennelhoste går ut før løpet")}
  if(i.born){const m=ageMonths(i.born,parse(race));if(m<18)w.push(`Bare ${ageText(Math.max(0,m))} på løpsdagen (krav: 18 mnd)`)}
  return w;
}
async function saveDogInfo(n,info){
  const all={...(S.profile.dogInfo||{}),[n]:info};
  ok(await sb.from("profiles").update({dog_info:all}).eq("user_id",S.user.id));
  S.profile.dogInfo=all;
}
function weightChart(ws){
  const pts=ws.filter(w=>w.kg).slice().reverse();
  if(pts.length<2)return "";
  const W=320,Hh=90,pad=22,min=Math.min(...pts.map(p=>p.kg))-1,max=Math.max(...pts.map(p=>p.kg))+1;
  const t0=parse(pts[0].d),t1=parse(pts[pts.length-1].d),span=Math.max(1,t1-t0);
  const xy=p=>[pad+(parse(p.d)-t0)/span*(W-2*pad),8+(Hh-30)*(1-(p.kg-min)/(max-min))];
  const line=pts.map(p=>xy(p).map(v=>v.toFixed(1)).join(",")).join(" ");
  return `<div class="chart"><svg viewBox="0 0 ${W} ${Hh}" width="100%" role="img" aria-label="Vekt over tid">
    <polyline points="${line}" fill="none" stroke="var(--accent)" stroke-width="2.5" stroke-linejoin="round"/>
    ${pts.map(p=>{const [x,y]=xy(p);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="var(--accent)"><title>${fmtD(parse(p.d))}: ${fmtKm(p.kg)} kg</title></circle>`}).join("")}
    <text x="${pad}" y="${Hh-4}">${fmtD(t0)}</text><text x="${W-pad}" y="${Hh-4}" text-anchor="end">${fmtD(t1)}</text>
    <text x="${W-pad}" y="12" text-anchor="end">${fmtKm(pts[pts.length-1].kg)} kg</text></svg></div>`;
}
/* Kløvplan (pack.js). Startdato lagres i dogInfo.packStart. Fremgang regnes fra hundens kløvøkter. */
const PACK_TYPES=["Kløvtur","Kløvtrening"];
function packWeek(n,start,i){
  const from=addDays(parse(start),i*7), to=addDays(from,7);
  const ss=dogS().filter(s=>(s.hunder||[]).includes(n)&&PACK_TYPES.includes(typeOf(s.type))&&parse(s.dato)>=from&&parse(s.dato)<to);
  return {from,km:sum(ss,"km"),maxKg:ss.reduce((a,s)=>Math.max(a,Number(s.last_kg)||0),0),longest:ss.reduce((a,s)=>Math.max(a,Number(s.km)||0),0)};
}
function packSection(n){
  const i=dogInfo(n), lw=lastWeight(n), kg=pct=>lw?Math.round(lw.kg*pct/100*10)/10:null;
  const ageNote=i.born&&ageMonths(i.born)<18?`<p class="notice warnbox">${esc(n)} er ${ageText(ageMonths(i.born))}. Vent med vekt i kløven til hunden er minst 18 måneder.</p>`:"";
  const rule=`<p class="small muted" style="margin-top:8px"><b>Huskeregel:</b> ${esc(window.PACK_RULE)}</p>`;
  if(!i.packStart)return `${sh("backpack","Kløvtrening","dog")}${ageNote}
    <ul class="small" style="padding-left:20px;margin:6px 0">${window.PACK_INTRO.map(t=>`<li>${esc(t)}</li>`).join("")}</ul>${rule}
    <p class="small muted" style="margin-top:8px">${esc(window.PACK_PREP)}</p>
    ${lw?"":`<p class="small muted" style="margin-top:8px">Legg inn vekten til ${esc(n)} over, så regnes kiloene ut for deg.</p>`}
    <div class="field"><label for="pk-start">Start uke 1</label><input id="pk-start" type="date" value="${iso(addDays(monday(todayD()),7))}"></div>
    <div class="actions"><button class="btn" id="pkStart">Start kløvplan (${PACK_PLAN.length} uker)</button></div>`;
  const cur=Math.floor((todayD()-parse(i.packStart))/864e5/7);
  return `<div class="row" style="margin-top:28px">${sh("backpack","Kløvplan","dog","margin:0")}<button class="btn ghost sm" id="pkStop">Avslutt</button></div>
  <p class="small muted">Startet ${parse(i.packStart).toLocaleDateString("nb-NO",{day:"numeric",month:"long"})}${lw?` · regnet ut fra ${fmtKm(lw.kg)} kg`:" · legg inn vekt for å se kilo"}. Logg turene som «Kløvtur» eller «Kløvtrening» med vekt i kløven.</p>
  ${ageNote}${rule}
  <div class="pack">${PACK_PLAN.map((w,k)=>{const pw=packWeek(n,i.packStart,k),tk=kg(w.pct);
    const okKg=!w.pct||!tk||pw.maxKg>=tk*0.95, done=!w.rest&&pw.km>=w.km&&okKg, now=k===cur;
    return `<div class="pweek${now?" now":""}${done?" done":""}${w.badge?" badge":""}"><div class="row"><b>Uke ${k+1}</b><span class="small muted">${fmtD(pw.from)}</span></div>
     <p>${w.rest?esc(w.ex):`<b>${w.pct} %${tk?` · ${fmtKm(tk)} kg`:""}</b> · ${w.km} km i uka <span class="muted">(${esc(w.ex)})</span>`}</p>
     ${w.badge?`<p class="small"><b>${w.badge}merket:</b> ${esc(w.badgeText)}</p>`:""}
     ${w.note?`<p class="small muted">${esc(w.note)}</p>`:""}
     ${!w.rest&&(pw.km||k<=cur)?`<p class="small ${done?"badge-ok":"muted"}">${done?"✓ ":""}Gått ${fmtKm(pw.km)} av ${w.km} km${pw.maxKg?` · tyngst ${fmtKm(pw.maxKg)} kg`:""}${!okKg&&pw.km?" · for lite vekt":""}</p>`:""}</div>`}).join("")}
   <div class="pweek badge"><b>Neste sesong: ${window.PACK_GOLD.badge}merket</b><p class="small">${esc(window.PACK_GOLD.text)}${kg(25)?` (${fmtKm(kg(25))} kg)`:""}</p><p class="small muted">${esc(window.PACK_GOLD.note)}</p></div></div>`;
}
/* Fôrkalkulator: hvileenergi (RER = 70 × kg^0,75) × aktivitetsfaktor. Fôr fra feeds.js eller eget tall fra sekken. */
const ACTIVITY=[
  {id:"lite",t:"Rolig eller eldre hund",f:1.4,fn:1.2},
  {id:"normal",t:"Vanlig aktiv, daglige turer",f:1.8,fn:1.6},
  {id:"aktiv",t:"Trener 1–2 timer om dagen",f:2.5},
  {id:"hard",t:"Hard trening, sledehund i sesong",f:4},
  {id:"ekstrem",t:"Langdistanseløp eller streng kulde",f:7},
];
function activityFromLog(n){
  const from=addDays(todayD(),-13), km=sum(dogS().filter(s=>(s.hunder||[]).includes(n)&&parse(s.dato)>=from),"km")/14;
  return {km,id:km<1?"lite":km<3?"normal":km<8?"aktiv":km<18?"hard":"ekstrem"};
}
const feedById=id=>(window.FEEDS||[]).find(f=>f.id===id);
const feedMix=i=>Array.isArray(i.mix)?i.mix:i.feed2Id?[{id:i.feed2Id,share:i.feed2Share}]:[];
const mixRow=(id,share)=>`<div class="field mixrow grid3" style="grid-template-columns:2fr 1fr auto;align-items:end"><div><label>Tillegg</label><select class="mx-id"><option value="">Velg</option>${feedOptions(id).replace(/<option value="">Velg fôr<\/option>/,"").replace(/<option value="custom"[^>]*>[^<]*<\/option>/,"")}</select></div><div><label>Andel %</label><input class="mx-share" inputmode="numeric" value="${esc(share??"")}" placeholder="20"></div><button type="button" class="btn ghost sm rmmix" aria-label="Fjern tillegg">×</button></div>`;
function feedNeed(n){
  const i=dogInfo(n), lw=lastWeight(n);
  if(!lw)return null;
  const a=ACTIVITY.find(x=>x.id===(i.activity||"normal"))||ACTIVITY[1];
  const factor=i.neutered&&a.fn?a.fn:a.f, rer=70*Math.pow(lw.kg,0.75), lb=byDateDesc(i.weights).find(w=>w.bcs);
  const adj=lb&&lb.bcs>=6?0.9:lb&&lb.bcs<=3?1.1:1;
  const kcal=rer*factor*adj, fd=i.feedId==="custom"?{name:i.feedName||"Eget fôr",kcal100:Number(i.feedKcal)||0}:feedById(i.feedId);
  // Tillegg (f.eks. VOM, rent kjøtt, fett), hvert med andel av dagens energi. Resten kommer fra hovedfôret.
  const adds=feedMix(i).map(m=>({feed:feedById(m.id),share:Math.max(0,Number(m.share)||0)/100})).filter(m=>m.feed&&m.share);
  const sum=adds.reduce((a,m)=>a+m.share,0), scale=sum>0.9?0.9/sum:1;
  adds.forEach(m=>{m.share*=scale;m.grams=kcal*m.share/m.feed.kcal100*100});
  const rest=1-adds.reduce((a,m)=>a+m.share,0);
  return {kg:lw.kg,rer,factor,adj,kcal,bcs:lb&&lb.bcs,feed:fd,adds,rest,water:Number(i.water)||0,
    grams:fd&&fd.kcal100?kcal*rest/fd.kcal100*100:null};
}
function feedOptions(sel){
  const groups={};for(const f of window.FEEDS||[])(groups[f.brand]=groups[f.brand]||[]).push(f);
  return `<option value="">Velg fôr</option>`+Object.entries(groups).sort((a,b)=>{const last=k=>k.startsWith("Rent kjøtt")?1:k.startsWith("Fett og olje")?2:0;return last(a[0])-last(b[0])||a[0].localeCompare(b[0],"nb")}).map(([b,fs])=>`<optgroup label="${esc(b)}">${fs.map(f=>`<option value="${esc(f.id)}" ${f.id===sel?"selected":""}>${esc(f.product)} · ${f.kcal100} kcal/100 g</option>`).join("")}</optgroup>`).join("")+`<option value="custom" ${sel==="custom"?"selected":""}>Annet fôr – skriv inn selv</option>`;
}
function feedSection(n){
  const i=dogInfo(n), need=feedNeed(n), log=activityFromLog(n), r10=v=>Math.round(v/10)*10;
  const fd=i.feedId&&i.feedId!=="custom"?feedById(i.feedId):null;
  return `${sh("utensils","Fôring","dog")}
  ${need?`<div class="feedres t-dog"><div class="stats" style="grid-template-columns:repeat(${need.grams?2:1},1fr)"><div><span class="cond">${Math.round(need.kcal/10)*10}</span><small>kcal per dag</small></div>${need.grams?`<div><span class="cond">${r10(need.grams)} g</span><small>${esc(need.feed.name||need.feed.product)}</small></div>`:""}</div>
   ${need.grams&&(need.adds.length||need.water)?`<table class="mixtab"><tr><th></th><th>Per dag</th><th>Per måltid</th></tr>
     <tr><td>${esc(need.feed.name||need.feed.product)} <span class="muted">(${Math.round(need.rest*100)} %)</span></td><td>${r10(need.grams)} g</td><td>${r10(need.grams/2)} g</td></tr>
     ${need.adds.map(m=>`<tr><td>${esc(m.feed.product)} <span class="muted">(${Math.round(m.share*100)} %)</span></td><td>${Math.round(m.grams/5)*5} g</td><td>${Math.round(m.grams/10)*5} g</td></tr>`).join("")}
     ${need.water?`<tr><td>Vann</td><td>${fmtKm(need.water*2)} dl</td><td>${fmtKm(need.water)} dl</td></tr>`:""}</table>`:""}
   ${!need.grams?`<p class="small muted" style="margin-top:8px">Velg fôr under, så regnes det om til gram.</p>`:!need.adds.length&&!need.water?`<p class="small" style="margin-top:8px">Per dag. Fordelt på to måltider: <b>${r10(need.grams/2)} g</b> morgen og kveld.</p>`:""}
   ${need.adj!==1?`<p class="small warntext">${need.adj<1?`BCS ${need.bcs}: redusert med 10 % til ${esc(n)} er ved ideell vekt.`:`BCS ${need.bcs}: økt med 10 % til ${esc(n)} har fått litt mer hold.`}</p>`:""}
   <p class="small muted">${fmtKm(need.kg)} kg · hvileenergi ${Math.round(need.rer)} kcal × ${String(need.factor).replace(".",",")}${need.adj!==1?` × ${String(need.adj).replace(".",",")}`:""}</p></div>`
  :`<p class="small muted">Legg inn vekten til ${esc(n)} under «Vekt og hold», så regnes fôrmengden ut.</p>`}
  <div class="field"><label for="fd-act">Aktivitetsnivå</label><select id="fd-act">${ACTIVITY.map(a=>`<option value="${a.id}" ${(i.activity||"normal")===a.id?"selected":""}>${a.t}</option>`).join("")}</select></div>
  ${log.km>0?`<p class="small muted" style="margin-top:4px">Ut fra loggen siste 2 uker (${fmtKm(log.km)} km per dag) passer «${esc(ACTIVITY.find(a=>a.id===log.id).t.toLowerCase())}».</p>`:""}
  <div class="field"><label><input type="checkbox" id="fd-neu" ${i.neutered?"checked":""} style="width:auto;margin-right:8px">Kastrert eller sterilisert</label></div>
  <div class="field"><label for="fd-feed">Hovedfôr</label><select id="fd-feed">${feedOptions(i.feedId||"")}</select></div>
  ${i.feedId==="custom"?`<div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="fd-name">Navn</label><input id="fd-name" value="${esc(i.feedName||"")}" maxlength="50" placeholder="Fôrets navn"></div>
   <div><label for="fd-kcal">kcal per 100 g</label><input id="fd-kcal" inputmode="decimal" value="${esc(i.feedKcal||"")}" placeholder="Står på sekken"></div></div>
   <p class="small muted" style="margin-top:4px">Står energien i MJ per kg, gang med 23,9 for å få kcal per 100 g.</p>`:""}
  <div id="mixList">${feedMix(i).map(m=>mixRow(m.id,m.share)).join("")}</div>
  <div class="actions" style="margin-top:10px"><button type="button" class="btn ghost" id="addMix">+ Legg til tillegg</button></div>
  <p class="small muted" style="margin-top:4px">For eksempel VOM, rent kjøtt eller fett. Andelen er av dagens energi, og resten kommer fra hovedfôret. Rent kjøtt og fett er ikke fullfôr, så hold andelen moderat.</p>
  <div class="field"><label for="fd-water">Vann i hvert måltid (dl, valgfritt)</label><input id="fd-water" inputmode="decimal" value="${esc(i.water||"")}" placeholder="F.eks. 3"></div>
  ${fd&&fd.supplement?`<p class="small warntext" style="margin-top:4px">Dette er et tilskuddsfôr, ikke fullfôr. Det bør ikke være det eneste hunden spiser.</p>`:""}
  ${fd&&fd.note?`<p class="small muted" style="margin-top:4px">${esc(fd.note)}</p>`:""}
  ${fd&&fd.url?`<p class="small muted" style="margin-top:4px">${fd.protein?`${String(fd.protein).replace(".",",")} % protein · ${String(fd.fat).replace(".",",")} % fett · `:""}Energiinnhold fra <a href="${esc(fd.url)}" target="_blank" rel="noopener">produktarket</a>. Sjekk sekken, oppskrifter endres.</p>`:""}
  <div class="actions"><button class="btn" id="fdSave">Lagre fôring</button></div>
  <p class="small muted" style="margin-top:8px">Veiledende: behovet varierer mye mellom hunder. Juster etter holdet (BCS) og vekten over tid. Gi gjerne litt ekstra på dager med lange turer og i kulde. Snacks teller også med.</p>`;
}
function vDog(){
  const n=S.dog, i=dogInfo(n), ws=byDateDesc(i.weights), vs=byDateDesc(i.vaccines), warn=dogWarnings(n);
  const mine=S.sessions.filter(s=>(s.hunder||[]).includes(n)), lw=ws.find(w=>w.kg), lb=ws.find(w=>w.bcs);
  const facts=[i.sex,i.breed,i.born?ageText(ageMonths(i.born)):""].filter(Boolean);
  return `<div class="actions" style="margin-top:4px"><button class="btn ghost" id="dogBack">← Tilbake</button></div>
  <div class="doghead">${i.photo?imgTag(i.photo,"avatar lg",n):`<div class="avatar lg empty">${esc(n.slice(0,1).toUpperCase())}</div>`}
   <div><h1 class="cond" style="font-size:2.6rem">${esc(n)}</h1><button type="button" class="linkbtn small" id="dogPhotoBtn">${i.photo?"Bytt bilde":"Legg til bilde"}</button><input type="file" id="dogPhoto" accept="image/*" hidden></div></div>
  <p class="muted">${facts.length?facts.map(esc).join(" · "):"Fyll inn info om hunden lenger ned."}</p>
  ${warn.length?`<div class="notice warnbox"><b>Sjekk før løpet</b><ul>${warn.map(w=>`<li>${esc(w)}</li>`).join("")}</ul></div>`:`<p class="notice okbox">✓ Chip og vaksiner er i orden for løpet.</p>`}
  <div class="stats"><div><span class="cond">${fmtKm(sum(mine,"km"))}</span><small>km totalt</small></div><div><span class="cond">${mine.length}</span><small>økter</small></div>
   <div><span class="cond">${lw?fmtKm(lw.kg):"–"}</span><small>kg</small></div><div><span class="cond">${lb?lb.bcs:"–"}</span><small>BCS</small></div></div>

  ${sh("scale","Vekt og hold","health")}
  ${weightChart(ws)}
  <div class="field"><label for="w-d">Dato</label><input id="w-d" type="date" value="${iso(todayD())}"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="w-kg">Vekt (kg)</label><input id="w-kg" inputmode="decimal" placeholder="0"></div>
   <div><label for="w-bcs">BCS</label><select id="w-bcs"><option value="">–</option>${BCS.map(([v,l])=>`<option value="${v}">${v} – ${l}</option>`).join("")}</select></div></div>
  <div class="actions"><button class="btn" id="wAdd">Legg til måling</button></div>
  <p class="small muted" style="margin-top:8px">BCS (body condition score) går fra 1 til 9, der 4–5 er ideelt. Du skal lett kunne kjenne ribbeina, og se en tydelig midje ovenfra.</p>
  ${ws.length?`<div class="list">${ws.map(w=>`<div class="lrow"><span>${fmtD(parse(w.d))} ${parse(w.d).getFullYear()}</span><span>${w.kg?`<b>${fmtKm(w.kg)} kg</b>`:""}${w.bcs?` · BCS ${w.bcs}`:""}</span><button type="button" class="btn ghost sm" data-wdel="${esc(w.id)}" aria-label="Slett måling">Slett</button></div>`).join("")}</div>`:""}

  ${feedSection(n)}

  ${sh("trending-up","Belastning","dog")}
  ${loadBox(dogLoad(n),v=>fmtKm(v)+" km")||`<p class="muted small">Logg noen økter, så ser du hvordan belastningen utvikler seg.</p>`}
  <div class="field"><label for="i-tol">Hvor mye tåler ${esc(n)} av økning?</label><select id="i-tol">${Object.entries(TOLERANCE).map(([k,v])=>`<option value="${k}" ${(i.tolerance||"normal")===k?"selected":""}>${v.t} – varsel ved ${Math.round((v.warn-1)*100)} % økning</option>`).join("")}</select></div>
  <p class="small muted" style="margin-top:6px">Sammenligner km siste 7 dager med snittet av de 4 ukene før. Veiledende: rase, alder, form og underlag gjør at hunder tåler ulikt. Velg «lav» for unge, eldre eller hunder som kommer tilbake etter skade.</p>
  ${packSection(n)}

  ${sh("syringe","Vaksinekort","health")}
  ${vs.length?`<div class="list">${vs.map(v=>{const st=vaccineStatus(v);return `<div class="lrow"><span><b>${esc(vacName(v.type))}</b><br><span class="small muted">Gitt ${parse(v.d).toLocaleDateString("nb-NO")}${v.note?` · ${esc(v.note)}`:""}</span></span><span class="pill ${st.c}">${esc(st.t)}</span><button type="button" class="btn ghost sm" data-vdel="${esc(v.id)}" aria-label="Slett vaksine">Slett</button></div>`}).join("")}</div>`:`<p class="muted">Ingen vaksiner registrert.</p>`}
  <div class="field"><label for="v-type">Vaksine</label><select id="v-type">${VACCINES.map(v=>`<option value="${v.id}">${esc(v.name)}</option>`).join("")}</select></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="v-d">Dato gitt</label><input id="v-d" type="date" value="${iso(todayD())}"></div>
   <div><label for="v-until">Gyldig til</label><input id="v-until" type="date" value="${addYears(iso(todayD()),3)}"></div></div>
  <div class="field"><label for="v-note">Merknad</label><input id="v-note" maxlength="80" placeholder="Preparat, veterinær …"></div>
  <div class="actions"><button class="btn" id="vAdd">Legg til vaksine</button></div>
  <p class="small muted" style="margin-top:8px">NHF krever DHP (gyldig 3 år for hunder over 1 år) og anbefaler kennelhoste (1 år). Sjekk alltid gyldigheten i preparatomtalen, og husk karenstid før løp.</p>

  ${sh("info","ID og info","health")}
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="i-born">Født</label><input id="i-born" type="date" value="${esc(i.born||"")}"></div>
   <div><label for="i-sex">Kjønn</label><select id="i-sex">${["","Tispe","Hannhund"].map(x=>`<option ${i.sex===x?"selected":""} value="${x}">${x||"–"}</option>`).join("")}</select></div></div>
  <div class="field"><label for="i-breed">Rase</label><input id="i-breed" value="${esc(i.breed||"")}" maxlength="40" placeholder="F.eks. alaskan husky"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="i-chip">Chip-ID</label><input id="i-chip" inputmode="numeric" value="${esc(i.chip||"")}" maxlength="20" placeholder="15 siffer"></div>
   <div><label for="i-chipd">Chip satt inn</label><input id="i-chipd" type="date" value="${esc(i.chipDate||"")}"></div></div>
  <div class="field"><label for="i-harness">Sele og utstyr</label><input id="i-harness" value="${esc(i.harness||"")}" maxlength="80" placeholder="Selestørrelse, sokker, dekken …"></div>
  <div class="field"><label for="i-notes">Notater</label><textarea id="i-notes" placeholder="Skader, poter, fôr, eier for lånehund …">${esc(i.notes||"")}</textarea></div>
  <div class="actions"><button class="btn" id="iSave">Lagre info</button></div>
  <p class="err" id="dogErr" hidden></p>`;
}
function dogCard(n){
  const mine=S.sessions.filter(s=>(s.hunder||[]).includes(n)).sort((a,b)=>a.dato<b.dato?1:-1);
  const wk=mine.filter(s=>parse(s.dato)>=monday(todayD()));
  const longest=mine.reduce((a,s)=>Math.max(a,Number(s.km)||0),0);
  const moods=mine.map(s=>s.motivasjon&&s.motivasjon[n]).filter(Boolean).slice(0,6).reverse();
  const warn=dogWarnings(n), lw=lastWeight(n);
  return `<button type="button" class="dog" data-dogpage="${esc(n)}">${dogInfo(n).photo?imgTag(dogInfo(n).photo,"avatar",n):""}<div class="name">${esc(n)}</div><div class="km">${fmtKm(sum(mine,"km"))} km</div>
    <p class="muted small">${fmtKm(sum(wk,"km"))} km denne uka<br>${mine.length} økter${longest?` · lengste ${fmtKm(longest)} km`:""}${lw?`<br>${fmtKm(lw.kg)} kg${lw.bcs?` · BCS ${lw.bcs}`:""}`:""}</p>
    ${moods.length?`<div class="mood" aria-label="Siste motivasjon">${moods.map(m=>`<i class="m${m}"></i>`).join("")}</div>`:""}
    ${warn.length?`<p class="small dogwarn">⚠ ${warn.length===1?esc(warn[0]):`${warn.length} ting å sjekke`}</p>`:""}
    ${(L=>L.lvl?`<p class="small ${L.lvl===2?"dogwarn":"warntext"}">📈 ${L.lvl===2?"Kraftig økning":"Økt belastning"} siste uke</p>`:"")(dogLoad(n))}</button>`;
}

function trail(bw,t){
  const start=planStart(),n=PLAN.length,W=Math.max(340,n*44),h=74,pad=18,x=i=>pad+i*((W-2*pad)/(n-1));
  const nowW=Math.floor((monday(t)-start)/864e5/7);let path="",dots="",lbl="";
  for(let i=0;i<n;i++){const y=i%2?38:30,xi=x(i),pk=weekTotals(i).km,f=Math.min(1,sum(bw[iso(addDays(start,i*7))]||[],"km")/pk),r=i===n-1?11:8,now=i===nowW;
    path+=(i?" L":"M")+xi.toFixed(1)+" "+y;
    dots+=`<circle cx="${xi}" cy="${y}" r="${r}" fill="var(--bg)" stroke="var(--ink)" stroke-width="${now?3:1.5}"/>`+(f>0?`<circle cx="${xi}" cy="${y}" r="${(r-2.5)*Math.sqrt(f)}" fill="var(--accent)"/>`:"");
    if(i===n-1)dots+=`<text x="${xi}" y="${y+4}" text-anchor="middle" style="font:700 10px 'Barlow Condensed',sans-serif;fill:var(--ink)">${fmtKm(S.profile.raceKm)}</text>`;
    lbl+=`<text class="lbl${now?" now":""}" x="${xi}" y="${h-4}" text-anchor="middle">${i===n-1?"Løpet":"u"+isoWeek(addDays(start,i*7))}</text>`}
  return `<div class="trail" aria-label="Løypa frem mot løpet: hver prikk er en uke, fylt etter hvor mye av ukemålet som er gjort"><svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}"><path d="${path}" fill="none" stroke="var(--line)" stroke-width="3" stroke-dasharray="2 6" stroke-linecap="round"/>${dots}${lbl}</svg></div>`;
}

function chart(bw){
  const keys=Object.keys(bw).sort(), start=keys.length?parse(keys[0]):planStart(), end=monday(parse(S.profile.raceDate));
  const weeks=[];for(let d=new Date(start);d<=end;d=addDays(d,7))weeks.push(new Date(d));
  if(!weeks.length)return "";
  const data=weeks.map(w=>{const i=planWeekIdx(w);return{w,a:sum(bw[iso(w)]||[],"km"),p:i>=0?weekTotals(i).km:null}});
  const max=Math.max(20,...data.map(d=>Math.max(d.a,d.p||0)));
  const b=22,g=8,h=170,top=10,bot=24,W=data.length*(b+g)+30,y=v=>top+(h-top-bot)*(1-v/max);
  let s="";[0,25,50,75,100].filter(v=>v<=max+5).forEach(v=>{s+=`<line x1="26" x2="${W}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="22" y="${y(v)+4}" text-anchor="end">${v}</text>`});
  data.forEach((d,i)=>{const x=30+i*(b+g);
    if(d.p!=null)s+=`<rect x="${x}" y="${y(d.p)}" width="${b}" height="${y(0)-y(d.p)}" rx="4" fill="none" stroke="var(--ink)" stroke-width="1.5" stroke-dasharray="3 3"/>`;
    if(d.a>0)s+=`<rect x="${x+3}" y="${y(d.a)}" width="${b-6}" height="${y(0)-y(d.a)}" rx="3" fill="var(--accent)"><title>Uke ${isoWeek(d.w)}: ${fmtKm(d.a)} km${d.p!=null?` av ${d.p}`:""}</title></rect>`;
    if(i%2===0||data.length<12)s+=`<text x="${x+b/2}" y="${h-6}" text-anchor="middle">${isoWeek(d.w)}</text>`});
  return `<div class="chart"><div class="legend"><span><b style="background:var(--accent)"></b>Kjørt</span><span><b style="border:1.5px dashed var(--ink)"></b>Ukemål</span><span>km per uke</span></div>
  <svg viewBox="0 0 ${W} ${h}" width="${W}" height="${h}" role="img" aria-label="Kilometer per uke mot ukemål">${s}</svg></div>`;
}

function vLog(){
  const f=S.logFilter||"alle", all=f==="hund"?dogS():f==="meg"?meS():S.sessions;
  const bw=byWeek(all), keys=Object.keys(bw).sort().reverse();
  const tabs=`<div class="chips" style="margin:6px 0 4px">${[["alle","Alle"],["hund","Med hunder"],["meg","Bare meg"]].map(([v,l])=>`<button type="button" class="chip" data-logf="${v}" aria-pressed="${f===v}">${l}</button>`).join("")}</div>`;
  if(!keys.length)return `${sh("list","Logg","plan","margin-top:6px")}${tabs}<p class="empty">${S.loaded?"Ingen økter her ennå. Trykk + for å føre den første.":"Henter økter …"}</p>`;
  return `${sh("list","Logg","plan","margin-top:6px")}${tabs}<p class="muted">${all.length} økter · ${fmtKm(sum(all,"km"))} km · ${fmtMin(sum(all,"min"))}</p>`+
  keys.map(k=>{const list=bw[k].slice().sort((a,b)=>a.dato<b.dato?1:-1),m=parse(k),i=planWeekIdx(m),dl=list.filter(x=>!isMe(x)),ml=list.filter(isMe),km=sum(dl,"km"),goal=i>=0?weekTotals(i).km:0;
    return `<section class="wk"><div class="wkhead"><h3>Uke ${isoWeek(m)}</h3><span class="muted">${dl.length?(goal?`<span class="${km>=goal?"hit":""}">${fmtKm(km)}</span> / ${goal} km`:`${fmtKm(km)} km`):""}${dl.length&&ml.length?" · ":""}${ml.length?`deg: ${ml.length} ${ml.length===1?"økt":"økter"}`:""}</span></div>
    ${list.map(s=>{const d=parse(s.dato),me=isMe(s);return `<button class="entry${me?" me":""}" data-id="${esc(s.id)}"><span class="d">${DAYS[(d.getDay()+6)%7]}<small>${fmtD(d)}</small></span>
      <span><span class="t"><span class="eico ${me?"t-me":"t-dog"}">${icon(me?"person-standing":"paw-print")}</span>${esc(typeOf(s.type,s.kategori))}${s.rute?` <span class="muted" title="Har rute">· kart</span>`:""}${s.bilder&&s.bilder.length?` <span class="muted">· ${s.bilder.length} ${s.bilder.length===1?"bilde":"bilder"}</span>`:""}</span>${s.min?` <span class="muted">· ${fmtMin(s.min)}</span>`:""}<span class="s">${me?`Bare meg${s.rpe?` · anstrengelse ${s.rpe}/10`:""}${s.kropp?` · ${(KROPP.find(k=>k[0]===s.kropp)||[,""])[1].toLowerCase()}`:""}`:esc((s.hunder||[]).join(", "))}${s.hm?` · ${Math.round(s.hm)} hm`:""}${s.last_kg?` · ${fmtKm(s.last_kg)} kg ${me?"sekk":"last"}`:""}${s.temp!=null?` · ${fmtKm(s.temp)}°${s.rh!=null?` ${s.rh} %`:""}`:""}${s.kommentar?` · ${esc(s.kommentar)}`:""}</span></span>
      <span class="k">${s.km?fmtKm(s.km):""}</span></button>`}).join("")}</section>`}).join("");
}

function vPlan(){
  const t=todayD(),start=planStart(),doneDog=new Set(dogS().map(s=>s.dato)),doneAny=new Set(S.sessions.map(s=>s.dato)),bw=byWeek();
  return `${sh("calendar-days","Plan frem mot løpet","plan","margin-top:6px")}<p class="muted">${esc(TEMPLATES[planTypeFor(S.profile)].label)}-plan laget ut fra løpet ditt: ${fmtKm(S.profile.raceKm)} km${S.profile.raceHm?` og ${S.profile.raceHm} hm`:""}.${grenFor(S.profile).snow?" ❄ = kjør på snø hvis mulig.":""} Trykk på en dag for å endre den.</p>`+
  PLAN.map((wk,i)=>{const m=addDays(start,i*7),g=weekTotals(i),got=sum(bw[iso(m)]||[],"km");
    return `<section class="wk"><div class="wkhead"><h3>Uke ${isoWeek(m)}</h3><span class="muted">${got?`<span class="${got>=g.km?"hit":""}">${fmtKm(got)}</span> / `:""}${g.km} km</span></div><p class="phase">${esc(wk.f)} · ${fmtD(m)}–${fmtD(addDays(m,6))} · ${g.hm} hm</p>
    ${wk.d.map((it,d)=>{const dt=addDays(m,d),key=it[3];
      return `<button type="button" data-pdate="${iso(dt)}" class="${["pday",!it[1]?"rest":"",(it[1]?doneDog:doneAny).has(iso(dt))&&it[0]!=="Hvile"?"done":"",key?"key":"",it[4]?"own":"",iso(dt)===iso(t)?"istoday":""].join(" ")}"><span class="cond" style="font-weight:600">${DAYS[d]} <span class="muted" style="font-weight:500">${dt.getDate()}.${dt.getMonth()+1}</span></span><span class="pt">${esc(it[0])}</span><span class="muted">${it[1]?it[1]+" km":""}</span></button>`}).join("")}</section>`}).join("")+
  (Object.keys(S.profile.planCustom||{}).length?`<div class="actions"><button class="btn ghost" id="resetPlan">Tilbakestill alle egne endringer</button></div>`:"");
}

const RACE_LIST=()=>(window.RACES||[]).filter(r=>r.date>=iso(todayD())).sort((a,b)=>a.date<b.date?-1:a.date>b.date?1:a.name.localeCompare(b.name,"nb"));
const raceById=id=>(window.RACES||[]).find(r=>r.id===String(id||"").split("|")[0]);
function raceOptions(sel){
  const cur=String(sel||"").split("|")[0], list=RACE_LIST(), groups={};
  for(const r of list){const k=parse(r.date).toLocaleDateString("nb-NO",{month:"long",year:"numeric"});(groups[k]=groups[k]||[]).push(r)}
  const old=cur&&!list.some(r=>r.id===cur)&&raceById(cur);
  return `<option value="">Eget løp</option>`+(old?`<option value="${esc(old.id)}" selected>${esc(old.name)}</option>`:"")+
    Object.entries(groups).map(([m,rs])=>`<optgroup label="${esc(m[0].toUpperCase()+m.slice(1))}">${rs.map(r=>`<option value="${esc(r.id)}" ${r.id===cur?"selected":""}>${esc(fmtD(parse(r.date)))} · ${esc(r.name)}</option>`).join("")}</optgroup>`).join("");
}
function classSelect(sel){
  const r=raceById(sel), c=String(sel||"").split("|")[1]||"";
  if(!r||!r.classes.length)return "";
  return `<label for="r-class">Klasse</label><select id="r-class"><option value="">Velg klasse</option>${r.classes.map(k=>`<option value="${esc(k.name)}" ${k.name===c?"selected":""}>${esc(k.name)} · ${fmtKm(k.km)} km</option>`).join("")}</select>`;
}
function raceSource(sel){
  const r=raceById(sel);
  if(!r)return "";
  return `${esc(r.place)} · ${esc(r.type)} · fra ${esc(r.src)} · <a href="${esc(r.url)}" target="_blank" rel="noopener">se løpet</a>${r.classes.length?"":" · distansen er ikke oppgitt, fyll inn selv"}`;
}
function grenOptions(sel){
  const groups={};for(const g of window.GRENER||[])(groups[g.group]=groups[g.group]||[]).push(g);
  return Object.entries(groups).map(([k,gs])=>`<optgroup label="${esc(k)}">${gs.map(g=>`<option value="${g.id}" ${g.id===sel?"selected":""}>${esc(g.name)}</option>`).join("")}</optgroup>`).join("");
}
function grenClassSelect(g,sel){
  return `<label for="g-class">Klasse</label><select id="g-class"><option value="">Velg klasse</option>${g.classes.map(c=>`<option value="${esc(c.name)}" ${c.name===sel?"selected":""}>${esc(c.name)} · ${esc(c.dogs)} · ${kmRange(c.km)}</option>`).join("")}</select>`;
}
const kmRange=r=>r[0]===r[1]?`${fmtKm(r[0])} km`:`${fmtKm(r[0])}–${fmtKm(r[1])} km`;
function grenInfo(g){
  return `<details class="rules"><summary>Regler og tips: ${esc(g.name)}</summary>
  <h3>Klasser i NM og GP</h3><ul>${g.classes.map(c=>`<li><b>${esc(c.name)}</b>: ${esc(c.dogs)}, ${kmRange(c.km)}</li>`).join("")}</ul>
  <h3>Regler</h3><ul>${[...g.rules,...(window.COMMON_RULES||[])].map(r=>`<li>${esc(r)}</li>`).join("")}</ul>
  <h3>Tips</h3><ul>${g.tips.map(r=>`<li>${esc(r)}</li>`).join("")}</ul>
  <p class="small muted">Fra NHFs konkurranseregler (25.08.2026) og vaksinasjonsreglement. Andre løp kan ha egne klasser og krav, så sjekk alltid løpsinvitasjonen. <a href="${esc(window.NHF_RULES_URL)}" target="_blank" rel="noopener">Les reglene hos NHF</a></p></details>
  ${g.pulk?`<div class="calc"><h3>${icon("scale","sm")} Pulkvekt</h3><p class="small muted">Pulken, med sele, drag og trekkreimer, skal veie minst hundenes vekt ganget med en faktor.</p>
   <div class="grid3" style="grid-template-columns:1fr 1fr;margin-top:10px"><div><label for="pk-n">Antall hunder</label><select id="pk-n">${[1,2,3,4,5].map(n=>`<option>${n}</option>`).join("")}</select></div>
   <div><label for="pk-w">Hundenes vekt (kg)</label><input id="pk-w" inputmode="decimal" placeholder="Samlet vekt"></div></div>
   ${pulkDogChips()}
   <p class="notice" id="pk-out" aria-live="polite">Fyll inn hva hunden veier.</p></div>`:""}`;
}
function pulkDogChips(){
  const ds=S.profile.dogs.map(n=>[n,lastWeight(n)]).filter(([,w])=>w);
  if(!ds.length)return `<p class="small muted" style="margin-top:8px">Tips: legg inn vekt på hundesiden, så kan du velge hundene her.</p>`;
  return `<p class="small muted" style="margin-top:10px">Velg hundene som skal gå:</p><div class="chips" id="pk-dogs">${ds.map(([n,w])=>`<button type="button" class="chip" data-pkdog="${esc(n)}" data-kg="${w.kg}" aria-pressed="false">${esc(n)} · ${fmtKm(w.kg)} kg</button>`).join("")}</div>`;
}
function pulkText(n,w){
  const f=(window.PULK_FACTORS||{})[n];
  if(!(w>0)||!f)return "Fyll inn hva hunden veier.";
  // Rund opp til hele 10 gram, så pulken aldri blir for lett
  const kg=n=>n.toLocaleString("nb-NO",{maximumFractionDigits:2});
  return `Pulken må veie minst <b>${kg(Math.ceil(w*f*100-1e-9)/100)} kg</b> (${kg(w)} kg × ${String(f).replace(".",",")}).`;
}
const dogField=(orig,name)=>`<div class="field row dogrow" style="align-items:center"><input class="dogin" data-orig="${esc(orig)}" value="${esc(name)}" maxlength="30" aria-label="Navn på hund" placeholder="Navn">${orig?`<button type="button" class="btn ghost" data-dogpage="${esc(orig)}">Info</button>`:""}<button type="button" class="btn ghost rmdog" aria-label="Fjern ${esc(name||"hund")}">Fjern</button></div>`;
function vSettings(){
  const p=S.profile;
  return `${S.isNew?`<p class="notice" style="margin-top:6px"><b>Velkommen!</b> Sett opp løpet du trener mot og hundene dine, så lages en plan for deg.</p>`:""}
  ${sh("image","Forsidebilde","me","margin-top:6px")}
  <p class="muted">Et bilde av deg og hundene øverst på Oversikt.</p>
  ${p.cover?`<div class="cover small">${imgTag(p.cover,"","Forsidebilde")}</div>`:""}
  <div class="actions"><button type="button" class="btn line" id="coverBtn">${p.cover?"Bytt bilde":"Velg bilde"}</button>${p.cover?`<button type="button" class="btn ghost" id="coverRm">Fjern</button>`:""}</div><input type="file" id="coverFile" accept="image/*" hidden>
  ${sh("flag","Målet ditt","plan")}
  <p class="muted">Velg et løp fra kalenderen, eller fyll inn ditt eget. Treningsplanen på ${PLAN_WEEKS} uker lages ut fra løpet.</p>
  <div class="field"><label for="r-pick">Løp</label><select id="r-pick">${raceOptions(p.raceId)}</select></div>
  <div class="field" id="r-classWrap">${classSelect(p.raceId)}</div>
  <p class="small muted" id="r-src" style="margin-top:6px">${raceSource(p.raceId)}</p>
  <div class="field"><label for="r-name">Navn på løpet</label><input id="r-name" value="${esc(p.raceName)}" maxlength="60" placeholder="F.eks. Finnskogløpet"></div>
  <div class="field"><label for="race">Dato</label><input id="race" type="date" value="${esc(p.raceDate)}"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="r-km">Distanse (km)</label><input id="r-km" inputmode="decimal" value="${esc(fmtKm(p.raceKm))}"></div>
   <div><label for="r-hm">Høydemeter</label><input id="r-hm" inputmode="numeric" value="${esc(p.raceHm||"")}" placeholder="Ukjent"></div></div>
  ${sh("target","Gren og klasse","plan")}
  <p class="muted">Grenen bestemmer hvordan planen bygges opp, og hvilke regler som gjelder.</p>
  <div class="field"><label for="g-gren">Gren</label><select id="g-gren">${grenOptions(grenFor(p).id)}</select></div>
  <div class="field" id="g-classWrap">${grenClassSelect(grenFor(p),grenClass(p))}</div>
  <div class="field"><label for="r-plan">Plantype</label><select id="r-plan"><option value="" id="r-planAuto">Automatisk (${esc(TEMPLATES[grenFor(p).plan].label.toLowerCase())})</option>${Object.entries(TEMPLATES).map(([k,t])=>`<option value="${k}" ${p.planType===k?"selected":""}>${t.label}</option>`).join("")}</select></div>
  <div id="g-info">${grenInfo(grenFor(p))}</div>
  ${sh("paw-print","Hundene","dog")}
  <p class="muted">Endrer du et navn, oppdateres det i alle tidligere økter.</p>
  <div id="dogList">${p.dogs.map(d=>dogField(d,d)).join("")}</div>
  <div class="actions" style="margin-top:12px"><button class="btn ghost" id="addDog">+ Legg til hund</button></div>
  <div class="actions"><button class="btn" id="saveSet">Lagre</button></div><p class="err" id="setErr" hidden></p>
  ${sh("shield","Backup","plan")}
  <p class="muted">Last ned alle øktene som en fil, eller hent inn økter fra en tidligere backup. Økter som allerede finnes hoppes over.</p>
  <div class="actions"><button class="btn line" id="exportBtn">Last ned backup</button><button class="btn line" id="importBtn">Importer fil</button></div>
  <input type="file" id="importFile" accept="application/json,.json" hidden>
  <p class="err" id="impErr" hidden></p>
  ${sh("user","Konto","plan")}
  <p class="muted">Innlogget som ${esc(S.user?.email||"")}</p>
  <div class="field"><label for="nick">Visningsnavn på føremeldinger</label><div class="row" style="align-items:center"><input id="nick" maxlength="30" value="${esc(p.nickname||"")}" placeholder="Valgfritt, ellers «Anonym»"><button type="button" class="btn ghost" id="nickSave">Lagre</button></div></div>
  <div class="actions"><button class="btn ghost" id="logoutBtn">Logg ut</button></div>
  <details class="rules" style="margin-top:18px"><summary>Slett kontoen min</summary>
   <p class="small">Dette sletter profilen, hundene, planen og alle øktene dine for godt. Last ned en backup først hvis du vil ta vare på noe.</p>
   <div class="actions"><button class="btn del" id="delAcc">Slett kontoen og alle data</button></div><p class="err" id="delErr" hidden></p></details>`;
}

/* Skjema */
let editing=null,F=null;
const panel=document.getElementById("panel"),sheet=document.getElementById("sheet");
/* Kart fra Kartverket (topografisk) med Leaflet */
let fMap=null;
const KARTVERKET="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png";
function drawRoute(el,route){
  if(!window.L||!el||!route||route.length<2)return null;
  const m=L.map(el,{scrollWheelZoom:false,attributionControl:true});
  L.tileLayer(KARTVERKET,{maxZoom:18,attribution:'© <a href="https://www.kartverket.no/" target="_blank" rel="noopener">Kartverket</a>'}).addTo(m);
  const color=getComputedStyle(document.documentElement).getPropertyValue("--accent").trim()||"#D7263D";
  const line=L.polyline(route.map(p=>[p[0],p[1]]),{color,weight:4,opacity:.9}).addTo(m);
  L.circleMarker([route[0][0],route[0][1]],{radius:6,color:"#fff",weight:2,fillColor:"#2E8B57",fillOpacity:1}).addTo(m).bindTooltip("Start");
  L.circleMarker([route[route.length-1][0],route[route.length-1][1]],{radius:6,color:"#fff",weight:2,fillColor:color,fillOpacity:1}).addTo(m).bindTooltip("Slutt");
  m.fitBounds(line.getBounds(),{padding:[18,18]});
  setTimeout(()=>{m.invalidateSize();m.fitBounds(line.getBounds(),{padding:[18,18]})},60);
  return m;
}
async function loadGpx(file){
  const g=GPX.parse(await file.text());
  if(g.start)F.dato=iso(g.start);
  F.km=String(Math.round(g.km*100)/100).replace(".",",");
  if(g.hm)F.hm=String(g.hm);
  if(g.min)F.min=String(g.min);
  F.rute=g.route;F.kilde="gpx";
  if(!F.kommentar&&g.name)F.kommentar=g.name;
  if(g.start&&iso(g.start)!==iso(new Date())){F.temp="";F.rh=""}
  return g;
}
function openForm(s,kat){
  editing=s||null;
  const last=dogS().slice().sort((a,b)=>a.dato<b.dato?1:-1)[0];
  F=s?JSON.parse(JSON.stringify(s)):{dato:iso(new Date()),type:typeOf(last?.type||"Sykkeljøring"),km:"",hm:"",min:"",hunder:(last?.hunder||[S.profile.dogs[0]]).filter(h=>S.profile.dogs.includes(h)),motivasjon:{},kommentar:"",kategori:kat||"hund",rpe:null,kropp:null};
  if(!s&&kat==="meg")F.type=(meS().slice().sort((a,b)=>a.dato<b.dato?1:-1)[0]||{}).type||"Løping";
  F.kategori=F.kategori||"hund";F.type=typeOf(F.type,F.kategori);
  if(!s){const w=wxNow();if(w){F.temp=fmtKm(w.temp);F.rh=Math.round(w.rh)}}F.motivasjon=F.motivasjon||{};F.hunder=F.hunder||[];
  if(!F.min)F.min="";if(!F.hm)F.hm="";
  sheet.classList.add("open");draw();
}
function closeForm(){sheet.classList.remove("open");editing=null;if(fMap){fMap.remove();fMap=null}if(F&&F._new&&F._new.length){removeImages(F._new).catch(()=>{});F._new=[]}}
function draw(){
  const me=F.kategori==="meg", dogs=Array.from(new Set([...S.profile.dogs,...F.hunder])), pd=planDay(parse(F.dato||iso(new Date())));
  panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">${editing?"Endre økt":"Ny økt"}</h2><button class="btn ghost" id="fClose">Lukk</button></div>
  ${pd&&pd.item[1]?`<p class="muted small" style="margin-top:6px">Plan denne dagen: ${esc(pd.item[0])}</p>`:""}
  ${editing?"":`<div class="seg" role="group" aria-label="Hvem trente"><button type="button" data-kat="hund" aria-pressed="${!me}">Med hunder</button><button type="button" data-kat="meg" aria-pressed="${me}">Bare meg</button></div>`}
  <div class="field gpxrow"><button type="button" class="btn line" id="gpxBtn">${F.rute?"Bytt GPX-fil":"Hent tur fra GPX-fil"}</button><input type="file" id="gpxFile" accept=".gpx,application/gpx+xml,application/xml,text/xml" hidden>
   ${F.rute?"":`<p class="small muted" style="margin-top:6px">Eksporter turen som GPX fra klokka, Strava, Garmin Connect, Komoot eller UT.no. Distanse, høydemeter, tid og dato fylles ut.</p>`}</div>
  ${F.rute?`<div id="f-map" class="map" role="img" aria-label="Kart over ruta"></div><p class="small muted" style="margin-top:6px">${F.rute.length} punkter · <button type="button" class="linkbtn" id="gpxRemove">Fjern ruta</button></p>`:""}
  <p class="err" id="gpxErr" hidden></p>
  <div class="field"><span class="flabel">Bilder</span><div class="thumbs">${(F.bilder||[]).map(p=>`<span class="thumb">${imgTag(p,"","Bilde fra økta")}<button type="button" data-rmimg="${esc(p)}" aria-label="Fjern bilde">×</button></span>`).join("")}
   <button type="button" class="thumb addimg" id="imgBtn" aria-label="Legg til bilder">+</button></div><input type="file" id="imgFile" accept="image/*" multiple hidden></div>
  <div class="field"><label for="f-dato">Dato</label><input id="f-dato" type="date" value="${esc(F.dato)}"></div>
  <div class="field"><span class="flabel">Type økt</span><div class="chips">${(me?MY_TYPES:TYPES).map(t=>`<button type="button" class="chip" data-type="${t}" aria-pressed="${F.type===t}">${t}</button>`).join("")}</div></div>
  <div class="field grid3"><div><label for="f-km">Km</label><input id="f-km" inputmode="decimal" value="${esc(F.km)}" placeholder="0"></div>
   <div><label for="f-hm">Høydemeter</label><input id="f-hm" inputmode="numeric" value="${esc(F.hm)}" placeholder="0"></div>
   <div><label for="f-min">Minutter</label><input id="f-min" inputmode="numeric" value="${esc(F.min)}" placeholder="0"></div></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="f-temp">Temperatur (°C)</label><input id="f-temp" inputmode="decimal" value="${esc(F.temp??"")}" placeholder="–"></div>
   <div><label for="f-rh">Luftfuktighet (%)</label><input id="f-rh" inputmode="numeric" value="${esc(F.rh??"")}" placeholder="–"></div></div>
  ${F.temp!==""&&F.temp!=null&&!me&&heatRisk(num(F.temp),num(F.rh)).lvl>=2?`<p class="small err" style="margin-top:6px">⚠ ${RISK[heatRisk(num(F.temp),num(F.rh)).lvl].t} for hundene ved denne temperaturen.</p>`:""}
  ${me||LOAD_LABEL[F.type]?`<div class="field"><label for="f-kg">${me?"Sekk (kg)":LOAD_LABEL[F.type]}</label><input id="f-kg" inputmode="decimal" value="${esc(F.last_kg??"")}" placeholder="${me?"Ingen sekk":"0"}"></div>`:""}
  ${me?`<div class="field"><span class="flabel">Hvor hardt var det? <span class="muted" style="font-weight:400">(1 = veldig lett, 10 = maks)</span></span><div class="chips rpe">${[1,2,3,4,5,6,7,8,9,10].map(v=>`<button type="button" class="chip" data-rpe="${v}" aria-pressed="${F.rpe===v}">${v}</button>`).join("")}</div></div>
  <div class="field"><span class="flabel">Hvordan kjentes kroppen?</span><div class="chips">${KROPP.map(([v,l])=>`<button type="button" class="chip" data-kropp="${v}" aria-pressed="${F.kropp===v}">${l}</button>`).join("")}</div></div>`:`<div class="field"><span class="flabel">Hunder med</span><div class="chips">${dogs.map(d=>`<button type="button" class="chip" data-dog="${esc(d)}" aria-pressed="${F.hunder.includes(d)}">${esc(d)}</button>`).join("")}</div></div>`}
  ${!me&&F.hunder.length?`<div class="field"><span class="flabel">Hvordan jobbet de?</span>${F.hunder.map(d=>`<div class="moodrow"><span>${esc(d)}</span><span class="opts">${MOODS.map(([v,l])=>`<button type="button" data-mdog="${esc(d)}" data-m="${v}" aria-pressed="${F.motivasjon[d]===v}">${l}</button>`).join("")}</span></div>`).join("")}</div>`:""}
  <div class="field"><label for="f-kom">Kommentar</label><textarea id="f-kom" placeholder="${me?"Hva du gjorde, hvordan det gikk …":"Føre, vær, poter, hvordan det gikk …"}">${esc(F.kommentar)}</textarea></div>
  <p class="err" id="fErr" hidden></p>
  <div class="actions">${editing?`<button class="btn del" id="fDel">Slett</button>`:""}<button class="btn" id="fSave">${editing?"Lagre endringer":"Lagre økt"}</button></div>`;
  const keep=()=>{const kgEl=panel.querySelector("#f-kg");if(kgEl)F.last_kg=kgEl.value;F.temp=panel.querySelector("#f-temp").value;F.rh=panel.querySelector("#f-rh").value;F.dato=panel.querySelector("#f-dato").value;F.km=panel.querySelector("#f-km").value;F.hm=panel.querySelector("#f-hm").value;F.min=panel.querySelector("#f-min").value;F.kommentar=panel.querySelector("#f-kom").value};
  panel.querySelector("#fClose").onclick=closeForm;
  loadImgs();
  const imf=panel.querySelector("#imgFile");
  panel.querySelector("#imgBtn").onclick=()=>imf.click();
  imf.onchange=async()=>{const files=[...imf.files];if(!files.length)return;keep();toast(`Laster opp ${files.length} ${files.length===1?"bilde":"bilder"} …`);
    try{for(const f of files.slice(0,8)){const p=await uploadImage(f,"okter",1600);F.bilder=[...(F.bilder||[]),p];F._new=[...(F._new||[]),p]}draw()}catch(e){showErr("fErr",e);draw()}};
  panel.querySelectorAll("[data-rmimg]").forEach(b=>b.onclick=()=>{keep();const p=b.dataset.rmimg;F.bilder=F.bilder.filter(x=>x!==p);F._gone=[...(F._gone||[]),p];draw()});
  panel.querySelectorAll(".thumb img").forEach(im=>im.onclick=()=>{if(im.src)window.open(im.src,"_blank","noopener")});
  if(fMap){fMap.remove();fMap=null}
  if(F.rute)fMap=drawRoute(panel.querySelector("#f-map"),F.rute);
  const gf=panel.querySelector("#gpxFile");
  panel.querySelector("#gpxBtn").onclick=()=>gf.click();
  gf.onchange=async()=>{const f=gf.files[0];if(!f)return;keep();try{await loadGpx(f);draw();toast("Turen er hentet fra fila")}catch(e){showErr("gpxErr",e)}};
  const gr=panel.querySelector("#gpxRemove");if(gr)gr.onclick=()=>{keep();F.rute=null;F.kilde="";draw()};
  panel.querySelector("#f-dato").onchange=()=>{keep();draw()};
  panel.querySelectorAll("[data-kat]").forEach(b=>b.onclick=()=>{keep();if(F.kategori===b.dataset.kat)return;F.kategori=b.dataset.kat;F.type=F.kategori==="meg"?"Løping":typeOf((dogS().slice().sort((a,b)=>a.dato<b.dato?1:-1)[0]||{}).type||"Sykkeljøring");draw()});
  panel.querySelectorAll("[data-rpe]").forEach(b=>b.onclick=()=>{keep();const v=Number(b.dataset.rpe);F.rpe=F.rpe===v?null:v;draw()});
  panel.querySelectorAll("[data-kropp]").forEach(b=>b.onclick=()=>{keep();const v=Number(b.dataset.kropp);F.kropp=F.kropp===v?null:v;draw()});
  panel.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{keep();F.type=b.dataset.type;draw()});
  panel.querySelectorAll("[data-dog]").forEach(b=>b.onclick=()=>{keep();const d=b.dataset.dog;if(F.hunder.includes(d)){F.hunder=F.hunder.filter(x=>x!==d);delete F.motivasjon[d]}else F.hunder=[...F.hunder,d];draw()});
  panel.querySelectorAll("[data-mdog]").forEach(b=>b.onclick=()=>{keep();const d=b.dataset.mdog,v=Number(b.dataset.m);if(F.motivasjon[d]===v)delete F.motivasjon[d];else F.motivasjon[d]=v;draw()});
  panel.querySelector("#fSave").onclick=async()=>{keep();await save()};
  const del=panel.querySelector("#fDel");if(del)del.onclick=async()=>{if(!confirm("Slette denne økta?"))return;try{ok(await sb.from("okter").delete().eq("id",editing.id));removeImages([...(editing.bilder||[]),...(F._new||[])]).catch(()=>{});F._new=[];closeForm();toast("Økta er slettet");await refresh()}catch(e){showErr("fErr",e)}};
}
function openDay(date){
  const pd=planDay(parse(date)), it=pd.item, own=(S.profile.planCustom||{})[date], d=parse(date);
  const text=own?own[0]:it[0].replace(/^❄ /,"");
  panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">${DAYS[(d.getDay()+6)%7]} ${fmtD(d)}</h2><button class="btn ghost" id="dClose">Lukk</button></div>
  <p class="muted small" style="margin-top:6px">${own?"Du har endret denne dagen.":"Fra standardplanen."}</p>
  <div class="field"><label for="d-text">Økt</label><input id="d-text" value="${esc(text)}" maxlength="80" placeholder="F.eks. Intervaller 8 km"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="d-km">Km</label><input id="d-km" inputmode="decimal" value="${it[1]||""}" placeholder="0"></div>
   <div><label for="d-hm">Høydemeter</label><input id="d-hm" inputmode="numeric" value="${it[2]||""}" placeholder="0"></div></div>
  <p class="err" id="dErr" hidden></p>
  <div class="actions"><button class="btn line" id="dRest">Gjør til hviledag</button><button class="btn" id="dSave">Lagre</button></div>
  ${own?`<div class="actions"><button class="btn ghost" id="dReset">Tilbake til standardplanen</button></div>`:""}`;
  sheet.classList.add("open");
  const put=async val=>{
    const c={...(S.profile.planCustom||{})};
    if(val)c[date]=val;else delete c[date];
    try{ok(await sb.from("profiles").update({plan_custom:c}).eq("user_id",S.user.id));S.profile.planCustom=c;closeForm();render();toast("Planen er oppdatert")}
    catch(e){showErr("dErr",e)}
  };
  panel.querySelector("#dClose").onclick=closeForm;
  panel.querySelector("#dSave").onclick=()=>{const tx=panel.querySelector("#d-text").value.trim();if(!tx)return showErr("dErr",{message:"Skriv hva økta er."});put([tx,num(panel.querySelector("#d-km").value),Math.round(num(panel.querySelector("#d-hm").value))])};
  panel.querySelector("#dRest").onclick=()=>put(["Hvile",0,0]);
  const r=panel.querySelector("#dReset");if(r)r.onclick=()=>put(null);
}
const num=v=>{const n=parseFloat(String(v).replace(",","."));return isFinite(n)?n:0};
const toRow=s=>{const me=s.kategori==="meg";return{dato:s.dato,type:typeOf(s.type,s.kategori),km:num(s.km),hm:Math.round(num(s.hm)),min:Math.round(num(s.min)),hunder:me?[]:s.hunder||[],motivasjon:me?{}:s.motivasjon||{},kommentar:String(s.kommentar||"").trim(),kategori:me?"meg":"hund",rpe:me&&s.rpe?Number(s.rpe):null,kropp:me&&s.kropp?Number(s.kropp):null,last_kg:(me||LOAD_LABEL[typeOf(s.type)])&&num(s.last_kg)?num(s.last_kg):null,temp:String(s.temp??"").trim()!==""?num(s.temp):null,rh:String(s.rh??"").trim()!==""?Math.round(num(s.rh)):null,rute:s.rute||null,kilde:s.rute?s.kilde||"gpx":"",bilder:s.bilder||[]}};
async function save(){
  if(!F.dato)return showErr("fErr",{message:"Velg en dato."});
  if(!num(F.km)&&!num(F.min)&&!F.kommentar.trim())return showErr("fErr",{message:"Skriv inn km, minutter eller en kommentar."});
  const body=toRow(F);
  const btn=document.getElementById("fSave");btn.disabled=true;
  try{
    ok(editing?await sb.from("okter").update(body).eq("id",editing.id):await sb.from("okter").insert(body));
    const gone=F._gone||[];F._new=[];F._gone=[];removeImages(gone).catch(()=>{});
    const was=editing;closeForm();toast(was?"Endringene er lagret":"Økta er lagret");await refresh();
  }catch(e){btn.disabled=false;showErr("fErr",e)}
}
function errText(e){
  if(e&&/fetch|network/i.test(e.message||""))return "Fikk ikke kontakt. Sjekk nettet og prøv igjen.";
  if(e&&e.status===429)return "For mange forsøk på kort tid. Vent litt og prøv igjen.";
  return e?.message||"Noe gikk galt. Prøv igjen.";
}
function showErr(id,e){const el=document.getElementById(id);if(!el)return;el.textContent=errText(e);el.hidden=false}
function toast(t){const el=document.getElementById("toast");el.textContent=t;el.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove("show"),1800)}

function bindDog(){
  const n=S.dog, $=id=>document.getElementById(id);
  const save=async(info,msg)=>{try{await saveDogInfo(n,info);render();toast(msg)}catch(e){showErr("dogErr",e)}};
  $("dogPhotoBtn").onclick=()=>$("dogPhoto").click();
  $("dogPhoto").onchange=async()=>{const f=$("dogPhoto").files[0];if(!f)return;toast("Laster opp …");
    try{const old=dogInfo(n).photo,path=await uploadImage(f,"hunder",800);await save({...dogInfo(n),photo:path},"Bildet er lagret");removeImages([old]).catch(()=>{})}catch(e){showErr("dogErr",e)}};
  $("dogBack").onclick=()=>{S.view="hjem";render();window.scrollTo(0,0)};
  $("wAdd").onclick=()=>{
    const kg=num($("w-kg").value), bcs=Number($("w-bcs").value)||0;
    if(!kg&&!bcs)return showErr("dogErr",{message:"Skriv inn vekt eller velg BCS."});
    const i=dogInfo(n);save({...i,weights:[...(i.weights||[]),{id:newId(),d:$("w-d").value||iso(todayD()),kg:kg||null,bcs:bcs||null}]},"Målingen er lagret");
  };
  document.querySelectorAll("[data-wdel]").forEach(b=>b.onclick=()=>{if(!confirm("Slette denne målingen?"))return;const i=dogInfo(n);save({...i,weights:(i.weights||[]).filter(w=>w.id!==b.dataset.wdel)},"Målingen er slettet")});
  const upd=()=>{const v=VACCINES.find(x=>x.id===$("v-type").value);$("v-until").value=v&&v.years&&$("v-d").value?addYears($("v-d").value,v.years):""};
  $("v-type").onchange=upd;$("v-d").onchange=upd;
  $("vAdd").onclick=()=>{
    if(!$("v-d").value)return showErr("dogErr",{message:"Velg datoen vaksinen ble gitt."});
    const i=dogInfo(n);save({...i,vaccines:[...(i.vaccines||[]),{id:newId(),type:$("v-type").value,d:$("v-d").value,until:$("v-until").value||"",note:$("v-note").value.trim()}]},"Vaksinen er lagret");
  };
  document.querySelectorAll("[data-vdel]").forEach(b=>b.onclick=()=>{if(!confirm("Slette denne vaksinen?"))return;const i=dogInfo(n);save({...i,vaccines:(i.vaccines||[]).filter(v=>v.id!==b.dataset.vdel)},"Vaksinen er slettet")});
  const ps=$("pkStart");if(ps)ps.onclick=()=>{const d=$("pk-start").value;if(!d)return showErr("dogErr",{message:"Velg når uke 1 starter."});save({...dogInfo(n),packStart:iso(monday(parse(d)))},"Kløvplanen er startet")};
  const fdFeed=$("fd-feed");
  if(fdFeed){
    const collect=()=>({...dogInfo(n),activity:$("fd-act").value,neutered:$("fd-neu").checked,feedId:fdFeed.value,feedName:$("fd-name")?$("fd-name").value.trim():dogInfo(n).feedName,feedKcal:$("fd-kcal")?num($("fd-kcal").value):dogInfo(n).feedKcal,mix:[...document.querySelectorAll(".mixrow")].map(r=>({id:r.querySelector(".mx-id").value,share:Math.round(num(r.querySelector(".mx-share").value)||0)})).filter(m=>m.id&&m.share),feed2Id:"",feed2Share:"",water:num($("fd-water").value)||""});
    const ml=$("mixList");ml.onclick=e=>{const b=e.target.closest(".rmmix");if(b)b.closest(".mixrow").remove()};
    $("addMix").onclick=()=>{if(ml.querySelectorAll(".mixrow").length>=4)return toast("Maks fire tillegg");ml.insertAdjacentHTML("beforeend",mixRow("",""))};
    fdFeed.onchange=()=>{if(fdFeed.value==="custom")save(collect(),"Skriv inn energien fra sekken")};
    $("fdSave").onclick=()=>{const v=collect();if(v.feedId==="custom"&&!(v.feedKcal>0))return showErr("dogErr",{message:"Skriv inn kcal per 100 g fra sekken."});save(v,"Fôringen er lagret")};
  }
  $("i-tol").onchange=()=>save({...dogInfo(n),tolerance:$("i-tol").value},"Lagret");
  const pst=$("pkStop");if(pst)pst.onclick=()=>{if(!confirm("Avslutte kløvplanen? Øktene dine blir liggende."))return;const i={...dogInfo(n)};delete i.packStart;save(i,"Kløvplanen er avsluttet")};
  $("iSave").onclick=()=>{
    const chip=$("i-chip").value.replace(/\s/g,"");
    if(chip&&!/^\d{9,15}$/.test(chip))return showErr("dogErr",{message:"Chip-ID skal være 9–15 siffer (vanligvis 15)."});
    save({...dogInfo(n),born:$("i-born").value,sex:$("i-sex").value,breed:$("i-breed").value.trim(),chip,chipDate:$("i-chipd").value,harness:$("i-harness").value.trim(),notes:$("i-notes").value.trim()},"Infoen er lagret");
  };
}

/* Backup */
function exportData(){
  const data={app:"slednecks",versjon:1,eksportert:new Date().toISOString(),profil:S.profile,okter:S.sessions.map(toRow)};
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:"application/json"}));
  a.download=`slednecks-backup-${iso(new Date())}.json`;a.click();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
async function importData(file){
  const data=JSON.parse(await file.text());
  const list=Array.isArray(data)?data:data.okter;
  if(!Array.isArray(list))throw new Error("Fila ser ikke ut som en Slednecks-backup.");
  const key=s=>`${s.dato}|${s.kategori==="meg"?"meg":"hund"}|${typeOf(s.type,s.kategori)}|${num(s.km)}|${num(s.min)}`;
  const have=new Set(S.sessions.map(key));
  const rows=list.filter(s=>s&&/^\d{4}-\d{2}-\d{2}$/.test(s.dato)&&!have.has(key(s))).map(toRow);
  if(rows.length)ok(await sb.from("okter").insert(rows));
  await refresh();
  return {added:rows.length,skipped:list.length-rows.length};
}

function bind(){
  const ns=document.getElementById("nickSave");if(ns)ns.onclick=async()=>{const v=document.getElementById("nick").value.trim();try{ok(await sb.from("profiles").update({nickname:v}).eq("user_id",S.user.id));S.profile.nickname=v;toast("Lagret")}catch(e){toast(errText(e))}};
  if(S.view==="kart"&&S.user){if(!REP.at)loadReports();bindMap()}
  loadImgs();
  const cb=document.getElementById("coverBtn"),cf=document.getElementById("coverFile");
  if(cb){cb.onclick=()=>cf.click();cf.onchange=async()=>{const f=cf.files[0];if(!f)return;toast("Laster opp …");
    try{const old=S.profile.cover,path=await uploadImage(f,"forside",1600);ok(await sb.from("profiles").update({cover:path}).eq("user_id",S.user.id));S.profile.cover=path;render();toast("Forsidebildet er lagret");removeImages([old]).catch(()=>{})}catch(e){toast(errText(e))}}}
  const cr=document.getElementById("coverRm");if(cr)cr.onclick=async()=>{const old=S.profile.cover;try{ok(await sb.from("profiles").update({cover:""}).eq("user_id",S.user.id));S.profile.cover="";render();removeImages([old]).catch(()=>{})}catch(e){toast(errText(e))}};
  document.querySelectorAll("[data-goto]").forEach(b=>b.onclick=()=>{S.prevView=S.view;S.view=b.dataset.goto;render();window.scrollTo(0,0)});
  const fo=document.getElementById("fbOpen");if(fo)fo.onclick=openFeedback;
  const wl=document.getElementById("wlGo");if(wl)wl.onclick=()=>{S.view=S.isNew?"innst":"hjem";render();window.scrollTo(0,0)};
  const pv=document.getElementById("pvBack");if(pv)pv.onclick=()=>{S.view=S.prevView&&S.prevView!=="personvern"?S.prevView:"hjem";render();window.scrollTo(0,0)};
  const da=document.getElementById("delAcc");
  if(da)da.onclick=async()=>{
    if(!confirm("Slette kontoen og alle dataene dine for godt? Dette kan ikke angres."))return;
    if(prompt("Skriv SLETT for å bekrefte")!=="SLETT")return;
    da.disabled=true;
    try{await removeImages(allImagePaths()).catch(()=>{});ok(await sb.rpc("delete_my_account"));await sb.auth.signOut();toast("Kontoen er slettet")}
    catch(e){da.disabled=false;showErr("delErr",e)}
  };
  const wp=document.getElementById("wxPos");if(wp)wp.onclick=askPos;
  const wr=document.getElementById("wxRetry");if(wr)wr.onclick=()=>{W.err="";loadWeather(true);render()};
  if(S.user&&S.view==="hjem")loadWeather();
  const ag=document.getElementById("addGoal");if(ag)ag.onclick=()=>openGoal();
  document.querySelectorAll("[data-goal]").forEach(b=>b.onclick=()=>openGoal((S.profile.myGoals||[]).find(g=>g.id===b.dataset.goal)));
  const am=document.getElementById("addMe");if(am)am.onclick=()=>openForm(null,"meg");
  document.querySelectorAll("[data-logf]").forEach(b=>b.onclick=()=>{S.logFilter=b.dataset.logf;render()});
  document.querySelectorAll("[data-dogpage]").forEach(b=>b.onclick=()=>{S.dog=b.dataset.dogpage;S.view="hund";render();window.scrollTo(0,0)});
  if(S.view==="hund"&&S.user)bindDog();
  const send=document.getElementById("l-send");
  if(send)send.onclick=async()=>{
    const email=document.getElementById("l-email").value.trim();
    if(!/.+@.+\..+/.test(email))return showErr("lErr",{message:"Skriv inn en gyldig e-postadresse."});
    send.disabled=true;
    const r=await sb.auth.signInWithOtp({email,options:{emailRedirectTo:location.origin+location.pathname,shouldCreateUser:false}});
    if(r.error){send.disabled=false;return showErr("lErr",/signup|not allowed|not found/i.test(r.error.message||"")?{message:"Denne e-posten har ikke tilgang ennå. Appen er foreløpig bare for inviterte."}:r.error)}
    S.loginEmail=email;S.loginSent=true;render();
  };
  const back=document.getElementById("l-back");if(back)back.onclick=()=>{S.loginSent=false;render()};

  document.querySelectorAll(".entry").forEach(b=>b.onclick=()=>{const s=S.sessions.find(x=>x.id===b.dataset.id);if(s)openForm(s)});
  const ss=document.getElementById("saveSet");
  if(ss)ss.onclick=async()=>{
    const rows=[...document.querySelectorAll(".dogin")].map(i=>({orig:i.dataset.orig,name:i.value.trim()})).filter(r=>r.name);
    const dogs=rows.map(r=>r.name);
    if(new Set(dogs).size!==dogs.length)return showErr("setErr",{message:"To hunder kan ikke ha samme navn."});
    const raceKm=num(document.getElementById("r-km").value), raceHm=Math.round(num(document.getElementById("r-hm").value));
    if(!(raceKm>0))return showErr("setErr",{message:"Skriv inn distansen på løpet i km."});
    const pick=document.getElementById("r-pick").value, cls=document.getElementById("r-class");
    const prof={...S.profile,raceDate:document.getElementById("race").value||S.profile.raceDate,raceName:document.getElementById("r-name").value.trim(),raceKm,raceHm,
      raceId:pick?pick+(cls&&cls.value?"|"+cls.value:""):"",raceType:document.getElementById("g-gren").value+(document.getElementById("g-class").value?"|"+document.getElementById("g-class").value:""),planType:document.getElementById("r-plan").value,dogs};
    ss.disabled=true;
    try{
      const ren={};rows.forEach(r=>{if(r.orig&&r.orig!==r.name)ren[r.orig]=r.name});
      const info={...(S.profile.dogInfo||{})};for(const [o,nw] of Object.entries(ren))if(info[o]){info[nw]=info[o];delete info[o]}
      ok(await sb.from("profiles").upsert({user_id:S.user.id,...profileRow(prof),dog_info:info,updated_at:new Date().toISOString()}));
      S.isNew=false;
      if(Object.keys(ren).length)for(const s of S.sessions.filter(s=>(s.hunder||[]).some(h=>h in ren))){
        const mot={};for(const [k,v] of Object.entries(s.motivasjon||{}))mot[ren[k]||k]=v;
        ok(await sb.from("okter").update({hunder:s.hunder.map(h=>ren[h]||h),motivasjon:mot}).eq("id",s.id));
      }
      toast("Lagret");await refresh();
    }catch(e){showErr("setErr",e)}finally{ss.disabled=false}
  };
  document.querySelectorAll("[data-pdate]").forEach(b=>b.onclick=()=>openDay(b.dataset.pdate));
  const rs=document.getElementById("resetPlan");
  if(rs)rs.onclick=async()=>{if(!confirm("Fjerne alle egne endringer i planen?"))return;try{ok(await sb.from("profiles").update({plan_custom:{}}).eq("user_id",S.user.id));S.profile.planCustom={};render();toast("Planen er tilbakestilt")}catch(e){toast(errText(e))}};
  const gs=document.getElementById("g-gren");
  const bindGren=()=>{
    const gc=document.getElementById("g-class"), g=GREN(gs.value);
    gc.onchange=()=>{const c=g.classes.find(x=>x.name===gc.value);if(c&&!document.getElementById("r-pick").value)document.getElementById("r-km").value=fmtKm(c.km[1])};
    const n=document.getElementById("pk-n"), w=document.getElementById("pk-w"), out=document.getElementById("pk-out");
    if(n){
      const upd=()=>{out.innerHTML=pulkText(Number(n.value),num(w.value))};n.onchange=upd;w.oninput=upd;
      document.querySelectorAll("[data-pkdog]").forEach(b=>b.onclick=()=>{
        b.setAttribute("aria-pressed",b.getAttribute("aria-pressed")==="true"?"false":"true");
        const on=[...document.querySelectorAll('[data-pkdog][aria-pressed="true"]')];
        if(on.length){n.value=String(Math.min(5,on.length));w.value=fmtKm(on.reduce((a,x)=>a+Number(x.dataset.kg),0))}
        upd();
      });
    }
  };
  function setGren(id){
    const g=GREN(id);if(!g||!gs)return;
    gs.value=id;
    document.getElementById("g-classWrap").innerHTML=grenClassSelect(g,"");
    document.getElementById("g-info").innerHTML=grenInfo(g);
    document.getElementById("r-planAuto").textContent=`Automatisk (${TEMPLATES[g.plan].label.toLowerCase()})`;
    bindGren();
  }
  if(gs){gs.onchange=()=>setGren(gs.value);bindGren()}
  const rp=document.getElementById("r-pick");
  if(rp){
    const fillClass=()=>{
      const r=raceById(rp.value), c=document.getElementById("r-class"), k=r&&c&&r.classes.find(x=>x.name===c.value);
      if(!k)return;
      document.getElementById("r-km").value=fmtKm(k.km);
      document.getElementById("r-hm").value=k.hm||"";
      document.getElementById("r-name").value=r.classes.length>1?`${r.name} – ${k.name}`:r.name;
      if(r.type==="Slede")setGren(k.km>100?"slede-ld":k.km<25?"slede-sprint":"slede-md");
    };
    const bindClass=()=>{const c=document.getElementById("r-class");if(c)c.onchange=fillClass};
    rp.onchange=()=>{
      const r=raceById(rp.value);
      document.getElementById("r-classWrap").innerHTML=classSelect(rp.value);
      document.getElementById("r-src").innerHTML=raceSource(rp.value);
      bindClass();
      if(!r)return;
      document.getElementById("r-name").value=r.name;
      document.getElementById("race").value=r.date;
      setGren({Sprint:"slede-sprint",Nordisk:"pulk",Barmark:"canicross"}[r.type]||document.getElementById("g-gren").value);
      if(r.classes.length===1){document.getElementById("r-class").value=r.classes[0].name;fillClass()}
      else{document.getElementById("r-km").value="";document.getElementById("r-hm").value=""}
    };
    bindClass();
  }
  const dl=document.getElementById("dogList");
  if(dl)dl.onclick=e=>{const b=e.target.closest(".rmdog");if(b)b.closest(".dogrow").remove()};
  const ad=document.getElementById("addDog");
  if(ad)ad.onclick=()=>{dl.insertAdjacentHTML("beforeend",dogField("",""));dl.lastElementChild.querySelector("input").focus()};
  const ex=document.getElementById("exportBtn");if(ex)ex.onclick=exportData;
  const im=document.getElementById("importBtn"),imf=document.getElementById("importFile");
  if(im)im.onclick=()=>imf.click();
  if(imf)imf.onchange=async()=>{
    const f=imf.files[0];imf.value="";if(!f)return;
    im.disabled=true;
    try{const r=await importData(f);toast(r.added?`${r.added} økter importert`:"Ingen nye økter i fila")}
    catch(e){showErr("impErr",e)}finally{im.disabled=false}
  };
  const lo=document.getElementById("logoutBtn");if(lo)lo.onclick=async()=>{await sb.auth.signOut()};
}
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{S.view=t.dataset.v;try{history.replaceState(null,"","#"+S.view)}catch(e){}render();window.scrollTo(0,0)});
document.getElementById("addBtn").onclick=()=>openForm();
sheet.addEventListener("click",e=>{if(e.target===sheet)closeForm()});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeForm()});
document.addEventListener("visibilitychange",()=>{if(!document.hidden&&S.user)refresh()});

const NAV_ICONS={hjem:"house",logg:"list",plan:"calendar-days",innst:"user"};
document.querySelectorAll(".tab").forEach(t=>{t.innerHTML=`${icon(NAV_ICONS[t.dataset.v])}<span>${t.textContent}</span>`});
document.getElementById("addBtn").innerHTML=icon("plus");
render();
if(sb){
  sb.auth.onAuthStateChange((event,session)=>{
    const was=S.user?.id;S.user=session?.user||null;S.authReady=true;
    if(!S.user){S.sessions=[];S.loaded=false;render();return}
    if(was!==S.user.id){S.loaded=false;render();setTimeout(refresh,0)}
  });
}

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
    if(x===E)return["Egentrening / løs tur",0,0];
    if(x===R)return[`${p.raceName||"Løpet"} ${fmtKm(raceKm)} km${raceHm?` / ${raceHm} hm`:""}`,raceKm,raceHm,1];
    let [name,km,hm,note,snow,key]=x;
    if(!km)return[name,0,0];
    if(barmark){snow=0;if(/slede|snø/.test(note||""))note=""}
    const k=Math.max(2,Math.round(km*fk));
    const h=hm==null?Math.round(k*perKm*(/Bakker/.test(name)?1.5:1)/50)*50:Math.round(hm*raceHm/t.baseHm/50)*50;
    return[`${snow?"❄ ":""}${name} ${k} km${note?" – "+note:""}`,k,h,key?1:0];
  })}));
}
const TYPES=["Sykkeljøring","Canicross","Vogn / ATV","Hundekjøring","Skijøring","Kløv","Tur","Annet"];
const ALIAS={"Terrengsykkel":"Sykkeljøring","Sykkel":"Sykkeljøring","El-sykkel":"Sykkeljøring","Løping":"Canicross","Gåtur":"Tur","Slede":"Hundekjøring","Vogn":"Vogn / ATV"};
const typeOf=t=>ALIAS[t]||(TYPES.includes(t)?t:"Annet");
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
const sum=(a,f)=>a.reduce((x,y)=>x+(Number(y[f])||0),0);
const todayD=()=>{const t=new Date();t.setHours(0,0,0,0);return t};

/* Supabase */
const CFG=window.SLEDNECKS_CONFIG||{};
const sb=CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase?window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey):null;
const rowToSession=r=>({id:r.id,dato:r.dato,type:r.type,km:Number(r.km)||0,hm:r.hm||0,min:r.min||0,hunder:r.hunder||[],motivasjon:r.motivasjon||{},kommentar:r.kommentar||""});
const ok=r=>{if(r.error)throw r.error;return r.data};

const S={view:"hjem",sessions:[],profile:{raceDate:iso(addDays(new Date(),84)),raceName:"",raceKm:30,raceHm:0,raceId:"",raceType:"",planType:"",planCustom:{},dogInfo:{},dogs:[]},isNew:false,user:null,authReady:false,loaded:false,loginEmail:"",loginSent:false};
try{const v=location.hash.slice(1);if(["hjem","logg","plan","innst"].includes(v))S.view=v}catch(e){}

async function loadAll(){
  const [p,o]=await Promise.all([sb.from("profiles").select("race_date,race_name,race_km,race_hm,race_id,race_type,plan_type,plan_custom,dog_info,dogs").maybeSingle(),sb.from("okter").select("*").order("dato")]);
  const prof=ok(p);
  if(prof)S.profile={raceDate:prof.race_date||S.profile.raceDate,raceName:prof.race_name||"",raceKm:Number(prof.race_km)||S.profile.raceKm,raceHm:Number(prof.race_hm)||0,raceId:prof.race_id||"",raceType:prof.race_type||"",planType:prof.plan_type||"",planCustom:prof.plan_custom||{},dogInfo:prof.dog_info||{},dogs:Array.isArray(prof.dogs)?prof.dogs.slice():[]};
  else{
    ok(await sb.from("profiles").insert(profileRow(S.profile)));
    S.isNew=true;S.view="innst";
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
const byWeek=()=>{const m={};for(const s of S.sessions){const k=iso(monday(parse(s.dato)));(m[k]=m[k]||[]).push(s)}return m};

function render(){
  buildPlan();
  document.body.classList.toggle("anon",!S.user);
  document.querySelectorAll(".tab").forEach(t=>{if(t.dataset.v===S.view)t.setAttribute("aria-current","page");else t.removeAttribute("aria-current")});
  const app=document.getElementById("app");
  if(!sb)app.innerHTML=vSetup();
  else if(!S.authReady)app.innerHTML=`<p class="empty">Laster …</p>`;
  else if(!S.user)app.innerHTML=vLogin();
  else app.innerHTML=({hjem:vHome,logg:vLog,plan:vPlan,innst:vSettings,hund:vDog})[S.view]();
  bind();
}

function vSetup(){
  return `<section class="login"><h1 class="brand cond">Slednecks<span>.</span></h1>
  <p class="notice">Appen er ikke koblet til databasen ennå. Fyll inn Supabase-adressen og «anon public»-nøkkelen i <b>config.js</b>.</p></section>`;
}

function vLogin(){
  return `<section class="login"><h1 class="brand cond">Slednecks<span>.</span></h1><p class="muted" style="margin-top:6px">Treningslogg for hundene</p>
  ${S.loginSent?`<p class="notice">Vi har sendt en e-post til <b>${esc(S.loginEmail)}</b>. Åpne den på denne enheten og trykk på lenken for å logge inn.</p>
    <p style="margin-top:14px"><button class="btn ghost" id="l-back">Bruk en annen e-post</button></p>`
  :`<div class="field"><label for="l-email">E-post</label><input id="l-email" type="email" autocomplete="email" value="${esc(S.loginEmail)}" placeholder="navn@eksempel.no"></div>
    <div class="actions"><button class="btn" id="l-send">Send innloggingslenke</button></div>
    <p class="small muted" style="margin-top:10px">Ingen passord. Du får en lenke på e-post, og holder deg innlogget på denne enheten.</p>`}
  <p class="err" id="lErr" hidden></p></section>`;
}

function goalRow(label,done,goal,fmt,unit){
  const pct=goal?Math.min(100,done/goal*100):0;
  return `<div class="goalrow"><div class="row"><span><span class="v">${fmt(done)}</span> <span class="of muted">av ${fmt(goal)} ${unit}</span></span><span class="small ${pct>=100?"badge-ok":"muted"}">${pct>=100?"Nådd ✓":Math.round(pct)+" %"}</span></div>
  <div class="bar" role="img" aria-label="${label}: ${Math.round(pct)} prosent"><span style="width:${pct}%"></span></div><p class="small muted" style="margin-top:3px">${label}</p></div>`;
}

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
  let next=null;for(let i=0;i<77&&!next;i++){const d=addDays(t,i),p=planDay(d);if(p&&p.item[1]>=25&&!(i===0&&S.sessions.some(s=>s.dato===iso(d))))next={d,txt:p.item[0]}}
  const todayDone=S.sessions.some(s=>s.dato===iso(t));
  return `
  <section>${hero}<p class="race">${esc(S.profile.raceName||"Løpet")} ${race.toLocaleDateString("nb-NO",{weekday:"long",day:"numeric",month:"long"})} – ${fmtKm(S.profile.raceKm)} km${S.profile.raceHm?` og ${S.profile.raceHm} høydemeter`:""}</p></section>
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
  <h2>Hundene</h2>
  ${S.profile.dogs.length?`<div class="dogs">${S.profile.dogs.map(dogCard).join("")}</div>`:`<p class="notice">Legg til hundene dine under Profil.</p>`}
  <h2>Uke for uke</h2>
  ${chart(bw)}`;
}

function progressCard(t){
  const ps=planStart(), race=parse(S.profile.raceDate), end=addDays(monday(race),6);
  const total=PLAN.reduce((a,_,i)=>a+weekTotals(i).km,0);
  const inPlan=S.sessions.filter(s=>{const d=parse(s.dato);return d>=ps&&d<=end});
  const done=sum(inPlan,"km"), fk=Math.min(1,done/total);
  const span=Math.round((race-ps)/864e5), gone=Math.min(span,Math.max(0,Math.round((t-ps)/864e5))), ft=span?gone/span:0;
  const wkNo=Math.min(PLAN.length,Math.max(0,Math.floor((t-ps)/864e5/7)+1));
  const R1=56,R2=40,C1=2*Math.PI*R1,C2=2*Math.PI*R2;
  const started=t>=ps;
  const before=sum(S.sessions.filter(s=>parse(s.dato)<ps),"km");
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
      <h3>Mot målet</h3>
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
function vDog(){
  const n=S.dog, i=dogInfo(n), ws=byDateDesc(i.weights), vs=byDateDesc(i.vaccines), warn=dogWarnings(n);
  const mine=S.sessions.filter(s=>(s.hunder||[]).includes(n)), lw=ws.find(w=>w.kg), lb=ws.find(w=>w.bcs);
  const facts=[i.sex,i.breed,i.born?ageText(ageMonths(i.born)):""].filter(Boolean);
  return `<div class="actions" style="margin-top:4px"><button class="btn ghost" id="dogBack">← Tilbake</button></div>
  <h1 class="cond" style="font-size:2.6rem;margin-top:12px">${esc(n)}</h1>
  <p class="muted">${facts.length?facts.map(esc).join(" · "):"Fyll inn info om hunden lenger ned."}</p>
  ${warn.length?`<div class="notice warnbox"><b>Sjekk før løpet</b><ul>${warn.map(w=>`<li>${esc(w)}</li>`).join("")}</ul></div>`:`<p class="notice okbox">✓ Chip og vaksiner er i orden for løpet.</p>`}
  <div class="stats"><div><span class="cond">${fmtKm(sum(mine,"km"))}</span><small>km totalt</small></div><div><span class="cond">${mine.length}</span><small>økter</small></div>
   <div><span class="cond">${lw?fmtKm(lw.kg):"–"}</span><small>kg</small></div><div><span class="cond">${lb?lb.bcs:"–"}</span><small>BCS</small></div></div>

  <h2>Vekt og hold</h2>
  ${weightChart(ws)}
  <div class="field"><label for="w-d">Dato</label><input id="w-d" type="date" value="${iso(todayD())}"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="w-kg">Vekt (kg)</label><input id="w-kg" inputmode="decimal" placeholder="0"></div>
   <div><label for="w-bcs">BCS</label><select id="w-bcs"><option value="">–</option>${BCS.map(([v,l])=>`<option value="${v}">${v} – ${l}</option>`).join("")}</select></div></div>
  <div class="actions"><button class="btn" id="wAdd">Legg til måling</button></div>
  <p class="small muted" style="margin-top:8px">BCS (body condition score) går fra 1 til 9, der 4–5 er ideelt. Du skal lett kunne kjenne ribbeina, og se en tydelig midje ovenfra.</p>
  ${ws.length?`<div class="list">${ws.map(w=>`<div class="lrow"><span>${fmtD(parse(w.d))} ${parse(w.d).getFullYear()}</span><span>${w.kg?`<b>${fmtKm(w.kg)} kg</b>`:""}${w.bcs?` · BCS ${w.bcs}`:""}</span><button type="button" class="btn ghost sm" data-wdel="${esc(w.id)}" aria-label="Slett måling">Slett</button></div>`).join("")}</div>`:""}

  <h2>Vaksinekort</h2>
  ${vs.length?`<div class="list">${vs.map(v=>{const st=vaccineStatus(v);return `<div class="lrow"><span><b>${esc(vacName(v.type))}</b><br><span class="small muted">Gitt ${parse(v.d).toLocaleDateString("nb-NO")}${v.note?` · ${esc(v.note)}`:""}</span></span><span class="pill ${st.c}">${esc(st.t)}</span><button type="button" class="btn ghost sm" data-vdel="${esc(v.id)}" aria-label="Slett vaksine">Slett</button></div>`}).join("")}</div>`:`<p class="muted">Ingen vaksiner registrert.</p>`}
  <div class="field"><label for="v-type">Vaksine</label><select id="v-type">${VACCINES.map(v=>`<option value="${v.id}">${esc(v.name)}</option>`).join("")}</select></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="v-d">Dato gitt</label><input id="v-d" type="date" value="${iso(todayD())}"></div>
   <div><label for="v-until">Gyldig til</label><input id="v-until" type="date" value="${addYears(iso(todayD()),3)}"></div></div>
  <div class="field"><label for="v-note">Merknad</label><input id="v-note" maxlength="80" placeholder="Preparat, veterinær …"></div>
  <div class="actions"><button class="btn" id="vAdd">Legg til vaksine</button></div>
  <p class="small muted" style="margin-top:8px">NHF krever DHP (gyldig 3 år for hunder over 1 år) og anbefaler kennelhoste (1 år). Sjekk alltid gyldigheten i preparatomtalen, og husk karenstid før løp.</p>

  <h2>ID og info</h2>
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
  return `<button type="button" class="dog" data-dogpage="${esc(n)}"><div class="name">${esc(n)}</div><div class="km">${fmtKm(sum(mine,"km"))} km</div>
    <p class="muted small">${fmtKm(sum(wk,"km"))} km denne uka<br>${mine.length} økter${longest?` · lengste ${fmtKm(longest)} km`:""}${lw?`<br>${fmtKm(lw.kg)} kg${lw.bcs?` · BCS ${lw.bcs}`:""}`:""}</p>
    ${moods.length?`<div class="mood" aria-label="Siste motivasjon">${moods.map(m=>`<i class="m${m}"></i>`).join("")}</div>`:""}
    ${warn.length?`<p class="small dogwarn">⚠ ${warn.length===1?esc(warn[0]):`${warn.length} ting å sjekke`}</p>`:""}</button>`;
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
  const bw=byWeek(), keys=Object.keys(bw).sort().reverse();
  if(!keys.length)return `<h2 style="margin-top:6px">Logg</h2><p class="empty">${S.loaded?"Ingen økter ennå. Trykk + for å føre den første, eller importer gamle økter under Hunder.":"Henter økter …"}</p>`;
  return `<h2 style="margin-top:6px">Logg</h2><p class="muted">${S.sessions.length} økter · ${fmtKm(sum(S.sessions,"km"))} km · ${Math.round(sum(S.sessions,"hm")).toLocaleString("nb-NO")} høydemeter totalt</p>`+
  keys.map(k=>{const list=bw[k].slice().sort((a,b)=>a.dato<b.dato?1:-1),m=parse(k),i=planWeekIdx(m),km=sum(list,"km"),goal=i>=0?weekTotals(i).km:0;
    return `<section class="wk"><div class="wkhead"><h3>Uke ${isoWeek(m)}</h3><span class="muted">${goal?`<span class="${km>=goal?"hit":""}">${fmtKm(km)}</span> / ${goal} km`:`${fmtKm(km)} km`} · ${Math.round(sum(list,"hm"))} hm</span></div>
    ${list.map(s=>{const d=parse(s.dato);return `<button class="entry" data-id="${esc(s.id)}"><span class="d">${DAYS[(d.getDay()+6)%7]}<small>${fmtD(d)}</small></span>
      <span><span class="t">${esc(typeOf(s.type))}</span>${s.min?` <span class="muted">· ${fmtMin(s.min)}</span>`:""}<span class="s">${esc((s.hunder||[]).join(", "))}${s.hm?` · ${Math.round(s.hm)} hm`:""}${s.kommentar?` · ${esc(s.kommentar)}`:""}</span></span>
      <span class="k">${fmtKm(s.km)}</span></button>`}).join("")}</section>`}).join("");
}

function vPlan(){
  const t=todayD(),start=planStart(),done=new Set(S.sessions.map(s=>s.dato)),bw=byWeek();
  return `<h2 style="margin-top:6px">Plan frem mot løpet</h2><p class="muted">${esc(TEMPLATES[planTypeFor(S.profile)].label)}-plan laget ut fra løpet ditt: ${fmtKm(S.profile.raceKm)} km${S.profile.raceHm?` og ${S.profile.raceHm} hm`:""}.${grenFor(S.profile).snow?" ❄ = kjør på snø hvis mulig.":""} Trykk på en dag for å endre den.</p>`+
  PLAN.map((wk,i)=>{const m=addDays(start,i*7),g=weekTotals(i),got=sum(bw[iso(m)]||[],"km");
    return `<section class="wk"><div class="wkhead"><h3>Uke ${isoWeek(m)}</h3><span class="muted">${got?`<span class="${got>=g.km?"hit":""}">${fmtKm(got)}</span> / `:""}${g.km} km</span></div><p class="phase">${esc(wk.f)} · ${fmtD(m)}–${fmtD(addDays(m,6))} · ${g.hm} hm</p>
    ${wk.d.map((it,d)=>{const dt=addDays(m,d),key=it[3];
      return `<button type="button" data-pdate="${iso(dt)}" class="${["pday",!it[1]?"rest":"",done.has(iso(dt))?"done":"",key?"key":"",it[4]?"own":"",iso(dt)===iso(t)?"istoday":""].join(" ")}"><span class="cond" style="font-weight:600">${DAYS[d]} <span class="muted" style="font-weight:500">${dt.getDate()}.${dt.getMonth()+1}</span></span><span class="pt">${esc(it[0])}</span><span class="muted">${it[1]?it[1]+" km":""}</span></button>`}).join("")}</section>`}).join("")+
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
  ${g.pulk?`<div class="calc"><h3>Pulkvekt</h3><p class="small muted">Pulken, med sele, drag og trekkreimer, skal veie minst hundenes vekt ganget med en faktor.</p>
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
  <h2 style="margin-top:6px">Målet ditt</h2>
  <p class="muted">Velg et løp fra kalenderen, eller fyll inn ditt eget. Treningsplanen på ${PLAN_WEEKS} uker lages ut fra løpet.</p>
  <div class="field"><label for="r-pick">Løp</label><select id="r-pick">${raceOptions(p.raceId)}</select></div>
  <div class="field" id="r-classWrap">${classSelect(p.raceId)}</div>
  <p class="small muted" id="r-src" style="margin-top:6px">${raceSource(p.raceId)}</p>
  <div class="field"><label for="r-name">Navn på løpet</label><input id="r-name" value="${esc(p.raceName)}" maxlength="60" placeholder="F.eks. Finnskogløpet"></div>
  <div class="field"><label for="race">Dato</label><input id="race" type="date" value="${esc(p.raceDate)}"></div>
  <div class="field grid3" style="grid-template-columns:1fr 1fr"><div><label for="r-km">Distanse (km)</label><input id="r-km" inputmode="decimal" value="${esc(fmtKm(p.raceKm))}"></div>
   <div><label for="r-hm">Høydemeter</label><input id="r-hm" inputmode="numeric" value="${esc(p.raceHm||"")}" placeholder="Ukjent"></div></div>
  <h2>Gren og klasse</h2>
  <p class="muted">Grenen bestemmer hvordan planen bygges opp, og hvilke regler som gjelder.</p>
  <div class="field"><label for="g-gren">Gren</label><select id="g-gren">${grenOptions(grenFor(p).id)}</select></div>
  <div class="field" id="g-classWrap">${grenClassSelect(grenFor(p),grenClass(p))}</div>
  <div class="field"><label for="r-plan">Plantype</label><select id="r-plan"><option value="" id="r-planAuto">Automatisk (${esc(TEMPLATES[grenFor(p).plan].label.toLowerCase())})</option>${Object.entries(TEMPLATES).map(([k,t])=>`<option value="${k}" ${p.planType===k?"selected":""}>${t.label}</option>`).join("")}</select></div>
  <div id="g-info">${grenInfo(grenFor(p))}</div>
  <h2>Hundene</h2>
  <p class="muted">Endrer du et navn, oppdateres det i alle tidligere økter.</p>
  <div id="dogList">${p.dogs.map(d=>dogField(d,d)).join("")}</div>
  <div class="actions" style="margin-top:12px"><button class="btn ghost" id="addDog">+ Legg til hund</button></div>
  <div class="actions"><button class="btn" id="saveSet">Lagre</button></div><p class="err" id="setErr" hidden></p>
  <h2>Backup</h2>
  <p class="muted">Last ned alle øktene som en fil, eller hent inn økter fra en tidligere backup. Økter som allerede finnes hoppes over.</p>
  <div class="actions"><button class="btn line" id="exportBtn">Last ned backup</button><button class="btn line" id="importBtn">Importer fil</button></div>
  <input type="file" id="importFile" accept="application/json,.json" hidden>
  <p class="err" id="impErr" hidden></p>
  <h2>Konto</h2>
  <p class="muted">Innlogget som ${esc(S.user?.email||"")}</p>
  <div class="actions"><button class="btn ghost" id="logoutBtn">Logg ut</button></div>`;
}

/* Skjema */
let editing=null,F=null;
const panel=document.getElementById("panel"),sheet=document.getElementById("sheet");
function openForm(s){
  editing=s||null;
  const last=S.sessions.slice().sort((a,b)=>a.dato<b.dato?1:-1)[0];
  F=s?JSON.parse(JSON.stringify(s)):{dato:iso(new Date()),type:typeOf(last?.type||"Sykkeljøring"),km:"",hm:"",min:"",hunder:(last?.hunder||[S.profile.dogs[0]]).filter(h=>S.profile.dogs.includes(h)),motivasjon:{},kommentar:""};
  F.type=typeOf(F.type);F.motivasjon=F.motivasjon||{};F.hunder=F.hunder||[];
  if(!F.min)F.min="";if(!F.hm)F.hm="";
  draw();sheet.classList.add("open");
}
function closeForm(){sheet.classList.remove("open");editing=null}
function draw(){
  const dogs=Array.from(new Set([...S.profile.dogs,...F.hunder])), pd=planDay(parse(F.dato||iso(new Date())));
  panel.innerHTML=`<div class="row"><h2 id="formTitle" style="margin:0">${editing?"Endre økt":"Ny økt"}</h2><button class="btn ghost" id="fClose">Lukk</button></div>
  ${pd&&pd.item[1]?`<p class="muted small" style="margin-top:6px">Plan denne dagen: ${esc(pd.item[0])}</p>`:""}
  <div class="field"><label for="f-dato">Dato</label><input id="f-dato" type="date" value="${esc(F.dato)}"></div>
  <div class="field"><span class="flabel">Type økt</span><div class="chips">${TYPES.map(t=>`<button type="button" class="chip" data-type="${t}" aria-pressed="${F.type===t}">${t}</button>`).join("")}</div></div>
  <div class="field grid3"><div><label for="f-km">Km</label><input id="f-km" inputmode="decimal" value="${esc(F.km)}" placeholder="0"></div>
   <div><label for="f-hm">Høydemeter</label><input id="f-hm" inputmode="numeric" value="${esc(F.hm)}" placeholder="0"></div>
   <div><label for="f-min">Minutter</label><input id="f-min" inputmode="numeric" value="${esc(F.min)}" placeholder="0"></div></div>
  <div class="field"><span class="flabel">Hunder med</span><div class="chips">${dogs.map(d=>`<button type="button" class="chip" data-dog="${esc(d)}" aria-pressed="${F.hunder.includes(d)}">${esc(d)}</button>`).join("")}</div></div>
  ${F.hunder.length?`<div class="field"><span class="flabel">Hvordan jobbet de?</span>${F.hunder.map(d=>`<div class="moodrow"><span>${esc(d)}</span><span class="opts">${MOODS.map(([v,l])=>`<button type="button" data-mdog="${esc(d)}" data-m="${v}" aria-pressed="${F.motivasjon[d]===v}">${l}</button>`).join("")}</span></div>`).join("")}</div>`:""}
  <div class="field"><label for="f-kom">Kommentar</label><textarea id="f-kom" placeholder="Føre, vær, poter, hvordan det gikk …">${esc(F.kommentar)}</textarea></div>
  <p class="err" id="fErr" hidden></p>
  <div class="actions">${editing?`<button class="btn del" id="fDel">Slett</button>`:""}<button class="btn" id="fSave">${editing?"Lagre endringer":"Lagre økt"}</button></div>`;
  const keep=()=>{F.dato=panel.querySelector("#f-dato").value;F.km=panel.querySelector("#f-km").value;F.hm=panel.querySelector("#f-hm").value;F.min=panel.querySelector("#f-min").value;F.kommentar=panel.querySelector("#f-kom").value};
  panel.querySelector("#fClose").onclick=closeForm;
  panel.querySelector("#f-dato").onchange=()=>{keep();draw()};
  panel.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{keep();F.type=b.dataset.type;draw()});
  panel.querySelectorAll("[data-dog]").forEach(b=>b.onclick=()=>{keep();const d=b.dataset.dog;if(F.hunder.includes(d)){F.hunder=F.hunder.filter(x=>x!==d);delete F.motivasjon[d]}else F.hunder=[...F.hunder,d];draw()});
  panel.querySelectorAll("[data-mdog]").forEach(b=>b.onclick=()=>{keep();const d=b.dataset.mdog,v=Number(b.dataset.m);if(F.motivasjon[d]===v)delete F.motivasjon[d];else F.motivasjon[d]=v;draw()});
  panel.querySelector("#fSave").onclick=async()=>{keep();await save()};
  const del=panel.querySelector("#fDel");if(del)del.onclick=async()=>{if(!confirm("Slette denne økta?"))return;try{ok(await sb.from("okter").delete().eq("id",editing.id));closeForm();toast("Økta er slettet");await refresh()}catch(e){showErr("fErr",e)}};
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
const toRow=s=>({dato:s.dato,type:typeOf(s.type),km:num(s.km),hm:Math.round(num(s.hm)),min:Math.round(num(s.min)),hunder:s.hunder||[],motivasjon:s.motivasjon||{},kommentar:String(s.kommentar||"").trim()});
async function save(){
  if(!F.dato)return showErr("fErr",{message:"Velg en dato."});
  if(!num(F.km)&&!F.kommentar.trim())return showErr("fErr",{message:"Skriv inn km eller en kommentar."});
  const body=toRow(F);
  const btn=document.getElementById("fSave");btn.disabled=true;
  try{
    ok(editing?await sb.from("okter").update(body).eq("id",editing.id):await sb.from("okter").insert(body));
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
  const key=s=>`${s.dato}|${typeOf(s.type)}|${num(s.km)}`;
  const have=new Set(S.sessions.map(key));
  const rows=list.filter(s=>s&&/^\d{4}-\d{2}-\d{2}$/.test(s.dato)&&!have.has(key(s))).map(toRow);
  if(rows.length)ok(await sb.from("okter").insert(rows));
  await refresh();
  return {added:rows.length,skipped:list.length-rows.length};
}

function bind(){
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

render();
if(sb){
  sb.auth.onAuthStateChange((event,session)=>{
    const was=S.user?.id;S.user=session?.user||null;S.authReady=true;
    if(!S.user){S.sessions=[];S.loaded=false;render();return}
    if(was!==S.user.id){S.loaded=false;render();setTimeout(refresh,0)}
  });
}

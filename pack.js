// Kløvtreningsplan etter OMTK-modellen (Eilin Bergum, «OMTK Kløvtrening», 2025).
// pct = vekt i kløven i prosent av hundens kroppsvekt. km = total distanse den uka, fordelt over flere turer.
// badge = merke som kan tas den uka. rest = hvile- eller lett uke.
window.PACK_INTRO = [
  "Hunden må være fysisk moden før du starter, altså ferdig utvokst i skjelett og muskulatur. Det er vanligvis i alderen 18–24 måneder.",
  "Start med tom kløv, så hunden blir vant til utstyret og bevegelsen. Fyll den med noe lett, som bobleplast eller håndklær, så den sitter stabilt.",
  "Tenk på det som et styrkeprogram: dette tar måneder, ikke uker. Øk alltid sakte, og tilpass til hundens fysikk og erfaring.",
];
window.PACK_RULE = "Gå aldri lenger på én dag med en vekt enn du har gått til sammen på en uke. Skal du gå 15 km på én dag, bør hunden ha gått 15 km med den vekten til sammen i løpet av en uke først.";
window.PACK_PREP = "Før uke 1: Øk fra 0 til 10 % over minst 3 uker etter at hunden er 18 måneder.";
window.PACK_PLAN = [
  {pct:10, km:10, ex:"5 km + 5 km", note:"Start med å dele opp i flere korte turer."},
  {pct:10, km:15, ex:"10 km + 5 km"},
  {pct:10, km:20, ex:"5 km + 15 km", note:"Behold samme vekt, legg på distanse."},
  {pct:15, km:10, ex:"3–4 km + 5 km", note:"Øk vekten til 15 %, men gå ned i distanse."},
  {pct:15, km:10, ex:"5 km + 5 km", badge:"Bronse", badgeText:"15 % i 10 km sammenhengende på én dag",
   note:"Ser hunden ut til å bære vekten uten problemer, kan dere prøve bronsemerket nå. Se på ryggen når den bærer: blir den svai, sitter kløven feil eller er for tung. Kløven skal sitte godt oppe på skuldrene, og hunden skal bruke magemusklene til å dytte imot."},
  {pct:15, km:10, ex:"10 km"},
  {pct:15, km:15, ex:"5 km × 3 eller 10 km + 5 km", note:"Fortsett med samme vekt litt til, og øk distansen."},
  {pct:15, km:20, ex:"10 km × 2"},
  {pct:20, km:10, ex:"5 km × 2", note:"Øk vekten til 20 %, og gå ned i distanse."},
  {pct:20, km:15, ex:"10 km + 5 km"},
  {pct:20, km:20, ex:"10 km + 10 km", note:"Kan du, test 20 km sammenhengende. Hvis ikke, ta 10 km delt på to."},
  {pct:25, km:10, ex:"5 km + 5 km", note:"Øk vekten til 25 %. Dette er tungt for de fleste hunder. Legg inn litt hvile rett før dere tar merket."},
  {pct:25, km:10, ex:"5 km + 10 km"},
  {pct:25, km:15, ex:"15 km sammenhengende", badge:"Sølv", badgeText:"25 % i 15 km sammenhengende på én dag",
   note:"Nå kan dere prøve sølvmerket. Gi hunden god hvile etterpå."},
  {pct:0, km:0, ex:"Hvile", rest:true, note:"Hvile etter sølvmerket."},
  {pct:20, km:20, ex:"10 km + 10 km", note:"Vedlikehold med rundt 20 % i kløven en god stund før gullmerket."},
  {pct:20, km:25, ex:"15 km + 10 km"},
  {pct:0, km:0, ex:"Hvile eller lett, kort tur", rest:true},
  {pct:20, km:30, ex:"20 km + 10 km"},
];
window.PACK_GOLD = {badge:"Gull", text:"25 % i 20 km sammenhengende, over to dager (40 km totalt)",
  note:"Klarte hunden sølvmerket godt og bærer vekten fint, kan dere prøve gull neste sesong. 25 % av kroppsvekten er veldig tungt for de fleste hunder, så hold deg rundt 20 % når dere trener videre etter merket."};

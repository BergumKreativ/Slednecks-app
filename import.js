// Import av tidligere trening fra andre apper uten innlogging der: activities.csv fra Strava-arkivet
// og GPX-filer fra Strava, Garmin, Suunto, Polar og andre. Brukeren går gjennom og velger type og hund før lagring.
window.IMPORT = (() => {
  // CSV med anførselstegn, komma og linjeskift inne i felt
  function parseCsv(text) {
    const rows = [];
    let row = [], f = "", q = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (q) {
        if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
        else f += c;
      } else if (c === '"') q = true;
      else if (c === ",") { row.push(f); f = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(f); f = ""; rows.push(row); row = [];
      } else f += c;
    }
    if (f || row.length) { row.push(f); rows.push(row); }
    return rows.filter(r => r.some(x => x.trim()));
  }

  const num = v => { const n = parseFloat(String(v || "").replace(/\s/g, "").replace(",", ".")); return isFinite(n) ? n : 0; };
  const MONTHS = { jan: 0, feb: 1, mar: 2, apr: 3, mai: 4, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, des: 11, dec: 11 };
  // Strava skriver datoen i UTC, for eksempel «Jan 5, 2024, 7:12:33 AM» eller «5. jan. 2024, 07:12:33»
  function parseDate(s) {
    s = String(s || "").trim();
    let m = s.match(/^([A-Za-z]{3})[a-z]*\.? (\d{1,2}), (\d{4}),? (\d{1,2}):(\d{2}):(\d{2}) ?([AP]M)?/i);
    let y, mo, d, h, mi, se;
    if (m) { mo = MONTHS[m[1].toLowerCase()]; d = +m[2]; y = +m[3]; h = +m[4]; mi = +m[5]; se = +m[6]; if (m[7]) h = (h % 12) + (/pm/i.test(m[7]) ? 12 : 0); }
    else if ((m = s.match(/^(\d{1,2})\.? ([a-zæøå]{3})[a-zæøå]*\.? (\d{4}),? (\d{1,2})[:.](\d{2})[:.](\d{2})/i))) { d = +m[1]; mo = MONTHS[m[2].toLowerCase()]; y = +m[3]; h = +m[4]; mi = +m[5]; se = +m[6]; }
    else if ((m = s.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/))) { y = +m[1]; mo = +m[2] - 1; d = +m[3]; h = +m[4]; mi = +m[5]; se = +m[6]; }
    if (mo == null || !y) { const t = Date.parse(s); return isNaN(t) ? null : new Date(t); }
    return new Date(Date.UTC(y, mo, d, h, mi, se));
  }

  // activities.csv fra Strava-arkivet. Noen kolonner finnes to ganger; den siste er i meter og sekunder.
  function readCsv(text) {
    const rows = parseCsv(text.replace(/^﻿/, ""));
    if (rows.length < 2) throw new Error("Fant ingen aktiviteter i fila.");
    const head = rows[0].map(h => h.trim().toLowerCase());
    const all = n => head.reduce((a, h, i) => (h === n ? a.concat(i) : a), []);
    const one = (...names) => { for (const n of names) { const i = all(n); if (i.length) return i; } return []; };
    const iDate = one("activity date", "aktivitetsdato")[0], iName = one("activity name", "aktivitetsnavn")[0],
      iType = one("activity type", "aktivitetstype")[0], iDesc = one("activity description", "aktivitetsbeskrivelse")[0],
      iDist = one("distance", "distanse"), iMove = one("moving time", "bevegelsestid")[0], iElap = one("elapsed time", "medgått tid"),
      iGain = one("elevation gain", "høydestigning")[0], iFile = one("filename", "filnavn")[0];
    if (iDate == null || !iDist.length) throw new Error("Dette ser ikke ut som activities.csv fra Strava.");
    return rows.slice(1).map(r => {
      const start = parseDate(r[iDate]);
      // To distansekolonner: den første i km, den siste i meter. Bare én: km.
      const km = iDist.length > 1 ? num(r[iDist[iDist.length - 1]]) / 1000 || num(r[iDist[0]]) : num(r[iDist[0]]);
      const sec = num(r[iMove]) || num(r[iElap[iElap.length - 1]]);
      return {
        start, km, hm: Math.round(num(r[iGain])), min: Math.round(sec / 60),
        name: (r[iName] || "").trim(), desc: (r[iDesc] || "").trim(), stype: (r[iType] || "").trim(),
        file: iFile != null ? (r[iFile] || "").split("/").pop().replace(/\.gz$/i, "") : "", route: null, src: "strava",
      };
    }).filter(a => a.start && (a.km > 0 || a.min > 0));
  }

  // GPX fra «Eksporter GPX» i Strava, Garmin Connect, Suunto, Polar og andre
  function readGpx(text, file) {
    const g = GPX.parse(text);
    if (!g.start) throw new Error("Fila mangler tidspunkt.");
    const doc = new DOMParser().parseFromString(text, "application/xml");
    const t = doc.querySelector("trk > type"), creator = (doc.documentElement.getAttribute("creator") || "").toLowerCase();
    return { start: g.start, km: g.km, hm: g.hm, min: g.min, name: g.name, desc: "", stype: t ? t.textContent.trim() : "", file, route: g.route, src: /strava/.test(creator) ? "strava" : "gpx" };
  }

  async function text(file) {
    if (/\.gz$/i.test(file.name)) {
      if (!window.DecompressionStream) throw new Error("Nettleseren kan ikke pakke ut .gz-filer. Pakk dem ut først.");
      return await new Response(file.stream().pipeThrough(new DecompressionStream("gzip"))).text();
    }
    return await file.text();
  }

  // Leser alle valgte filer. En GPX-fil som hører til en linje i activities.csv, gir ruta til den aktiviteten.
  async function readFiles(files) {
    let list = [], skipped = 0;
    const gpx = [];
    for (const f of files) {
      const n = f.name.toLowerCase().replace(/\.gz$/, "");
      try {
        if (n.endsWith(".csv")) list = list.concat(readCsv(await text(f)));
        else if (n.endsWith(".gpx")) gpx.push(readGpx(await text(f), f.name.replace(/\.gz$/i, "")));
        else skipped++;
      } catch (e) { if (files.length === 1) throw e; skipped++; }
    }
    for (const g of gpx) {
      const hit = list.find(a => a.file && a.file === g.file);
      if (hit) hit.route = g.route;
      else list.push(g);
    }
    list.sort((a, b) => b.start - a.start);
    return { list, skipped };
  }

  // Gjetter hvem som trente og hvilken type, ut fra aktivitetstypen og ord i navn og beskrivelse
  const DOG_WORDS = /(hund|dog|canicross|bikejør|sykkeljør|sykkelkjør|skijør|snørekjør|kløv|spann|pulk|slede|mush)/i;
  function guess(a, dogs) {
    const t = a.stype.toLowerCase(), txt = `${a.name} ${a.desc}`;
    const esc = d => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const withDog = DOG_WORDS.test(txt) || dogs.some(d => d && new RegExp(`(^|[^\\p{L}])${esc(d)}($|[^\\p{L}])`, "iu").test(txt));
    const is = (...w) => w.some(x => t.includes(x) || (!t && txt.toLowerCase().includes(x)));
    if (withDog) {
      if (/kløv/i.test(txt)) return ["hund", "Kløvtur"];
      if (/pulk/i.test(txt)) return ["hund", "Pulk"];
      if (/slede|spann/i.test(txt)) return ["hund", "Hundekjøring"];
      if (/sparkesykkel|kick/i.test(txt + t)) return ["hund", "Sparkesykkel"];
      if (is("ride", "bike", "sykkel", "cycling", "sykling", "biking")) return ["hund", "Sykkeljøring"];
      if (is("ski")) return ["hund", "Skijøring"];
      if (is("run", "løp")) return ["hund", "Canicross"];
      return ["hund", "Gåtur"];
    }
    if (is("run", "løp")) return ["meg", "Løping"];
    if (is("walk", "hike", "hiking", "gå", "fjell")) return ["meg", "Fjelltur / gåtur"];
    if (is("ride", "bike", "sykkel", "cycling", "sykling", "biking")) return ["meg", "Sykkel"];
    if (is("ski")) return ["meg", "Ski"];
    if (is("swim", "svøm")) return ["meg", "Svømming"];
    if (is("yoga", "pilates", "stretch")) return ["meg", "Mobilitet / yoga"];
    if (is("weight", "workout", "crossfit", "styrke", "strength")) return ["meg", "Styrke"];
    return ["meg", "Annet"];
  }

  return { readFiles, readCsv, parseDate, guess };
})();

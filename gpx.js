// GPX-import: leser spor fra klokke- og turapper, regner ut distanse, høydemeter og tid,
// og forenkler ruta (Douglas–Peucker) så den er liten nok til å lagres på økta.
window.GPX = (() => {
  const R = 6371000, rad = d => d * Math.PI / 180;
  const dist = (a, b) => {
    const dLat = rad(b[0] - a[0]), dLon = rad(b[1] - a[1]);
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[0])) * Math.cos(rad(b[0])) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  function parse(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw new Error("Fila kunne ikke leses som GPX.");
    let nodes = [...doc.getElementsByTagName("trkpt")];
    if (!nodes.length) nodes = [...doc.getElementsByTagName("rtept")];
    const pts = nodes.map(p => {
      const e = p.getElementsByTagName("ele")[0], t = p.getElementsByTagName("time")[0];
      return { lat: +p.getAttribute("lat"), lon: +p.getAttribute("lon"), ele: e ? +e.textContent : null, time: t ? new Date(t.textContent) : null };
    }).filter(p => isFinite(p.lat) && isFinite(p.lon));
    if (pts.length < 2) throw new Error("Fant ingen rute i fila.");

    let m = 0;
    for (let i = 1; i < pts.length; i++) m += dist([pts[i - 1].lat, pts[i - 1].lon], [pts[i].lat, pts[i].lon]);

    // Høydemeter: glatter høyden (glidende snitt over 9 punkter) og bruker 3 m terskel,
    // så GPS-støy ikke teller som stigning
    const eles = pts.map(p => p.ele).filter(e => e != null && isFinite(e));
    const smooth = eles.map((_, i) => { const w = eles.slice(Math.max(0, i - 4), i + 5); return w.reduce((a, b) => a + b, 0) / w.length; });
    let gain = 0, ref = null;
    for (const e of smooth) {
      if (ref == null) { ref = e; continue; }
      if (e - ref >= 3) { gain += e - ref; ref = e; }
      else if (ref - e >= 3) ref = e;
    }

    const timed = pts.filter(p => p.time && !isNaN(p.time));
    const start = timed.length ? timed[0].time : null, end = timed.length ? timed[timed.length - 1].time : null;
    const nameEl = doc.querySelector("trk > name") || doc.querySelector("metadata > name");
    const route = pts.map(p => [+p.lat.toFixed(5), +p.lon.toFixed(5), p.ele != null && isFinite(p.ele) ? Math.round(p.ele) : null]);
    return {
      km: m / 1000,
      hm: Math.round(gain),
      min: start && end ? Math.round((end - start) / 60000) : 0,
      start,
      name: nameEl ? nameEl.textContent.trim() : "",
      route: simplify(route, 500),
    };
  }

  // Forenkler til maks n punkter ved å øke toleransen (meter) til ruta er liten nok
  function simplify(pts, n) {
    if (pts.length <= n) return pts;
    let tol = 2, out = pts;
    while (out.length > n) { out = dp(pts, tol); tol *= 1.6; }
    return out;
  }
  function dp(pts, tol) {
    const c = Math.cos(rad(pts[0][0])), X = p => [p[1] * c * 111320, p[0] * 110540];
    const keep = new Uint8Array(pts.length);
    keep[0] = keep[pts.length - 1] = 1;
    const stack = [[0, pts.length - 1]];
    while (stack.length) {
      const [a, b] = stack.pop(), A = X(pts[a]), B = X(pts[b]);
      let md = 0, mi = -1;
      for (let i = a + 1; i < b; i++) { const d = segDist(X(pts[i]), A, B); if (d > md) { md = d; mi = i; } }
      if (md > tol && mi > 0) { keep[mi] = 1; stack.push([a, mi], [mi, b]); }
    }
    return pts.filter((_, i) => keep[i]);
  }
  function segDist(p, a, b) {
    const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy;
    let t = l ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l : 0;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
  }

  // Leser punkter med tid fra GPX (trkpt/rtept/wpt) eller KML (gx:Track eller Placemark med TimeStamp)
  function readPoints(text) {
    const doc = new DOMParser().parseFromString(text, "application/xml");
    if (doc.getElementsByTagName("parsererror").length) throw new Error("Fila kunne ikke leses. Bruk GPX eller KML.");
    let pts = [];
    for (const tag of ["trkpt", "rtept", "wpt"]) {
      for (const p of doc.getElementsByTagName(tag)) {
        const e = p.getElementsByTagName("ele")[0], t = p.getElementsByTagName("time")[0];
        pts.push({ lat: +p.getAttribute("lat"), lon: +p.getAttribute("lon"), ele: e ? +e.textContent : null, time: t ? new Date(t.textContent) : null });
      }
      if (pts.length) break;
    }
    if (!pts.length) {
      for (const tr of doc.getElementsByTagName("gx:Track")) {
        const whens = [...tr.getElementsByTagName("when")], coords = [...tr.getElementsByTagName("gx:coord")];
        coords.forEach((c, i) => { const [lon, lat, ele] = c.textContent.trim().split(/\s+/).map(Number); pts.push({ lat, lon, ele: isFinite(ele) ? ele : null, time: whens[i] ? new Date(whens[i].textContent) : null }); });
      }
      for (const pm of doc.getElementsByTagName("Placemark")) {
        const w = pm.getElementsByTagName("when")[0], pt = pm.getElementsByTagName("Point")[0];
        if (!w || !pt) continue;
        const [lon, lat, ele] = (pt.getElementsByTagName("coordinates")[0] || {}).textContent.trim().split(",").map(Number);
        pts.push({ lat, lon, ele: isFinite(ele) ? ele : null, time: new Date(w.textContent) });
      }
    }
    pts = pts.filter(p => isFinite(p.lat) && isFinite(p.lon) && p.time && !isNaN(p.time)).sort((a, b) => a.time - b.time);
    if (pts.length < 2) throw new Error("Fant ingen punkter med tidspunkt i fila.");
    return pts;
  }

  // Deler en lang posisjonshistorikk (f.eks. fra Tractive) i turer ved pauser.
  // Små hopp under 15 m teller ikke, så GPS-støy mens hunden ligger stille ikke blir til kilometer.
  function splitTrips(pts, opt = {}) {
    const gapMs = (opt.gapMin || 20) * 60000, minKm = opt.minKm ?? 0.5, stillM = 15;
    const groups = []; let cur = [pts[0]], last = pts[0];
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i], d = dist([last.lat, last.lon], [p.lat, p.lon]);
      if (p.time - last.time > gapMs && d < 300 || p.time - last.time > gapMs * 6) { groups.push(cur); cur = [p]; last = p; continue; }
      if (d >= stillM) { cur.push(p); last = p; }
      else if (p.time - last.time > gapMs) { groups.push(cur); cur = [p]; last = p; }
    }
    groups.push(cur);
    return groups.map(g => {
      let m = 0; for (let i = 1; i < g.length; i++) m += dist([g[i - 1].lat, g[i - 1].lon], [g[i].lat, g[i].lon]);
      const eles = g.map(p => p.ele).filter(e => e != null && isFinite(e));
      let gain = 0, ref = null;
      for (let i = 0; i < eles.length; i++) { const w = eles.slice(Math.max(0, i - 2), i + 3), e = w.reduce((a, b) => a + b, 0) / w.length; if (ref == null) ref = e; else if (e - ref >= 3) { gain += e - ref; ref = e; } else if (ref - e >= 3) ref = e; }
      const min = Math.round((g[g.length - 1].time - g[0].time) / 60000);
      return { start: g[0].time, end: g[g.length - 1].time, km: m / 1000, hm: Math.round(gain), min, kmh: min ? m / 1000 / (min / 60) : 0,
        route: simplify(g.map(p => [+p.lat.toFixed(5), +p.lon.toFixed(5), p.ele != null && isFinite(p.ele) ? Math.round(p.ele) : null]), 400) };
    }).filter(t => t.km >= minKm && t.min >= 5);
  }

  return { parse, readPoints, splitTrips };
})();

// Eksempeldata for demomodus (window.APP_DEMO). Datoene regnes ut fra i dag, så demoen alltid ser fersk ut.
(() => {
  const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const day = n => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() - n); return iso(d); };
  const id = (() => { let i = 0; return () => "demo" + (++i); })();
  const s = (n, type, km, hm, min, hunder, extra = {}) => ({ id: id(), dato: day(n), type, km, hm, min, hunder, motivasjon: {}, kommentar: "", kategori: "hund", ...extra });
  const me = (n, type, km, hm, min, rpe, extra = {}) => ({ id: id(), dato: day(n), type, km, hm, min, hunder: [], motivasjon: {}, kommentar: "", kategori: "meg", rpe, kropp: 2, ...extra });
  const sessions = [
    s(1, "Sykkeljøring", 18.8, 140, 62, ["Saga", "Timi"], { motivasjon: { Saga: 3, Timi: 3 }, kommentar: "Fast grus, glade hunder", temp: 7, rh: 82 }),
    s(2, "Canicross", 8.2, 160, 48, ["Saga"], { motivasjon: { Saga: 2 }, temp: 9, rh: 90 }),
    s(4, "Kløvtur", 9.5, 420, 150, ["Luna"], { last_kg: 3.5, kommentar: "Første tur med vekt" }),
    s(5, "Sykkeljøring", 22.4, 310, 80, ["Saga", "Timi"], { motivasjon: { Saga: 3, Timi: 2 }, temp: 11, rh: 70 }),
    s(7, "Gåtur", 6.0, 90, 75, ["Saga", "Timi", "Luna"]),
    s(8, "Sykkeljøring", 15.1, 120, 55, ["Saga", "Timi"], { motivasjon: { Saga: 3, Timi: 3 } }),
    s(10, "Kløvtrening", 5.0, 60, 70, ["Luna"], { last_kg: 3 }),
    s(11, "Vogn / ATV", 12.0, 80, 45, ["Saga", "Timi"]),
    s(13, "Sykkeljøring", 25.2, 400, 95, ["Saga", "Timi"], { motivasjon: { Saga: 3, Timi: 2 }, kommentar: "Langtur med snacks hver time" }),
    s(15, "Canicross", 7.5, 110, 44, ["Saga"]),
    s(17, "Sykkeljøring", 14.0, 100, 52, ["Saga", "Timi"]),
    s(19, "Gåtur", 8.0, 250, 110, ["Luna"]),
    s(20, "Sykkeljøring", 20.3, 280, 76, ["Saga", "Timi"], { motivasjon: { Saga: 2, Timi: 3 } }),
    s(23, "Canicross", 6.8, 90, 40, ["Saga"]),
    s(25, "Sykkeljøring", 12.5, 90, 46, ["Saga", "Timi"]),
    s(27, "Sykkeljøring", 18.0, 220, 68, ["Saga", "Timi"]),
    s(30, "Gåtur", 5.5, 60, 60, ["Saga", "Timi", "Luna"]),
    s(32, "Sykkeljøring", 10.0, 80, 40, ["Saga", "Timi"]),
    me(3, "Styrke", 0, 0, 45, 6),
    me(6, "Fjelltur / gåtur", 11.2, 780, 210, 6, { last_kg: 8, kommentar: "Gaustatoppen" }),
    me(9, "Løping", 7.0, 90, 41, 7),
    me(14, "Styrke", 0, 0, 40, 5),
    me(16, "Fjelltur / gåtur", 9.0, 600, 170, 5, { last_kg: 6 }),
    me(21, "Løping", 6.2, 60, 36, 6),
  ];
  window.DEMO_DATA = {
    profile: {
      raceDate: "2027-01-09", raceName: "MUSH Synnfjell 2027 – Synnfjell Rundt", raceKm: 50, raceHm: 1900,
      raceId: "synnfjell-2027|Synnfjell Rundt", raceType: "slede-md|6-spann (MD6)", planType: "", planCustom: {},
      lisens: "aars:2026", nickname: "Demo", cover: "",
      dogs: ["Saga", "Timi", "Luna"],
      dogInfo: {
        Saga: { born: "2020-04-02", sex: "Tispe", breed: "Alaskan husky", chip: "578077000123456", chipDate: "2020-06-10",
          weights: [{ id: "w1", d: day(60), kg: 23.1, bcs: 5 }, { id: "w2", d: day(30), kg: 22.6, bcs: 5 }, { id: "w3", d: day(3), kg: 22.4, bcs: 4 }],
          vaccines: [{ id: "v1", type: "DHP", d: "2024-03-01", until: "2027-03-01" }, { id: "v2", type: "KH", d: "2025-11-20", until: "2026-11-20" }],
          activity: "aktiv", feedId: "labb-ekstrem", mix: [{ id: "vom-active-original", share: 25 }], water: 3, tolerance: "normal" },
        Timi: { born: "2021-08-15", sex: "Hannhund", breed: "Alaskan husky", chip: "578077000654321",
          weights: [{ id: "w4", d: day(30), kg: 26.0, bcs: 5 }, { id: "w5", d: day(2), kg: 25.6, bcs: 5 }],
          vaccines: [{ id: "v3", type: "DHP", d: "2025-02-10", until: "2028-02-10" }],
          activity: "aktiv", feedId: "appetitt-energy" },
        Luna: { born: "2024-09-01", sex: "Tispe", breed: "Grønlandshund",
          weights: [{ id: "w6", d: day(10), kg: 30.0, bcs: 5 }],
          vaccines: [{ id: "v4", type: "DHP", d: "2025-09-15", until: "2028-09-15" }],
          activity: "normal", packStart: day(11), tolerance: "lav" },
      },
      myGoals: [{ id: "g1", name: "Galdhøpiggen med 12 kg sekk", type: "Fjelltur / gåtur", km: 15, hm: 1300, kg: 12, date: "2027-07-15" }],
    },
    sessions,
    reports: [
      { id: "r1", user_id: "andre", created_at: new Date(Date.now() - 3 * 36e5).toISOString(), lat: 61.12, lon: 10.47, sted: "Nordseter", loype: "Hundeløype", fore: "Pakket", kjort: true, tekst: "Fint spor etter nattens snø", navn: "Kari" },
      { id: "r2", user_id: "andre", created_at: new Date(Date.now() - 30 * 36e5).toISOString(), lat: 61.02, lon: 10.69, sted: "Sjusjøen", loype: "Skiløype", fore: "Skare", kjort: false, tekst: "", navn: "" },
    ],
  };
})();

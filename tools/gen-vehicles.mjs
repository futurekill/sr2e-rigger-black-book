// Generate Rigger Black Book vehicles (FASA 7108, SR1) as `vehicle` actors into
// packs-src/rbb-vehicles. SR1 stat block -> SR2 vehicle field (see docs/PLAN.md):
// handling = on-road (1st of on/off); speed = cruising (1st of cruise/max, which
// the system uses for tests) with max in notes; B/A -> body/armor; Sig ->
// signature; APilot -> pilot & autonav; Storage CF -> cargo; acceleration 0 (SR1
// has none). Render-verified. Vehicles already in the system `vehicles` pack /
// Rigger 2 are skipped. Re-run, then build-packs rbb-vehicles.
import { writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";

const DIR = "packs-src/rbb-vehicles";
mkdirSync(DIR, { recursive: true });
const idFor = (s) => createHash("sha1").update("rbb:" + s).digest("hex").slice(0, 16);

function vehicle(v) {
  const _id = idFor(v.name);
  return {
    _id, name: v.name, type: "vehicle", img: "icons/svg/explosion.svg",
    system: {
      vehicleType: v.vt ?? "ground", skill: v.skill ?? "car",
      handling: v.h, speed: v.s, acceleration: 0,
      body: v.b, armor: v.a, signature: v.sig, pilot: v.p, sensor: v.sensor ?? 0,
      cargo: v.cargo ?? 0, load: v.load ?? 0, seating: v.seating ?? "",
      cost: v.cost ?? 0, availability: v.avail ?? "",
      conditionMonitor: { value: 0, max: 10 }, autonav: v.p,
      notes: `<p>${v.desc}</p><p><em>Off-road handling ${v.hOff}. Max speed ${v.sMax} m/CT (cruising ${v.s} used for tests).${v.extra ? " " + v.extra : ""} Rigger Black Book p.${v.page}.</em></p>`
    },
    prototypeToken: {
      name: v.name, displayName: 20, actorLink: false, width: 2, height: 1,
      texture: { src: "icons/svg/explosion.svg", scaleX: 1, scaleY: 1 },
      disposition: 0, displayBars: 0
    },
    effects: [], folder: null, sort: 0, flags: {},
    _stats: { coreVersion: "13.351", systemId: "sr2e", systemVersion: "0.1.0", createdTime: 1782200000000, modifiedTime: 1782200000000, lastModifiedBy: null, compendiumSource: null, duplicateSource: null, exportSource: null },
    ownership: { default: 0 }, _key: `!actors!${_id}`
  };
}

// --- Civilian Cars (book p.8-15). Skipped (already in system): Mitsubishi
// Runabout, Chrysler-Nissan Jackrabbit, Ford Americar, Eurocar Westwind 2000,
// Mitsubishi Nightsky.
const VEHICLES = [
  { name: "Volkswagen Elektro", h: 3, hOff: 6, s: 20, sMax: 60, b: 1, a: 0, sig: 5, p: 0, cargo: 1, cost: 8000, seating: "Single bucket seat", page: 8,
    desc: "A low-slung, battery-powered three-wheel commuter (GridLink/SunCell optional) with a Kevlarplex canopy and underseat luggage space.", extra: "Electric, 200 PF; economy 2 PF/km." },
  { name: "Leyland-Zil Tsarina (Electric)", h: 4, hOff: 8, s: 25, sMax: 75, b: 1, a: 0, sig: 5, p: 1, cargo: 5, cost: 10000, seating: "1 + 1 bucket seats", page: 9,
    desc: "A roomy L-Z chassis car with an unusual front-high seating layout, full canopy and a rear-deck luggage rack.", extra: "Electric, 200 PF; 2 CF trunk + 3 CF roof rack." },
  { name: "Leyland-Zil Tsarina (Multifuel)", h: 4, hOff: 8, s: 30, sMax: 90, b: 1, a: 2, sig: 2, p: 1, cargo: 5, cost: 12000, seating: "1 + 1 bucket seats", page: 9,
    desc: "The multifuel version of the Tsarina — same body, a tougher hull and a longer-legged drivetrain.", extra: "Multifuel/25 liters; 90 km/liter; 2 CF trunk + 3 CF roof rack." },
  { name: "Honda-GM 3220 ZX", h: 4, hOff: 8, s: 40, sMax: 120, b: 2, a: 0, sig: 2, p: 1, cargo: 4, cost: 30000, seating: "Front/rear twin bucket seats", page: 12,
    desc: "The cheapest sports car on the road — targa top, mag wheels, high-speed suspension and exceptional road-holding.", extra: "IC/30 liters; 50 km/liter." },
  { name: "Honda-GM 3220 ZX Turbo", h: 4, hOff: 8, s: 50, sMax: 150, b: 2, a: 0, sig: 1, p: 1, cargo: 4, cost: 45000, seating: "Front/rear twin bucket seats", page: 12,
    desc: "The turbo-boosted 3220 ZX — the engine that won the NorAm Sports Car Circuit Gold Cup. A real handful at top speed.", extra: "IC/30 liters; 45 km/liter." },
  { name: "Saab \"Dynamit\" 776TI", h: 4, hOff: 8, s: 80, sMax: 250, b: 2, a: 1, sig: 1, p: 3, cargo: 4, cost: 250000, seating: "Twin bucket seats + bench", page: 13,
    desc: "A state-of-the-art turbocharged speedfreak's sports car — roll bars, improved suspension, APPS and a convertible top. Winner of the Euro-Rally Production Sports Circuit.", extra: "IC/150 liters; 40 km/liter; APPS, rollbars." },
  { name: "Toyota \"Elite\" Limousine", h: 4, hOff: 8, s: 40, sMax: 120, b: 3, a: 0, sig: 2, p: 4, cargo: 8, cost: 125000, seating: "Twin + quad rear bucket seats", page: 14,
    desc: "A mid-size limo with a Kevlarplex divider, EnviroSeal climate control, refrigerated wet bar and a mobile telecom system. The \"Hollywood Ford.\"", extra: "IC/300 liters; 18 km/liter; EnviroSeal." },
  { name: "Rolls Royce \"Phaeton\" Limousine", h: 4, hOff: 4, s: 60, sMax: 180, b: 5, a: 2, sig: 2, p: 4, cargo: 15, cost: 500000, seating: "Twin + 6 bucket + 3 folding seats", page: 15,
    desc: "The luxury vehicle for the 2050s: armored seating for six plus three jump seats, APPS, roll bars, full comm/stereo with satellite uplink and a wet bar.", extra: "IC/300 liters; 12 km/liter; EnviroSeal, active suspension." }
];

let n = 0;
for (const v of VEHICLES) {
  const safe = v.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(v.name)}.json`, JSON.stringify(vehicle(v), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicles`);

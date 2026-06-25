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
    desc: "The luxury vehicle for the 2050s: armored seating for six plus three jump seats, APPS, roll bars, full comm/stereo with satellite uplink and a wet bar.", extra: "IC/300 liters; 12 km/liter; EnviroSeal, active suspension." },

  // --- Motorcycles (book p.16-23). Skipped (already in system): Dodge Scoot,
  // Yamaha Rapier, Harley-Davidson Scorpion.
  { name: "Entertainment Systems Papoose", vt: "ground", skill: "bike", h: 3, hOff: 6, s: 30, sMax: 90, b: 1, a: 0, sig: 5, p: 0, cargo: 1, cost: 4000, seating: "1", page: 16,
    desc: "A recreational electric bike from a maker better known for racing bicycles — folds into a compact bundle for trunk or roof-rack storage.", extra: "Electric, 320 PF; 2 PF/km." },
  { name: "Entertainment Systems Papoose Maximus", vt: "ground", skill: "bike", h: 3, hOff: 6, s: 30, sMax: 90, b: 2, a: 0, sig: 5, p: 0, cargo: 1, cost: 12000, seating: "1 + 1", page: 16,
    desc: "The larger Papoose Maximus — two seats, a tougher hull and an extended range.", extra: "Electric, 400 PF." },
  { name: "Suzuki \"Aurora\" Racing Bike", vt: "ground", skill: "bike", h: 2, hOff: 4, s: 70, sMax: 210, b: 1, a: 0, sig: 1, p: 1, cargo: 1, cost: 15000, seating: "1", page: 17,
    desc: "Winner of the Pan-Pacific Motorcycle Circuit — CompuaGlide-equipped racing bike with massively improved handling and performance.", extra: "IC/15 liters; 80 km/liter." },
  { name: "Hyundai Offroader", vt: "ground", skill: "bike", h: 4, hOff: 2, s: 60, sMax: 180, b: 2, a: 0, sig: 1, p: 1, cargo: 2, cost: 12500, seating: "1 + 1", page: 18,
    desc: "Purpose-built for the off-road market — the best rough-terrain handling of any bike, supplied under contract to the Sioux and Ute border patrols.", extra: "Multifuel/25 liters; 90 km/liter; off-road speed 55/165. Sidecar +1,500¥ (special option only)." },
  { name: "Thundercloud \"Pinto\" All-Terrain Trike", vt: "ground", skill: "bike", h: 4, hOff: 2, s: 20, sMax: 60, b: 3, a: 2, sig: 2, p: 0, cargo: 15, cost: 35000, seating: "Single bucket + 2 rear", page: 19,
    desc: "A durable all-terrain trike built by the Pueblo Corporate Council — balloon tires give limited amphibious capability, popular in the Far North.", extra: "IC/50 liters; 50 km/liter; off-road speed 35/105, amphibious 5/15. Enclosed canopy (Armor 1) +5,000¥." },
  { name: "GAZ-Niki White Eagle", vt: "ground", skill: "bike", h: 3, hOff: 3, s: 60, sMax: 180, b: 3, a: 0, sig: 1, p: 0, cargo: 0, cost: 15000, seating: "1 front + 1 rear", page: 20,
    desc: "The scout bike of the Polish Armed Forces — easy to maintain and durable, and able to mount an optimum number of light weapons.", extra: "Multifuel/35 liters; 6 km/liter. Options: bike trailer, SnowMaster snow kit (+5,000¥)." },
  { name: "BMW Blitzen 2050", vt: "ground", skill: "bike", h: 3, hOff: 4, s: 95, sMax: 285, b: 3, a: 2, sig: 1, p: 2, cargo: 4, cost: 25000, seating: "1 front + 1 rear", page: 22,
    desc: "The latest of the classic Blitzen high-performance combat bikes — armored with metallo-ceramic alloys for heavy-duty security work.", extra: "IC/35 liters; 35 km/liter. Above 210 kph handling becomes 4/5. Mounts 3 firepoints, or 2 + 1 hardpoint." },
  { name: "Honda \"Viking\" Supercycle", vt: "ground", skill: "bike", h: 3, hOff: 5, s: 50, sMax: 150, b: 4, a: 1, sig: 1, p: 2, cargo: 4, cost: 17000, seating: "1 front + 1 rear", page: 23,
    desc: "A supercycle with reinforced seating for troll-sized riders as standard, and extra-heavy construction that boosts durability and rider protection.", extra: "IC/35 liters; 30 km/liter." }
];

let n = 0;
for (const v of VEHICLES) {
  const safe = v.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(v.name)}.json`, JSON.stringify(vehicle(v), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicles`);

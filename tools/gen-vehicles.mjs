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
  // Off-road handling only applies to ground vehicles (on/off-road pair); ACVs,
  // boats and aircraft have a single handling value, so omit the note for them.
  const offRoad = (v.hOff != null && v.hOff !== v.h) ? `Off-road handling ${v.hOff}. ` : "";
  return {
    _id, name: v.name, type: "vehicle", img: "icons/svg/explosion.svg",
    system: {
      vehicleType: v.vt ?? "ground", skill: v.skill ?? "car",
      handling: v.h, speed: v.s, acceleration: 0,
      body: v.b, armor: v.a, signature: v.sig, pilot: v.p, sensor: v.sensor ?? 0,
      cargo: v.cargo ?? 0, load: v.load ?? 0, seating: v.seating ?? "",
      cost: v.cost ?? 0, availability: v.avail ?? "",
      conditionMonitor: { value: 0, max: 10 }, autonav: v.p,
      notes: `<p>${v.desc}</p><p><em>${offRoad}Max speed ${v.sMax} m/CT (cruising ${v.s} used for tests).${v.extra ? " " + v.extra : ""} Rigger Black Book p.${v.page}.</em></p>`
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
    desc: "A supercycle with reinforced seating for troll-sized riders as standard, and extra-heavy construction that boosts durability and rider protection.", extra: "IC/35 liters; 30 km/liter." },

  // --- Four-Wheel Drive (book p.24-27). No system dups in this section.
  { name: "Ford-Canada Bison", h: 4, hOff: 3, s: 45, sMax: 135, b: 5, a: 2, sig: 4, p: 3, cargo: 55, cost: 150000, seating: "Twin bucket + folding bench", page: 24,
    desc: "A working 4WD with room for passengers and cargo, off-road suspension and large balloon tires — the best-selling vehicle in the Athabascan, Salish-Shidhe and Algonkian councils.", extra: "Multifuel/250 liters; 18 km/liter; off-road speed 35/105. 5 CF underseat + 50 CF rear. Enclosed rear-bay model 165,000¥." },
  { name: "Rolls Royce Prairie Cat", h: 2, hOff: 3, s: 40, sMax: 120, b: 3, a: 1, sig: 2, p: 3, cargo: 10, cost: 275000, seating: "2 + 2 bucket seats", page: 24,
    desc: "A luxury, amphibious 4WD with the Chevalier Hi-Speed Scout engine — APPS, heavy-duty leather, full comm/stereo with satellite uplink and a mini-bar.", extra: "Multifuel/75 liters; 30 km/liter; off-road speed 35/105; amphibious. APPS, roll bars." },
  { name: "GAZ-Willys Nomad", h: 3, hOff: 3, s: 30, sMax: 90, b: 3, a: 0, sig: 2, p: 2, cargo: 30, cost: 50000, seating: "Twin bucket + 2×2 folding bench", page: 25,
    desc: "A popular mid-size 4WD (General Purpose model) marrying Russian design simplicity with Western reliability — active suspension and roll bars standard.", extra: "Multifuel/90 liters; 45 km/liter; off-road speed 35/105. Variants: Rear Tray (35,000¥), King Cab (40,000¥)." },
  { name: "Nissan-Holden Brumby", h: 4, hOff: 3, s: 30, sMax: 90, b: 2, a: 0, sig: 2, p: 2, cargo: 10, cost: 25000, seating: "2 bucket + 2 folding bench", page: 26,
    desc: "An Australian import — a smaller-than-usual 4WD with off-road suspension, at home in the wooded backwoods.", extra: "Multifuel/50 liters; 75 km/liter; off-road speed 25/75." },
  { name: "Landrover Model 2046 (Short Wheelbase)", h: 3, hOff: 3, s: 30, sMax: 90, b: 2, a: 0, sig: 2, p: 1, cargo: 25, cost: 35000, seating: "Twin bucket + 4 folding bench", page: 27,
    desc: "A general-purpose 4WD in the long Landrover tradition — improved and active suspension make rough, hilly terrain easy going.", extra: "Multifuel/50 liters; 75 km/liter; off-road speed 25/75." },
  { name: "Landrover Model 2046 (Long Wheelbase)", h: 3, hOff: 3, s: 30, sMax: 90, b: 3, a: 0, sig: 2, p: 1, cargo: 45, cost: 45000, seating: "Twin bucket + 6 folding bench", page: 27,
    desc: "The long-wheelbase Landrover 2046 — more seating and cargo, same rugged go-anywhere drivetrain.", extra: "Multifuel/75 liters; 80 km/liter; off-road speed 25/75." },

  // --- Light Trucks & Vans (book p.28-31). No system dups.
  { name: "Toyotacorp Gopher Pickup", h: 4, hOff: 4, s: 35, sMax: 105, b: 2, a: 0, sig: 2, p: 2, cargo: 60, cost: 25000, seating: "Twin bucket seats", page: 28,
    desc: "Classic pickup styling with integral roll bars, an optional power-take-off winch and a built-in gun safe.", extra: "IC/60 liters; 40 km/liter; off-road speed 30/90. Active suspension, roll bars." },
  { name: "Leyland-Rover Transport (Electric)", h: 4, hOff: 8, s: 25, sMax: 75, b: 3, a: 0, sig: 5, p: 2, cargo: 90, cost: 40000, seating: "Single + 1 folding bench (Enclosed-Box cab)", page: 29,
    desc: "A medium-size delivery van, electric chassis — built around a common base that accepts several body types. Shown with the Enclosed-Box cab.", extra: "Electric, 200 PF; 2 PF/km. Cabs: Minibus (+20,000¥), Enclosed-Box (+15,000¥, 90 CF), Open-Tray (+10,000¥). Chassis 25,000¥." },
  { name: "Leyland-Rover Transport (Internal Combustion)", h: 4, hOff: 8, s: 35, sMax: 105, b: 3, a: 0, sig: 2, p: 2, cargo: 90, cost: 45000, seating: "Single + 1 folding bench (Enclosed-Box cab)", page: 29,
    desc: "The internal-combustion Leyland-Rover Transport van — same body options, longer legs. Shown with the Enclosed-Box cab.", extra: "IC/120 liters; 25 km/liter. Cabs: Minibus (+20,000¥), Enclosed-Box (+15,000¥, 90 CF), Open-Tray (+10,000¥). Chassis 30,000¥." },
  { name: "Renault-Fiat Eurovan", h: 4, hOff: 10, s: 35, sMax: 105, b: 3, a: 0, sig: 2, p: 1, cargo: 20, cost: 25000, seating: "Twin bucket seats", page: 30,
    desc: "Renault-Fiat's automated-plant van — classic European styling, independent cab and a wide range of rear-chassis bodies.", extra: "IC/50 liters; 25 km/liter. Bodies: Camper-van (+25,000¥), Enclosed-Cargo (+18,000¥, 100 CF), Rear-Tray (+15,000¥, 150 CF)." },
  { name: "Volkswagen Superkombi III (Enclosed-Van)", h: 4, hOff: 8, s: 35, sMax: 105, b: 4, a: 1, sig: 2, p: 3, cargo: 150, cost: 45000, seating: "Single bucket + 2 folding bench", page: 31,
    desc: "The latest of VW's popular imported van line — reliable and rugged. Shown as the Enclosed-Van; other bodies are available.", extra: "IC/120 liters; 18 km/liter. Models: Commuter (55,000¥), RV (90,000¥), Flatbed (200 CF, 37,000¥), Pickup (120 CF, 40,000¥)." },

  // --- Heavy Trucks (book p.32-36). Ares Master security variants (Citymaster/
  // Mobmaster) are already in the system; the Roadmaster cargo variant is new.
  { name: "Ares Roadmaster", h: 4, hOff: 10, s: 30, sMax: 90, b: 4, a: 0, sig: 2, p: 2, cargo: 500, cost: 45000, seating: "Twin bucket + 1 folding bench", page: 32,
    desc: "The medium-cargo variant of the Ares Master series — interchangeable body types make it a sensible buy for cost-conscious corps and governments.", extra: "IC/500 liters; 15 km/liter; standard load 500 CF. Bodies: Rear-Tray (1,000 CF, +25,000¥), Van (1,000 CF, +80,000¥), Tanker (25 kl, +80,000¥)." },
  { name: "GMC Bulldog Step-Van (Multifuel)", h: 4, hOff: 8, s: 35, sMax: 85, b: 4, a: 1, sig: 2, p: 2, cargo: 200, cost: 35000, seating: "Single bucket + 1 folding bench", page: 33,
    desc: "A standard, reliable delivery truck found in most North American sprawls — UCAS Express and Parcel Service use them.", extra: "Multifuel/150 liters; 16 km/liter." },
  { name: "GMC Bulldog Step-Van (Bonded-Courier)", h: 4, hOff: 6, s: 35, sMax: 105, b: 4, a: 2, sig: 2, p: 2, cargo: 200, cost: 60000, seating: "Single bucket + 1 folding bench", page: 33,
    desc: "The Bonded-Courier Bulldog — off-road suspension, runflat dual-purpose tires and turbocharging as standard. Popular with independent couriers.", extra: "Multifuel/150 liters; 14 km/liter; off-road speed 30/80." },
  { name: "GMC 4201 Series", h: 3, hOff: 6, s: 35, sMax: 85, b: 5, a: 1, sig: 2, p: 2, cargo: 750, cost: 75000, seating: "Twin bucket + 1 folding bench", page: 34,
    desc: "A classic heavy truck — the \"Mechanical Mule\" — that has kept industry and commerce supplied through war and revolution.", extra: "Multifuel/750 liters; 12 km/liter; standard load 750 CF. Bodies: Rear-Tray (+38,000¥), Van (1,000 CF, +120,000¥), Tanker (37.5 kl, +100,000¥), SURT Citycoach bus (+125,000¥)." },
  { name: "Conestoga Trailblazer Prime Mover", h: 4, hOff: 8, s: 30, sMax: 90, b: 5, a: 0, sig: 2, p: 2, cargo: 1000, cost: 150000, seating: "Twin bucket + 1 folding bench", page: 35,
    desc: "The most reliable tractor on the market — built to a price but dependable, with a twin-bunk sleeper mini-cab for long hauls.", extra: "IC/750 liters; 8 km/liter; standard load 1,000 CF." },
  { name: "Nordkapp-Conestoga \"Bergen\" (Command Module)", h: 3, hOff: 6, s: 30, sMax: 90, b: 6, a: 2, sig: 3, p: 4, cargo: 5, cost: 600000, seating: "2×2 twin bucket seats", page: 36,
    desc: "The command module of the Bergen articulated \"road train\" (N-CAV concept), built for railless wilderness — can chain to up to five self-powered cargo modules.", extra: "Multifuel/2,000 liters; 4 km/liter. Command module can mount a turret/weapons; +1 Handling above the rated speed." },
  { name: "Nordkapp-Conestoga \"Bergen\" (Cargo Module)", h: 3, hOff: 6, s: 30, sMax: 90, b: 5, a: 0, sig: 2, p: 2, cargo: 1000, cost: 200000, seating: "2 bucket seats", page: 36,
    desc: "A self-powered cargo module for the Bergen road train — 500-CF and 1,000-CF versions chain behind the command module to make a single train.", extra: "Multifuel/2,000 liters. 1,000 CF cargo module shown; 500-CF version also available." },

  // --- Air-Cushion Vehicles (book p.37-40). Skipped (in system): Chrysler-Nissan
  // G12A. Single handling value (no off-road).
  { name: "Mostrans \"Ivan the Terrible\" KVP-14T", vt: "hovercraft", skill: "hovercraft", h: 4, s: 60, sMax: 180, b: 4, a: 0, sig: 3, p: 1, cargo: 20, cost: 250000, seating: "Twin bucket seats", page: 38,
    desc: "A light utility ACV from MosTrans of Moscow, built for severe winter weather and popular across Eastern Europe — a watertight boat-hull model is available.", extra: "Multifuel/250 liters; 2 km/liter. Modules: Passenger (9 seats, +20,000¥), Cargo (500 CF)." },
  { name: "GMC-Beachcraft \"Vacationer\" ACV", vt: "hovercraft", skill: "hovercraft", h: 4, s: 35, sMax: 105, b: 4, a: 0, sig: 3, p: 3, cargo: 30, cost: 100000, seating: "2 + 4-6 bucket seats", page: 39,
    desc: "The most popular civilian ACV in North America — a recreational hovercraft on the Beachcraft Patroller chassis with built-in camping gear (bunks, mini-kitchen, shower).", extra: "IC/250 liters; 2 km/liter. Boat-hull and winterized variants available." },
  { name: "GMC-Nissan Hovertruck", vt: "hovercraft", skill: "hovercraft", h: 4, s: 40, sMax: 120, b: 4, a: 0, sig: 5, p: 1, cargo: 500, cost: 100000, seating: "Twin bucket + 1 folding bench", page: 40,
    desc: "A decade-old cargo hauler for roadless terrain with a water-planing boat hull — popular in Africa and South America where rivers are the only \"highways.\"", extra: "Multifuel/500 liters; 2.5 km/liter. Rear flat accepts a standard 500-CF container." },

  // --- Marine Vehicles (book p.41-45). Skipped (in system): Samuvani-Criscraft
  // Otter, Aztechnology Nightrunner. vehicleType boat, single handling.
  { name: "Suzuki Watersport (Standard)", vt: "boat", skill: "boat", h: 2, s: 15, sMax: 45, b: 1, a: 0, sig: 3, p: 0, cargo: 0, cost: 1200, seating: "1", page: 41,
    desc: "The most popular water jet bike of the last decade — the 2051 standard model has improved handling and economy.", extra: "IC/10 liters; 15 km/liter." },
  { name: "Suzuki Watersport (Electric)", vt: "boat", skill: "boat", h: 2, s: 10, sMax: 30, b: 1, a: 0, sig: 5, p: 0, cargo: 0, cost: 1300, seating: "1", page: 41,
    desc: "The electric-drive Suzuki Watersport jet bike — quieter and lower-signature than the IC model.", extra: "Electric, 300 PF; 0.5 PF/km." },
  { name: "Zemlya-Poltava Swordsman", vt: "boat", skill: "boat", h: 4, s: 25, sMax: 75, b: 3, a: 0, sig: 3, p: 2, cargo: 40, cost: 30000, seating: "2 bucket + 6 folding bench", page: 42,
    desc: "A classic pleasure craft updated for the 2050s — a 7-meter, partially decked-in runabout with a sun shelter.", extra: "IC/75 liters; 25 km/liter. Optional EuroNav Poseidon outboards (speed 30/90) and electric drive." },
  { name: "Colorado Craft \"Cigarette\" Hydroconvertible", vt: "boat", skill: "boat", h: 4, s: 25, sMax: 75, b: 2, a: 0, sig: 3, p: 2, cargo: 10, cost: 35000, seating: "2 bucket seats", page: 43,
    desc: "A 6-meter convertible hydrofoil — cruise as a high-speed planing craft, then drop the foils at the flick of a switch for the open sea.", extra: "IC/50 liters; 25 km/liter. Foils down: Handling 8, speed 35/105, Sig 1, autopilot disabled, 12 km/liter." },
  { name: "Marine Technologies \"Dolphin II\" Motor Yacht", vt: "boat", skill: "boat", h: 3, s: 15, sMax: 45, b: 3, a: 0, sig: 3, p: 2, cargo: 10, cost: 50000, seating: "5 on deck + cabins", page: 44,
    desc: "A 10-meter state-of-the-art pleasure craft for the corp exec on the way up — lounge/kitchen below decks, a semi-enclosed bridge with flying bridge.", extra: "IC/100 liters; 35 km/liter." },
  { name: "Harland & Wolff \"Classique\" Motor Yacht", vt: "boat", skill: "boat", h: 5, s: 15, sMax: 45, b: 3, a: 0, sig: 2, p: 4, cargo: 25, cost: 3500000, seating: "12 passengers + crew", page: 45,
    desc: "The ultimate corp-exec status symbol — a 27-meter luxury yacht with individual cabins for twelve, full galley, owner's suite and a deckhouse with launch davits.", extra: "IC/2,500 liters; 30 km/liter." },

  // --- Aircraft (book p.46-51). Skipped (in system): Cessna C750, Lear-Cessna
  // Platinum I. vehicleType aircraft, single handling.
  { name: "Fiat-Fokker \"Cloud Nine\" Amphibian", vt: "aircraft", skill: "aircraft", h: 4, s: 300, sMax: 450, b: 3, a: 0, sig: 3, p: 2, cargo: 10, cost: 175000, seating: "Twin bucket + 6 bench", page: 47,
    desc: "A purpose-built reinforced-boat-hull amphibian — a classic European pleasure craft with STOL (water) / VSTOL (land) capability and a roomy cabin.", extra: "IC/250 liters; 3 km/liter. STOL (water), VSTOL (land)." },
  { name: "Embraer-Dassault Mistral", vt: "aircraft", skill: "aircraft", h: 4, s: 300, sMax: 450, b: 4, a: 0, sig: 3, p: 2, cargo: 10, cost: 375000, seating: "Twin bucket seats", page: 48,
    desc: "A twin-turboprop VSTOL monoplane serving civilian, security and military needs — enhanced rough-field performance and easy engine access.", extra: "IC/2,000 liters; 2 km/liter; VSTOL. Variants: Commuter (15 seats), Cargo (60 CF), Security (Sensor +2.5M¥), Military (hardpoints/missiles, speed 225/350, +25,000¥)." },
  { name: "Lear-Cessna Platinum II", vt: "aircraft", skill: "aircraft", h: 5, s: 800, sMax: 1600, b: 5, a: 1, sig: 3, p: 4, cargo: 5, cost: 1500000, seating: "Twin bucket seats", page: 50,
    desc: "A faster development of the Platinum I executive transport — twin rear-mounted turbofans for the exec in a hurry, STOL-capable.", extra: "IC/750 liters; 1.5 km/liter; STOL. Variants: Luxury/Standard Executive, Commuter (15 seats), Cargo." },
  { name: "Hawker-Siddley HS-895 Skytruck", vt: "aircraft", skill: "aircraft", h: 5, s: 400, sMax: 600, b: 5, a: 0, sig: 3, p: 2, cargo: 5, cost: 2500000, seating: "Twin bucket seats", page: 51,
    desc: "The 21st century's DC-3 — a rugged twin-turboprop VSTOL workhorse in worldwide use with airlines, police, security and paramilitary outfits.", extra: "IC/2,500 liters; 2.5 km/liter; VSTOL. Variants: Standard (40 bench), Commuter (36 seats), Cargo (10+100 CF), Amphibious." },

  // --- Rotorcraft (book p.52-56). Heavy overlap — skipped (in system):
  // Federated-Boeing Commuter, Hughes WK-2 Stallion, Ares Dragon, Hughes Airstar.
  { name: "Agusta-Cierva \"Plutocrat\" Rotorcraft", vt: "rotor", skill: "rotorcraft", h: 4, s: 200, sMax: 450, b: 4, a: 1, sig: 4, p: 4, cargo: 15, cost: 950000, seating: "Twin bucket + 6 bench", page: 56,
    desc: "A purpose-designed luxury transport chopper with real-leather upholstery, wood paneling and the finest onboard facilities — VTOL site-access for the corp exec.", extra: "IC/1,000 liters; 1.5 km/liter. Armed variant: chin turret (270° arc), 1 hardpoint + 1 firmpoint, speed 180/400, Armor 2, 1.25M¥." },

  // --- Lighter-Than-Air (book p.57-59). vehicleType aircraft (no LTA type).
  { name: "Luftschiffbau Zeppelin LZ-2049", vt: "aircraft", skill: "aircraft", h: 3, s: 100, sMax: 250, b: 12, a: 2, sig: 8, p: 3, cargo: 200, cost: 750000, seating: "2 + 2 bench", page: 57,
    desc: "The latest SHAPLL (Shaped Airfoil Positive Enhanced Lift) airship from Zeppelinwerke — a modular lifting-body craft, 26 m long with a 65 m wingspan.", extra: "LTA. IC/2,500 liters; 5 km/liter. Modules: passenger (32 seats), cargo (150 CF), assault (80 troops, +50,000¥)." },
  { name: "Goodyear Commuter-47 LTA", vt: "aircraft", skill: "aircraft", h: 3, s: 150, sMax: 300, b: 8, a: 1, sig: 8, p: 2, cargo: 75, cost: 225000, seating: "2 + 1 bench", page: 58,
    desc: "A small SHAPLL airship for personal or executive use — a 25×10 m triangular lifting-body craft with the flight deck and passenger cabin enclosed in the nose.", extra: "LTA. IC/625 liters; 8 km/liter. Passenger bay 50 CF / six bucket seats." },
  { name: "Airship Industries Skyswimmer", vt: "aircraft", skill: "aircraft", h: 3, s: 90, sMax: 180, b: 6, a: 1, sig: 8, p: 2, cargo: 30, cost: 100000, seating: "2 + 4 bench", page: 59,
    desc: "A purely recreational SHAPLL airship — solar-electric, gimbaled ducted fans and a folding wingtip design give it (weather permitting) unlimited flying time.", extra: "LTA. Solar-electric (zero economy in sun); optional turbofans speed 110/220. Each 30 CF of cargo cuts speed by ~5/15." },

  // --- Security Vehicles (book p.62-74). Heavy overlap — skipped (in system):
  // Citymaster, Chrysler-Nissan Patrol-One, GMC Riverine, Northrop Wasp, Northrop
  // Yellowjacket, GMC-Beachcraft Patroller.
  { name: "Ares Mobmaster Riot Control Vehicle", h: 4, hOff: 10, s: 30, sMax: 120, b: 5, a: 5, sig: 2, p: 5, cargo: 500, cost: 3650000, seating: "Twin bucket + 10 folding bench", page: 63,
    desc: "Ares's riot-control sibling of the Citymaster — a Personnel Carrier (ten troops) / Command vehicle with a forward micro-turret (FN-MAG MMGs) and tear-gas grenade launchers, fully gas-sealable.", extra: "IC/500 liters; 10 km/liter; standard load 500 CF." },
  { name: "General Products COP", h: 4, hOff: 9, s: 30, sMax: 90, b: 1, a: 1, sig: 5, p: 1, cargo: 2, cost: 25000, seating: "1 + 1 single bucket seats", page: 65,
    desc: "The City Operations Patroller — a cheap electric two-seat patrol car with secure prisoner transport and front-panel space for weapons and equipment.", extra: "Electric, 200 PF; 1 PF/km." },
  { name: "Harley Electraglide-1000 Patrol Cycle", vt: "ground", skill: "bike", h: 3, hOff: 4, s: 95, sMax: 285, b: 3, a: 2, sig: 2, p: 1, cargo: 3, cost: 75000, seating: "1 + 1", page: 66,
    desc: "The ultimate police cycle — the fastest on the road, with runflat tires, off-road suspension, three firmpoints, a light urban comm suite and siren.", extra: "IC/45 liters; 50 km/liter. 2 forward + 1 rear firmpoint (1 CF ammo each)." },
  { name: "Surfstar Marine Seacop (5M)", vt: "boat", skill: "boat", h: 3, s: 30, sMax: 90, b: 3, a: 2, sig: 3, p: 2, cargo: 12, cost: 50000, seating: "Single bucket + 3 bench", page: 67,
    desc: "The harbor equivalent of the Patrol-One — a marine patrol craft with EnviroSeal cabin, remote-controlled spotlight, siren and forward firmpoints.", extra: "IC/100 liters; 25 km/liter." },
  { name: "Blohm & Voss River Commander", vt: "boat", skill: "boat", h: 4, s: 25, sMax: 75, b: 6, a: 3, sig: 3, p: 3, cargo: 20, cost: 300000, seating: "Twin bucket + rear bench", page: 69,
    desc: "A paramilitary river patrol boat used worldwide (Rhine, North/Central/South America) — modular fittings (Police, Security, Assault) and weapon mounts.", extra: "IC/1,000 liters; 15 km/liter. Military model Armor 4; seagoing variant 325,000¥." },
  { name: "CASA J-239 Raven", vt: "aircraft", skill: "aircraft", h: 3, s: 200, sMax: 400, b: 3, a: 0, sig: 1, p: 1, cargo: 5, cost: 175000, seating: "Twin bucket seats", page: 72,
    desc: "A reinforced glider airframe with twin micro-turbofans, built for low-signature security and surveillance — STOL-capable with a powered/unpowered gliding mode.", extra: "IC/250 liters; 5 km/liter; STOL. Gliding: Handling 5, speed 50/100, Sig 0 (glide ratio 1.3)." },
  { name: "Moonlight Aerospace Avenger", vt: "aircraft", skill: "aircraft", h: 4, s: 100, sMax: 200, b: 3, a: 3, sig: 3, p: 2, cargo: 3, cost: 250000, seating: "Single bucket seat", page: 73,
    desc: "An ultralight, multipurpose paramilitary STOL aircraft with a rear-mounted pusher turboprop, minimal signature and a low-radar-reflection composite airframe.", extra: "IC/150 liters; 4 km/liter; STOL/amphibian. Disassembles for transport. Armed: 2 fuselage firmpoints + 1 center hardpoint. (Signature value in the book scan is unclear; read as minimal per the text.)" },

  // --- Red Ranger Scout ACV (book p.75, tail of the security section).
  { name: "Sikorsky-Bell \"Red Ranger\" Scout ACV", vt: "hovercraft", skill: "hovercraft", h: 4, s: 150, sMax: 450, b: 2, a: 2, sig: 3, p: 3, sensor: 1, cargo: 30, cost: 250000, seating: "1 + 1 single bucket seats", page: 75,
    desc: "A light, ultra-fast two-man scout/recon ACV with dual drive (air-cushion + powered wheels), survey radar, IR/visible-light, sound and motion sensors.", extra: "IC/2,500 liters; 5 km/liter. Wheels engaged: handling 3/5, speed 30/90, Sig 8. 1 small turret (2 CF ammo)." },

  // --- Drones (book p.77+). vehicleType drone. Store -> cargo, Sensor Package
  // rating -> sensor. Heavy overlap with Rigger 2 — skipped (in system/Rigger 2):
  // Aztechnology GCR-23C Crawler, Aerodesign Condor LDSD-23, MCT-Nissan Rotodrone,
  // GM-Nissan Spotter (= Spotter Drone).
  { name: "GAZ-Niki GNRD-71bis Snooper", vt: "drone", skill: "", h: 4, s: 25, sMax: 75, b: 1, a: 0, sig: 5, p: 1, sensor: 1, cargo: 1, cost: 1750, seating: "Drone (rigged)", page: 79,
    desc: "A six-wheeled surveillance drone on electric balloon tires — a Russo-Polish security favorite that climbs to 3 m, takes corners and slips through 5-cm openings.", extra: "Drone. Sensor Standard (1). 6 hours stationary operation; no set-up time." },
  { name: "Cyberspace Designs Dalmatian Recon Drone", vt: "drone", skill: "", h: 3, s: 35, sMax: 105, b: 2, a: 0, sig: 4, p: 2, sensor: 1, cargo: 6, cost: 15000, seating: "Drone (rigged)", page: 82,
    desc: "A turbofan delta-airfoil surveillance drone with a capacious sensor pod, VTOL capability and a \"stealth\" mode.", extra: "Drone. Sensor Standard (1); VSTOL; 5-min setup. Armed variant: B/A 4/1, Sig 5, 2 firmpoints, Store 12, 30,000¥." },
  { name: "Sikorsky-Bell Microskimmer", vt: "drone", skill: "", h: 5, s: 30, sMax: 90, b: 1, a: 0, sig: 5, p: 1, sensor: 1, cargo: 2, cost: 2750, seating: "Drone (rigged)", page: 83,
    desc: "A trash-can-sized ACV drone carrying a full sensor suite at high speed over any terrain — fully electric and floatable on water.", extra: "Drone. Sensor Standard (1). 8 hours stationary operation." },
  { name: "CAS \"Wandjina\" RPV", vt: "drone", skill: "", h: 3, s: 250, sMax: 500, b: 5, a: 2, sig: 4, p: 4, sensor: 3, cargo: 50, cost: 75000, seating: "Drone (rigged)", page: 84,
    desc: "A combat Remotely Piloted Vehicle from Commonwealth Aerospace (Australia) — built for both assault and recon, with a hardened airframe and weapon hardpoints.", extra: "Drone. Sensor Advanced (3); STOL. Armament: Vengeance/Vanquisher minigun + 3 ordnance hardpoints (centerline 2×2 CF, underwing 3 CF). Stealth mode." },
  { name: "GM-Nissan \"Doberman\" Patrol Vehicle", vt: "drone", skill: "", h: 3, s: 35, sMax: 70, b: 3, a: 2, sig: 3, p: 2, sensor: 3, cargo: 20, cost: 10000, seating: "Drone (rigged)", page: 85,
    desc: "The classic perimeter-patrol drone — thermographic and motion sensors, heavy armor and a micro-turret, equally effective day or night.", extra: "Drone. Sensor Advanced (3). Micro-turret + forward firmpoint: twin LMG or shotgun (gel/standard); optional Defiance Super Shock taser." }
];

let n = 0;
for (const v of VEHICLES) {
  const safe = v.name.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  writeFileSync(`${DIR}/${safe}_${idFor(v.name)}.json`, JSON.stringify(vehicle(v), null, 2) + "\n");
  n++;
}
console.log(`wrote ${n} vehicles`);

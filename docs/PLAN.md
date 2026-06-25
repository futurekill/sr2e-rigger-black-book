# Rigger Black Book — Vehicle Catalog Plan

Source: *Rigger Black Book* (FASA 7108, **Shadowrun 1st edition**). **Scanned PDF,
no text layer** — render pages (`pdftoppm -r 160 -png`) and read; verify every
stat against the render. **Page offset: PDF page = book page + 1** (book p.2 TOC =
PDF p.3).

## Scope
Import the **vehicle & drone catalog** as `vehicle` actors → `rbb-vehicles`. The
rules text (vehicle ratings glossary, modifications, combat, sensors p.98-150) is
**not** imported. Dedupe against vehicles already in the system `vehicles` pack
and Rigger 2.

## SR1 → SR2 stat mapping (confirmed against the Leyland-Zil Tsarina, p.9)
SR1 stat block → SR2 `vehicle` field:
- **Handling** `on/off` (e.g. 4/8) → `handling` = on-road; off-road in notes.
- **Speed** `cruise/max` (e.g. 25/75) → `speed` = **cruising (1st)** — the system
  uses the cruising figure for tests (cf. the core Ford Americar: speed 35, not
  105); max goes in notes.
- **B/A** (e.g. 1/0) → `body` / `armor`.
- **Sig** → `signature`.
- **APilot** (Autopilot) → `pilot`.
- **Sensor** (if listed; many civ vehicles omit it) → `sensor` (else 0).
- **Seating** → `seating` (store the count; full text in notes).
- **Storage** (CF) → `cargo` (and/or `load`).
- **Cost** → `cost`. **Economy / Fuel / Access** → notes.
- **Acceleration**: SR1 has none → `acceleration` 0 (note "SR1: n/a").
- Multiple models per vehicle (Electric/Multifuel, etc.) → one actor per model,
  named "<Vehicle> (<Model>)".

`vehicleType`/`skill` set from the section: cars/trucks/bikes → "ground"/"car";
marine → "boat"; aircraft/rotorcraft/LTA → "aircraft"/"rotorcraft"; drones → drone.

## Batches (book sections)
1. **Cars** (p.8-15)  2. Motorcycles (p.16-23)  3. 4WD (p.24-27)  4. Light Trucks
(p.28-31)  5. Heavy Trucks (p.32-36)  6. Air-Cushion (p.37-40)  7. Marine (p.41-45)
8. Aircraft (p.46-51)  9. Rotorcraft (p.52-56)  10. Lighter-Than-Air (p.57-61)
11. Security Vehicles (p.62-74)  12. Drones (p.~75-97)  13. Military Vehicles.

Build batch-by-batch (a generator per section or a shared one fed per-section
data); `npm run validate` + `npm run build-packs rbb-vehicles` after each.

## Skipped
All rules (ratings glossary, modifications, vehicle combat, sensors/ECM) — those
are SR1 mechanics largely superseded by the system + Rigger 2.

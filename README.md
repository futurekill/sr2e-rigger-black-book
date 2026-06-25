# Shadowrun 2E: Rigger Black Book

A content module for the [SR2E FoundryVTT system](../sr2e-foundryvtt) importing the
**vehicle & drone catalog** from the *Rigger Black Book* (FASA 7108, Shadowrun 1st
edition) as ready-to-drop `vehicle` actors (`rbb-vehicles`).

SR1 vehicle stat blocks map onto the SR2 vehicle model (handling/speed/body/armor/
signature/pilot/sensor/cargo…); the SR1 rules are **not** imported. Requires the
`sr2e` system (≥ 0.10.0), enabled per-world. Private repo — copyrighted FASA
content, personal use only.

## Status
**Complete — 65 vehicles** across all 13 book sections (cars, bikes, 4WD, trucks,
air-cushion, marine, aircraft, rotorcraft, LTA, security, drones, military),
render-verified and deduped. Released **v0.1.0**.

## Build
```
npm install
npm run validate
npm run build-packs   # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
```

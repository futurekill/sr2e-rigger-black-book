# Changelog

## Unreleased

## 0.3.0 — 2026-07-26

### Added
- **24 more top-down vehicle tokens** (48 of 69 now done). This batch covers the
  everyday traffic a rigger actually shares the road with — hatchbacks, panel
  vans, 4WDs, the Tsarina limousine, the Platinum II jet and the LZ-2049 zeppelin.
  Electric and combustion variants of the same chassis read as the same vehicle,
  differing only by charge port versus exhaust and fuel filler. *21 vehicles
  remain on stock icons.*

## 0.2.0 — 2026-07-26

### Added
- **Top-down token art, first 24 vehicles.** Every vehicle in this module was
  sharing a stock Foundry icon. The first 24 now have 1024×1024 tokens drawn
  strictly overhead on a **transparent background**, so they read properly on a
  battle map. Rotation stays unlocked and the art points nose-up, so a token turns
  to face the way it's driving. Variant pairs — the Plutocrat and its armed
  version, the River Commander and its military fit — deliberately read as the
  same airframe differing only by visible weapons. *The remaining 45 vehicles are
  still on stock icons and will follow in the next release.*

## 0.1.1

- Split the four genuine **combat variants** into their own drag-and-drop actors
  (base notes point to them): Cyberspace Dalmatian Recon (Armed), Agusta-Cierva
  Plutocrat (Armed), Blohm & Voss River Commander (Military), Embraer-Dassault
  Mistral (Military). Body/cargo-only variants (Roadmaster, GMC 4201, Eurovan,
  Nomad) stay as one actor — set them by editing the cargo/cost on the sheet.
  69 vehicles total.

## 0.1.0 — Vehicle catalog

The complete *Rigger Black Book* (FASA 7108, SR1) vehicle & drone catalog as
**65 `vehicle` actors** (`rbb-vehicles`), render-verified and deduped against the
system + Rigger 2 packs. SR1 stat blocks mapped onto the SR2 vehicle model
(handling on-road, speed = cruising, B/A → body/armor, Sig, APilot → pilot, Store
→ cargo, Sensor Package → sensor; SR1 has no acceleration → 0). All 13 book
sections: cars, motorcycles, 4WD, light & heavy trucks, air-cushion, marine,
aircraft, rotorcraft, lighter-than-air, security, drones, military.

By type: 37 ground, 9 aircraft, 8 boat, 5 drone, 4 hovercraft, 2 rotor. The SR1
rules (ratings glossary, modifications, vehicle combat, sensors/ECM) are not
imported. Requires the `sr2e` system ≥ 0.10.0.

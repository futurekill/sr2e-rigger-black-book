# Changelog

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

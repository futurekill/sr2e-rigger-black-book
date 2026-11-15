# QA plan — Rigger Black Book

Manual checks for a live Foundry world with the sr2e system and this module enabled.

## 0. Offline
- [ ] `npm run validate` passes (pack shape + every vehicle cites its page); `npm run lint` is clean.

## 1. Vehicles & Drones (69)
- [ ] The pack opens; every vehicle shows its top-down art and its page badge (sr2e 0.156.0+).
- [ ] Drag a few onto a scene: the token is sized in real metres (100 px = 1 m) and faces its direction of travel (nose leading).
- [ ] Armoured vehicles carry their full SR2 Armor (0.5.0 fix), not a third of it.
- [ ] A ground vehicle shows its off-road Handling in the off-road field; a crewed vehicle's autopilot sits in Autonav.
- [ ] A drone's Cargo is its own storage; its "Store" size is in the notes.
- [ ] **Bergen (Cargo Module)**: no Pilot rating, Handling 3/6, Body 5, Armor 3, Cargo 1005 (p.36).
- [ ] **Mistral (Float)** is the float variant (Speed 225/350).
- [ ] Spot-check five vehicles against the book (system docs/VEHICLE-AUDIT.md lists every page).

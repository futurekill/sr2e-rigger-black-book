# Rigger Black Book Module — Development Notes

FoundryVTT **V13** content module importing the *Rigger Black Book* (FASA 7108,
**SR1**) **vehicle & drone catalog** as `vehicle` actors for the **Shadowrun 2nd
Edition system** (`sr2e`). Separate package; depends on the system via
`module.json` → `relationships.systems` (sr2e ≥ 0.10.0).

## What this module is
Just the **vehicle/drone catalog** → `rbb-vehicles` (Actor pack). SR1 vehicle stat
blocks map onto the SR2 `vehicle` model (see `docs/PLAN.md` for the field mapping).
The SR1 rules (ratings glossary, modifications, vehicle combat, sensors/ECM) are
**out of scope** — the system + Rigger 2 already cover SR2 vehicle rules/design.

## Source material — SCANNED, no text layer
Render pages and read them (`pdftoppm -r 160 -png`); tesseract is unreliable on
these scans. **Offset: PDF page = book page + 1.** Verify every stat against the
render. `_work/` is git-ignored.

## Vehicle actor shape (system contract)
`vehicle` actor system: vehicleType, skill, handling, speed, acceleration, body,
armor, signature, pilot, sensor, cargo, load, seating, cost, availability,
autonav, notes (+ an optional `design` block, unused here). Match these exactly;
see the system `module/data/actor-data.mjs` VehicleData and the shipped
`vehicles` pack for the actor/prototypeToken shape.

## Conventions
- Transcribe **Rigger-Black-Book-new** vehicles; skip any already in the system
  `vehicles` pack or Rigger 2 (dedupe by name).
- One actor per **model variant** (Electric/Multifuel/etc.).
- Original/summarised descriptions (no verbatim flavour); cite the book page.
- One generator (or per-section data) → `npm run build-packs rbb-vehicles`.

## Packs are COMMITTED (built LevelDB), like the other content modules.

## Copyright
*Rigger Black Book* / *Shadowrun* are © FASA and rights holders. Personal table
use from an owned PDF; not for distribution. Keep `_work/` out of git.

# Shadowrun 2E: Rigger Black Book

A Foundry VTT V13 module bringing *Rigger Black Book* (FASA 7108, 1st edition) to the [Shadowrun 2nd Edition system](https://github.com/futurekill/sr2e-foundryvtt) (`sr2e`). The vehicle and drone catalog as ready-to-drop vehicle actors, across all 13 book sections: cars, bikes, 4WD, trucks, air-cushion, marine, aircraft, rotorcraft, LTA, security, drones and military.

## Contents

| Pack | Contents |
|---|---|
| RBB Vehicles & Drones | 69 actors |

## Notes

- SR1 stat blocks are mapped onto the SR2 vehicle model (handling, speed, body, armor, signature, pilot, sensor, cargo); the SR1 rules aren't imported.

## Requirements

- Foundry VTT V13
- The `sr2e` system, version 0.10.0 or later

## Installation

In Foundry, **Add-on Modules → Install Module**, and paste this manifest URL:

```
https://github.com/futurekill/sr2e-rigger-black-book/releases/latest/download/module.json
```

Then enable it in your world (**Game Settings → Manage Modules**).

## Development

`packs-src/` (one JSON file per document) is the source of truth. `packs/` is built from it, gitignored, and rebuilt by the release workflow.

```bash
npm install
npm run build-packs     # packs-src/ JSON -> packs/ LevelDB (close Foundry first)
npm run extract-packs   # pull edits made in Foundry back to packs-src/
npm run validate        # pre-flight checks on the pack sources
npm run lint
```

To release: add a `## X.Y.Z — date` section to `CHANGELOG.md` (the release notes come from it), bump `module.json`, then tag and push `vX.Y.Z`.

## Copyright

*Rigger Black Book* and *Shadowrun* are © FASA and their rights holders. This is a fan-made, non-commercial module for personal table use by owners of the book.

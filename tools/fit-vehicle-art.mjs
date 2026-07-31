#!/usr/bin/env node
/**
 * Trim the transparent margin off vehicle art and report the token size each
 * vehicle should use.
 *
 *   node tools/fit-vehicle-art.mjs          # report only
 *   node tools/fit-vehicle-art.mjs --fix    # rewrite the .webp files in place
 *
 * WHY. The portraits are square 1024x1024 canvases with the vehicle drawn
 * down the middle — the Bulldog occupies 508x965 of its canvas, so HALF
 * the image is empty air. Foundry's `fit: "contain"` scales the whole canvas
 * (margin included) to fit the token box, so the vehicle rendered at about half
 * a grid square inside a 2x1 box and looked tiny with the box half empty.
 *
 * Trimming is the root fix: once the image IS the vehicle, a token box of the
 * same aspect is filled edge to edge, with no per-vehicle scale fudge factor and
 * nothing overflowing the box.
 *
 * A small transparent margin is kept so the art doesn't butt against the token
 * border and its selection ring.
 */
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const FIX = process.argv.includes("--fix");
const ART = "assets/vehicle_portraits";
const MARGIN = 12;                 // px of breathing room kept around the vehicle

/**
 * Token width in metres (scenes are 1 m per grid square).
 *
 * Calibrated against the shipped core `vehicles` pack rather than invented:
 * there a motorcycle is 1 wide, an Americar (Body 3) is 2, a Citymaster
 * (Body 5) is 3, a river boat 4, and aircraft/rotorcraft run 8-14 because a
 * wingspan and a rotor disc are what actually occupy the ground.
 */
function widthMetres({ vehicleType, skill, body }) {
  const b = body ?? 0;
  // `skill` separates a scooter from a small car — both sit at Body 1-2, and
  // Body alone made a pickup narrower than a motorbike.
  if (skill === "bike") return 1;
  switch (vehicleType) {
    // Anything driven with the car skill is at least 2 m across, however light.
    case "ground":     return b <= 4 ? 2 : b <= 6 ? 3 : 4;
    case "drone":      return b <= 2 ? 1 : b <= 4 ? 2 : 3;
    case "hovercraft": return b <= 2 ? 2 : 3;
    // Body 1 boats are personal watercraft (a jet-ski, not a launch).
    case "boat":       return b <= 1 ? 1 : b <= 2 ? 2 : b <= 3 ? 3 : 4;
    case "rotor":      return b <= 3 ? 8 : b <= 5 ? 12 : 14;
    case "aircraft":   return b <= 5 ? 8 : b <= 6 ? 11 : 12;
    case "vectored_thrust": return 12;
    default:           return 2;
  }
}

/** Opaque bounding box of an image, via ImageMagick. */
function contentBox(file) {
  const out = execFileSync("magick", [file, "-trim", "-format", "%w %h %X %Y", "info:"], { encoding: "utf8" });
  const [w, h] = out.trim().split(/\s+/).map(Number);
  return { w, h };
}

// Vehicles, keyed by the art slug the generator derives from the name.
const slugify = (name) => name.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const bySlug = new Map();
for (const f of readdirSync("packs-src/rbb-vehicles").filter(x => x.endsWith(".json"))) {
  const doc = JSON.parse(readFileSync(join("packs-src/rbb-vehicles", f), "utf8"));
  if (doc.system) bySlug.set(slugify(doc.name), doc);
}

const rows = [];
for (const file of readdirSync(ART).filter(f => f.endsWith(".webp")).sort()) {
  const path = join(ART, file);
  const slug = file.replace(/\.webp$/, "");
  const doc = bySlug.get(slug);
  if (!doc) { console.log(`  (no vehicle for ${file} — skipped)`); continue; }

  const before = statSync(path).size;
  const box = contentBox(path);
  const aspect = box.w / box.h;                       // < 1 for a nose-down (south) vehicle
  const w = widthMetres({ ...doc.system });
  const h = Math.max(1, Math.round(w / aspect));

  if (FIX) {
    execFileSync("magick", [path, "-trim", "+repage",
      "-bordercolor", "none", "-border", String(MARGIN),
      "-quality", "95", path]);
  }
  rows.push({ name: doc.name, type: doc.system.vehicleType, body: doc.system.body,
              content: `${box.w}x${box.h}`, aspect: aspect.toFixed(2), w, h,
              kb: Math.round(before / 1024), after: FIX ? Math.round(statSync(path).size / 1024) : null });
}

const pad = (s, n) => String(s).padEnd(n);
console.log(`\n${FIX ? "TRIMMED" : "WOULD TRIM"} ${rows.length} portrait(s)\n`);
console.log(`${pad("vehicle", 42)}${pad("type", 16)}${pad("body", 5)}${pad("content", 10)}${pad("aspect", 8)}token`);
for (const r of rows) {
  console.log(`${pad(r.name, 42)}${pad(r.type, 16)}${pad(r.body, 5)}${pad(r.content, 10)}${pad(r.aspect, 8)}${r.w}x${r.h}`);
}
if (!FIX) console.log("\nRe-run with --fix to rewrite the .webp files.");

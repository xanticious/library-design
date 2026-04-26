import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Per the floor plan: Computer area is 8m × 7m on the west side (x ≈ -11)
// 12 stations in 2 back-to-back rows of 6
const STATIONS_PER_ROW = 6;
const STATION_SPACING = 1.1; // meters between station centres
const ROW_OFFSET = 0.85; // distance from centre line to each row (front/back)

// Station dimensions
const DESK_W = 0.9; // per-station desk width
const DESK_D = 0.6;
const DESK_H = 0.05; // surface thickness
const DESK_COUNTER_H = 0.72; // floor to desk surface top

// Monitor (flat black slab)
const MON_W = 0.42;
const MON_H = 0.28;
const MON_D = 0.04;
const MON_Y_ABOVE_DESK = 0.15; // clearance from desk top to monitor bottom

// Desk leg
const LEG_W = 0.05;
const LEG_D = 0.05;
const LEG_H = DESK_COUNTER_H - DESK_H;

// Printer/copier station
const PRINTER_W = 0.6;
const PRINTER_H = 0.45;
const PRINTER_D = 0.5;

// Area origin — west side of building, central north-south
const AREA_X = -11;
const AREA_Z = -3; // centre of the 7 m zone

// ─── Materials ────────────────────────────────────────────────────────────────

const WHITE_LAMINATE = 0xfafaf8;
const CHARCOAL = 0x2d2d2d;

function whiteDesktopMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: WHITE_LAMINATE, roughness: 0.7, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the computer area geometry.
 *
 * 12 individual computer stations arranged in 2 back-to-back rows of 6
 * (rows A and B), with a shared laser printer/copier at the end.
 *
 * Position: west side of building (x ≈ -11), spanning z ≈ 0 to -6.
 */
export function createComputerArea(): Group {
  const group = new Group();
  group.name = "computer-area";

  // Stations 0–5: Row A (south-facing side), stations 6–11: Row B (north-facing)
  for (let i = 0; i < 12; i++) {
    const col = i % STATIONS_PER_ROW;
    const row = Math.floor(i / STATIONS_PER_ROW);

    const x = AREA_X + (col - (STATIONS_PER_ROW - 1) / 2) * STATION_SPACING;
    const zOffset = row === 0 ? -ROW_OFFSET : ROW_OFFSET;
    const z = AREA_Z + zOffset;
    const deskY = DESK_COUNTER_H - DESK_H / 2;

    // ── Desk surface ──────────────────────────────────────────────────────
    const desk = new Mesh(new BoxGeometry(DESK_W, DESK_H, DESK_D), whiteDesktopMat());
    desk.name = `pc-desk-${i}`;
    desk.position.set(x, deskY, z);
    group.add(desk);

    // ── Desk legs (charcoal steel) ────────────────────────────────────────
    const legXOffsets = [-(DESK_W / 2 - LEG_W / 2), DESK_W / 2 - LEG_W / 2];
    legXOffsets.forEach((lxo, li) => {
      const leg = new Mesh(new BoxGeometry(LEG_W, LEG_H, LEG_D), charcoalMat());
      leg.name = `pc-leg-${i}-${li}`;
      leg.position.set(x + lxo, LEG_H / 2, z);
      group.add(leg);
    });

    // ── Monitor slab ──────────────────────────────────────────────────────
    const monY = DESK_COUNTER_H + MON_Y_ABOVE_DESK + MON_H / 2;
    const monitor = new Mesh(new BoxGeometry(MON_W, MON_H, MON_D), charcoalMat());
    monitor.name = `pc-monitor-${i}`;
    monitor.position.set(x, monY, z - (row === 0 ? 0.1 : -0.1));
    group.add(monitor);
  }

  // ── Printer / copier station ─────────────────────────────────────────────
  const printer = new Mesh(new BoxGeometry(PRINTER_W, PRINTER_H, PRINTER_D), whiteDesktopMat());
  printer.name = "pc-printer";
  printer.position.set(AREA_X + STATIONS_PER_ROW * STATION_SPACING * 0.5, PRINTER_H / 2, AREA_Z);
  group.add(printer);

  return group;
}

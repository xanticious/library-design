import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Per the floor plan: circulation desk is a 5m × 3m central hub
// positioned just north of the lobby separator (z≈10), at the heart
// of the building (x≈0).
const DESK_W = 5;
const DESK_D = 1.1; // patron-facing depth
const DESK_H = 0.1; // desk surface thickness
const DESK_COUNTER_H = 1.0; // height from floor to counter top
const DESK_PLATFORM_H = 0.1; // slight raise for staff side
const DESK_PLATFORM_W = 5.4;
const DESK_PLATFORM_D = 1.5;

const RETURN_SLOT_W = 0.4;
const RETURN_SLOT_H = 0.08;
const RETURN_SLOT_D = 0.5;

const WORKSTATION_W = 0.5;
const WORKSTATION_H = 0.05;
const WORKSTATION_D = 0.4;

// Position — center of the building, just south of the staff area
// z ≈ 8 puts the desk squarely between the lobby separator (z≈10)
// and the main stacks area
const DESK_X = 0;
const DESK_Z = 8;

// Materials
const OAK = 0xd4a96a;
const CHARCOAL = 0x2d2d2d;

// ─── Materials ────────────────────────────────────────────────────────────────

function oakMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OAK, roughness: 0.7, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the circulation desk geometry.
 *
 * The desk is the central service hub, positioned at the heart of the building
 * just north of the lobby (z ≈ 8). It features:
 * - A light oak counter surface
 * - A charcoal steel frame / legs
 * - A book return slot on the patron-facing (south) side
 * - Two staff workstation surfaces
 * - A low platform raising the staff side slightly
 */
export function createCirculationDesk(): Group {
  const group = new Group();
  group.name = "circulation-desk";

  const counterY = DESK_COUNTER_H;

  // ── Platform (low raise under the staff side) ────────────────────────────
  const platform = new Mesh(
    new BoxGeometry(DESK_PLATFORM_W, DESK_PLATFORM_H, DESK_PLATFORM_D),
    charcoalMat(),
  );
  platform.name = "circulation-desk-platform";
  platform.position.set(DESK_X, DESK_PLATFORM_H / 2, DESK_Z);
  group.add(platform);

  // ── Main desk surface ────────────────────────────────────────────────────
  const surface = new Mesh(new BoxGeometry(DESK_W, DESK_H, DESK_D), oakMat());
  surface.name = "circulation-desk-surface";
  surface.position.set(DESK_X, counterY, DESK_Z);
  group.add(surface);

  // ── Desk legs / front panel (charcoal steel frame) ───────────────────────
  const frontPanel = new Mesh(new BoxGeometry(DESK_W, DESK_COUNTER_H, 0.05), charcoalMat());
  frontPanel.name = "circulation-desk-front-panel";
  frontPanel.position.set(DESK_X, DESK_COUNTER_H / 2, DESK_Z + DESK_D / 2);
  group.add(frontPanel);

  // ── Book return slot (patron-facing south side) ──────────────────────────
  const returnSlot = new Mesh(
    new BoxGeometry(RETURN_SLOT_W, RETURN_SLOT_H, RETURN_SLOT_D),
    charcoalMat(),
  );
  returnSlot.name = "circulation-desk-return-slot";
  returnSlot.position.set(DESK_X - 1.5, DESK_COUNTER_H - RETURN_SLOT_H / 2, DESK_Z + DESK_D / 2);
  group.add(returnSlot);

  // ── Workstations (2 monitor+keyboard surfaces for staff) ─────────────────
  for (let i = 0; i < 2; i++) {
    const xOff = i === 0 ? -1.2 : 1.2;
    const ws = new Mesh(new BoxGeometry(WORKSTATION_W, WORKSTATION_H, WORKSTATION_D), oakMat());
    ws.name = `workstation-${i + 1}`;
    ws.position.set(DESK_X + xOff, counterY + 0.02, DESK_Z - 0.2);
    group.add(ws);

    // Monitor slab above each workstation
    const monitor = new Mesh(
      new BoxGeometry(0.35, 0.25, 0.03),
      new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.4, metalness: 0.6 }),
    );
    monitor.name = `workstation-${i + 1}-monitor`;
    monitor.position.set(DESK_X + xOff, counterY + 0.15, DESK_Z - 0.25);
    group.add(monitor);
  }

  return group;
}

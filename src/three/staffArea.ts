import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Per the floor plan, staff areas occupy the full north strip:
// x: -15 to +7 (west), z: -10 to -16.5 (north end)
// Staff corridor/hold shelf runs east-west at z ≈ -10 to -11
// Four staff rooms are north of the hold shelf corridor

const STAFF_ZONE_W = 20; // east-west total
const STAFF_ZONE_D = 6; // north-south depth (z: -10.5 to -16.5)
const ROOM_H = 3.0; // staff areas have 3.0 m ceiling per design doc
const WALL_T = 0.15;

// Hold shelf corridor (just inside the staff door)
const HOLD_SHELF_W = STAFF_ZONE_W;
const HOLD_SHELF_D = 2; // 2 m wide corridor
const HOLD_SHELF_Z = -11; // z centre

// Staff door position (on the staff divider wall at z ≈ -10)
// Centred on the west half, roughly behind circulation desk
const DOOR_W = 1.0;
const DOOR_H = 2.1;
const DOOR_T = 0.05;
const DOOR_Z = -10.0;
const DOOR_X = -2.0;

// Room layout (west to east across the back strip)
// Breakroom (5m×6m), Mgmt Office (4m×6m), Processing (6m×6m), Transit (5m×6m)
// Dividers are at x ≈ -10, -6, 0 (relative to centre of building)
const DIVIDER_XS = [-10, -6, 0]; // 3 dividers create 4 rooms
const DIVIDER_H = ROOM_H;
const DIVIDER_D = STAFF_ZONE_D;

// Room centres Z (midpoint of the staff zone strip)
const ROOM_Z = -13.5;

// Breakroom is the westmost room: x ≈ -12.5
const BREAKROOM_X = -12.5;

// ─── Colors ───────────────────────────────────────────────────────────────────

const OFF_WHITE = 0xfafaf8;
const CHARCOAL = 0x2d2d2d;
const OAK = 0xd4a96a;

// ─── Materials ────────────────────────────────────────────────────────────────

function wallMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OFF_WHITE, roughness: 0.9, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

function floorMat(): MeshStandardMaterial {
  // Staff areas use polished concrete per design doc
  return new MeshStandardMaterial({ color: 0xb0b0b0, roughness: 0.5, metalness: 0 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the staff area geometry (not publicly accessible).
 *
 * Located in the north strip of the building (z: -10 to -16.5), behind
 * the circulation desk. Contains:
 * - Staff-only door on the south wall
 * - Hold shelf corridor (A–Z patron holds)
 * - 4 staff rooms: Breakroom, Management Office, Processing, Transit/Receive
 * - Room divider walls
 */
export function createStaffArea(): Group {
  const group = new Group();
  group.name = "staff-area";

  // ── Staff-only door (on the staff divider wall, z ≈ -10) ─────────────────
  const door = new Mesh(new BoxGeometry(DOOR_W, DOOR_H, DOOR_T), charcoalMat());
  door.name = "staff-door";
  door.position.set(DOOR_X, DOOR_H / 2, DOOR_Z);
  group.add(door);

  // ── Hold shelf corridor (runs east-west just inside the staff door) ──────
  const holdShelf = new Mesh(new BoxGeometry(HOLD_SHELF_W, 0.05, HOLD_SHELF_D), floorMat());
  holdShelf.name = "hold-shelf-corridor";
  holdShelf.position.set(0, 0.025, HOLD_SHELF_Z);
  group.add(holdShelf);

  // ── Room divider walls (3 walls create 4 rooms) ──────────────────────────
  DIVIDER_XS.forEach((dx, i) => {
    const divider = new Mesh(new BoxGeometry(WALL_T, DIVIDER_H, DIVIDER_D), wallMat());
    divider.name = `staff-room-divider-${i}`;
    divider.position.set(dx, DIVIDER_H / 2, ROOM_Z);
    group.add(divider);
  });

  // ── Staff breakroom (westmost — marker floor slab) ───────────────────────
  const breakroom = new Mesh(new BoxGeometry(5, 0.05, 6), floorMat());
  breakroom.name = "staff-breakroom";
  breakroom.position.set(BREAKROOM_X, 0.025, ROOM_Z);
  group.add(breakroom);

  // ── Management office ─────────────────────────────────────────────────────
  const mgmtOffice = new Mesh(new BoxGeometry(4, 0.05, 6), floorMat());
  mgmtOffice.name = "staff-mgmt-office";
  mgmtOffice.position.set(-8, 0.025, ROOM_Z);
  group.add(mgmtOffice);

  // ── Processing room ───────────────────────────────────────────────────────
  const processing = new Mesh(new BoxGeometry(6, 0.05, 6), floorMat());
  processing.name = "staff-processing";
  processing.position.set(-3, 0.025, ROOM_Z);
  group.add(processing);

  // ── Transit receive/send ──────────────────────────────────────────────────
  const transit = new Mesh(new BoxGeometry(5, 0.05, 6), floorMat());
  transit.name = "staff-transit";
  transit.position.set(3.5, 0.025, ROOM_Z);
  group.add(transit);

  return group;
}

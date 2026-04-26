import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Building footprint (meters): 30 m wide (X), 33 m deep (Z)
const BUILDING_W = 30;
const BUILDING_D = 33;
const CEILING_H = 3.6;
const WALL_THICKNESS = 0.15; // interior walls are thinner than exterior

// Color palette from design doc
const OAK_FLOOR = 0xd4a96a;
const OFF_WHITE = 0xfafaf8;

// ─── Materials ────────────────────────────────────────────────────────────────

function oakFloorMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OAK_FLOOR, roughness: 0.6, metalness: 0 });
}

function ceilingMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OFF_WHITE, roughness: 0.9, metalness: 0 });
}

function wallMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OFF_WHITE, roughness: 0.9, metalness: 0 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the interior shell:
 * floor, ceiling, and zone boundary partial walls.
 *
 * Building footprint: 30 m × 33 m, origin at floor centre.
 * Coordinate system: +X = East, +Z = South (front), +Y = Up.
 */
export function createInterior(): Group {
  const group = new Group();
  group.name = "interior";

  // ── Floor ────────────────────────────────────────────────────────────────
  const floor = new Mesh(new BoxGeometry(BUILDING_W, 0.05, BUILDING_D), oakFloorMat());
  floor.name = "floor";
  floor.position.set(0, 0, 0);
  group.add(floor);

  // ── Ceiling ──────────────────────────────────────────────────────────────
  const ceiling = new Mesh(new BoxGeometry(BUILDING_W, 0.05, BUILDING_D), ceilingMat());
  ceiling.name = "ceiling";
  ceiling.position.set(0, CEILING_H, 0);
  group.add(ceiling);

  // ── Interior zone divider walls ──────────────────────────────────────────
  // These are partial walls that define zone boundaries per the floor plan.
  // They run east-west or north-south, stopping short of full building width.

  // Staff corridor divider — separates staff area from public floor
  // Runs east-west near the north end (z ≈ -10)
  const staffWall = new Mesh(new BoxGeometry(BUILDING_W, CEILING_H, WALL_THICKNESS), wallMat());
  staffWall.name = "wall-interior-staff-divider";
  staffWall.position.set(0, CEILING_H / 2, -10);
  group.add(staffWall);

  // West zone divider — separates children's/computer area (west) from
  // central stacks. Runs north-south at x ≈ -7.
  const westDivider = new Mesh(new BoxGeometry(WALL_THICKNESS, CEILING_H, 16), wallMat());
  westDivider.name = "wall-interior-west-divider";
  westDivider.position.set(-7, CEILING_H / 2, -2);
  group.add(westDivider);

  // East zone divider — separates community room / study rooms (east) from
  // central stacks. Runs north-south at x ≈ +7.
  const eastDivider = new Mesh(new BoxGeometry(WALL_THICKNESS, CEILING_H, 18), wallMat());
  eastDivider.name = "wall-interior-east-divider";
  eastDivider.position.set(7, CEILING_H / 2, -1);
  group.add(eastDivider);

  // Lobby separator — a low partial wall between lobby and main floor
  // Runs east-west at z ≈ +10 (roughly where the lobby ends)
  const lobbySep = new Mesh(new BoxGeometry(BUILDING_W, 0.9, WALL_THICKNESS), wallMat());
  lobbySep.name = "wall-interior-lobby-separator";
  lobbySep.position.set(0, 0.45, 10);
  group.add(lobbySep);

  return group;
}

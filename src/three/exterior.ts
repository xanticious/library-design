import { BoxGeometry, Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Building footprint (meters): 30 m wide (X), 33 m deep (Z)
const BUILDING_W = 30;
const BUILDING_D = 33;
const WALL_HEIGHT = 3.6;
const WALL_THICKNESS = 0.3;

// Parapet adds ~0.6 m above the wall tops
const PARAPET_H = 0.6;

// Facade material — limestone off-white
const LIMESTONE = 0xf0ede6;
const BELT_STONE = 0xd8d4cc;
const DARK_STEEL = 0x2a2a2a;

// Window dimensions (tall rectangular per design doc)
const WIN_W = 1.2;
const WIN_H = 2.0;
// 3 bays × 2 rows on the south facade
const WIN_BAYS = 3;
const WIN_ROWS = 2;
const WIN_BAY_SPACING = 8; // meters between bay centres

// Entrance steps
const STEP_W = 6;
const STEP_DEPTH = 0.9;
const STEP_H = 0.15;
const STEPS = 3;

// ─── Materials ────────────────────────────────────────────────────────────────

function limestoneMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: LIMESTONE, roughness: 0.85, metalness: 0 });
}

function beltStoneMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: BELT_STONE, roughness: 0.85, metalness: 0 });
}

function windowMat(): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: 0xc8e8f0,
    transmission: 0.95,
    roughness: 0.05,
    metalness: 0,
  });
}

function steelMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: DARK_STEEL, roughness: 0.3, metalness: 0.8 });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addWall(
  group: Group,
  name: string,
  w: number,
  h: number,
  d: number,
  x: number,
  y: number,
  z: number,
): Mesh {
  const mesh = new Mesh(new BoxGeometry(w, h, d), limestoneMat());
  mesh.name = name;
  mesh.position.set(x, y, z);
  group.add(mesh);
  return mesh;
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the exterior building shell:
 * facade walls, windows, parapet, entrance steps.
 *
 * Building footprint: 30 m × 33 m, origin at floor centre.
 * Coordinate system: +X = East, +Z = South (front), +Y = Up.
 */
export function createExterior(): Group {
  const group = new Group();
  group.name = "exterior";

  const halfW = BUILDING_W / 2;
  const halfD = BUILDING_D / 2;
  const wallY = WALL_HEIGHT / 2;
  const southZ = halfD + WALL_THICKNESS / 2;

  // ── Four exterior walls ──────────────────────────────────────────────────
  // South facade (faces street)
  const southWall = addWall(
    group,
    "facade-south",
    BUILDING_W,
    WALL_HEIGHT,
    WALL_THICKNESS,
    0,
    wallY,
    southZ,
  );
  southWall; // already added

  // North wall
  addWall(group, "facade-north", BUILDING_W, WALL_HEIGHT, WALL_THICKNESS, 0, wallY, -southZ);

  // East wall (full depth including wall thickness)
  const sideLen = BUILDING_D + WALL_THICKNESS * 2;
  addWall(
    group,
    "facade-east",
    WALL_THICKNESS,
    WALL_HEIGHT,
    sideLen,
    halfW + WALL_THICKNESS / 2,
    wallY,
    0,
  );

  // West wall
  addWall(
    group,
    "facade-west",
    WALL_THICKNESS,
    WALL_HEIGHT,
    sideLen,
    -(halfW + WALL_THICKNESS / 2),
    wallY,
    0,
  );

  // ── Flat roof + parapet ──────────────────────────────────────────────────
  const roofW = BUILDING_W + WALL_THICKNESS * 2;
  const roofD = BUILDING_D + WALL_THICKNESS * 2;
  const roofMesh = new Mesh(new BoxGeometry(roofW, WALL_THICKNESS, roofD), beltStoneMat());
  roofMesh.name = "roof";
  roofMesh.position.set(0, WALL_HEIGHT + WALL_THICKNESS / 2, 0);
  group.add(roofMesh);

  // Parapet (solid walls above roof, same 4 sides)
  const parapetY = WALL_HEIGHT + WALL_THICKNESS + PARAPET_H / 2;
  const parapetSouth = new Mesh(new BoxGeometry(roofW, PARAPET_H, WALL_THICKNESS), beltStoneMat());
  parapetSouth.name = "parapet-south";
  parapetSouth.position.set(0, parapetY, halfD + WALL_THICKNESS / 2);
  group.add(parapetSouth);

  const parapetNorth = new Mesh(new BoxGeometry(roofW, PARAPET_H, WALL_THICKNESS), beltStoneMat());
  parapetNorth.name = "parapet-north";
  parapetNorth.position.set(0, parapetY, -(halfD + WALL_THICKNESS / 2));
  group.add(parapetNorth);

  const parapetEast = new Mesh(new BoxGeometry(WALL_THICKNESS, PARAPET_H, roofD), beltStoneMat());
  parapetEast.name = "parapet-east";
  parapetEast.position.set(halfW + WALL_THICKNESS / 2, parapetY, 0);
  group.add(parapetEast);

  const parapetWest = new Mesh(new BoxGeometry(WALL_THICKNESS, PARAPET_H, roofD), beltStoneMat());
  parapetWest.name = "parapet-west";
  parapetWest.position.set(-(halfW + WALL_THICKNESS / 2), parapetY, 0);
  group.add(parapetWest);

  // ── Windows on south facade (3 bays × 2 rows) ───────────────────────────
  // Bays centred at x = -8, 0, +8 (WIN_BAY_SPACING apart)
  // Rows: lower row bottom at y=0.6, upper row bottom at y=1.9
  const rowBottoms = [0.6, WALL_HEIGHT - WIN_H - 0.3];
  const bays = [-WIN_BAY_SPACING, 0, WIN_BAY_SPACING];
  let winIdx = 0;
  for (const row of rowBottoms) {
    for (const bay of bays) {
      winIdx++;
      // Glass pane
      const glass = new Mesh(new BoxGeometry(WIN_W, WIN_H, WALL_THICKNESS * 0.5), windowMat());
      glass.name = `window-south-${winIdx}`;
      glass.position.set(bay, row + WIN_H / 2, southZ);
      group.add(glass);

      // Steel frame (thin outline mesh)
      const frame = new Mesh(
        new BoxGeometry(WIN_W + 0.1, WIN_H + 0.1, WALL_THICKNESS * 0.3),
        steelMat(),
      );
      frame.name = `window-frame-south-${winIdx}`;
      frame.position.set(bay, row + WIN_H / 2, southZ - 0.02);
      group.add(frame);
    }
  }

  // ── Entrance steps (3 steps at central south entrance) ──────────────────
  const stepBaseZ = southZ + WALL_THICKNESS / 2;
  for (let i = 1; i <= STEPS; i++) {
    const stepW = STEP_W;
    const stepH = STEP_H;
    const stepD = STEP_DEPTH;
    const step = new Mesh(
      new BoxGeometry(stepW, stepH * i, stepD),
      new MeshStandardMaterial({ color: 0xc8c4bc, roughness: 0.8, metalness: 0 }),
    );
    step.name = `step-${i}`;
    // Each step is progressively narrower in depth but wider in height
    // They fan outward from the door; step 1 is closest to the door
    step.position.set(0, (stepH * i) / 2, stepBaseZ + (STEPS - i + 1) * stepD);
    group.add(step);
  }

  return group;
}

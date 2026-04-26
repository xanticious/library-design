import {
  BoxGeometry,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Community room: 10 m × 9 m flexible event space, east side of building
// The room's west wall is the east zone divider (x ≈ +7).
// Room spans roughly x: 7–17, z: -4 to -13 (north end of east zone)
const ROOM_W = 10; // east-west (X)
const ROOM_D = 9; // north-south (Z)
const ROOM_H = 3.6;
const WALL_T = 0.1;

// Glass front wall on the west side (faces main floor)
const GLASS_H = ROOM_H;

// Projection screen (on the north wall)
const SCREEN_W = 3.0;
const SCREEN_H = 1.8;

// Folding partition (east wall, can open to secondary gallery)
const PARTITION_W = ROOM_D;
const PARTITION_H = ROOM_H;
const PARTITION_T = 0.08;

// Chairs — ~60 seats in rows (InstancedMesh)
const CHAIR_ROWS = 6;
const CHAIRS_PER_ROW = 10;
const TOTAL_CHAIRS = CHAIR_ROWS * CHAIRS_PER_ROW;
const CHAIR_SPACING_X = 0.75;
const CHAIR_SPACING_Z = 0.9;
const CHAIR_W = 0.5;
const CHAIR_H = 0.08; // seat slab
const CHAIR_D = 0.45;
const CHAIR_SEAT_H = 0.45;

// Room origin — centre of the room
const ROOM_CX = 12; // centre X (building east side)
const ROOM_CZ = -8; // centre Z

// ─── Colors ───────────────────────────────────────────────────────────────────

const WHITE = 0xfafaf8;
const CHARCOAL = 0x2d2d2d;
const GLASS_TINT = 0xc8e8f0;
const WARM_GRAY = 0xc8c4bc;

// ─── Materials ────────────────────────────────────────────────────────────────

function whiteMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: WHITE, roughness: 0.95, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

function glassMat(): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: GLASS_TINT,
    transmission: 0.8,
    roughness: 0.1,
    metalness: 0,
    transparent: true,
    opacity: 0.35,
  });
}

function chairMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: WARM_GRAY, roughness: 0.8, metalness: 0 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the community room geometry.
 *
 * ~90 sq m flexible event space on the east side of the building, featuring:
 * - Glass front wall (west side) with double-door access from the main floor
 * - ~60 chairs in rows facing a pull-down projection screen
 * - Folding partition wall on the east side
 * - Projection screen on the north wall
 *
 * Room centre: (12, 0, -8)
 */
export function createCommunityRoom(): Group {
  const group = new Group();
  group.name = "community-room";

  const halfW = ROOM_W / 2;
  const halfD = ROOM_D / 2;
  const wallY = ROOM_H / 2;

  // ── Glass front wall (west face — faces main floor) ──────────────────────
  const glassFront = new Mesh(new BoxGeometry(WALL_T, GLASS_H, ROOM_D), glassMat());
  glassFront.name = "community-room-glass-front";
  glassFront.position.set(-halfW, wallY, 0);
  group.add(glassFront);

  // ── North wall (back, behind the screen) ─────────────────────────────────
  const northWall = new Mesh(new BoxGeometry(ROOM_W, ROOM_H, WALL_T), charcoalMat());
  northWall.name = "community-room-wall-north";
  northWall.position.set(0, wallY, -halfD);
  group.add(northWall);

  // ── South wall ────────────────────────────────────────────────────────────
  const southWall = new Mesh(new BoxGeometry(ROOM_W, ROOM_H, WALL_T), charcoalMat());
  southWall.name = "community-room-wall-south";
  southWall.position.set(0, wallY, halfD);
  group.add(southWall);

  // ── Folding partition wall (east side) ────────────────────────────────────
  const partition = new Mesh(new BoxGeometry(WALL_T, PARTITION_H, PARTITION_W), charcoalMat());
  partition.name = "community-room-partition";
  partition.position.set(halfW, wallY, 0);
  group.add(partition);

  // ── Projection screen (PlaneGeometry on north wall) ───────────────────────
  const screen = new Mesh(new PlaneGeometry(SCREEN_W, SCREEN_H), whiteMat());
  screen.name = "community-room-screen";
  screen.position.set(0, 1.8, -halfD + 0.02);
  group.add(screen);

  // ── Chairs (InstancedMesh — ~60 seats in rows) ────────────────────────────
  const chairGeo = new BoxGeometry(CHAIR_W, CHAIR_H, CHAIR_D);
  const chairs = new InstancedMesh(chairGeo, chairMat(), TOTAL_CHAIRS);
  chairs.name = "community-room-chairs";

  const matrix = new Matrix4();
  const startX = -((CHAIRS_PER_ROW - 1) / 2) * CHAIR_SPACING_X;
  const startZ = -(halfD - 1.5); // start a bit in from the front wall

  let idx = 0;
  for (let row = 0; row < CHAIR_ROWS; row++) {
    for (let col = 0; col < CHAIRS_PER_ROW; col++) {
      const cx = startX + col * CHAIR_SPACING_X;
      const cz = startZ + row * CHAIR_SPACING_Z;
      matrix.makeTranslation(cx, CHAIR_SEAT_H, cz);
      chairs.setMatrixAt(idx++, matrix);
    }
  }

  chairs.instanceMatrix.needsUpdate = true;
  group.add(chairs);

  // Position the entire room
  group.position.set(ROOM_CX, 0, ROOM_CZ);

  return group;
}

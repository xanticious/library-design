import {
  BoxGeometry,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Per the floor plan: 2 study rooms on the east side, each 3.5 m × 5 m
// East zone starts at x ≈ +7; rooms are stacked north-south
const ROOM_W = 3.5; // east-west width
const ROOM_D = 5.0; // north-south depth
const ROOM_H = 3.6; // ceiling height (same as main floor)
const WALL_T = 0.08; // glass wall thickness

// Door
const DOOR_W = 0.9;
const DOOR_H = 2.1;
const DOOR_T = 0.05;

// Table (seats 4) in oak
const TABLE_W = 1.4;
const TABLE_H = 0.05;
const TABLE_D = 0.7;
const TABLE_LEG_H = 0.72;

// Whiteboard (PlaneGeometry, wall-mounted on north wall of each room)
const WB_W = 1.2;
const WB_H = 0.9;

// Position origin: east side, starting at x ≈ 8 (inside east divider wall at x=7)
const BASE_X = 10.75; // midpoint of room along X
const ROOM_1_Z = -7.5; // north study room
const ROOM_2_Z = -2.0; // south study room

// ─── Colors ───────────────────────────────────────────────────────────────────

const OAK = 0xd4a96a;
const CHARCOAL = 0x2d2d2d;
const GLASS_TINT = 0xc8e8f0;
const WHITE = 0xfafaf8;

// ─── Materials ────────────────────────────────────────────────────────────────

function glassMat(): MeshPhysicalMaterial {
  return new MeshPhysicalMaterial({
    color: GLASS_TINT,
    transmission: 0.8,
    roughness: 0.1,
    metalness: 0,
    transparent: true,
    opacity: 0.4,
  });
}

function oakMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OAK, roughness: 0.7, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

function whiteboardMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: WHITE, roughness: 0.95, metalness: 0 });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildRoom(name: string, cx: number, cz: number): Group {
  const room = new Group();
  room.name = name;

  const halfW = ROOM_W / 2;
  const halfD = ROOM_D / 2;
  const wallY = ROOM_H / 2;

  // ── Glass front wall (south face, patron-visible) ────────────────────────
  // Two glass panels flanking the door opening
  const glassPanelW = (ROOM_W - DOOR_W) / 2;
  const glassH = ROOM_H;

  const glassLeft = new Mesh(new BoxGeometry(glassPanelW, glassH, WALL_T), glassMat());
  glassLeft.name = `${name}-glass-wall-left`;
  glassLeft.position.set(-(DOOR_W / 2 + glassPanelW / 2), wallY, halfD);
  room.add(glassLeft);

  const glassRight = new Mesh(new BoxGeometry(glassPanelW, glassH, WALL_T), glassMat());
  glassRight.name = `${name}-glass-wall-right`;
  glassRight.position.set(DOOR_W / 2 + glassPanelW / 2, wallY, halfD);
  room.add(glassRight);

  // ── Door (charcoal frame) ────────────────────────────────────────────────
  const door = new Mesh(new BoxGeometry(DOOR_W, DOOR_H, DOOR_T), charcoalMat());
  door.name = `${name}-door`;
  door.position.set(0, DOOR_H / 2, halfD);
  room.add(door);

  // ── Side solid walls (east and west) ────────────────────────────────────
  const sideWallE = new Mesh(new BoxGeometry(WALL_T, ROOM_H, ROOM_D), charcoalMat());
  sideWallE.name = `${name}-wall-east`;
  sideWallE.position.set(halfW, wallY, 0);
  room.add(sideWallE);

  const sideWallW = new Mesh(new BoxGeometry(WALL_T, ROOM_H, ROOM_D), charcoalMat());
  sideWallW.name = `${name}-wall-west`;
  sideWallW.position.set(-halfW, wallY, 0);
  room.add(sideWallW);

  // ── Back wall (north) ────────────────────────────────────────────────────
  const backWall = new Mesh(new BoxGeometry(ROOM_W, ROOM_H, WALL_T), charcoalMat());
  backWall.name = `${name}-wall-back`;
  backWall.position.set(0, wallY, -halfD);
  room.add(backWall);

  // ── 4-person table ───────────────────────────────────────────────────────
  const table = new Mesh(new BoxGeometry(TABLE_W, TABLE_H, TABLE_D), oakMat());
  table.name = `${name}-table`;
  table.position.set(0, TABLE_LEG_H, 0);
  room.add(table);

  // ── Whiteboard (wall-mounted, on the back wall) ──────────────────────────
  const whiteboard = new Mesh(new PlaneGeometry(WB_W, WB_H), whiteboardMat());
  whiteboard.name = `${name}-whiteboard`;
  whiteboard.position.set(0, 1.8, -halfD + 0.02);
  room.add(whiteboard);

  // Position the room group
  room.position.set(cx, 0, cz);

  return room;
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates two enclosed glass-walled study rooms on the east side of the building.
 *
 * Each room is 3.5 m × 5 m with:
 * - Frosted/glass front wall (south-facing, with a door opening)
 * - Solid side and back walls in charcoal steel frames
 * - A 4-person oak table and wall-mounted whiteboard
 *
 * Study Room 1 is the more northerly room; Study Room 2 is south.
 */
export function createStudyRooms(): Group {
  const group = new Group();
  group.name = "study-rooms";

  group.add(buildRoom("study-room-1", BASE_X, ROOM_1_Z));
  group.add(buildRoom("study-room-2", BASE_X, ROOM_2_Z));

  return group;
}

import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Grounds extend ~6 m in front of the building (setback)
// Building south wall is at z ≈ +16.65; street is at z ≈ +24
const SETBACK = 6; // meters from building to street
const BUILDING_SOUTH_Z = 16.5; // outer face of south wall
const GROUNDS_SOUTH_Z = BUILDING_SOUTH_Z + SETBACK;
const GROUNDS_HALF_W = 22; // wider than the building

// Iron fence runs across the front at the street line
const FENCE_Z = GROUNDS_SOUTH_Z;
const FENCE_POST_H = 0.9;
const FENCE_POST_R = 0.04;
const FENCE_RAIL_H = 0.04;
const FENCE_SPACING = 2.5; // meters between posts
const FENCE_POSTS = 18; // enough to cover the grounds width

// ─── Materials ────────────────────────────────────────────────────────────────

function grassMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: 0x5a8a3c, roughness: 0.95, metalness: 0 });
}

function concreteMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: 0xc0bdb7, roughness: 0.9, metalness: 0 });
}

function steelMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.3, metalness: 0.8 });
}

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the exterior grounds:
 * lawn plane, concrete path, iron fence (posts + rails).
 *
 * The grounds sit in front of the south facade.
 * Origin at building floor centre; all grounds are at y=0 (ground level).
 */
export function createGrounds(): Group {
  const group = new Group();
  group.name = "grounds";

  // ── Lawn plane (large flat plane covering the setback area) ─────────────
  const lawnW = GROUNDS_HALF_W * 2;
  const lawnD = SETBACK;
  const lawn = new Mesh(new PlaneGeometry(lawnW, lawnD), grassMat());
  lawn.name = "lawn";
  lawn.rotation.x = -Math.PI / 2;
  lawn.position.set(0, 0, BUILDING_SOUTH_Z + lawnD / 2);
  group.add(lawn);

  // ── Concrete path (straight strip from fence to entrance) ───────────────
  const pathW = 3;
  const pathD = SETBACK;
  const path = new Mesh(new BoxGeometry(pathW, 0.02, pathD), concreteMat());
  path.name = "path";
  path.position.set(0, 0.01, BUILDING_SOUTH_Z + pathD / 2);
  group.add(path);

  // ── Iron fence (along the street line) ──────────────────────────────────
  const fenceStartX = -((FENCE_POSTS - 1) * FENCE_SPACING) / 2;

  for (let i = 0; i < FENCE_POSTS; i++) {
    const x = fenceStartX + i * FENCE_SPACING;
    const post = new Mesh(
      new CylinderGeometry(FENCE_POST_R, FENCE_POST_R, FENCE_POST_H, 8),
      steelMat(),
    );
    post.name = `fence-post-${i + 1}`;
    post.position.set(x, FENCE_POST_H / 2, FENCE_Z);
    group.add(post);
  }

  // Top rail and mid rail spanning all posts
  const railLen = (FENCE_POSTS - 1) * FENCE_SPACING;
  const topRail = new Mesh(new BoxGeometry(railLen, FENCE_RAIL_H, FENCE_RAIL_H), steelMat());
  topRail.name = "fence-rail-top";
  topRail.position.set(0, FENCE_POST_H - 0.05, FENCE_Z);
  group.add(topRail);

  const midRail = new Mesh(new BoxGeometry(railLen, FENCE_RAIL_H, FENCE_RAIL_H), steelMat());
  midRail.name = "fence-rail-mid";
  midRail.position.set(0, FENCE_POST_H / 2, FENCE_Z);
  group.add(midRail);

  return group;
}

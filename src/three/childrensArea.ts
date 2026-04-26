import {
  BoxGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
} from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

// Children's area: 12m × 10m, NW quadrant
// Center: (-10, 0, -2) per design document
const AREA_X = -10;
const AREA_Z = -2;
const CEILING_H = 3.6;

// Accent colors from design document
const MUSTARD_YELLOW = 0xe8b84b;
const OAK = 0xd4a96a;
const CHARCOAL = 0x2d2d2d;
const WARM_GRAY = 0xc8c4bc;
const CANVAS_TAN = 0xc8a87a;

// Arch entry (painted arch at the entrance to the children's area)
const ARCH_W = 2.4; // opening width
const ARCH_H = 2.8; // total arch height
const ARCH_T = 0.2; // arch panel thickness

// Low children's shelving (1.2m height — patron friendly)
const SHELF_H_LOW = 1.2;
const SHELF_W = 1.2;
const SHELF_D = 0.35;
const SHELF_PANELS = 3;

// Board book bins (very low, for toddlers)
const BIN_W = 0.8;
const BIN_H = 0.45;
const BIN_D = 0.5;

// Treehouse
// Center: (-12, 0, -8) per design document — relative to building origin
// But createTreehouse positions internally; createChildrensArea offsets
const TREEHOUSE_X = -2; // relative to AREA_X → -12 world
const TREEHOUSE_Z = -6; // relative to AREA_Z → -8 world
const PLATFORM_W = 5.0;
const PLATFORM_D = 4.0;
const PLATFORM_H = 0.4; // ~40cm raised platform
const POST_RADIUS = 0.08;
const POST_H = 2.8;
const CANOPY_H = POST_H + PLATFORM_H;
const STRING_LIGHT_RADIUS = 0.04;
const STRING_LIGHT_H = 0.08;

// Woodland mural (PlaneGeometry on the west wall, behind treehouse)
const MURAL_W = 5.0;
const MURAL_H = 2.8;

// Story chair (procedural oversized armchair)
const CHAIR_W = 0.75;
const CHAIR_D = 0.75;
const CHAIR_SEAT_H = 0.45;
const CHAIR_BACK_H = 0.65;
const CHAIR_ARM_H = 0.2;
const CHAIR_SEAT_THICKNESS = 0.12;

// ─── Materials ────────────────────────────────────────────────────────────────

function mustardMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: MUSTARD_YELLOW, roughness: 0.8, metalness: 0 });
}

function oakMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OAK, roughness: 0.7, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

function warmGrayMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: WARM_GRAY, roughness: 0.8, metalness: 0 });
}

function canvasMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CANVAS_TAN, roughness: 0.9, metalness: 0 });
}

function muralMat(): MeshStandardMaterial {
  // Woodland mural — warm green to suggest illustrated forest
  return new MeshStandardMaterial({ color: 0x5c8a5c, roughness: 0.9, metalness: 0 });
}

// ─── createChildrensArea ──────────────────────────────────────────────────────

/**
 * Creates the children's area geometry.
 *
 * Contains:
 * - Children's arch entry (painted arch portal in mustard yellow)
 * - Low shelving units for children's fiction and non-fiction
 * - Board book bins (very low, for toddlers)
 * - Treehouse sub-group (platform, canopy, string lights, story chair)
 * - Woodland mural on the adjacent west wall
 *
 * Position: NW quadrant, centered at (-10, 0, -2) in building space.
 */
export function createChildrensArea(): Group {
  const group = new Group();
  group.name = "childrens-area";
  group.position.set(AREA_X, 0, AREA_Z);

  // ── Children's Arch Entry ─────────────────────────────────────────────────
  // A simple portal arch: two side pillars + overhead lintel, mustard yellow
  // Positioned at the south entrance to the children's area (z = +4 relative)
  const archZ = 4;

  const archLeft = new Mesh(new BoxGeometry(ARCH_T, ARCH_H, ARCH_T), mustardMat());
  archLeft.name = "childrens-arch";
  archLeft.position.set(-ARCH_W / 2, ARCH_H / 2, archZ);
  group.add(archLeft);

  const archRight = new Mesh(new BoxGeometry(ARCH_T, ARCH_H, ARCH_T), mustardMat());
  archRight.name = "childrens-arch-right";
  archRight.position.set(ARCH_W / 2, ARCH_H / 2, archZ);
  group.add(archRight);

  const archLintel = new Mesh(new BoxGeometry(ARCH_W + ARCH_T * 2, ARCH_T, ARCH_T), mustardMat());
  archLintel.name = "childrens-arch-lintel";
  archLintel.position.set(0, ARCH_H, archZ);
  group.add(archLintel);

  // ── Low Children's Shelving ───────────────────────────────────────────────
  // Two rows of low shelving (height 1.2m) for fiction and non-fiction
  const shelfPositions: [number, number, string][] = [
    [-2, 1, "childrens-shelf-0"],
    [-2, -1, "childrens-shelf-1"],
    [1, 1, "childrens-shelf-2"],
    [1, -1, "childrens-shelf-3"],
  ];

  for (const [sx, sz, sname] of shelfPositions) {
    const shelfGroup = buildLowShelfUnit(sname);
    shelfGroup.position.set(sx, 0, sz);
    group.add(shelfGroup);
  }

  // ── Board Book Bins ───────────────────────────────────────────────────────
  // Very low bins for toddlers along the western edge
  const binPositions: [number, number, string][] = [
    [-4, -2, "board-book-bin-0"],
    [-4, -3.2, "board-book-bin-1"],
    [-4, -4.4, "board-book-bin-2"],
  ];

  for (const [bx, bz, bname] of binPositions) {
    const bin = new Mesh(new BoxGeometry(BIN_W, BIN_H, BIN_D), oakMat());
    bin.name = bname;
    bin.position.set(bx, BIN_H / 2, bz);
    group.add(bin);
  }

  // ── Treehouse ─────────────────────────────────────────────────────────────
  const treehouse = createTreehouse();
  treehouse.position.set(TREEHOUSE_X, 0, TREEHOUSE_Z);
  group.add(treehouse);

  // ── Woodland Mural ────────────────────────────────────────────────────────
  // PlaneGeometry on the west wall adjacent to the treehouse
  const mural = new Mesh(new PlaneGeometry(MURAL_W, MURAL_H), muralMat());
  mural.name = "woodland-mural";
  // West wall (relative to area center): x ≈ -5, facing east (+X)
  mural.rotation.y = Math.PI / 2;
  mural.position.set(-5.5, MURAL_H / 2, TREEHOUSE_Z);
  group.add(mural);

  return group;
}

// ─── buildLowShelfUnit ────────────────────────────────────────────────────────

/**
 * Builds a single low shelf unit (for children's area).
 * Height is 1.2m — shorter than adult shelving.
 */
function buildLowShelfUnit(name: string): Group {
  const unit = new Group();
  unit.name = name;

  // Uprights
  const uprightLeft = new Mesh(new BoxGeometry(0.04, SHELF_H_LOW, SHELF_D), charcoalMat());
  uprightLeft.name = `${name}-upright-left`;
  uprightLeft.position.set(-SHELF_W / 2, SHELF_H_LOW / 2, 0);
  unit.add(uprightLeft);

  const uprightRight = new Mesh(new BoxGeometry(0.04, SHELF_H_LOW, SHELF_D), charcoalMat());
  uprightRight.name = `${name}-upright-right`;
  uprightRight.position.set(SHELF_W / 2, SHELF_H_LOW / 2, 0);
  unit.add(uprightRight);

  // Shelf panels
  const panelSpacing = SHELF_H_LOW / SHELF_PANELS;
  for (let i = 0; i < SHELF_PANELS; i++) {
    const panel = new Mesh(new BoxGeometry(SHELF_W, 0.03, SHELF_D), oakMat());
    panel.name = `${name}-panel-${i}`;
    panel.position.set(0, panelSpacing * (i + 0.5), 0);
    unit.add(panel);
  }

  return unit;
}

// ─── createTreehouse ─────────────────────────────────────────────────────────

/**
 * Creates the treehouse geometry:
 * - Raised wooden platform (~40cm)
 * - Wood railing around the platform
 * - 4 natural timber canopy posts
 * - Horizontal canopy frame rails
 * - String light geometry (visible spheres + PointLights)
 * - Story chair (procedural oversized armchair)
 *
 * Origin at floor level, centered on the platform.
 */
export function createTreehouse(): Group {
  const group = new Group();
  group.name = "treehouse";

  // ── Platform ──────────────────────────────────────────────────────────────
  const platform = new Mesh(new BoxGeometry(PLATFORM_W, PLATFORM_H, PLATFORM_D), oakMat());
  platform.name = "treehouse-platform";
  platform.position.set(0, PLATFORM_H / 2, 0);
  group.add(platform);

  // ── Railing ───────────────────────────────────────────────────────────────
  const railingH = 0.9;
  const railingY = PLATFORM_H + railingH / 2;
  const railingT = 0.06;

  // Front and back rails
  for (const [rname, rz] of [
    ["treehouse-railing-front", PLATFORM_D / 2],
    ["treehouse-railing-back", -PLATFORM_D / 2],
  ] as [string, number][]) {
    const rail = new Mesh(new BoxGeometry(PLATFORM_W, railingT, railingT), oakMat());
    rail.name = rname;
    rail.position.set(0, railingY, rz);
    group.add(rail);
  }

  // Side rails
  for (const [rname, rx] of [
    ["treehouse-railing-left", -PLATFORM_W / 2],
    ["treehouse-railing-right", PLATFORM_W / 2],
  ] as [string, number][]) {
    const rail = new Mesh(new BoxGeometry(railingT, railingT, PLATFORM_D), oakMat());
    rail.name = rname;
    rail.position.set(rx, railingY, 0);
    group.add(rail);
  }

  // ── Canopy Posts ──────────────────────────────────────────────────────────
  const postOffsetX = PLATFORM_W / 2 - 0.2;
  const postOffsetZ = PLATFORM_D / 2 - 0.2;
  const postPositions: [string, number, number][] = [
    ["treehouse-post-0", -postOffsetX, -postOffsetZ],
    ["treehouse-post-1", postOffsetX, -postOffsetZ],
    ["treehouse-post-2", -postOffsetX, postOffsetZ],
    ["treehouse-post-3", postOffsetX, postOffsetZ],
  ];

  for (const [pname, px, pz] of postPositions) {
    const post = new Mesh(new CylinderGeometry(POST_RADIUS, POST_RADIUS, POST_H, 8), oakMat());
    post.name = pname;
    post.position.set(px, PLATFORM_H + POST_H / 2, pz);
    group.add(post);
  }

  // ── Canopy Frame Rails ────────────────────────────────────────────────────
  // Horizontal rails connecting posts at the top — forming the canopy frame
  const railY = PLATFORM_H + POST_H;
  const RAIL_R = 0.05;

  const topRailFront = new Mesh(
    new CylinderGeometry(RAIL_R, RAIL_R, PLATFORM_W - 0.3, 8),
    oakMat(),
  );
  topRailFront.name = "treehouse-rail-0";
  topRailFront.rotation.z = Math.PI / 2;
  topRailFront.position.set(0, railY, postOffsetZ);
  group.add(topRailFront);

  const topRailBack = new Mesh(new CylinderGeometry(RAIL_R, RAIL_R, PLATFORM_W - 0.3, 8), oakMat());
  topRailBack.name = "treehouse-rail-1";
  topRailBack.rotation.z = Math.PI / 2;
  topRailBack.position.set(0, railY, -postOffsetZ);
  group.add(topRailBack);

  const topRailLeft = new Mesh(new CylinderGeometry(RAIL_R, RAIL_R, PLATFORM_D - 0.3, 8), oakMat());
  topRailLeft.name = "treehouse-rail-2";
  topRailLeft.rotation.x = Math.PI / 2;
  topRailLeft.position.set(-postOffsetX, railY, 0);
  group.add(topRailLeft);

  const topRailRight = new Mesh(
    new CylinderGeometry(RAIL_R, RAIL_R, PLATFORM_D - 0.3, 8),
    oakMat(),
  );
  topRailRight.name = "treehouse-rail-3";
  topRailRight.rotation.x = Math.PI / 2;
  topRailRight.position.set(postOffsetX, railY, 0);
  group.add(topRailRight);

  // ── Canvas Canopy Drape ───────────────────────────────────────────────────
  const canopy = new Mesh(new BoxGeometry(PLATFORM_W, 0.05, PLATFORM_D), canvasMat());
  canopy.name = "treehouse-canopy";
  canopy.position.set(0, railY + 0.025, 0);
  group.add(canopy);

  // ── String Lights ─────────────────────────────────────────────────────────
  // Visible geometry (small spheres via CylinderGeometry approximation) +
  // PointLights for warm illumination from the treehouse canopy
  const STRING_LIGHT_COLOR = 0xffd080;
  const stringPositions: [number, number][] = [
    [-1.5, -1.0],
    [0, -1.0],
    [1.5, -1.0],
    [-1.5, 1.0],
    [0, 1.0],
    [1.5, 1.0],
  ];

  for (let i = 0; i < stringPositions.length; i++) {
    const [lx, lz] = stringPositions[i];
    const ly = railY - 0.3;

    // Visible bulb geometry
    const bulb = new Mesh(
      new CylinderGeometry(STRING_LIGHT_RADIUS, STRING_LIGHT_RADIUS, STRING_LIGHT_H, 6),
      new MeshStandardMaterial({
        color: STRING_LIGHT_COLOR,
        emissive: STRING_LIGHT_COLOR,
        emissiveIntensity: 1.0,
        roughness: 0.3,
        metalness: 0,
      }),
    );
    bulb.name = `string-light-${i}`;
    bulb.position.set(lx, ly, lz);
    group.add(bulb);

    // PointLight for warm illumination
    const light = new PointLight(STRING_LIGHT_COLOR, 0.8 / stringPositions.length, 5);
    light.name = `string-light-point-${i}`;
    light.position.set(lx, ly, lz);
    group.add(light);
  }

  // ── Story Chair ───────────────────────────────────────────────────────────
  // Procedural oversized armchair — faces the children on the platform
  const chairGroup = new Group();
  chairGroup.name = "story-chair";
  chairGroup.position.set(0, 0, -(PLATFORM_D / 2 + 0.8));

  // Seat
  const seat = new Mesh(new BoxGeometry(CHAIR_W, CHAIR_SEAT_THICKNESS, CHAIR_D), warmGrayMat());
  seat.name = "story-chair-seat";
  seat.position.set(0, CHAIR_SEAT_H, 0);
  chairGroup.add(seat);

  // Back
  const back = new Mesh(
    new BoxGeometry(CHAIR_W, CHAIR_BACK_H, CHAIR_SEAT_THICKNESS),
    warmGrayMat(),
  );
  back.name = "story-chair-back";
  back.position.set(0, CHAIR_SEAT_H + CHAIR_BACK_H / 2, -CHAIR_D / 2);
  chairGroup.add(back);

  // Left arm
  const armLeft = new Mesh(
    new BoxGeometry(CHAIR_SEAT_THICKNESS, CHAIR_ARM_H, CHAIR_D),
    warmGrayMat(),
  );
  armLeft.name = "story-chair-arm-left";
  armLeft.position.set(-CHAIR_W / 2, CHAIR_SEAT_H + CHAIR_ARM_H / 2, 0);
  chairGroup.add(armLeft);

  // Right arm
  const armRight = new Mesh(
    new BoxGeometry(CHAIR_SEAT_THICKNESS, CHAIR_ARM_H, CHAIR_D),
    warmGrayMat(),
  );
  armRight.name = "story-chair-arm-right";
  armRight.position.set(CHAIR_W / 2, CHAIR_SEAT_H + CHAIR_ARM_H / 2, 0);
  chairGroup.add(armRight);

  group.add(chairGroup);

  return group;
}

import {
  BoxGeometry,
  Color,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
} from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

const OAK = 0xd4a96a;
const CHARCOAL = 0x2d2d2d;

// Upright dimensions
const UPRIGHT_W = 0.04;
const UPRIGHT_D_FACTOR = 1.0; // upright depth matches unit depth

// Shelf panel
const PANEL_H = 0.03; // shelf panel thickness

// Book dimensions
const BOOK_W = 0.04;
const BOOK_H = 0.22;
const BOOK_D = 0.15;

// Spine color palette from design document
const SPINE_COLORS = [0xc0392b, 0x0d7377, 0xe8b84b, 0x2d2d2d, 0x8b5e3c, 0x5c8a5c];

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShelfUnitOptions {
  /** Total width (X) of the unit in meters */
  width: number;
  /** Total height (Y) of the unit in meters */
  height: number;
  /** Depth (Z) of the unit in meters */
  depth: number;
  /** Number of shelf panels (horizontal levels) */
  shelves: number;
}

// ─── Materials ────────────────────────────────────────────────────────────────

function oakMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: OAK, roughness: 0.7, metalness: 0 });
}

function charcoalMat(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: CHARCOAL, roughness: 0.3, metalness: 0.8 });
}

// ─── createShelfUnit ──────────────────────────────────────────────────────────

/**
 * Creates a parametric double-sided shelf unit.
 *
 * Origin is at the bottom-center of the unit. Shelves are evenly distributed
 * vertically. Left and right uprights frame the unit with charcoal steel.
 * Shelf panels are light oak.
 *
 * @param options - Dimensions and shelf count
 * @returns A Group containing all shelf geometry
 */
export function createShelfUnit(options: ShelfUnitOptions): Group {
  const { width, height, depth, shelves } = options;
  const group = new Group();
  group.name = "shelf-unit";

  const uprightH = height;
  const uprightW = UPRIGHT_W;
  const uprightD = depth * UPRIGHT_D_FACTOR;

  // ── Left upright ─────────────────────────────────────────────────────────
  const leftUpright = new Mesh(new BoxGeometry(uprightW, uprightH, uprightD), charcoalMat());
  leftUpright.name = "upright-left";
  leftUpright.position.set(-(width / 2) + uprightW / 2, height / 2, 0);
  group.add(leftUpright);

  // ── Right upright ────────────────────────────────────────────────────────
  const rightUpright = new Mesh(new BoxGeometry(uprightW, uprightH, uprightD), charcoalMat());
  rightUpright.name = "upright-right";
  rightUpright.position.set(width / 2 - uprightW / 2, height / 2, 0);
  group.add(rightUpright);

  // ── Shelf panels ─────────────────────────────────────────────────────────
  // Bottom panel at y=0 (base), top panel at y=height, intermediate panels evenly spaced
  const panelSpacing = height / (shelves - 1);

  for (let i = 0; i < shelves; i++) {
    const panel = new Mesh(new BoxGeometry(width, PANEL_H, depth), oakMat());
    panel.name = `shelf-panel-${i}`;
    panel.position.set(0, i * panelSpacing, 0);
    group.add(panel);
  }

  return group;
}

// ─── createBookRow ────────────────────────────────────────────────────────────

/**
 * Creates an InstancedMesh of books to populate a shelf row.
 *
 * Books are small upright rectangles with randomized spine colors from
 * the design palette. Call this once per shelf level and position the
 * result above the shelf panel.
 *
 * @param count - Number of book instances to create
 * @param seed  - Optional numeric seed for deterministic color assignment
 * @returns An InstancedMesh ready to be positioned on a shelf
 */
export function createBookRow(count: number, seed = 0): InstancedMesh {
  const geometry = new BoxGeometry(BOOK_W, BOOK_H, BOOK_D);
  // Use a single-color base material; per-instance color is set via setColorAt
  const material = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.8, metalness: 0 });

  const mesh = new InstancedMesh(geometry, material, count);
  mesh.name = `book-row-${seed}`;

  const matrix = new Matrix4();
  const color = new Color();

  for (let i = 0; i < count; i++) {
    // Position books side by side along X
    matrix.makeTranslation(i * (BOOK_W + 0.005), BOOK_H / 2, 0);
    mesh.setMatrixAt(i, matrix);

    // Randomize spine color from palette
    const colorHex = SPINE_COLORS[(i + seed) % SPINE_COLORS.length];
    color.setHex(colorHex);
    mesh.setColorAt(i, color);
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

  return mesh;
}

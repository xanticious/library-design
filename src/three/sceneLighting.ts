import { AmbientLight, DirectionalLight, PointLight } from "three";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SceneLights {
  /** Primary directional light — the sun, from the southwest. */
  sun: DirectionalLight;
  /** Ambient fill light — cool sky colour. */
  sky: AmbientLight;
  /** Warm PointLights placed just inside each south/east/west window. */
  windowLights: PointLight[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

// Window positions (simplified — south-facing windows along south wall)
// South wall z ≈ +16.65; lights sit just inside at z ≈ +14
const WINDOW_POSITIONS: [number, number, number][] = [
  // South facade windows (3 bays × 2 rows → 6 lights)
  [-8, 1.5, 14],
  [0, 1.5, 14],
  [8, 1.5, 14],
  // East wall windows
  [14, 1.5, -4],
  [14, 1.5, 4],
  // West wall windows
  [-14, 1.5, -4],
  [-14, 1.5, 4],
];

// ─── Builder ──────────────────────────────────────────────────────────────────

/**
 * Creates the scene lights:
 * - DirectionalLight (sun) from the southwest
 * - AmbientLight (cool sky fill)
 * - PointLights at each window (warm daylight spill)
 *
 * The caller is responsible for adding these to the scene.
 */
export function createSceneLighting(): SceneLights {
  // ── Directional sun light ────────────────────────────────────────────────
  const sun = new DirectionalLight(0xfff5e0, 2.0);
  // Southwest position: negative X (west), high Y (up), positive Z (south)
  sun.position.set(-30, 50, 20);
  sun.castShadow = true;
  sun.shadow.mapSize.width = 2048;
  sun.shadow.mapSize.height = 2048;

  // ── Ambient sky fill ─────────────────────────────────────────────────────
  const sky = new AmbientLight(0xb8c8d8, 0.4);

  // ── Window PointLights ───────────────────────────────────────────────────
  const windowLights: PointLight[] = WINDOW_POSITIONS.map(([x, y, z]) => {
    const light = new PointLight(0xfff0d0, 0.3, 12);
    light.position.set(x, y, z);
    return light;
  });

  return { sun, sky, windowLights };
}

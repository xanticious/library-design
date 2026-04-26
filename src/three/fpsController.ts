/**
 * FPS Controller
 *
 * Pure math functions are exported for unit testing.
 * The FpsController class wires them to DOM events and the Three.js camera.
 */

import { PerspectiveCamera } from "three";

// ─── Constants ────────────────────────────────────────────────────────────────

export const PLAYER_HEIGHT = 1.7; // metres (eye level)
export const PLAYER_SPEED = 4.0; // m/s walk speed
export const MOUSE_SENSITIVITY = 0.002; // radians per pixel
export const PITCH_CLAMP_DEG = 80; // max look-up/down degrees

// ─── Types ────────────────────────────────────────────────────────────────────

export type KeyState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

// ─── Pure functions (exported for tests) ──────────────────────────────────────

/**
 * Compute world-space XZ displacement for one frame.
 *
 * Three.js coordinate system:
 *   - yaw = 0  → camera looks toward -Z (North)
 *   - yaw = π/2 → camera looks toward +X (East)
 *
 * @param keys    Current key states
 * @param yaw     Camera yaw in radians
 * @param speed   Movement speed in m/s
 * @param dt      Delta time in seconds
 */
export function computeMovement(
  keys: KeyState,
  yaw: number,
  speed: number,
  dt: number,
): { dx: number; dz: number } {
  let forward = 0;
  let strafe = 0;

  if (keys.w) forward -= 1;
  if (keys.s) forward += 1;
  if (keys.a) strafe -= 1;
  if (keys.d) strafe += 1;

  // Normalise diagonal so speed is constant
  const len = Math.hypot(forward, strafe);
  if (len > 0) {
    forward /= len;
    strafe /= len;
  }

  // Rotate by yaw: forward is -Z when yaw=0
  // Camera world-forward = (-sin(yaw), 0, -cos(yaw))
  // Camera world-right   = ( cos(yaw), 0, -sin(yaw))
  const sin = Math.sin(yaw);
  const cos = Math.cos(yaw);

  return {
    dx: (strafe * cos + forward * sin) * speed * dt,
    dz: (-strafe * sin + forward * cos) * speed * dt,
  };
}

/**
 * Clamp a pitch value (radians) to [-maxDegrees, +maxDegrees].
 */
export function clampPitch(pitch: number, maxDegrees: number): number {
  const max = (maxDegrees * Math.PI) / 180;
  return Math.max(-max, Math.min(max, pitch));
}

// ─── FpsController class ──────────────────────────────────────────────────────

/**
 * Attaches keyboard and pointer-lock mouse listeners to control a
 * PerspectiveCamera in first-person mode.
 *
 * Usage:
 *   const ctrl = new FpsController(camera, canvas);
 *   ctrl.enable();
 *   // in render loop: ctrl.update(dt);
 *   ctrl.disable();
 */
export class FpsController {
  private camera: PerspectiveCamera;
  private canvas: HTMLCanvasElement;
  private keys: KeyState = { w: false, a: false, s: false, d: false };
  private yaw = 0;
  private pitch = 0;
  private active = false;

  constructor(camera: PerspectiveCamera, canvas: HTMLCanvasElement) {
    this.camera = camera;
    this.canvas = canvas;
  }

  enable() {
    this.active = true;
    document.addEventListener("keydown", this.onKeyDown);
    document.addEventListener("keyup", this.onKeyUp);
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("pointerlockchange", this.onPointerLockChange);
    this.canvas.requestPointerLock();
  }

  disable() {
    this.active = false;
    document.removeEventListener("keydown", this.onKeyDown);
    document.removeEventListener("keyup", this.onKeyUp);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("pointerlockchange", this.onPointerLockChange);
    if (document.pointerLockElement === this.canvas) {
      document.exitPointerLock();
    }
  }

  /**
   * Call once per animation frame with the elapsed time in seconds.
   */
  update(dt: number) {
    if (!this.active) return;

    const { dx, dz } = computeMovement(this.keys, this.yaw, PLAYER_SPEED, dt);
    this.camera.position.x += dx;
    this.camera.position.z += dz;

    // Apply rotation: yaw around Y, pitch around local X
    this.camera.rotation.order = "YXZ";
    this.camera.rotation.y = this.yaw;
    this.camera.rotation.x = this.pitch;
  }

  private onKeyDown = (e: KeyboardEvent) => {
    this.setKey(e.code, true);
  };

  private onKeyUp = (e: KeyboardEvent) => {
    this.setKey(e.code, false);
  };

  private setKey(code: string, value: boolean) {
    switch (code) {
      case "KeyW":
      case "ArrowUp":
        this.keys.w = value;
        break;
      case "KeyS":
      case "ArrowDown":
        this.keys.s = value;
        break;
      case "KeyA":
      case "ArrowLeft":
        this.keys.a = value;
        break;
      case "KeyD":
      case "ArrowRight":
        this.keys.d = value;
        break;
    }
  }

  private onMouseMove = (e: MouseEvent) => {
    if (document.pointerLockElement !== this.canvas) return;
    this.yaw -= e.movementX * MOUSE_SENSITIVITY;
    this.pitch = clampPitch(this.pitch - e.movementY * MOUSE_SENSITIVITY, PITCH_CLAMP_DEG);
  };

  private onPointerLockChange = () => {
    if (document.pointerLockElement !== this.canvas) {
      this.active = false;
    }
  };
}

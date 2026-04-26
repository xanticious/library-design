import { describe, expect, it } from "vitest";
import { clampPitch, computeMovement, type KeyState } from "../../src/three/fpsController";

// In Three.js: yaw=0 means camera looks toward -Z (North).
// Forward (W) at yaw=0 should give dz < 0 (moving north).

const noKeys: KeyState = { w: false, a: false, s: false, d: false };

describe("computeMovement", () => {
  it("returns zero displacement when no keys are pressed", () => {
    const { dx, dz } = computeMovement(noKeys, 0, 4, 1);
    expect(dx).toBe(0);
    expect(dz).toBe(0);
  });

  it("moves forward (-Z) when W is pressed at yaw=0", () => {
    const { dx, dz } = computeMovement({ ...noKeys, w: true }, 0, 4, 1);
    expect(dx).toBeCloseTo(0, 5);
    expect(dz).toBeCloseTo(-4, 5);
  });

  it("moves backward (+Z) when S is pressed at yaw=0", () => {
    const { dx, dz } = computeMovement({ ...noKeys, s: true }, 0, 4, 1);
    expect(dx).toBeCloseTo(0, 5);
    expect(dz).toBeCloseTo(4, 5);
  });

  it("strafes left (-X) when A is pressed at yaw=0", () => {
    const { dx, dz } = computeMovement({ ...noKeys, a: true }, 0, 4, 1);
    expect(dx).toBeCloseTo(-4, 5);
    expect(dz).toBeCloseTo(0, 5);
  });

  it("strafes right (+X) when D is pressed at yaw=0", () => {
    const { dx, dz } = computeMovement({ ...noKeys, d: true }, 0, 4, 1);
    expect(dx).toBeCloseTo(4, 5);
    expect(dz).toBeCloseTo(0, 5);
  });

  it("normalises diagonal movement so speed stays constant", () => {
    // W+D diagonal: magnitude should still equal speed*dt = 4
    const { dx, dz } = computeMovement({ ...noKeys, w: true, d: true }, 0, 4, 1);
    const mag = Math.hypot(dx, dz);
    expect(mag).toBeCloseTo(4, 4);
  });

  it("scales displacement by delta-time", () => {
    const { dz } = computeMovement({ ...noKeys, w: true }, 0, 4, 0.5);
    expect(dz).toBeCloseTo(-2, 5);
  });

  it("rotates forward direction with yaw (90° east = +X forward)", () => {
    // yaw = π/2: camera looks toward +X, so W should give +dx
    const { dx, dz } = computeMovement({ ...noKeys, w: true }, Math.PI / 2, 4, 1);
    expect(dx).toBeCloseTo(4, 4);
    expect(dz).toBeCloseTo(0, 4);
  });
});

describe("clampPitch", () => {
  const MAX = 80; // degrees

  it("returns pitch unchanged when within bounds", () => {
    const radians = (45 * Math.PI) / 180;
    expect(clampPitch(radians, MAX)).toBeCloseTo(radians, 10);
  });

  it("clamps pitch above maxDegrees", () => {
    const tooHigh = (90 * Math.PI) / 180;
    const clamped = clampPitch(tooHigh, MAX);
    expect(clamped).toBeCloseTo((MAX * Math.PI) / 180, 10);
  });

  it("clamps pitch below -maxDegrees", () => {
    const tooLow = (-90 * Math.PI) / 180;
    const clamped = clampPitch(tooLow, MAX);
    expect(clamped).toBeCloseTo((-MAX * Math.PI) / 180, 10);
  });

  it("allows pitch of 0", () => {
    expect(clampPitch(0, MAX)).toBe(0);
  });
});

import { describe, expect, it } from "vitest";
import { AmbientLight, DirectionalLight, PointLight } from "three";
import { createSceneLighting } from "../../src/three/sceneLighting";

describe("createSceneLighting", () => {
  it("returns an object with a sun DirectionalLight", () => {
    const lights = createSceneLighting();
    expect(lights.sun).toBeInstanceOf(DirectionalLight);
  });

  it("sun has warm sunlight color #FFF5E0", () => {
    const { sun } = createSceneLighting();
    expect(sun.color.getHexString()).toBe("fff5e0");
  });

  it("sun has intensity 2.0", () => {
    const { sun } = createSceneLighting();
    expect(sun.intensity).toBeCloseTo(2.0, 3);
  });

  it("sun is positioned to the southwest (negative X, positive Y, positive Z)", () => {
    const { sun } = createSceneLighting();
    expect(sun.position.x).toBeLessThan(0);
    expect(sun.position.y).toBeGreaterThan(0);
    expect(sun.position.z).toBeGreaterThan(0);
  });

  it("sun casts shadows", () => {
    const { sun } = createSceneLighting();
    expect(sun.castShadow).toBe(true);
  });

  it("returns an object with a sky AmbientLight", () => {
    const lights = createSceneLighting();
    expect(lights.sky).toBeInstanceOf(AmbientLight);
  });

  it("sky has cool fill color #B8C8D8", () => {
    const { sky } = createSceneLighting();
    expect(sky.color.getHexString()).toBe("b8c8d8");
  });

  it("sky has intensity 0.4", () => {
    const { sky } = createSceneLighting();
    expect(sky.intensity).toBeCloseTo(0.4, 3);
  });

  it("returns window PointLights array", () => {
    const lights = createSceneLighting();
    expect(Array.isArray(lights.windowLights)).toBe(true);
    expect(lights.windowLights.length).toBeGreaterThan(0);
  });

  it("window PointLights are PointLight instances with warm color", () => {
    const { windowLights } = createSceneLighting();
    for (const light of windowLights) {
      expect(light).toBeInstanceOf(PointLight);
      // Warm white — red channel should be high
      expect(light.color.r).toBeGreaterThan(0.9);
    }
  });
});

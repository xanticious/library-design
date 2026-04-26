import { describe, expect, it } from "vitest";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { createComputerArea } from "../../src/three/computerArea";

describe("createComputerArea", () => {
  it("returns a Group", () => {
    const result = createComputerArea();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains exactly 12 desk surfaces", () => {
    const group = createComputerArea();
    const desks: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("pc-desk-")) desks.push(obj as Mesh);
    });
    expect(desks.length).toBe(12);
  });

  it("contains exactly 12 monitor meshes", () => {
    const group = createComputerArea();
    const monitors: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("pc-monitor-")) monitors.push(obj as Mesh);
    });
    expect(monitors.length).toBe(12);
  });

  it("desk surfaces have white laminate material (#FAFAF8)", () => {
    const group = createComputerArea();
    const desk = group.getObjectByName("pc-desk-0") as Mesh;
    const mat = desk.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("fafaf8");
  });

  it("monitors have flat black (charcoal) material (#2D2D2D)", () => {
    const group = createComputerArea();
    const monitor = group.getObjectByName("pc-monitor-0") as Mesh;
    const mat = monitor.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("2d2d2d");
  });

  it("stations are arranged in 2 back-to-back rows of 6", () => {
    const group = createComputerArea();
    // Row A: stations 0-5, Row B: stations 6-11 — verify they have different Z
    const desk0 = group.getObjectByName("pc-desk-0")!;
    const desk6 = group.getObjectByName("pc-desk-6")!;
    expect(Math.abs(desk0.position.z - desk6.position.z)).toBeGreaterThan(0.3);
  });

  it("contains a printer/copier station", () => {
    const group = createComputerArea();
    const printer = group.getObjectByName("pc-printer");
    expect(printer).toBeInstanceOf(Mesh);
  });
});

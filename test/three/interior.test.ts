import { describe, expect, it } from "vitest";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { createInterior } from "../../src/three/interior";

describe("createInterior", () => {
  it("returns a Group", () => {
    const result = createInterior();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a floor mesh at y=0", () => {
    const group = createInterior();
    const floor = group.getObjectByName("floor");
    expect(floor).toBeInstanceOf(Mesh);
    expect(floor!.position.y).toBeCloseTo(0, 3);
  });

  it("floor has oak material color #D4A96A", () => {
    const group = createInterior();
    const floor = group.getObjectByName("floor") as Mesh;
    const mat = floor.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("d4a96a");
  });

  it("contains a ceiling mesh at y=3.6", () => {
    const group = createInterior();
    const ceiling = group.getObjectByName("ceiling");
    expect(ceiling).toBeInstanceOf(Mesh);
    expect(ceiling!.position.y).toBeCloseTo(3.6, 2);
  });

  it("ceiling has off-white material color #FAFAF8", () => {
    const group = createInterior();
    const ceiling = group.getObjectByName("ceiling") as Mesh;
    const mat = ceiling.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("fafaf8");
  });

  it("contains interior walls (at least 2 zone dividers)", () => {
    const group = createInterior();
    const walls: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("wall-interior-")) walls.push(obj as Mesh);
    });
    expect(walls.length).toBeGreaterThanOrEqual(2);
  });

  it("interior walls have warm off-white material", () => {
    const group = createInterior();
    const walls: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("wall-interior-")) walls.push(obj as Mesh);
    });
    const mat = (walls[0] as Mesh).material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("fafaf8");
  });
});

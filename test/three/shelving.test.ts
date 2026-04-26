import { describe, expect, it } from "vitest";
import { Group, InstancedMesh, Mesh, MeshStandardMaterial } from "three";
import { createShelfUnit, createBookRow } from "../../src/three/shelving";

describe("createShelfUnit", () => {
  it("returns a Group", () => {
    const result = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
    expect(result).toBeInstanceOf(Group);
  });

  it("contains shelf panel meshes matching the shelves count", () => {
    const group = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
    const panels: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("shelf-panel-")) panels.push(obj as Mesh);
    });
    expect(panels.length).toBe(5);
  });

  it("contains left and right upright meshes", () => {
    const group = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
    expect(group.getObjectByName("upright-left")).toBeInstanceOf(Mesh);
    expect(group.getObjectByName("upright-right")).toBeInstanceOf(Mesh);
  });

  it("shelf panels have oak material color #D4A96A", () => {
    const group = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
    const panel = group.getObjectByName("shelf-panel-0") as Mesh;
    const mat = panel.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("d4a96a");
  });

  it("uprights have charcoal steel material #2D2D2D", () => {
    const group = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
    const upright = group.getObjectByName("upright-left") as Mesh;
    const mat = upright.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("2d2d2d");
  });

  it("accepts a different shelves count", () => {
    const group = createShelfUnit({ width: 1.2, height: 1.5, depth: 0.35, shelves: 3 });
    const panels: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("shelf-panel-")) panels.push(obj as Mesh);
    });
    expect(panels.length).toBe(3);
  });

  it("shelf panels span the full width of the unit", () => {
    const width = 1.5;
    const group = createShelfUnit({ width, height: 2.1, depth: 0.4, shelves: 4 });
    const panel = group.getObjectByName("shelf-panel-0") as Mesh;
    // BoxGeometry parameters are stored in geometry.parameters
    expect((panel.geometry as any).parameters.width).toBeCloseTo(width, 2);
  });
});

describe("createBookRow", () => {
  it("returns an InstancedMesh", () => {
    const result = createBookRow(10);
    expect(result).toBeInstanceOf(InstancedMesh);
  });

  it("has the correct instance count", () => {
    const mesh = createBookRow(15);
    expect(mesh.count).toBe(15);
  });

  it("has a name starting with 'book-row'", () => {
    const mesh = createBookRow(10);
    expect(mesh.name).toMatch(/^book-row/);
  });
});

import { describe, expect, it } from "vitest";
import { Group, Mesh, MeshStandardMaterial } from "three";
import { createExterior } from "../../src/three/exterior";

describe("createExterior", () => {
  it("returns a Group", () => {
    const result = createExterior();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a south facade wall mesh named 'facade-south'", () => {
    const group = createExterior();
    const facade = group.getObjectByName("facade-south");
    expect(facade).toBeInstanceOf(Mesh);
  });

  it("south facade wall has limestone material color #F0EDE6", () => {
    const group = createExterior();
    const facade = group.getObjectByName("facade-south") as Mesh;
    const mat = facade.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("f0ede6");
  });

  it("south facade wall material has roughness 0.85", () => {
    const group = createExterior();
    const facade = group.getObjectByName("facade-south") as Mesh;
    const mat = facade.material as MeshStandardMaterial;
    expect(mat.roughness).toBeCloseTo(0.85, 3);
  });

  it("contains all four exterior walls (north, east, west)", () => {
    const group = createExterior();
    expect(group.getObjectByName("facade-north")).toBeInstanceOf(Mesh);
    expect(group.getObjectByName("facade-east")).toBeInstanceOf(Mesh);
    expect(group.getObjectByName("facade-west")).toBeInstanceOf(Mesh);
  });

  it("contains a roof mesh", () => {
    const group = createExterior();
    expect(group.getObjectByName("roof")).toBeInstanceOf(Mesh);
  });

  it("contains entrance steps (at least 3 step meshes)", () => {
    const group = createExterior();
    const steps: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("step-")) steps.push(obj as Mesh);
    });
    expect(steps.length).toBeGreaterThanOrEqual(3);
  });

  it("entrance steps are positioned south of the building", () => {
    const group = createExterior();
    const step1 = group.getObjectByName("step-1");
    expect(step1).toBeTruthy();
    // Steps are south of the south wall (z > 0)
    expect(step1!.position.z).toBeGreaterThan(0);
  });

  it("contains window meshes on the south facade (at least 6)", () => {
    const group = createExterior();
    const windows: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("window-south-")) windows.push(obj as Mesh);
    });
    expect(windows.length).toBeGreaterThanOrEqual(6);
  });
});

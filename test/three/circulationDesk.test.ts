import { describe, expect, it } from "vitest";
import { Group, InstancedMesh, Mesh, MeshStandardMaterial } from "three";
import { createCirculationDesk } from "../../src/three/circulationDesk";

describe("createCirculationDesk", () => {
  it("returns a Group", () => {
    const result = createCirculationDesk();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a desk surface mesh named 'circulation-desk-surface'", () => {
    const group = createCirculationDesk();
    const surface = group.getObjectByName("circulation-desk-surface");
    expect(surface).toBeInstanceOf(Mesh);
  });

  it("desk surface has oak material color #D4A96A", () => {
    const group = createCirculationDesk();
    const surface = group.getObjectByName("circulation-desk-surface") as Mesh;
    const mat = surface.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("d4a96a");
  });

  it("contains a book return slot mesh", () => {
    const group = createCirculationDesk();
    const slot = group.getObjectByName("circulation-desk-return-slot");
    expect(slot).toBeInstanceOf(Mesh);
  });

  it("contains at least 2 workstation meshes", () => {
    const group = createCirculationDesk();
    const workstations: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("workstation-")) workstations.push(obj as Mesh);
    });
    expect(workstations.length).toBeGreaterThanOrEqual(2);
  });

  it("desk is positioned at the lobby–floor boundary (z between 6 and 10)", () => {
    const group = createCirculationDesk();
    const surface = group.getObjectByName("circulation-desk-surface")!;
    expect(surface.position.z).toBeGreaterThanOrEqual(6);
    expect(surface.position.z).toBeLessThanOrEqual(10);
  });

  it("desk has a low platform elevation mesh", () => {
    const group = createCirculationDesk();
    const platform = group.getObjectByName("circulation-desk-platform");
    expect(platform).toBeInstanceOf(Mesh);
  });
});

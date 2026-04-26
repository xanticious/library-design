import { describe, expect, it } from "vitest";
import { Group, InstancedMesh, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { createCommunityRoom } from "../../src/three/communityRoom";

describe("createCommunityRoom", () => {
  it("returns a Group", () => {
    const result = createCommunityRoom();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a projection screen mesh", () => {
    const group = createCommunityRoom();
    const screen = group.getObjectByName("community-room-screen");
    expect(screen).toBeInstanceOf(Mesh);
  });

  it("projection screen is white (#FAFAF8)", () => {
    const group = createCommunityRoom();
    const screen = group.getObjectByName("community-room-screen") as Mesh;
    const mat = screen.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("fafaf8");
  });

  it("contains a folding partition wall mesh", () => {
    const group = createCommunityRoom();
    const partition = group.getObjectByName("community-room-partition");
    expect(partition).toBeInstanceOf(Mesh);
  });

  it("contains a chair InstancedMesh with at least 30 instances", () => {
    const group = createCommunityRoom();
    let chairs: InstancedMesh | undefined;
    group.traverse((obj) => {
      if (obj.name === "community-room-chairs") chairs = obj as InstancedMesh;
    });
    expect(chairs).toBeInstanceOf(InstancedMesh);
    expect(chairs!.count).toBeGreaterThanOrEqual(30);
  });

  it("contains a glass front wall facing the main floor", () => {
    const group = createCommunityRoom();
    const glassWall = group.getObjectByName("community-room-glass-front");
    expect(glassWall).toBeInstanceOf(Mesh);
    const mat = (glassWall as Mesh).material as MeshPhysicalMaterial;
    expect(mat.transmission).toBeGreaterThan(0.5);
  });

  it("community room is on the east side of the building (x > 6)", () => {
    const group = createCommunityRoom();
    expect(group.position.x).toBeGreaterThan(6);
  });
});

import { describe, expect, it } from "vitest";
import { Group, Mesh } from "three";
import { createGrounds } from "../../src/three/grounds";

describe("createGrounds", () => {
  it("returns a Group", () => {
    const result = createGrounds();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a lawn plane mesh at y=0", () => {
    const group = createGrounds();
    const lawn = group.getObjectByName("lawn");
    expect(lawn).toBeInstanceOf(Mesh);
    expect(lawn!.position.y).toBe(0);
  });

  it("contains a path mesh at y=0", () => {
    const group = createGrounds();
    const path = group.getObjectByName("path");
    expect(path).toBeInstanceOf(Mesh);
  });

  it("contains fence posts (at least 4)", () => {
    const group = createGrounds();
    const posts: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("fence-post-")) posts.push(obj as Mesh);
    });
    expect(posts.length).toBeGreaterThanOrEqual(4);
  });

  it("contains fence rails connecting the posts", () => {
    const group = createGrounds();
    const rails: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("fence-rail-")) rails.push(obj as Mesh);
    });
    expect(rails.length).toBeGreaterThanOrEqual(2);
  });
});

import { describe, expect, it } from "vitest";
import {
  CylinderGeometry,
  Group,
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
  PointLight,
} from "three";
import { createChildrensArea, createTreehouse } from "../../src/three/childrensArea";

// ─── createChildrensArea ──────────────────────────────────────────────────────

describe("createChildrensArea", () => {
  it("returns a Group", () => {
    const result = createChildrensArea();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a children's arch entry mesh", () => {
    const group = createChildrensArea();
    const arch = group.getObjectByName("childrens-arch");
    expect(arch).toBeInstanceOf(Mesh);
  });

  it("arch has mustard yellow accent color (#E8B84B)", () => {
    const group = createChildrensArea();
    const arch = group.getObjectByName("childrens-arch") as Mesh;
    const mat = arch.material as MeshStandardMaterial;
    expect(mat.color.getHexString()).toBe("e8b84b");
  });

  it("contains at least 4 low shelving units (height ≤ 1.5m)", () => {
    const group = createChildrensArea();
    const shelves: Group[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("childrens-shelf-")) shelves.push(obj as Group);
    });
    expect(shelves.length).toBeGreaterThanOrEqual(4);
  });

  it("low shelving units have panels at max 1.5m height", () => {
    const group = createChildrensArea();
    const panels: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.includes("-panel-")) panels.push(obj as Mesh);
    });
    // All panel Y positions should be ≤ 1.5m (low children's shelving)
    for (const panel of panels) {
      expect(panel.position.y).toBeLessThanOrEqual(1.5);
    }
  });

  it("contains at least 2 board book bins", () => {
    const group = createChildrensArea();
    const bins: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("board-book-bin-")) bins.push(obj as Mesh);
    });
    expect(bins.length).toBeGreaterThanOrEqual(2);
  });

  it("board book bins are very low (≤ 0.6m height)", () => {
    const group = createChildrensArea();
    const bins: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("board-book-bin-")) bins.push(obj as Mesh);
    });
    for (const bin of bins) {
      const geo = bin.geometry as any;
      expect(geo.parameters.height).toBeLessThanOrEqual(0.6);
    }
  });

  it("contains a treehouse sub-group", () => {
    const group = createChildrensArea();
    const treehouse = group.getObjectByName("treehouse");
    expect(treehouse).toBeInstanceOf(Group);
  });

  it("contains a woodland mural mesh using PlaneGeometry", () => {
    const group = createChildrensArea();
    const mural = group.getObjectByName("woodland-mural") as Mesh;
    expect(mural).toBeInstanceOf(Mesh);
    expect(mural.geometry).toBeInstanceOf(PlaneGeometry);
  });
});

// ─── createTreehouse ─────────────────────────────────────────────────────────

describe("createTreehouse", () => {
  it("returns a Group named 'treehouse'", () => {
    const result = createTreehouse();
    expect(result).toBeInstanceOf(Group);
    expect(result.name).toBe("treehouse");
  });

  it("has a platform mesh elevated ~0.4m off the floor", () => {
    const group = createTreehouse();
    const platform = group.getObjectByName("treehouse-platform") as Mesh;
    expect(platform).toBeInstanceOf(Mesh);
    // Platform center Y = PLATFORM_H / 2 = 0.2
    expect(platform.position.y).toBeCloseTo(0.2, 2);
  });

  it("platform is raised (top surface at ~0.4m)", () => {
    const group = createTreehouse();
    const platform = group.getObjectByName("treehouse-platform") as Mesh;
    const geo = platform.geometry as any;
    const topY = platform.position.y + geo.parameters.height / 2;
    expect(topY).toBeCloseTo(0.4, 2);
  });

  it("has exactly 4 canopy posts", () => {
    const group = createTreehouse();
    const posts: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("treehouse-post-")) posts.push(obj as Mesh);
    });
    expect(posts.length).toBe(4);
  });

  it("canopy posts use CylinderGeometry", () => {
    const group = createTreehouse();
    const post = group.getObjectByName("treehouse-post-0") as Mesh;
    expect(post.geometry).toBeInstanceOf(CylinderGeometry);
  });

  it("has at least 4 canopy frame rails", () => {
    const group = createTreehouse();
    const rails: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("treehouse-rail-")) rails.push(obj as Mesh);
    });
    expect(rails.length).toBeGreaterThanOrEqual(4);
  });

  it("has at least 4 string light bulb meshes", () => {
    const group = createTreehouse();
    const lights: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("string-light-") && !obj.name.includes("point")) {
        lights.push(obj as Mesh);
      }
    });
    expect(lights.length).toBeGreaterThanOrEqual(4);
  });

  it("string lights have warm emissive material (#FFD080)", () => {
    const group = createTreehouse();
    const bulb = group.getObjectByName("string-light-0") as Mesh;
    const mat = bulb.material as MeshStandardMaterial;
    expect(mat.emissive.getHexString()).toBe("ffd080");
    expect(mat.emissiveIntensity).toBeGreaterThan(0);
  });

  it("has PointLights for string light illumination", () => {
    const group = createTreehouse();
    const pointLights: PointLight[] = [];
    group.traverse((obj) => {
      if (obj instanceof PointLight) pointLights.push(obj);
    });
    expect(pointLights.length).toBeGreaterThanOrEqual(4);
  });

  it("has a story chair group", () => {
    const group = createTreehouse();
    const chair = group.getObjectByName("story-chair");
    expect(chair).toBeInstanceOf(Group);
  });

  it("story chair has a seat mesh", () => {
    const group = createTreehouse();
    const seat = group.getObjectByName("story-chair-seat");
    expect(seat).toBeInstanceOf(Mesh);
  });

  it("story chair has a back mesh", () => {
    const group = createTreehouse();
    const back = group.getObjectByName("story-chair-back");
    expect(back).toBeInstanceOf(Mesh);
  });
});

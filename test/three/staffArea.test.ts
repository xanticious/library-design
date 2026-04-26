import { describe, expect, it } from "vitest";
import { Group, Mesh } from "three";
import { createStaffArea } from "../../src/three/staffArea";

describe("createStaffArea", () => {
  it("returns a Group", () => {
    const result = createStaffArea();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains a staff-only door mesh", () => {
    const group = createStaffArea();
    const door = group.getObjectByName("staff-door");
    expect(door).toBeInstanceOf(Mesh);
  });

  it("staff door is on the south boundary of the staff zone (z <= -9)", () => {
    const group = createStaffArea();
    const door = group.getObjectByName("staff-door")!;
    // Staff zone is in the north of the building (-Z direction)
    // South face of the staff zone is the staff divider wall at z ≈ -10
    expect(door.position.z).toBeLessThanOrEqual(-9);
  });

  it("contains a hold shelf corridor mesh", () => {
    const group = createStaffArea();
    const holdShelf = group.getObjectByName("hold-shelf-corridor");
    expect(holdShelf).toBeInstanceOf(Mesh);
  });

  it("contains room separator walls for the 4 staff rooms", () => {
    const group = createStaffArea();
    const separators: Mesh[] = [];
    group.traverse((obj) => {
      if (obj.name.startsWith("staff-room-divider-")) separators.push(obj as Mesh);
    });
    expect(separators.length).toBeGreaterThanOrEqual(3);
  });

  it("contains a staff breakroom floor mesh", () => {
    const group = createStaffArea();
    const breakroom = group.getObjectByName("staff-breakroom");
    expect(breakroom).toBeInstanceOf(Mesh);
  });

  it("staff area is positioned in the north portion of the building (z < -8)", () => {
    const group = createStaffArea();
    const breakroom = group.getObjectByName("staff-breakroom")!;
    // North strip of building uses negative Z coordinates
    expect(breakroom.position.z).toBeLessThan(-8);
  });
});

import { describe, expect, it } from "vitest";
import { Group, Mesh, MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import { createStudyRooms } from "../../src/three/studyRooms";

describe("createStudyRooms", () => {
  it("returns a Group", () => {
    const result = createStudyRooms();
    expect(result).toBeInstanceOf(Group);
  });

  it("contains exactly 2 study room sub-groups", () => {
    const group = createStudyRooms();
    const rooms: Group[] = [];
    group.children.forEach((child) => {
      if (child.name.startsWith("study-room-")) rooms.push(child as Group);
    });
    expect(rooms.length).toBe(2);
  });

  it("each study room has glass wall meshes with transmission material", () => {
    const group = createStudyRooms();
    ["study-room-1", "study-room-2"].forEach((roomName) => {
      const room = group.getObjectByName(roomName) as Group;
      const glassWalls: Mesh[] = [];
      room.traverse((obj) => {
        if (obj.name.includes("glass-wall")) glassWalls.push(obj as Mesh);
      });
      expect(glassWalls.length).toBeGreaterThanOrEqual(1);
      const mat = glassWalls[0].material as MeshPhysicalMaterial;
      expect(mat.transmission).toBeGreaterThan(0.5);
    });
  });

  it("each study room has a door mesh", () => {
    const group = createStudyRooms();
    ["study-room-1", "study-room-2"].forEach((roomName) => {
      const room = group.getObjectByName(roomName) as Group;
      const door = room.getObjectByName(`${roomName}-door`);
      expect(door).toBeInstanceOf(Mesh);
    });
  });

  it("each study room has a table mesh", () => {
    const group = createStudyRooms();
    ["study-room-1", "study-room-2"].forEach((roomName) => {
      const room = group.getObjectByName(roomName) as Group;
      const table = room.getObjectByName(`${roomName}-table`);
      expect(table).toBeInstanceOf(Mesh);
    });
  });

  it("each study room has a whiteboard mesh", () => {
    const group = createStudyRooms();
    ["study-room-1", "study-room-2"].forEach((roomName) => {
      const room = group.getObjectByName(roomName) as Group;
      const whiteboard = room.getObjectByName(`${roomName}-whiteboard`);
      expect(whiteboard).toBeInstanceOf(Mesh);
    });
  });

  it("study rooms are positioned on the east side of the building (x > 6)", () => {
    const group = createStudyRooms();
    const room1 = group.getObjectByName("study-room-1")!;
    expect(room1.position.x).toBeGreaterThan(6);
  });
});

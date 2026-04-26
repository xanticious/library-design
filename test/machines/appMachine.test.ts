import { createActor } from "xstate";
import { describe, expect, it } from "vitest";
import { appMachine } from "../../src/machines/appMachine";

describe("appMachine", () => {
  it("starts in the landing state", () => {
    const actor = createActor(appMachine);
    actor.start();
    expect(actor.getSnapshot().value).toBe("landing");
  });

  it("transitions to exploring after EXPLORE_CLICKED (through transitioning)", () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    // After EXPLORE_CLICKED we enter transitioning — but with vitest fake timers
    // the after-500ms transition hasn't fired yet
    expect(actor.getSnapshot().value).toBe("transitioning");
  });

  it("transitions to exploring once the transitioning delay elapses", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });

    // Advance time past the 500 ms delay
    await new Promise((r) => setTimeout(r, 600));

    expect(actor.getSnapshot().value).toBe("exploring");
  });

  it("transitions from exploring to hotspot on HOTSPOT_CLICKED", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));

    actor.send({ type: "HOTSPOT_CLICKED", hotspotId: "circulation-desk" });
    expect(actor.getSnapshot().value).toBe("hotspot");
  });

  it("stores the active hotspot id in context on HOTSPOT_CLICKED", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));

    actor.send({ type: "HOTSPOT_CLICKED", hotspotId: "treehouse" });
    expect(actor.getSnapshot().context.activeHotspotId).toBe("treehouse");
  });

  it("returns to exploring from hotspot on CLOSE_PANEL", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));
    actor.send({ type: "HOTSPOT_CLICKED", hotspotId: "circulation-desk" });

    actor.send({ type: "CLOSE_PANEL" });
    expect(actor.getSnapshot().value).toBe("exploring");
  });

  it("clears the active hotspot id after CLOSE_PANEL", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));
    actor.send({ type: "HOTSPOT_CLICKED", hotspotId: "circulation-desk" });
    actor.send({ type: "CLOSE_PANEL" });

    expect(actor.getSnapshot().context.activeHotspotId).toBeNull();
  });

  it("transitions from exploring to paused on ESCAPE_PRESSED", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));

    actor.send({ type: "ESCAPE_PRESSED" });
    expect(actor.getSnapshot().value).toBe("paused");
  });

  it("returns to exploring from paused on RESUME", async () => {
    const actor = createActor(appMachine);
    actor.start();

    actor.send({ type: "EXPLORE_CLICKED" });
    await new Promise((r) => setTimeout(r, 600));
    actor.send({ type: "ESCAPE_PRESSED" });

    actor.send({ type: "RESUME" });
    expect(actor.getSnapshot().value).toBe("exploring");
  });
});

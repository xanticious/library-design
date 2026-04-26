import { assign, createMachine } from "xstate";

export type AppState = "landing" | "transitioning" | "exploring" | "hotspot" | "paused";

export type AppEvent =
  | { type: "EXPLORE_CLICKED" }
  | { type: "HOTSPOT_CLICKED"; hotspotId: string }
  | { type: "CLOSE_PANEL" }
  | { type: "ESCAPE_PRESSED" }
  | { type: "RESUME" };

export type AppContext = {
  activeHotspotId: string | null;
};

export const appMachine = createMachine({
  id: "app",
  initial: "landing",
  context: {
    activeHotspotId: null,
  } as AppContext,
  states: {
    landing: {
      on: {
        EXPLORE_CLICKED: "transitioning",
      },
    },
    transitioning: {
      after: {
        500: "exploring",
      },
    },
    exploring: {
      on: {
        HOTSPOT_CLICKED: {
          target: "hotspot",
          actions: assign({
            activeHotspotId: ({ event }) => event.hotspotId,
          }),
        },
        ESCAPE_PRESSED: "paused",
      },
    },
    hotspot: {
      on: {
        CLOSE_PANEL: {
          target: "exploring",
          actions: assign({ activeHotspotId: null }),
        },
        ESCAPE_PRESSED: {
          target: "exploring",
          actions: assign({ activeHotspotId: null }),
        },
      },
    },
    paused: {
      on: {
        RESUME: "exploring",
      },
    },
  },
});

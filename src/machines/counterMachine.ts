import { assign, createMachine } from "xstate";

export const counterMachine = createMachine({
  id: "counter",
  context: { count: 0 },
  on: {
    INCREMENT: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DECREMENT: {
      actions: assign({
        count: ({ context }) => context.count - 1,
      }),
    },
    RESET: {
      actions: assign({ count: 0 }),
    },
  },
});

import { useMachine } from "@xstate/react";
import { counterMachine } from "../machines/counterMachine";
import styles from "./Counter.module.css";

export default function Counter() {
  const [state, send] = useMachine(counterMachine);

  return (
    <div className={styles.wrapper}>
      <h3>XState Counter</h3>
      <div className={styles.counterExample}>
        <button onClick={() => send({ type: "DECREMENT" })}>−</button>
        <span>{state.context.count}</span>
        <button onClick={() => send({ type: "INCREMENT" })}>+</button>
        <button onClick={() => send({ type: "RESET" })}>Reset</button>
      </div>
    </div>
  );
}

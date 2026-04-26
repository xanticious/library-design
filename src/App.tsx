import { useActor } from "@xstate/react";
import { ThreeCanvas } from "./components/ThreeCanvas";
import { LandingOverlay } from "./components/LandingOverlay";
import { appMachine, type AppState } from "./machines/appMachine";
import styles from "./App.module.css";

export default function App() {
  const [state, send] = useActor(appMachine);

  return (
    <div className={styles.root}>
      <ThreeCanvas mode={state.value as AppState} />

      {(state.matches("landing") || state.matches("transitioning")) && (
        <LandingOverlay onExplore={() => send({ type: "EXPLORE_CLICKED" })} />
      )}

      {state.matches("exploring") && (
        <div className={styles.hud}>
          <span className={styles.crosshair}>+</span>
          <span className={styles.escHint}>Press ESC to pause</span>
        </div>
      )}

      {state.matches("paused") && (
        <div className={styles.pauseOverlay}>
          <p>Paused</p>
          <button onClick={() => send({ type: "RESUME" })}>Resume</button>
        </div>
      )}
    </div>
  );
}

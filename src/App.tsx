import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import FontExamples from "./components/FontExamples";
import PixiExample from "./components/PixiExample";
import Counter from "./components/Counter";
import styles from "./App.module.css";

const STACK = [
  "TypeScript",
  "React 19",
  "Vite",
  "Vitest",
  "XState v5",
  "PixiJS v8",
  "CSS Modules",
  "OxLint",
  "Oxfmt",
  "FontAwesome",
  "Google Fonts",
];

const FEATURES = [
  "State machine (XState)",
  "WebGL rendering (PixiJS)",
  "Google Fonts pre-loaded",
  "FontAwesome icons",
  "Type-safe with TypeScript",
  "GitHub Pages ready",
];

export default function App() {
  return (
    <main className={styles.app}>
      <h1>
        <FontAwesomeIcon icon={faRocket} className={styles.headerIcon} />
        SPA (Single Page Application) Template
      </h1>

      <section>
        <h2>Stack</h2>
        <ul>
          {STACK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Features</h2>
        <ul>
          {FEATURES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Examples</h2>
        <FontExamples />
        <PixiExample />
        <Counter />
      </section>
    </main>
  );
}

import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import type { AppState } from "../machines/appMachine";
import styles from "./ThreeCanvas.module.css";

type Props = {
  mode: AppState;
};

/**
 * Mounts the Three.js WebGL renderer into a full-viewport canvas.
 * The scene and render loop live in this component; React only passes
 * the current app `mode` so the scene can switch between cinematic and
 * FPS behaviour.
 */
export function ThreeCanvas({ mode }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const rafRef = useRef<number>(0);

  // Bootstrap Three.js once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      200,
    );
    camera.position.set(0, 1.7, 12);
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Render loop
    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Respond to mode changes (cinematic ↔ FPS signals handled here in later phases)
  useEffect(() => {
    // Phase 1: no-op — scene is empty; mode switching implemented in Phase 6
  }, [mode]);

  return <div ref={containerRef} className={styles.container} />;
}

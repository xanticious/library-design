import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  Clock,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { FpsController } from "../three/fpsController";
import type { AppState } from "../machines/appMachine";
import { createCirculationDesk } from "../three/circulationDesk";
import { createChildrensArea } from "../three/childrensArea";
import { createComputerArea } from "../three/computerArea";
import { createCommunityRoom } from "../three/communityRoom";
import { createExterior } from "../three/exterior";
import { createGrounds } from "../three/grounds";
import { createInterior } from "../three/interior";
import { createSceneLighting } from "../three/sceneLighting";
import { createShelfUnit, createBookRow } from "../three/shelving";
import { createStaffArea } from "../three/staffArea";
import { createStudyRooms } from "../three/studyRooms";
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
  const fpsControllerRef = useRef<FpsController | null>(null);

  // Bootstrap Three.js once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    sceneRef.current = scene;

    // ── Phase 2: Building shell geometry ──────────────────────────────────
    scene.add(createExterior());
    scene.add(createGrounds());
    scene.add(createInterior());

    // ── Phase 2: Lighting ─────────────────────────────────────────────────
    const { sun, sky, windowLights } = createSceneLighting();
    scene.add(sun);
    scene.add(sky);
    for (const light of windowLights) scene.add(light);

    // ── Phase 3: Interior zones ───────────────────────────────────────────
    scene.add(createCirculationDesk());
    scene.add(createChildrensArea());
    scene.add(createComputerArea());
    scene.add(createCommunityRoom());
    scene.add(createStudyRooms());
    scene.add(createStaffArea());

    // Shelving rows — Adult Fiction (4 double-sided units along the central stacks)
    for (let i = 0; i < 4; i++) {
      const unit = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
      unit.position.set(-3 + i * 2, 0, 2 - i * 1.5);
      scene.add(unit);
      // Books on each shelf level
      for (let s = 0; s < 5; s++) {
        const books = createBookRow(20, i * 5 + s);
        books.position.set(-3 + i * 2 - 0.55, s * (2.1 / 4) + 0.1, 2 - i * 1.5);
        scene.add(books);
      }
    }

    // Non-Fiction stacks (taller, 2.1 m, 5 shelves)
    for (let i = 0; i < 3; i++) {
      const unit = createShelfUnit({ width: 1.2, height: 2.1, depth: 0.4, shelves: 5 });
      unit.position.set(1 + i * 2, 0, -3 - i * 1.5);
      scene.add(unit);
    }

    // YA Fiction (shorter shelving — 1.5 m, 4 shelves)
    for (let i = 0; i < 2; i++) {
      const unit = createShelfUnit({ width: 1.2, height: 1.5, depth: 0.35, shelves: 4 });
      unit.position.set(-2 + i * 2, 0, -5);
      scene.add(unit);
    }

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

    const fpsController = new FpsController(camera, renderer.domElement);
    fpsControllerRef.current = fpsController;

    const clock = new Clock();

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
      const dt = clock.getDelta();
      fpsController.update(dt);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      fpsController.disable();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Enable FPS controller when exploring, disable otherwise
  useEffect(() => {
    const ctrl = fpsControllerRef.current;
    if (!ctrl) return;
    if (mode === "exploring") {
      ctrl.enable();
    } else {
      ctrl.disable();
    }
  }, [mode]);

  return <div ref={containerRef} className={styles.container} />;
}

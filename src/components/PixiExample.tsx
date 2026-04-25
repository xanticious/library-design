import { useEffect, useRef } from "react";
import { Application, Graphics } from "pixi.js";
import styles from "./PixiExample.module.css";

export default function PixiExample() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const app = new Application();
    let mounted = true;
    let initialized = false;

    const drawShapes = (circle: Graphics, triangle: Graphics) => {
      circle.clear();
      triangle.clear();

      const w = app.canvas.width;
      const h = app.canvas.height;

      circle.circle(w * 0.25, h * 0.5, Math.min(w, h) * 0.25);
      circle.fill({ color: 0x4fc3f7 });

      const cx = w * 0.75;
      const cy = h * 0.5;
      const r = Math.min(w, h) * 0.3;
      triangle.poly([cx, cy - r, cx - r, cy + r, cx + r, cy + r]);
      triangle.fill({ color: 0xf06292 });
    };

    let onResize: () => void;

    void (async () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || 420;
      const height = Math.round(width * (220 / 420));

      await app.init({
        background: "#1a1a2e",
        width,
        height,
        antialias: true,
      });

      if (!mounted) {
        app.destroy(true);
        return;
      }

      initialized = true;
      container.appendChild(app.canvas as HTMLCanvasElement);

      const circle = new Graphics();
      const triangle = new Graphics();
      app.stage.addChild(circle);
      app.stage.addChild(triangle);
      drawShapes(circle, triangle);

      onResize = () => {
        const newWidth = container.clientWidth;
        const newHeight = Math.round(newWidth * (220 / 420));
        app.renderer.resize(newWidth, newHeight);
        drawShapes(circle, triangle);
      };

      window.addEventListener("resize", onResize);
    })();

    return () => {
      mounted = false;
      if (onResize) window.removeEventListener("resize", onResize);
      if (initialized) {
        app.destroy(true);
      }
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <h3>PixiJS Example</h3>
      <div ref={containerRef} className={styles.pixiExample} />
    </div>
  );
}

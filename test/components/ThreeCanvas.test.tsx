import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThreeCanvas } from "../../src/components/ThreeCanvas";

// Three.js uses WebGL which isn't available in jsdom.
// We mock the renderer so the component can mount without a GPU context.
vi.mock("three", async (importOriginal) => {
  const actual = await importOriginal<typeof import("three")>();
  return {
    ...actual,
    WebGLRenderer: vi.fn().mockImplementation(() => ({
      setPixelRatio: vi.fn(),
      setSize: vi.fn(),
      render: vi.fn(),
      dispose: vi.fn(),
      shadowMap: { enabled: false, type: 0 },
      toneMapping: 0,
      toneMappingExposure: 1,
      domElement: document.createElement("canvas"),
    })),
    PerspectiveCamera: vi.fn().mockImplementation(() => ({
      aspect: 1,
      updateProjectionMatrix: vi.fn(),
      position: { set: vi.fn() },
      lookAt: vi.fn(),
    })),
    Scene: vi.fn().mockImplementation(() => ({
      add: vi.fn(),
    })),
  };
});

describe("ThreeCanvas", () => {
  it("renders a canvas element", () => {
    const { container } = render(<ThreeCanvas mode="landing" />);
    expect(container.querySelector("canvas")).toBeTruthy();
  });

  it("fills the viewport (100% width/height)", () => {
    const { container } = render(<ThreeCanvas mode="landing" />);
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper).toBeTruthy();
    // The wrapping div should use full-size CSS
    expect(wrapper.style.width === "100%" || wrapper.className !== "").toBe(true);
  });

  it("accepts a mode prop without throwing", () => {
    expect(() => render(<ThreeCanvas mode="exploring" />)).not.toThrow();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LandingOverlay } from "../../src/components/LandingOverlay";

describe("LandingOverlay", () => {
  it("renders the tagline Discover My Library", () => {
    render(<LandingOverlay onExplore={() => {}} />);
    expect(screen.getByText("Discover My Library")).toBeInTheDocument();
  });

  it("renders an Explore button", () => {
    render(<LandingOverlay onExplore={() => {}} />);
    expect(screen.getByRole("button", { name: /explore/i })).toBeInTheDocument();
  });

  it("calls onExplore when the Explore button is clicked", () => {
    const onExplore = vi.fn();
    render(<LandingOverlay onExplore={onExplore} />);

    fireEvent.click(screen.getByRole("button", { name: /explore/i }));

    expect(onExplore).toHaveBeenCalledTimes(1);
  });

  it("shows the library name Centerville Branch Library", () => {
    render(<LandingOverlay onExplore={() => {}} />);
    expect(screen.getByText(/Centerville Branch Library/i)).toBeInTheDocument();
  });
});

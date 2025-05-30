import { render, screen } from "@testing-library/react";
import GlassContainer from "./GlassContainer";

describe("GlassContainer", () => {
  it("renders children correctly", () => {
    render(
      <GlassContainer>
        <div>My content</div>
      </GlassContainer>
    );

    expect(screen.getByText("My content")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(
      <GlassContainer title="Section Title">
        <div>Content</div>
      </GlassContainer>
    );

    expect(
      screen.getByRole("heading", { name: /section title/i })
    ).toBeInTheDocument();
  });

  it("does not render the title when not provided", () => {
    render(
      <GlassContainer>
        <div>Content only</div>
      </GlassContainer>
    );

    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(
      <GlassContainer className="custom-class">
        <div>Content</div>
      </GlassContainer>
    );

    expect(screen.getByText("Content").parentElement).toHaveClass(
      "custom-class"
    );
  });
});

import { render, screen } from "@testing-library/react";
import GlassContainer from "./GlassContainer";

describe("GlassContainer", () => {
  it("renders children correctly", () => {
    // Render the component with a child element.
    render(
      <GlassContainer>
        <div>My content</div>
      </GlassContainer>
    );

    // Ensure the child is rendered inside the container.
    expect(screen.getByText("My content")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    // Render the component with a title prop.
    render(
      <GlassContainer title="Section Title">
        <div>Content</div>
      </GlassContainer>
    );

    // The title should be rendered as a heading (h5 from MUI Typography).
    expect(
      screen.getByRole("heading", { name: /section title/i })
    ).toBeInTheDocument();
  });

  it("does not render the title when not provided", () => {
    // Render the component without a title.
    render(
      <GlassContainer>
        <div>Content only</div>
      </GlassContainer>
    );

    // There should be no heading rendered.
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });

  it("applies custom className", () => {
    // Render the component with a custom className.
    render(
      <GlassContainer className="custom-class">
        <div>Content</div>
      </GlassContainer>
    );

    // The wrapper (GlassContainer's root) should receive the custom class.
    expect(screen.getByText("Content").parentElement).toHaveClass(
      "custom-class"
    );
  });
});

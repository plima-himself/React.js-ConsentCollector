import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

// Mock NavigationTabs to isolate AppLayout logic from the tab component.
// This helps simplify the test and focus only on layout behavior.
vi.mock("components/NavigationTabs", () => ({
  default: ({ orientation }: { orientation: string }) => (
    <div data-testid="navigation-tabs">{orientation}</div>
  ),
}));

describe("AppLayout", () => {
  it("renders layout and outlet content", () => {
    // Render AppLayout with a nested route inside MemoryRouter.
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          {/* AppLayout is the layout component; its Outlet renders the child route */}
          <Route element={<AppLayout />}>
            <Route index element={<div data-testid="page-content">Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Confirm the mocked NavigationTabs is rendered.
    expect(screen.getByTestId("navigation-tabs")).toBeInTheDocument();

    // Confirm the page content routed into the layout is displayed correctly.
    expect(screen.getByTestId("page-content")).toHaveTextContent("Home");
  });
});

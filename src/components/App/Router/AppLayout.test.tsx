import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./AppLayout";

// Mock NavigationTabs to simplify tests.
vi.mock("components/NavigationTabs", () => ({
  default: ({ orientation }: { orientation: string }) => (
    <div data-testid="navigation-tabs">{orientation}</div>
  ),
}));

describe("AppLayout", () => {
  it("renders layout and outlet content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<div data-testid="page-content">Home</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("navigation-tabs")).toBeInTheDocument();
    expect(screen.getByTestId("page-content")).toHaveTextContent("Home");
  });
});

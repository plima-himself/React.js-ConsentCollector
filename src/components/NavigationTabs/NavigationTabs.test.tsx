import { render, RenderResult, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { NavigationTab } from "./types";
import userEvent from "@testing-library/user-event";

const mockTabs: NavigationTab[] = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
];

function renderWithRouter(pathname: string): RenderResult {
  return render(
    <MemoryRouter initialEntries={[pathname]}>
      <Routes>
        <Route
          path="*"
          element={<NavigationTabs tabs={mockTabs} orientation="horizontal" />}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe("NavigationTabs", () => {
  it("renders all tabs", () => {
    renderWithRouter("/home");

    expect(screen.getByRole("tab", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /about/i })).toBeInTheDocument();
  });

  it("selects the correct tab based on the current path", () => {
    renderWithRouter("/about");

    const homeTab = screen.getByRole("tab", { name: /home/i });
    const aboutTab = screen.getByRole("tab", { name: /about/i });

    expect(homeTab).toHaveAttribute("aria-selected", "false");
    expect(aboutTab).toHaveAttribute("aria-selected", "true");
  });

  it("selects tab on click", async () => {
    renderWithRouter("/home");

    const homeTab = screen.getByRole("tab", { name: /home/i });
    const aboutTab = screen.getByRole("tab", { name: /about/i });

    expect(homeTab).toHaveAttribute("aria-selected", "true");
    expect(aboutTab).toHaveAttribute("aria-selected", "false");

    await userEvent.click(aboutTab);

    expect(homeTab).toHaveAttribute("aria-selected", "false");
    expect(aboutTab).toHaveAttribute("aria-selected", "true");
  });
});

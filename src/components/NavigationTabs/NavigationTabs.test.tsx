import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { NavigationTab } from "./types";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "tests";

// Use the same tabs the component expects.
const mockTabs: NavigationTab[] = [
  { label: "Home", to: "/home" },
  { label: "About", to: "/about" },
];

function AppWithTabs() {
  return (
    <>
      <NavigationTabs tabs={mockTabs} orientation="horizontal" />

      <Routes>
        <Route path="/home" element={<div data-testid="page">Home Page</div>} />
        <Route
          path="/about"
          element={<div data-testid="page">About Page</div>}
        />
      </Routes>
    </>
  );
}

describe("NavigationTabs integration", () => {
  it("navigates and updates selected tab on click", async () => {
    renderWithProviders(<AppWithTabs />, { initialEntries: ["/home"] });

    const homeTab = screen.getByRole("tab", { name: /home/i });
    const aboutTab = screen.getByRole("tab", { name: /about/i });

    expect(homeTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("page")).toHaveTextContent("Home Page");

    await userEvent.click(aboutTab);

    expect(aboutTab).toHaveAttribute("aria-selected", "true");
    expect(screen.getByTestId("page")).toHaveTextContent("About Page");
  });
});

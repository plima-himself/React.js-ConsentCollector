import { render } from "@testing-library/react";
import App from "./App";

// Mock NavigationTabs to isolate the test from internal layout logic.
// This simplifies the test and ensures it focuses only on whether <App /> renders.
vi.mock("components/NavigationTabs", () => ({
  default: ({ orientation }: { orientation: string }) => (
    <div data-testid="navigation-tabs">{orientation}</div>
  ),
}));

describe("App", () => {
  // Basic smoke test to ensure that the application mounts without errors.
  // This checks that all global providers (theme, query, router, etc.) are working.
  it("renders without crashing", () => {
    render(<App />);
  });
});

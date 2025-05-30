import { render } from "@testing-library/react";
import App from "./App";

// Basic smoke test to ensure that the application mounts without errors.
describe("App", () => {
  it("renders without crashing", () => {
    render(<App />);
  });
});

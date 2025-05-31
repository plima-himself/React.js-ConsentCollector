import { render } from "@testing-library/react";
import CollectedConsentsTableHead from "./CollectedConsentsTableHead";

describe("CollectedConsentsTableHead", () => {
  // Snapshot test to ensure table headers render as expected.
  // This helps catch unintentional changes in the structure or content of the table head.
  it("matches snapshot", () => {
    const { container } = render(
      <table>
        <CollectedConsentsTableHead />
      </table>
    );

    expect(container).toMatchSnapshot();
  });
});

import { render, screen } from "@testing-library/react";
import CollectedConsentsTableRow from "./CollectedConsentsTableRow";

describe("CollectedConsentsTableRow", () => {
  // Verifies that a single row is rendered with correct name, email, and consent values.
  it("renders rows correctly", () => {
    render(
      <table>
        <tbody>
          <CollectedConsentsTableRow
            collectedConsents={[
              {
                id: 1,
                name: "Bob",
                email: "bob@example.com",
                consents: "Stats",
              },
            ]}
          />
        </tbody>
      </table>
    );

    // Check that the table row displays the expected values.
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("bob@example.com")).toBeInTheDocument();
    expect(screen.getByText("Stats")).toBeInTheDocument();
  });
});

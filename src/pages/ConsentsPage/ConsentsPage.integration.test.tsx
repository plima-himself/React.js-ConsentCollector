import { screen } from "@testing-library/react";
import { vi } from "vitest";
import ConsentsPage from "./ConsentsPage";
import { CollectedConsentsTablePagination } from "./components";
import userEvent from "@testing-library/user-event";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "./constants";
import { renderWithProviders } from "tests";

// Mock the data and pagination hooks used by the component.
vi.mock("state", () => ({
  useConsentsList: () => ({
    data: [
      {
        id: 1,
        name: "Alice",
        email: "alice@example.com",
        consents: "Receive newsletter",
      },
      {
        id: 2,
        name: "Bojack Horseman",
        email: "bojack@horseman.com",
        consents: "Be shown targeted ads",
      },
      {
        id: 3,
        name: "Princess Carolyn",
        email: "princessa@manager.com",
        consents: "Receive newsletter, Be shown targeted ads",
      },
    ],
  }),
  useConsentsListPagination: () => ({
    data: { page: 0, perPage: 1, total: 3, totalPages: 2 },
  }),
  consentsQueryKeys: {
    consents: (page: number, perPage: number) => ["consents", page, perPage],
  },
}));

describe("ConsentPage (integration)", () => {
  it("renders table with rows and pagination", () => {
    renderWithProviders(<ConsentsPage />);

    // Check that the table title and consent data are rendered.
    expect(screen.getByText("Collected consents")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
    expect(screen.getByText("Receive newsletter")).toBeInTheDocument();

    // Check that the table and pagination controls are rendered.
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /next page/i })
    ).toBeInTheDocument();
  });

  it("changes page on pagination click", async () => {
    const onPageChange = vi.fn();

    renderWithProviders(
      <CollectedConsentsTablePagination
        page={DEFAULT_PAGE}
        rowsPerPage={DEFAULT_ROWS_PER_PAGE}
        onPageChange={onPageChange}
        onRowsPerPageChange={() => {}}
      />
    );

    // Simulate clicking the "Next Page" button.
    const nextButton = screen.getByRole("button", { name: /next page/i });
    await userEvent.click(nextButton);

    // Assert that the page change handler was called with the next page index.
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("updates rows per page", async () => {
    const onRowsPerPageChange = vi.fn();

    renderWithProviders(
      <CollectedConsentsTablePagination
        page={DEFAULT_PAGE}
        rowsPerPage={DEFAULT_ROWS_PER_PAGE}
        onPageChange={() => {}}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    );

    // Open the "Rows per page" dropdown.
    const rowsPerPageSelect = screen.getByRole("combobox", {
      name: /rows per page/i,
    });

    await userEvent.click(rowsPerPageSelect);

    // Click on a different option (e.g., 4).
    const option = await screen.findByRole("option", { name: "4" });
    await userEvent.click(option);

    // Check that the change handler was called.
    expect(onRowsPerPageChange).toHaveBeenCalled();
  });
});

import { renderHook, act } from "@testing-library/react";
import useConsentsPage from "./useConsentsPage";
import { QueryClient } from "react-query";
import { vi } from "vitest";
import { ChangeEvent } from "react";
import { getQueryClientWrapper } from "tests";

// Mock implementation of state hooks and keys.
vi.mock("state", async () => {
  const actual = await vi.importActual("state");

  return {
    ...actual,
    useConsentsList: vi.fn().mockReturnValue({
      data: [
        {
          id: 1,
          name: "Jane",
          email: "jane@example.com",
          consents: "Newsletter",
        },
      ],
    }),
    consentsQueryKeys: {
      consents: (page: number, perPage: number) => ["consents", page, perPage],
    },
  };
});

describe("useConsentsPage", () => {
  // Test initial state values: page, rowsPerPage, and fetched consents.
  it("initializes with default pagination and data", () => {
    const queryClient = new QueryClient();

    const { result } = renderHook(() => useConsentsPage(), {
      wrapper: ({ children }) => getQueryClientWrapper(children, queryClient),
    });

    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(2);
    expect(result.current.collectedConsents.length).toBe(1);
  });

  // Test behavior of onPageChange and onRowsPerPageChange handlers.
  it("handles page and rowsPerPage changes", () => {
    const queryClient = new QueryClient();
    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useConsentsPage(), {
      wrapper: ({ children }) => getQueryClientWrapper(children, queryClient),
    });

    // Simulate user changing to a new page.
    act(() => result.current.onPageChange(2));

    // Simulate changing the rows per page selection.
    act(() =>
      result.current.onRowsPerPageChange({
        target: { value: "20" },
      } as ChangeEvent<HTMLInputElement>)
    );

    // Page is reset to 0 after changing rows per page.
    expect(result.current.page).toBe(0);
    expect(result.current.rowsPerPage).toBe(20);

    // Ensure cache invalidation was called twice.
    expect(invalidateSpy).toHaveBeenCalledTimes(2);
  });
});

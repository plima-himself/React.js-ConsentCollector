import { act, renderHook } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import useGiveConsent from "./useGiveConsent";
import { vi } from "vitest";
import {
  useConsentsListPaginationSelector,
  useConsentsListSelector,
} from "./selectors";
import { CONSENT_BY_KEY } from "config";
import { AddConsentArgs } from "api";

// Mock the API call used in the mutation.
vi.mock("api", () => ({
  addConsent: vi.fn(),
}));

// Tests for useGiveConsent hook.
describe("useGiveConsent", () => {
  it("removes queries on mutate", async () => {
    // Create a fresh QueryClient and spy on removeQueries.
    const queryClient = new QueryClient();
    const removeSpy = vi.spyOn(queryClient, "removeQueries");

    // Wrap hook with QueryClientProvider.
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    // Render the hook.
    const { result } = renderHook(() => useGiveConsent(), { wrapper });

    // Trigger mutation inside act.
    await act(async () => {
      result.current.mutate({} as AddConsentArgs);
    });

    // Check that query removal was triggered.
    expect(removeSpy).toHaveBeenCalled();
  });
});

// Test for useConsentsListSelector logic.
describe("useConsentsListSelector", () => {
  it("formats consent list correctly", () => {
    // Call the selector with mock data.
    const result = useConsentsListSelector({
      data: [
        {
          id: 1,
          name: "John",
          email: "john@example.com",
          consents: {
            newsletter: true,
            ads: false,
            stats: true,
          },
        },
      ],
      pagination: { page: 1, perPage: 10, total: 1, totalPages: 1 },
    });

    // Expect the selector to return a flat object with readable consent labels.
    expect(result).toEqual([
      {
        id: 1,
        name: "John",
        email: "john@example.com",
        consents: [CONSENT_BY_KEY.newsletter, CONSENT_BY_KEY.stats].join(", "),
      },
    ]);
  });
});

// Test for useConsentsListPaginationSelector logic.
describe("useConsentsListPaginationSelector", () => {
  it("returns pagination info", () => {
    // Provide mock pagination data.
    const pagination = { page: 1, perPage: 10, total: 1, totalPages: 1 };

    // Call the selector and check that it returns pagination as-is.
    const result = useConsentsListPaginationSelector({
      data: [],
      pagination,
    });

    expect(result).toEqual(pagination);
  });
});

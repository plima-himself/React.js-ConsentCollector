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

vi.mock("api", () => ({
  addConsent: vi.fn(),
}));

describe("useGiveConsent", () => {
  it("removes queries on mutate", async () => {
    const queryClient = new QueryClient();
    const removeSpy = vi.spyOn(queryClient, "removeQueries");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    const { result } = renderHook(() => useGiveConsent(), { wrapper });

    await act(async () => {
      result.current.mutate({} as AddConsentArgs);
    });

    expect(removeSpy).toHaveBeenCalled();
  });
});

describe("useConsentsListSelector", () => {
  it("formats consent list correctly", () => {
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

describe("useConsentsListPaginationSelector", () => {
  it("returns pagination info", () => {
    const pagination = { page: 1, perPage: 10, total: 1, totalPages: 1 };

    const result = useConsentsListPaginationSelector({
      data: [],
      pagination,
    });

    expect(result).toEqual(pagination);
  });
});

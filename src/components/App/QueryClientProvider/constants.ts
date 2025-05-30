import { QueryCache, QueryClient } from "react-query";
import { Query } from "./types";

// React Query client with global settings and custom error handling logic.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Improves performance by only notifying components on tracked changes.
      notifyOnChangeProps: "tracked",
      // Disables automatic refetching when the window regains focus.
      refetchOnWindowFocus: false,
      // Preserves previous data during pagination or param changes to avoid UI flicker.
      keepPreviousData: true,
    },
  },
  queryCache: new QueryCache({
    // Global error handler for failed queries.
    onError: (err, query: Query) => {
      const errorMessage =
        typeof query.meta?.errorMessage === "function"
          ? query.meta.errorMessage(err)
          : query.meta?.errorMessage;

      // Prevent alert if custom error message is explicitly disabled or invalid.
      if (
        errorMessage === false ||
        (errorMessage !== undefined && typeof errorMessage !== "string")
      ) {
        return undefined;
      }

      // Show alert with contextual error message from query meta.
      alert(errorMessage);
    },
  }),
});

import { QueryCache, QueryClient } from "react-query";
import { Query } from "./types";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: "tracked",
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    },
  },
  queryCache: new QueryCache({
    onError: (err, query: Query) => {
      const errorMessage =
        typeof query.meta?.errorMessage === "function"
          ? query.meta.errorMessage(err)
          : query.meta?.errorMessage;

      if (
        errorMessage === false ||
        (errorMessage !== undefined && typeof errorMessage !== "string")
      ) {
        return undefined;
      }

      alert(errorMessage);
    },
  }),
});

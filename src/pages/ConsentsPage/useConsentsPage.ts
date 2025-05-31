import React, { useCallback, useState } from "react";
import {
  consentsQueryKeys,
  ConsentWithStringConsents,
  useConsentsList,
} from "state";
import { useQueryClient } from "react-query";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "./constants";

export type UseConsentsPageResult = {
  page: number;
  rowsPerPage: number;
  collectedConsents: ConsentWithStringConsents[];
  onPageChange: (nextPage: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function useConsentsPage(): UseConsentsPageResult {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const queryClient = useQueryClient();

  // Fetches the current page of consent records. Falls back to an empty array to
  // avoid undefined issues during initial render.
  const { data: collectedConsents = [] } = useConsentsList(page, rowsPerPage);

  // Handles page change and manually invalidates the query cache for the old page.
  // Ensures new data is fetched even if cached data exists.
  const handlePageChange = useCallback(
    (nextPage: number): void => {
      setPage(nextPage);

      queryClient.invalidateQueries(
        consentsQueryKeys.consents(page, rowsPerPage)
      );
    },
    [page, queryClient, rowsPerPage]
  );

  // Handles change in rows per page and resets to page 0. Triggers re-fetch to
  // keep displayed data in sync.
  const handleRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event): void => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));

        queryClient.invalidateQueries(
          consentsQueryKeys.consents(page, rowsPerPage)
        );
      },
      [page, queryClient, rowsPerPage]
    );

  return {
    page,
    rowsPerPage,
    collectedConsents,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
  };
}

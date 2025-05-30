import React, { useCallback, useState } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import ConsentTableHead from "./CollectedConsentsTableHead";
import ConsentTablePagination from "./CollectedConsentsTablePagination";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "./constants";
import CollectedConsentsTableRow from "./CollectedConsentsTableRow";
import { consentsQueryKeys, useConsentsList } from "state";
import { useQueryClient } from "react-query";

const CollectedConsentsTable: React.FC = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  // Fetches the current page of consent records. Falls back to an empty array to
  // avoid undefined issues during initial render.
  const { data: collectedConsents = [] } = useConsentsList(page, rowsPerPage);
  const queryClient = useQueryClient();

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
  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement> =
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

  return (
    <>
      <TableContainer>
        <Table size="small">
          <ConsentTableHead />

          <TableBody>
            <CollectedConsentsTableRow collectedConsents={collectedConsents} />
          </TableBody>
        </Table>
      </TableContainer>

      <ConsentTablePagination
        {...{ page, rowsPerPage }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CollectedConsentsTable;

import React, { useState } from "react";
import { Table, TableBody, TableContainer } from "@mui/material";
import ConsentTableHead from "./CollectedConsentsTableHead";
import ConsentTablePagination from "./CollectedConsentsTablePagination";
import { DEFAULT_PAGE, DEFAULT_ROWS_PER_PAGE } from "./constants";
import CollectedConsentsTableRow from "./CollectedConsentsTableRow";

type CollectedConsentsTableProps = {
  // TODO-PL: Update this type.
  collectedConsents: {
    name: string;
    email: string;
    consent: string[];
  }[];
};

const CollectedConsentsTable: React.FC<CollectedConsentsTableProps> = ({
  collectedConsents,
}) => {
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const handleChangeRowsPerPage: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <>
      <TableContainer>
        <Table size="small">
          <ConsentTableHead />

          <TableBody>
            <CollectedConsentsTableRow
              {...{ page, rowsPerPage, collectedConsents }}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <ConsentTablePagination
        {...{ page, rowsPerPage }}
        count={collectedConsents.length}
        onPageChange={setPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default CollectedConsentsTable;

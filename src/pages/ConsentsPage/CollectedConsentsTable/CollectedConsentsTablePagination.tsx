import React from "react";
import { TablePagination } from "@mui/material";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "./constants";

type CollectedConsentsTablePaginationProps = {
  page: number;
  rowsPerPage: number;
  count: number;
  onPageChange: (nextPage: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CollectedConsentsTablePagination: React.FC<
  CollectedConsentsTablePaginationProps
> = ({ page, rowsPerPage, count, onPageChange, onRowsPerPageChange }) => {
  return (
    <TablePagination
      {...{ page, rowsPerPage, count, onRowsPerPageChange }}
      component="div"
      rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
      onPageChange={(_, newPage) => onPageChange(newPage)}
    />
  );
};

export default CollectedConsentsTablePagination;

import React from "react";
import { TablePagination } from "@mui/material";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "./constants";
import { useConsentsListPagination } from "state";

type CollectedConsentsTablePaginationProps = {
  page: number;
  rowsPerPage: number;
  onPageChange: (nextPage: number) => void;
  onRowsPerPageChange: React.ChangeEventHandler<HTMLInputElement>;
};

const CollectedConsentsTablePagination: React.FC<
  CollectedConsentsTablePaginationProps
> = ({ page, rowsPerPage, onPageChange, onRowsPerPageChange }) => {
  const { data: pagination } = useConsentsListPagination(page, rowsPerPage);

  return (
    <TablePagination
      {...{ rowsPerPage, onRowsPerPageChange }}
      page={pagination?.page ?? 0}
      count={pagination?.total ?? 0}
      component="div"
      rowsPerPageOptions={DEFAULT_ROWS_PER_PAGE_OPTIONS}
      onPageChange={(_, newPage) => onPageChange(newPage)}
    />
  );
};

export default CollectedConsentsTablePagination;

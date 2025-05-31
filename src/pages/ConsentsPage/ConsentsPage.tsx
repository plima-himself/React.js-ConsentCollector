import React from "react";
import * as S from "./styles";
import { Table, TableBody, TableContainer } from "@mui/material";
import useConsentsPage from "./useConsentsPage";
import {
  CollectedConsentsTableHead,
  CollectedConsentsTablePagination,
  CollectedConsentsTableRow,
} from "./components";

const ConsentPage: React.FC = () => {
  const {
    page,
    rowsPerPage,
    collectedConsents,
    onPageChange,
    onRowsPerPageChange,
  } = useConsentsPage();

  return (
    <S.Root title="Collected consents">
      <TableContainer>
        <Table size="small">
          <CollectedConsentsTableHead />

          <TableBody>
            <CollectedConsentsTableRow collectedConsents={collectedConsents} />
          </TableBody>
        </Table>
      </TableContainer>
      <CollectedConsentsTablePagination
        {...{ page, rowsPerPage, onPageChange, onRowsPerPageChange }}
      />
    </S.Root>
  );
};

export default ConsentPage;

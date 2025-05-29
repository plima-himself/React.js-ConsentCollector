import React, { useMemo } from "react";
import { TableCell, TableRow } from "@mui/material";

type CollectedConsentsTableRowProps = {
  page: number;
  rowsPerPage: number;
  // TODO-PL: Update this type.
  collectedConsents: {
    name: string;
    email: string;
    consent: string[];
  }[];
};

const CollectedConsentsTableRow: React.FC<CollectedConsentsTableRowProps> = ({
  page,
  rowsPerPage,
  collectedConsents,
}) => {
  const paginatedData = useMemo(
    () =>
      collectedConsents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [collectedConsents, page, rowsPerPage]
  );

  return paginatedData.map((row, index) => (
    <TableRow key={index}>
      <TableCell>{row.name}</TableCell>

      <TableCell>{row.email}</TableCell>

      <TableCell>{row.consent.join(", ")}</TableCell>
    </TableRow>
  ));
};

export default CollectedConsentsTableRow;

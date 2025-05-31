import React from "react";
import { TableCell, TableHead, TableRow } from "@mui/material";

const CollectedConsentsTableHead: React.FC = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: "20%" }}>
          <strong>Name</strong>
        </TableCell>

        <TableCell sx={{ width: "25%" }}>
          <strong>Email</strong>
        </TableCell>

        <TableCell sx={{ width: "55%" }}>
          <strong>Consent given for</strong>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CollectedConsentsTableHead;

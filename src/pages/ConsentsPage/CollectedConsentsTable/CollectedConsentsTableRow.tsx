import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { ConsentWithStringConsents } from "state";

type CollectedConsentsTableRowProps = {
  collectedConsents: ConsentWithStringConsents[];
};

const CollectedConsentsTableRow: React.FC<CollectedConsentsTableRowProps> = ({
  collectedConsents,
}) => {
  return collectedConsents.map(({ id, name, email, consents }) => (
    <TableRow key={id}>
      <TableCell>{name}</TableCell>

      <TableCell>{email}</TableCell>

      <TableCell>{consents}</TableCell>
    </TableRow>
  ));
};

export default CollectedConsentsTableRow;

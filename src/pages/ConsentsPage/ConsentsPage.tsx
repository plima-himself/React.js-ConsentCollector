import React from "react";
import * as S from "./styles";
import CollectedConsentsTable from "./CollectedConsentsTable";

const ConsentTable: React.FC = () => {
  return (
    <S.Root title="Collected consents">
      <CollectedConsentsTable />
    </S.Root>
  );
};

export default ConsentTable;

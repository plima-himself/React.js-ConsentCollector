import React from "react";
import * as S from "./styles";
import CollectedConsentsTable from "./CollectedConsentsTable";

const collectedConsents = [
  {
    name: "Alice Johnson",
    email: "alice@example.com",
    consent: ["Receive newsletter"],
  },
  {
    name: "Bob Smith",
    email: "bob@example.com",
    consent: ["Be shown targeted ads"],
  },
  {
    name: "Charlie Brown",
    email: "charlie@example.com",
    consent: ["Contribute to anonymous visit statistics"],
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    consent: ["Receive newsletter", "Be shown targeted ads"],
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    consent: ["Receive newsletter", "Contribute to anonymous visit statistics"],
  },
  {
    name: "Diana Prince",
    email: "diana@example.com",
    consent: [
      "Be shown targeted ads",
      "Contribute to anonymous visit statistics",
    ],
  },
];

const ConsentTable: React.FC = () => {
  return (
    <S.Root title="Collected consents">
      <CollectedConsentsTable collectedConsents={collectedConsents} />
    </S.Root>
  );
};

export default ConsentTable;

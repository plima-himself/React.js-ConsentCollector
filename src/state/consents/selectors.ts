import { ConsentType, GetConsentsResult, Pagination } from "api";
import { CONSENT_BY_KEY } from "./constants";
import { ConsentWithStringConsents } from "./types";

export const useConsentsListSelector = (
  result: GetConsentsResult
): ConsentWithStringConsents[] => {
  return result.data.map(({ id, name, email, consents }) => ({
    id,
    name,
    email,
    consents: Object.entries(consents)
      .filter(([, value]) => value)
      .map(([key]) => CONSENT_BY_KEY[key as ConsentType])
      .join(", "),
  }));
};

export const useConsentsListPaginationSelector = (
  result: GetConsentsResult
): Pagination => {
  return result.pagination;
};

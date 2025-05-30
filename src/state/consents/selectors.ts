import { ConsentType, GetConsentsResult, Pagination } from "api";
import { ConsentWithStringConsents } from "./types";
import { CONSENT_BY_KEY } from "config";

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

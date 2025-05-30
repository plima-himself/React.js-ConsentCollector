import { ConsentType, GetConsentsResult, Pagination } from "api";
import { ConsentWithStringConsents } from "./types";
import { CONSENT_BY_KEY } from "config";

/**
 * Transforms raw consent data into a flattened structure with readable consent labels.
 * Useful for display in lists or tables.
 */
export const useConsentsListSelector = (
  result: GetConsentsResult
): ConsentWithStringConsents[] => {
  return result.data.map(({ id, name, email, consents }) => ({
    id,
    name,
    email,
    // Filters only the consents that are "true", maps keys to readable labels,
    // and joins them into a single comma-separated string.
    consents: Object.entries(consents)
      .filter(([, value]) => value)
      .map(([key]) => CONSENT_BY_KEY[key as ConsentType])
      .join(", "),
  }));
};

/**
 * Extracts and returns only the pagination metadata from the API result.
 * Keeps pagination concerns decoupled from data transformation logic.
 */
export const useConsentsListPaginationSelector = (
  result: GetConsentsResult
): Pagination => {
  return result.pagination;
};

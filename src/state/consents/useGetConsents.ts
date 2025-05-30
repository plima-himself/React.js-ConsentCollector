import { getConsents, GetConsentsResult } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { consentsQueryKeys } from "./queryKeys";
import {
  useConsentsListPaginationSelector,
  useConsentsListSelector,
} from "./selectors";

// Defines the shape of the query key for type safety.
type QueryKey = ReturnType<typeof consentsQueryKeys.consents>;

// Optional type-safe hook configuration for consumers to customize the query.
export type UseGetConsentsOptions<TData = GetConsentsResult> = UseQueryOptions<
  GetConsentsResult,
  unknown,
  TData,
  QueryKey
>;

/**
 * Data-fetching hook to retrieve paginated consents. Accepts optional React Query
 * configuration for caching, transformation, etc.
 */
function useGetConsents<TData = GetConsentsResult>(
  page: number,
  perPage: number,
  opts?: UseGetConsentsOptions<TData>
) {
  return useQuery(
    consentsQueryKeys.consents(page, perPage),
    async () => await getConsents({ page, perPage }),
    opts
  );
}

/**
 * Hook to get a formatted consent list. Optimizes re-renders by reducing returned
 * data to what's needed in the UI.
 */
export const useConsentsList = (page: number, perPage: number) =>
  useGetConsents(page, perPage, {
    select: useConsentsListSelector,
  });

/**
 * Hook to retrieve only pagination metadata from the consent list.
 * Helps separate concerns when displaying pagination controls.
 */
export const useConsentsListPagination = (page: number, perPage: number) =>
  useGetConsents(page, perPage, {
    select: useConsentsListPaginationSelector,
  });

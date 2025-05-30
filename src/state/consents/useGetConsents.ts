import { getConsents, GetConsentsResult } from "api";
import { useQuery, UseQueryOptions } from "react-query";
import { consentsQueryKeys } from "./queryKeys";
import {
  useConsentsListPaginationSelector,
  useConsentsListSelector,
} from "./selectors";

type QueryKey = ReturnType<typeof consentsQueryKeys.consents>;

export type UseGetConsentsOptions<TData = GetConsentsResult> = UseQueryOptions<
  GetConsentsResult,
  unknown,
  TData,
  QueryKey
>;

function useGetConsents<TData = GetConsentsResult>(
  page: number,
  perPage: number,
  opts?: UseGetConsentsOptions<TData>
) {
  return useQuery(
    consentsQueryKeys.consents(page, perPage),
    async () => await getConsents({ page, perPage }),
    {
      ...opts,
      // Duration that the data is considered fresh. During this time, no refetch
      // will occur even if the component remounts.
      staleTime: Infinity,
      // How long the cached data stays in memory after the last observer unsubscribes
      // (e.g., component unmounts).
      cacheTime: Infinity,
    }
  );
}

export const useConsentsList = (page: number, perPage: number) =>
  useGetConsents(page, perPage, {
    select: useConsentsListSelector,
  });

export const useConsentsListPagination = (page: number, perPage: number) =>
  useGetConsents(page, perPage, {
    select: useConsentsListPaginationSelector,
  });

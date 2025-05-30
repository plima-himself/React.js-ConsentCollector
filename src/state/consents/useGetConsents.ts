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
    opts
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

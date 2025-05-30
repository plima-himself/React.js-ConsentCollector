export const consentsQueryKeys = {
  // Base query key used for cache scoping across all consent-related queries.
  all: [{ scope: "consents" }] as const,
  /**
   * Generates a unique query key for paginated consent fetches.
   * Ensures proper cache separation for different page/perPage combinations.
   */
  consents: (page: number, perPage: number) =>
    [
      { ...consentsQueryKeys.all[0], entity: "consents", page, perPage },
    ] as const,
};

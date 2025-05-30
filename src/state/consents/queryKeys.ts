export const consentsQueryKeys = {
  all: [{ scope: "consents" }] as const,
  consents: (page: number, perPage: number) =>
    [
      { ...consentsQueryKeys.all[0], entity: "consents", page, perPage },
    ] as const,
};

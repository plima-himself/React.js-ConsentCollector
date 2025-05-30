import { Query as ReactQuery } from "react-query";

export type Query = Omit<ReactQuery, "meta"> & {
  meta?: ErrorMeta;
};

export type ErrorMeta = {
  errorMessage?:
    | string
    | false
    | ((err: unknown) => string | false | undefined);
};

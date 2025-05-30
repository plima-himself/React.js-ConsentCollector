import { Pagination } from "../types";

export interface GetConsentsArgs {
  page: number;
  perPage: number;
}

export type ConsentType = "newsletter" | "ads" | "stats";

export type Consent = {
  id: number;
  name: string;
  email: string;
  consents: Record<ConsentType, boolean>;
};

export type GetConsentsResult = {
  data: Consent[];
  pagination: Pagination;
};

export type AddConsentArgs = Omit<Consent, "id">;

import { Consent } from "api";

export type ConsentWithStringConsents = Omit<Consent, "consents"> & {
  consents: string;
};

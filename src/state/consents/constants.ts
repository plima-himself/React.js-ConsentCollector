import { ConsentType } from "api";

export const CONSENT_BY_KEY: Record<ConsentType, string> = {
  newsletter: "Receive newsletter",
  ads: "Be shown targeted ads",
  stats: "Contribute to anonymous visit statistics",
};

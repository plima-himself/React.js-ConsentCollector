import type { PathConfiguration } from "./types";

const paths = {
  giveConsent: {
    value: "/give-consent",
  },
  consents: {
    value: "/consents",
  },
} satisfies Readonly<Record<string, PathConfiguration>>;

export default paths;

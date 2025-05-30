// Define a type for path configurations to ensure consistent structure across routes.
export type PathConfiguration = {
  value: string;
};

// Define all route paths used in the application.
// The `satisfies` keyword ensures type safety while preserving type inference.
const paths = {
  giveConsent: {
    value: "/give-consent",
  },
  consents: {
    value: "/consents",
  },
} satisfies Readonly<Record<string, PathConfiguration>>;

export default paths;

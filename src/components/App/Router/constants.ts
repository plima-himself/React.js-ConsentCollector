import { NavigationTab } from "components/NavigationTabs";
import paths from "paths";

export const DEFAULT_APP_TABS: NavigationTab[] = [
  {
    label: "Give consent",
    to: paths.giveConsent.value,
  },
  {
    label: "Collected consents",
    to: paths.consents.value,
  },
];

import { CheckboxField } from "components/Forms/CheckboxGroup";
import { CONSENT_BY_KEY } from "config";
import { boolean, InferType, object, string } from "yup";

// Validation schema for the Give Consent form.
// Ensures name and email are required, and at least one consent option is selected.
export const giveConsentFormSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  consents: object({
    newsletter: boolean(),
    ads: boolean(),
    stats: boolean(),
  }).test(
    "at-least-one-checked",
    "Select at least one option",
    (value) => value.newsletter || value.ads || value.stats
  ),
});

// TypeScript type derived from the validation schema for strong typing across the app.
export type GiveConsentFormData = InferType<typeof giveConsentFormSchema>;

// Default form values to initialize the useForm hook.
export const DEFAULT_GIVE_CONSENT_FORM_VALUES: GiveConsentFormData = {
  name: "",
  email: "",
  consents: {
    newsletter: false,
    ads: false,
    stats: false,
  },
};

// List of checkbox fields for user consent preferences.
// Labels are sourced from the central CONSENT_BY_KEY config for consistency.
export const PREFERENCE_FIELDS: CheckboxField<`consents.${keyof GiveConsentFormData["consents"]}`>[] =
  [
    {
      label: CONSENT_BY_KEY.newsletter,
      name: "consents.newsletter",
    },
    {
      label: CONSENT_BY_KEY.ads,
      name: "consents.ads",
    },
    {
      label: CONSENT_BY_KEY.stats,
      name: "consents.stats",
    },
  ];

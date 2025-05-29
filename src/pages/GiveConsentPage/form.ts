import { CheckboxField } from "components/Forms/CheckboxGroup";
import { boolean, InferType, object, string } from "yup";

export const giveConsentFormSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  preferences: object({
    newsletter: boolean(),
    ads: boolean(),
    stats: boolean(),
  }).test(
    "at-least-one-checked",
    "Select at least one option",
    (value) => value.newsletter || value.ads || value.stats
  ),
});

export type GiveConsentFormData = InferType<typeof giveConsentFormSchema>;

export const DEFAULT_GIVE_CONSENT_FORM_VALUES: GiveConsentFormData = {
  name: "",
  email: "",
  preferences: {
    newsletter: false,
    ads: false,
    stats: false,
  },
};

export const PREFERENCE_FIELDS: CheckboxField<`preferences.${keyof GiveConsentFormData["preferences"]}`>[] =
  [
    {
      label: "Receive newsletter",
      name: "preferences.newsletter",
    },
    {
      label: "Be shown targeted ads",
      name: "preferences.ads",
    },
    {
      label: "Contribute to anonymous visit statistics",
      name: "preferences.stats",
    },
  ];

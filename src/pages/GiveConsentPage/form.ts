import { CheckboxField } from "components/Forms/CheckboxGroup";
import { CONSENT_BY_KEY } from "config";
import { boolean, InferType, object, string } from "yup";

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

export type GiveConsentFormData = InferType<typeof giveConsentFormSchema>;

export const DEFAULT_GIVE_CONSENT_FORM_VALUES: GiveConsentFormData = {
  name: "",
  email: "",
  consents: {
    newsletter: false,
    ads: false,
    stats: false,
  },
};

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

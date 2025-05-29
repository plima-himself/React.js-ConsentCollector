import React from "react";
import { Button, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GlassContainer from "components/GlassContainer";
import { CheckboxGroup, TextField } from "components/Forms";
import {
  DEFAULT_GIVE_CONSENT_FORM_VALUES,
  GiveConsentFormData,
  giveConsentFormSchema,
  PREFERENCE_FIELDS,
} from "./form";

const GiveConsentPage: React.FC = () => {
  const {
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<GiveConsentFormData>({
    mode: "onChange",
    resolver: yupResolver(giveConsentFormSchema),
    defaultValues: DEFAULT_GIVE_CONSENT_FORM_VALUES,
  });

  const onSubmit = (data: GiveConsentFormData) => {
    console.log("Form submitted:", data);
  };

  return (
    <GlassContainer title="Give consent">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField<GiveConsentFormData>
          name="name"
          label="Name"
          control={control}
          error={errors.name?.message}
        />

        <TextField<GiveConsentFormData>
          name="email"
          label="Email address"
          control={control}
          error={errors.email?.message}
        />

        <CheckboxGroup<GiveConsentFormData>
          label="I agree to:"
          fields={PREFERENCE_FIELDS}
          control={control}
        />

        {errors.preferences?.message && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.preferences.message}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          sx={{ mt: 3 }}
        >
          Give consent
        </Button>
      </form>
    </GlassContainer>
  );
};

export default GiveConsentPage;

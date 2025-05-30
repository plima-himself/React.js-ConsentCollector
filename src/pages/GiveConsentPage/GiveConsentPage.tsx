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
import { useGiveConsent } from "state";
import { AddConsentArgs } from "api";
import { useNavigate } from "react-router-dom";
import paths from "paths";

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

  const { mutateAsync: giveConsent, isLoading } = useGiveConsent();
  const navigate = useNavigate();

  const onSubmit = async (data: GiveConsentFormData) => {
    await giveConsent(data as AddConsentArgs);

    navigate(paths.consents.value);
  };

  return (
    <GlassContainer title="Give consent">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <TextField<GiveConsentFormData>
          name="name"
          label="Name"
          control={control}
          error={errors.name?.message}
          disabled={isLoading}
        />

        <TextField<GiveConsentFormData>
          name="email"
          label="Email address"
          control={control}
          error={errors.email?.message}
          disabled={isLoading}
        />

        <CheckboxGroup<GiveConsentFormData>
          label="I agree to"
          fields={PREFERENCE_FIELDS}
          control={control}
          disabled={isLoading}
        />

        {errors.consents?.message && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {errors.consents.message}
          </Typography>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          loadingPosition="start"
          disabled={!isValid || isLoading}
          loading={isLoading}
          sx={{ mt: 3 }}
        >
          Give consent
        </Button>
      </form>
    </GlassContainer>
  );
};

export default GiveConsentPage;

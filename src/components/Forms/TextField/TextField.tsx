import { TextField as MuiTextField } from "@mui/material";
import { Controller, FieldPath, Control } from "react-hook-form";

type TextFieldProps<T extends Record<string, unknown>> = {
  label: string;
  name: FieldPath<T>;
  disabled?: boolean;
  error?: string;
  control: Control<T>;
};

const TextField = <T extends Record<string, unknown>>({
  name,
  label,
  disabled,
  error,
  control,
}: TextFieldProps<T>) => (
  <Controller
    {...{ name, control }}
    render={({ field }) => (
      <MuiTextField
        {...field}
        {...{ label, disabled }}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error}
      />
    )}
  />
);

export default TextField;

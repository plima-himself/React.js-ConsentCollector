import { TextField as MuiTextField } from "@mui/material";
import { Controller, FieldPath, Control } from "react-hook-form";

type TextFieldProps<T extends Record<string, unknown>> = {
  label: string;
  name: FieldPath<T>;
  control: Control<T>;
  error?: string;
};

const TextField = <T extends Record<string, unknown>>({
  name,
  label,
  control,
  error,
}: TextFieldProps<T>) => (
  <Controller
    {...{ name, control }}
    render={({ field }) => (
      <MuiTextField
        {...field}
        fullWidth
        margin="normal"
        label={label}
        error={!!error}
        helperText={error}
      />
    )}
  />
);

export default TextField;

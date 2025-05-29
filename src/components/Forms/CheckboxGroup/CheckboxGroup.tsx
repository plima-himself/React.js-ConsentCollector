/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Checkbox as MuiCheckbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Control, Controller, FieldPath } from "react-hook-form";
import { CheckboxField } from "./types";

type CheckboxGroupProps<T extends Record<string, any>> = {
  label?: React.ReactNode;
  fields: CheckboxField<FieldPath<T>>[];
  control: Control<T>;
};

const CheckboxGroup = <T extends Record<string, any>>({
  label,
  fields,
  control,
}: CheckboxGroupProps<T>) => (
  <>
    {label && (
      <Typography variant="subtitle1" mt={2}>
        {label}
      </Typography>
    )}

    <FormGroup>
      {fields.map(({ label, name }) => (
        <Controller
          {...{ name, control }}
          key={name}
          render={({ field }) => (
            <FormControlLabel
              label={label}
              control={<MuiCheckbox {...field} checked={field.value} />}
            />
          )}
        />
      ))}
    </FormGroup>
  </>
);

export default CheckboxGroup;

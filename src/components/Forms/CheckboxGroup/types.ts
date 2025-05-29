/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldPath } from "react-hook-form";

export type CheckboxField<T extends FieldPath<any> = string> = {
  label: string;
  name: T;
};

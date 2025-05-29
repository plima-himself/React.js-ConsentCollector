import { inputComponents } from "./input";
import { checkboxComponents } from "./checkbox";
import { baselineComponent } from "./baseline";
import { buttonComponent } from "./button";
import { ThemeOptions } from "@mui/material";

export const components: ThemeOptions["components"] = {
  ...inputComponents,
  ...checkboxComponents,
  ...baselineComponent,
  ...buttonComponent,
};

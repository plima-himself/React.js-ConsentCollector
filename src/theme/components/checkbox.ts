import { ThemeOptions } from "@mui/material";

export const checkboxComponents: ThemeOptions["components"] = {
  MuiCheckbox: {
    styleOverrides: {
      root: {
        color: "white",

        "&.Mui-checked": {
          color: "white",
        },
      },
    },
  },
  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        color: "white",
      },
    },
  },
};

import { ThemeOptions } from "@mui/material";

export const baselineComponent: ThemeOptions["components"] = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        boxSizing: "border-box",
      },

      body: {
        margin: 0,
      },

      "*:focus": {
        outline: "none",
      },
    },
  },
};

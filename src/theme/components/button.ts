import { ThemeOptions } from "@mui/material";

export const buttonComponent: ThemeOptions["components"] = {
  MuiButton: {
    styleOverrides: {
      root: {
        backgroundColor: "#1976d2",
        color: "white",

        "&:hover": {
          backgroundColor: "#1565c0",
        },
        "&.Mui-disabled": {
          opacity: "0.3",
          backgroundColor: "#1976d2",
          color: "white",
        },
      },
    },
  },
};

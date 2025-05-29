import { ThemeOptions } from "@mui/material";

export const inputComponents: ThemeOptions["components"] = {
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "white",
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
          borderColor: "#f44336",
        },
        "& input": {
          color: "white",
        },
      },
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: {
        color: "white",

        "&.Mui-focused": {
          color: "white",
        },
      },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        color: "#f44336",
      },
    },
  },
};

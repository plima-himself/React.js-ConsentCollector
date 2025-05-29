import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
    allVariants: {
      color: "#ffffff",
    },
  },
  components: {
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
  },
});

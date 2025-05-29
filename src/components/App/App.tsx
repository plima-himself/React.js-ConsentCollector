import theme from "theme";
import RouteProvider from "./Router";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteProvider />
    </ThemeProvider>
  );
}

export default App;

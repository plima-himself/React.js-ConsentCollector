import RouteProvider from "./Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouteProvider />
    </ThemeProvider>
  );
}

export default App;

import theme from "theme";
import RouteProvider from "./Router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import QueryClientProvider from "./QueryClientProvider";

function App() {
  return (
    <QueryClientProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouteProvider />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

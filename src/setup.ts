// Import font families used throughout the application.
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/700.css";

import { setupAxiosMock } from "api";

// Initialize Axios mock adapter for intercepting and simulating API requests.
// Useful for local development and testing without hitting a real backend.
setupAxiosMock();

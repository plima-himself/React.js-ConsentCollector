import { styled } from "@mui/material/styles"; // import { MOBILE_BREAKPOINT_PX } from "config";
import { Box } from "@mui/material";

export const Root = styled(Box)({
  width: "100vw",
  height: "100vh",
  backgroundImage: `
    radial-gradient(circle at 100% 100%, #21c6b247, #fff0 40%),
    radial-gradient(circle at 50% 0, #2d62ff4d, #fff0 40%),
    radial-gradient(circle at 0 100%, #dd23bb40, #fff0 41%)
  `,
  backgroundColor: "#0d2632",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const Container = styled(Box)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  width: "100%",
}));

export const OutletContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  paddingLeft: theme.spacing(3),
}));

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"; // import { MOBILE_BREAKPOINT_PX } from "config";
import { motion } from "framer-motion";

export const Root = styled(motion.create(Box))(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 4,
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(4.6px)",
  WebkitBackdropFilter: "blur(4.6px)",
  background: "rgba(0, 0, 0, 0.41)",
}));

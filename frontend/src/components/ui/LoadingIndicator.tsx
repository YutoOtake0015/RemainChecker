// React & Next.js
import React from "react";
import { ClockLoader } from "react-spinners";

// state
import { useAtomValue } from "jotai";
import { loadingAtom } from "../../jotai/atom/loadingAtom";

// MUI
import { Box } from "@mui/material";

const clockStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
};

const LoadingIndicator = () => {
  const isLoading = useAtomValue(loadingAtom);

  if (!isLoading) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", ...clockStyle }}>
      <ClockLoader size={150} color={"#000000"} speedMultiplier={1} />
    </Box>
  );
};

export default LoadingIndicator;

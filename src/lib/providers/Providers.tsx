"use client";

import React from "react";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // All kind of Providers are here in a client component which will wrap up the root layout (server component)
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );
};

export default Providers;

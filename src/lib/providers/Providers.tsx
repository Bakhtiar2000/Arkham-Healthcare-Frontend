"use client";

import React from "react";
import { theme } from "../theme/theme";
import { ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    // All kind of Providers are here in a client component which will wrap up the root layout (server component)
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default Providers;

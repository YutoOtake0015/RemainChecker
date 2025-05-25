// React & Next.js
import React from "react";
import type { AppProps } from "next/app";

// state
import { RecoilRoot } from "recoil";
import { AuthProvider } from "../context/auth";

// utility
import { ja } from "date-fns/locale";

// components
import Navbar from "../components/layout/Navbar";
import ClearErrorMessages from "../components/err/ClearErrorMessages";
import LoadingIndicator from "../components/ui/LoadingIndicator";

// MUI
import { CssBaseline } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ClearErrorMessages>
        <LoadingIndicator />
        <AuthProvider>
          <Navbar />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
            <CssBaseline />
            <Component {...pageProps} />
          </LocalizationProvider>
        </AuthProvider>
      </ClearErrorMessages>
    </RecoilRoot>
  );
}

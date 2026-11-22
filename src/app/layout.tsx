// src/app/layout.tsx
"use client";

import "./globals.css";
import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    secondary: { main: "#009688" },
    background: { default: "#fff" },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>AI Medical Prescription Reader</title>
        <meta name="description" content="AI-powered application for pharmacies" />
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ToastContainer
            position="top-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            theme="light"
            toastStyle={{
              borderRadius: "10px",
              background: "#fff",
              color: "#0B3D91",
              fontWeight: 600,
              boxShadow: "0 4px 16px rgba(11,61,145,0.08)",
              border: "1.5px solid #BFC9CA",
              minWidth: 320,
            }}
            icon={false}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}

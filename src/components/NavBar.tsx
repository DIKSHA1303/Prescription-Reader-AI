// src/components/NavBar.tsx
"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import Link from "next/link";
import { Stack } from "@mui/material";

export default function NavBar() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="transparent"
      sx={{
        background: "#fff",
        boxShadow: "0 2px 8px 0 rgba(34, 48, 84, 0.02)", // sombra mínima e elegante
        border: "none", // remove qualquer contorno
        zIndex: (theme) => theme.zIndex.drawer + 100,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 68,
          px: { xs: 1, md: 3 },
        }}
      >
        {/* Esquerda: Logo + navegação */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <Image
              src="/icon.png"
              alt="Logo"
              width={36}
              height={36}
              style={{
                borderRadius: 8,
                background: "#fff",
                boxShadow: "none", // Sem borda ou sombra
              }}
              priority
            />
          </Link>
          <Stack direction="row" spacing={0.5}>
            <Button
              component={Link}
              href="/"
              sx={{
                color: "#0B3D91",
                fontWeight: 600,
                textTransform: "none",
                fontSize: 15, // reduzido de 17
                px: 1.2,      // reduzido de 1.5
                borderRadius: 2,
                background: "transparent",
                boxShadow: "none",
                minHeight: 36, // reduzido
                "&:hover": {
                  background: "#F6F7FB",
                  color: "#0B3D91",
                },
              }}
            >
              Home
            </Button>
            <Button
              component={Link}
              href="/sobre"
              sx={{
                color: "#0B3D91",
                fontWeight: 600,
                textTransform: "none",
                fontSize: 15, // reduzido de 17
                px: 1.2,      // reduzido de 1.5
                borderRadius: 2,
                background: "transparent",
                boxShadow: "none",
                minHeight: 36, // reduzido
                "&:hover": {
                  background: "#F6F7FB",
                  color: "#0B3D91",
                },
              }}
            >
              About
            </Button>
          </Stack>
        </Box>

        {/* Right: GitHub Button */}
        <Box>
          <Button
            variant="outlined"
            href=""
            target="_blank"
            startIcon={<GitHubIcon />}
            sx={{
              borderRadius: 2,
              fontWeight: 600,
              ml: 1.5,         // reduzido de 2
              textTransform: "none",
              color: "#0B3D91",
              borderColor: "#BFC9CA",
              bgcolor: "#FFF",
              px: 2,           // reduzido de 2.5
              minHeight: 36,   // reduzido
              fontSize: 14,    // reduzido
              boxShadow: "none",
              "&:hover": {
                bgcolor: "#F6F7FB",
                borderColor: "silver",
                color: "#0B3D91",
              },
            }}
          >
            GitHub
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// src/components/Footer.tsx
"use client";

import { Box, Typography, Link as MuiLink } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        bgcolor: "#fff",
        borderTop: "1px solid #BFC9CA",
        boxShadow: "0 -1px 4px 0 rgba(34, 48, 84, 0.03)",
        py: 1,
        px: 1,
        mt: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontWeight: 400, fontSize: 13, letterSpacing: 0.2 }}
      >
        
        <MuiLink
          href=""
          target="_blank"
          rel="noopener"
          underline="hover"
          sx={{
            fontWeight: 600,
            color: "#0B3D91",
            letterSpacing: 0.2,
            ml: 0.2,
            "&:hover": {
              color: "silver",
            },
          }}
        >
          
        </MuiLink>{" "}
        · {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

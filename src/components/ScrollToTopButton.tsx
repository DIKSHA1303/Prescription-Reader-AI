import { useEffect, useState } from "react";
import { Fab, Zoom } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 120); // Mostra só quando scrollar mais de 120px
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: { xs: 20, md: 32 },
          right: { xs: 20, md: 32 },
          zIndex: 1500,
          boxShadow: "0 4px 24px 0 rgba(34, 48, 84, 0.16)",
          bgcolor: "primary.main",
          color: "#fff",
          "&:hover": {
            bgcolor: "primary.dark",
          },
        }}
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </Fab>
    </Zoom>
  );
}

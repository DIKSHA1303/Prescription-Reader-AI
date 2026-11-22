// src\components\ImageUpload.tsx
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, useRef, useEffect, useState } from "react";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import CloseIcon from "@mui/icons-material/Close";
import RestoreIcon from "@mui/icons-material/Restore";

interface ImageUploadProps {
  loading: boolean;
  file: File | null;
  preview: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  resetSignal?: boolean;
}

export default function ImageUpload({
  loading,
  file,
  preview,
  onFileChange,
  onSubmit,
  resetSignal,
}: ImageUploadProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleOpen() {
    setOpen(true);
    setZoom(1);
  }
  function handleClose() {
    setOpen(false);
    setZoom(1);
  }
  function handleZoomIn() {
    setZoom((z) => Math.min(z + 0.2, 4));
  }
  function handleZoomOut() {
    setZoom((z) => Math.max(z - 0.2, 0.4));
  }
  function handleZoomReset() {
    setZoom(1);
  }

  useEffect(() => {
    if (resetSignal && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [resetSignal]);

  return (
    <Box
      sx={{
        background: "var(--color-bg-secondary)",
        borderRadius: "20px",
        boxShadow: "0 4px 24px 0 rgba(34, 48, 84, 0.07)",
        p: { xs: 2, md: 3 },
        mb: 2,
        border: "none",
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          color: "var(--color-blue-dark)",
          fontWeight: 700,
          letterSpacing: 0.4,
        }}
      >
        Prescription Image
      </Typography>
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          pt: "62%",
          borderRadius: "16px",
          overflow: "hidden",
          bgcolor: "var(--color-bg)",
          border: "1px solid var(--color-silver)",
          mb: 2,
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "none",
        }}
      >
        {preview ? (
          <>
            <Box
              component="img"
              src={preview}
              alt="preview"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "16px",
                transition: "box-shadow 0.2s",
                zIndex: 1,
                cursor: "pointer",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                zIndex: 2,
                bgcolor: "rgba(255,255,255,0.82)",
                borderRadius: "50%",
                boxShadow: "0 2px 6px 0 rgba(34,48,84,0.09)",
              }}
            >
              <IconButton
                onClick={handleOpen}
                size="small"
                sx={{ color: "var(--color-blue-dark)" }}
              >
                <FullscreenIcon fontSize="medium" />
              </IconButton>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-silver-dark)",
              fontSize: "1.1rem",
            }}
          >
            <Typography color="inherit" fontWeight={500}>
              No image selected
            </Typography>
          </Box>
        )}
      </Paper>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          component="label"
          disabled={loading}
          fullWidth
          sx={{
            fontWeight: 700,
            fontSize: "1rem",
            background: "var(--color-blue-dark)",
            color: "#fff",
            borderRadius: "14px",
            boxShadow: "none",
            px: 0,
            "&:hover": {
              background: "var(--color-blue-main)",
            },
            transition: "background 0.15s",
          }}
        >
          Select File
          <input
            type="file"
            accept="image/*"
            hidden
            ref={inputRef}
            onChange={onFileChange}
            disabled={loading}
          />
        </Button>
        <Button
          variant="contained"
          fullWidth
          sx={{
            fontWeight: 700,
            background: "var(--color-blue-dark)",
            color: "#fff",
            borderRadius: "14px",
            fontSize: "1rem",
            px: 0,
            boxShadow: "none",
            "&:hover": {
              background: "var(--color-blue-main)",
            },
            transition: "background 0.15s",
          }}
          disabled={loading || !file}
          onClick={onSubmit}
        >
          {loading ? (
            <CircularProgress size={22} color="inherit" sx={{ mr: 1 }} />
          ) : (
            "Send"
          )}
        </Button>
      </Stack>

      {/* Modal de Imagem Expandida */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "100vw",
            height: "100vh",
            bgcolor: "rgba(30,40,60,0.96)",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1300,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Barra de ferramentas */}
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              p: 2,
              position: "absolute",
              top: 0,
              left: 0,
              bgcolor: "rgba(255,255,255,0.04)",
              zIndex: 2,
            }}
          >
            <IconButton onClick={handleZoomOut} sx={{ color: "#fff" }}>
              <ZoomOutIcon />
            </IconButton>
            <Typography
              sx={{ color: "#fff", minWidth: 56, textAlign: "center" }}
            >
              {Math.round(zoom * 100)}%
            </Typography>
            <IconButton onClick={handleZoomIn} sx={{ color: "#fff" }}>
              <ZoomInIcon />
            </IconButton>
            <IconButton onClick={handleZoomReset} sx={{ color: "#fff" }}>
              <RestoreIcon />
            </IconButton>
            <IconButton onClick={handleClose} sx={{ color: "#fff" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          {/* Imagem com zoom, scroll e drag */}
          <Box
            sx={{
              flex: 1,
              width: "100vw",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "auto",
              cursor: zoom > 1 ? "grab" : "default",
              mt: 8,
              mb: 2,
              p: 2,
            }}
          >
            <Box
              component="img"
              src={preview ?? ""}
              alt="full"
              draggable={false}
              sx={{
                maxWidth: `${zoom * 90}vw`,
                maxHeight: `${zoom * 80}vh`,
                width: "auto",
                height: "auto",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.32)",
                borderRadius: "18px",
                userSelect: "none",
                transition: "max-width 0.2s, max-height 0.2s",
                background: "#fff",
                display: "block",
                margin: "auto",
              }}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

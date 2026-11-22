"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";
import { createWorker } from "tesseract.js";
import { toast } from "react-toastify";
import NavBar from "@/components/NavBar";
import ImageUpload from "@/components/ImageUpload";
import OcrResult from "@/components/OcrResult";
import OcrDetails from "@/components/OcrDetails";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ReplayIcon from "@mui/icons-material/Replay";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Container,
  Stack,
} from "@mui/material";

type Result = {
  medicamento: string;
  ean: string;
  quantidade: string;
};

export default function HomePage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [ocrText, setOcrText] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSignal, setResetSignal] = useState(false);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (!f) return;
    setFile(f);
    setOcrText(null);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreview(reader.result);
      }
    };
    reader.readAsDataURL(f);
  }

  async function runOCR(f: File) {
    setLoading(true);
    setError(null);
    try {
      const worker = await createWorker("por");
      await worker.load();
      const {
        data: { text },
      } = await worker.recognize(f);
      await worker.terminate();
      setOcrText(text);
      return text;
    } catch (err: any) {
      setError(
        "Erro ao realizar OCR: " + (err?.message || JSON.stringify(err)),
      );
      toast.error("Erro ao realizar OCR", { icon: <span>🚫</span> });
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e?: FormEvent) {
    if (e) e.preventDefault();
    if (!file) {
      setError("Selecione uma imagem antes de enviar.");
      toast.error("Selecione uma imagem antes de enviar.", {
        icon: <span>📷</span>,
      });
      return;
    }

    const text = await runOCR(file);
    if (!text) return;

    setLoading(true);
    try {
      const res = await fetch("/api/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      // Tratamento seguro para qualquer resposta
      let data: any = {};
      let raw = "";
      try {
        data = await res.json();
      } catch (jsonErr) {
        raw = await res.text();
        data = { error: "Resposta não é JSON", raw };
      }

      if (!res.ok) {
        // Exibe erro detalhado (mensagem, raw, status, etc)
        const errorMsg = [
          data.error ? `Erro: ${data.error}` : "Erro desconhecido",
          res.status ? `Status: ${res.status}` : "",
          raw ? `Resposta bruta: ${raw}` : "",
        ]
          .filter(Boolean)
          .join("\n");

        setError(errorMsg);
        toast.error(data.error || "Erro ao processar no servidor.", {
          icon: <span>❌</span>,
        });
      } else {
        setResult(data);
        setError(null);
        toast.success("Reconhecimento realizado com sucesso!", {
          icon: <span>✅</span>,
        });
      }
    } catch (err: any) {
      setError(
        "Falha ao comunicar com a API: " +
        (err?.message || JSON.stringify(err)),
      );
      toast.error("Falha ao comunicar com a API.", { icon: <span>🛑</span> });
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setFile(null);
    setPreview(null);
    setOcrText(null);
    setResult(null);
    setError(null);
    setResetSignal((v) => !v);
    toast.info("Fluxo reiniciado.", { icon: <span>🔄</span> });
  }

  return (
    <>
      <NavBar />
      <Container maxWidth="xl" sx={{ pt: 10, pb: 6 }}>
        <Box
          sx={{
            bgcolor: "background.paper",
            p: { xs: 2, md: 4 },
            borderRadius: 3,
            boxShadow: { xs: 0, md: 2 },
            maxWidth: 1100,
            mx: "auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4} alignItems="flex-start">
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="h4"
                  align="center"
                  gutterBottom
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  Medical Prescription Reader
                </Typography>
                <Typography
                  variant="body1"
                  align="center"
                  color="textSecondary"
                  fontWeight="bold"
                  sx={{ mb: 2 }}
                >
                  Use artificial intelligence to digitize your medical prescription: upload a photo and instantly get the medication, EAN, and quantity data.
                </Typography>
                <Stack direction="row" justifyContent="left" sx={{ mb: 0 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ReplayIcon />}
                    sx={{
                      borderRadius: "8px",
                      color: "#0B3D91",
                      borderColor: "#BFC9CA",
                      fontWeight: 600,
                      bgcolor: "#FFF",
                      "&:hover": {
                        bgcolor: "#F6F7FB",
                        borderColor: "#FFD700",
                        color: "#0B3D91",
                      },
                    }}
                    onClick={handleReset}
                    disabled={loading}
                  >
                    New Prescription
                  </Button>
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <ImageUpload
                  loading={loading}
                  file={file}
                  preview={preview}
                  onFileChange={handleFileChange}
                  onSubmit={handleSubmit}
                  resetSignal={resetSignal}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography variant="h6" gutterBottom>
                  Reading Result
                </Typography>
                {loading && (
                  <Box sx={{ textAlign: "center", mt: 4 }}>
                    <CircularProgress color="primary" />
                    <Typography sx={{ mt: 1 }}>Processing OCR...</Typography>
                  </Box>
                )}
                {!loading && !error && result && <OcrResult result={result} />}
              </Grid>
            </Grid>
          </form>
        </Box>
        <OcrDetails ocrText={ocrText} error={error} />
        <Footer />
        <ScrollToTopButton />
      </Container>
    </>
  );
}

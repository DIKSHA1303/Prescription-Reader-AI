import { Box, Chip, Typography } from "@mui/material";

interface OcrResultProps {
  result: { medicamento: string; ean: string; quantidade: string };
}

export default function OcrResult({ result }: OcrResultProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <Chip label="Medication" color="primary" sx={{ mr: 1, mb: 1 }} />
      <Typography>{result.medicamento}</Typography>
      <Chip label="EAN" color="secondary" sx={{ mr: 1, mb: 1 }} />
      <Typography>{result.ean}</Typography>
      <Chip label="Quantity" color="success" sx={{ mr: 1, mb: 1 }} />
      <Typography>{result.quantidade}</Typography>
    </Box>
  );
}

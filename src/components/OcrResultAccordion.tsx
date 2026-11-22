"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OcrResultAccordionProps {
  ocrText: string;
}

export default function OcrResultAccordion({
  ocrText,
}: OcrResultAccordionProps) {
  return (
    <Accordion sx={{ mt: 3, borderRadius: 2 }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600} color="primary.main">
          OCR Details (Extracted Text)
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Paper
          variant="outlined"
          sx={{
            bgcolor: "#f7fafd",
            p: 2,
            whiteSpace: "pre-wrap",
            fontSize: "1rem",
          }}
        >
          {ocrText}
        </Paper>
      </AccordionDetails>
    </Accordion>
  );
}

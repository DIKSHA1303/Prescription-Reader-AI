import { Box, Paper, Typography } from "@mui/material";
import OcrResultAccordion from "@/components/OcrResultAccordion";

interface OcrDetailsProps {
    ocrText: string | null;
    error: string | null;
}

export default function OcrDetails({ ocrText, error }: OcrDetailsProps) {
    if (!ocrText && !error) return null;
    return (
        <Box
            sx={{
                maxWidth: 1100,
                mx: "auto",
                mt: 5,
                p: { xs: 2, md: 4 },
                bgcolor: "#f7fafd",
                borderRadius: 3,
                boxShadow: { xs: 0, md: 2 },
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    color: "primary.main",
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: 0.5,
                }}
            >
                Operation Details
            </Typography>
            {ocrText && <OcrResultAccordion ocrText={ocrText} />}
            {error && (
                <Box sx={{ mt: 2, p: 2, bgcolor: "#ffeaea", borderRadius: 2, color: "#b71c1c", fontWeight: 500 }}>
                    <strong>Detailed error:</strong>
                    <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>{error}</pre>
                </Box>
            )}
        </Box>
    );
}

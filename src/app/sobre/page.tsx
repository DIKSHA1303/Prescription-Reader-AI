"use client";

import {
  Container,
  Box,
  Typography,
  Paper,
  Link,
  Divider,
} from "@mui/material";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function SobrePage() {
  return (
    <Container maxWidth="md" sx={{ pt: 12, pb: 8 }}>
      <NavBar />
      <Paper
        elevation={2}
        sx={{
          bgcolor: "#F6F7FB",
          borderRadius: 3,
          p: { xs: 2, md: 5 },
          boxShadow: "0 4px 24px 0 rgba(34, 48, 84, 0.06)",
          mb: 5,
        }}
      >
        {/* Section 1: About the POC */}
        <Typography
          variant="h4"
          sx={{ color: "#0B3D91", fontWeight: 700, mb: 2 }}
        >
          About this Project
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          This application is a <strong>POC</strong> (Proof of Concept). The goal
          is to quickly demonstrate and validate a solution for reading and
          explaining medical prescriptions, using modern OCR and Artificial
          Intelligence techniques.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          As a POC, this application may have errors, is constantly evolving,
          and should not be used in production. The focus is to test ideas, assess
          technical feasibility, and learn during the process. If you want to
          know more about POCs, we recommend this material:&nbsp;
          <Link
            href="https://en.wikipedia.org/wiki/Proof_of_concept"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            What is a POC? (Wikipedia)
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Section 2: OCR and Tesseract */}
        <Typography
          variant="h5"
          sx={{ color: "#0B3D91", fontWeight: 600, mb: 1 }}
        >
          OCR with Tesseract.js
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          OCR (Optical Character Recognition) is the technology that allows
          extracting text from images, such as photos of medical prescriptions.
          We use <strong>Tesseract.js</strong>, one of the most well-known open
          source OCR libraries.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Tesseract works by training models capable of identifying letters and
          words in different languages, even in low-quality images. This is
          essential for digitizing medical documents, making automatic processing
          and access to relevant information easier. Learn more at:&nbsp;
          <Link
            href="https://tesseract.projectnaptha.com/"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            tesseract.projectnaptha.com
          </Link>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Section 3: Normalization and Parser */}
        <Typography
          variant="h5"
          sx={{ color: "#0B3D91", fontWeight: 600, mb: 1 }}
        >
          Text Normalization and Parsing
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          After extracting the text, it is necessary to normalize (standardize)
          the content to minimize noise and differences caused by OCR errors, such
          as accented letters, case variations, and line breaks. This process
          makes it easier to correctly identify medications and relevant
          information in the prescription.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The parser is responsible for analyzing the cleaned text and identifying
          patterns, such as medication name, dosage, and quantity, in a
          semi-automated way.
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Section 4: NLP (compromise.js) */}
        <Typography
          variant="h5"
          sx={{ color: "#0B3D91", fontWeight: 600, mb: 1 }}
        >
          Artificial Intelligence and NLP with Compromise
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To improve the understanding of the extracted text, we use the{" "}
          <strong>compromise</strong> library, an NLP (Natural Language
          Processing) solution. This technology allows identifying entities,
          numbers, and keywords in the text, making recognition more accurate
          even when there are small OCR errors or writing variations.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Learn more about the compromise library at:&nbsp;
          <Link
            href="https://compromise.cool/"
            target="_blank"
            rel="noopener"
            underline="hover"
          >
            compromise.cool
          </Link>
        </Typography>
      </Paper>
      <Footer />
    </Container>
  );
}

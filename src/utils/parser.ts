
/**
 * Temporary demo parser for OCR testing.
 * Not intended for real prescriptions.
 */

export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .trim();
}

export function extract(
  text: string,
): { name: string; quantity: string } | null {
  const normalized = normalize(text);

  // Temporary known medicines for the project demo
  const demoMedicines = [
    "uninaltrex 50mg",
    "dipirona sodica 500mg",
    "paracetamol 500mg",
    "ibuprofeno 400mg",
    "amoxicilina 500mg",
    "azitromicina 500mg",
    "cloridrato de metformina 500mg",
    "losartana potassica 50mg",
    "sinvastatina 20mg",
    "omeprazol 20mg",
    "atorvastatina 20mg",
    "enalapril 20mg",
    "cloridrato de sertralina 50mg",
    "maleato de enalapril 10mg",
    "cloridrato de propranolol 40mg",
  ];

  const name = demoMedicines.find((medicine =>
    normalized.includes(medicine)
  ));

  if (!name) {
  return {
    name: "paracetamol 500mg",
    quantity: "10 tablets (demo)",
  };
 }

  // Demo-only quantity recognition
  const quantityMatch = normalized.match(
    /\b(\d+)\s*(comprimidos|tabletes|capsulas|capsules|tablets|units|unidades)\b/i
  );

  const quantity = quantityMatch
    ? `${quantityMatch[1]} ${quantityMatch[2]}`
    : "Quantidade não identificada";

  return { name, quantity };
}

// src/utils/tesseractConfig.ts
import path from "path";

/**
 * Caminhos absolutos para os artefatos necessários ao Tesseract.js em Node.js.
 */
export const workerPath = require.resolve("tesseract.js/dist/worker.min.js");
export const corePath = require.resolve(
  "tesseract.js-core/tesseract-core.wasm.js",
);
// Dados de idioma servidos estaticamente da pasta public/tessdata
export const langPath = path.join(process.cwd(), "public", "tessdata");

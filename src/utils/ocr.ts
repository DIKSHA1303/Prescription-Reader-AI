// src\utils\ocr.ts
import { createWorker } from "tesseract.js";
import path from "path";

const workerPath = path.resolve("../tesseract/worker.min.js");
const corePath = path.resolve("../tesseract/tesseract-core.wasm.js");
const langPath = "https://tessdata.projectnaptha.com/4.0.0/";

export async function recognize(buffer: Buffer): Promise<string> {
  const worker = await createWorker({
    langPath,
    logger: (m: any) => console.log("[Tesseract]", m),
  } as any); // 'as any' por causa de tipagem antiga

  try {
    await worker.load();
    await worker.reinitialize("por");
    const {
      data: { text },
    } = await worker.recognize(buffer);
    return text;
  } catch (error) {
    console.error("[OCR] Error:", error);
    throw error;
  } finally {
    await worker.terminate();
  }
}

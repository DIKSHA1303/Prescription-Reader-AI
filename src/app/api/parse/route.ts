
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { normalize, extract } from "@/utils/parser";
import { getDb } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();

    if (!text || typeof text !== "string" || text.length < 5) {
      return NextResponse.json(
        { error: "Text not provided or too short." },
        { status: 400 }
      );
    }

    const normalized = normalize(text);
    const result = extract(normalized);

    if (!result || !result.name || !result.quantity) {
      return NextResponse.json(
        { error: "Parsing failed", details: result },
        { status: 422 }
      );
    }

    const { name, quantity } = result;
    const searchTerm = name.toLowerCase();
    console.log("PARSER EXTRACTED NAME:", name);
    console.log("PARSER EXTRACTED QUANTITY:", quantity);

    const db = await getDb();

    // Verify the medicines table exists
    try {
      db.exec("SELECT 1 FROM meds LIMIT 1");
    } catch (dbErr) {
      return NextResponse.json(
        {
          error: "Medicines table not found. Check the database file.",
          details: dbErr instanceof Error ? dbErr.message : dbErr,
        },
        { status: 500 }
      );
    }

    // Flexible medicine name lookup
    const stmt = db.prepare(
      "SELECT ean, nome_padronizado FROM meds WHERE lower(nome_padronizado) LIKE '%' || $nome || '%'"
    );

    let row: { ean: string; nome_padronizado: string } | undefined;

    try {
      stmt.bind({ $nome: searchTerm });

      if (stmt.step()) {
        row = stmt.getAsObject() as {
          ean: string;
          nome_padronizado: string;
        };
      }
    } finally {
      stmt.free();
    }

    if (!row) {
      return NextResponse.json(
        {
          error: "Medicine not registered",
          searched: searchTerm,
          exemplosEsperados: [
            "uninaltrex 50mg",
            "dipirona sodica 500mg",
            "paracetamol 500mg",
            "cloridrato de metformina 500mg",
          ],
        },
        { status: 404 }
      );
    }

    const { ean, nome_padronizado } = row;

    return NextResponse.json({
      medicamento: nome_padronizado,
      ean,
      quantidade: quantity,
    });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error(String(err));

    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
        stack: error.stack ?? null,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "API Parse endpoint is working",
    timestamp: new Date().toISOString(),
  });
}

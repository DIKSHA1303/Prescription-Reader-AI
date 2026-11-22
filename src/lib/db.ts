
import initSqlJs from "sql.js";
import type { Database as SqlJsDatabase } from "sql.js";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "meds-temp.db");
const wasmPath = path.join(process.cwd(), "public", "sql-wasm.wasm");

let dbPromise: Promise<SqlJsDatabase> | null = null;

export async function getDb(): Promise<SqlJsDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await initSqlJs({
        locateFile: () => wasmPath,
      });

      const fileBuffer = fs.readFileSync(dbPath);
      return new SQL.Database(new Uint8Array(fileBuffer));
    })();
  }

  return dbPromise;
}

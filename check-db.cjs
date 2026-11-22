const initSqlJs = require("sql.js");
const fs = require("fs");
const path = require("path");

(async () => {
  const SQL = await initSqlJs({
    locateFile: () => path.resolve("public/sql-wasm.wasm")
  });

  const db = new SQL.Database(
    new Uint8Array(fs.readFileSync("data/meds-temp.db"))
  );

  const result = db.exec("SELECT ean, nome_padronizado FROM meds LIMIT 15");

  if (result.length) {
    console.log(JSON.stringify(result[0].values, null, 2));
  } else {
    console.log("No medicine records found.");
  }

  db.close();
})();

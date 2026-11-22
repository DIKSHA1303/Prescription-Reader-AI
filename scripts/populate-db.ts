// scripts/populate-db.ts
import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Cria pasta data se não existir
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "meds-temp.db");
const db = new Database(dbPath);

// Droga e recria a tabela, popula sempre que rodar o script
db.exec(`
  DROP TABLE IF EXISTS meds;
  CREATE TABLE meds (
    ean TEXT PRIMARY KEY,
    nome_padronizado TEXT NOT NULL
  );
  INSERT INTO meds (ean, nome_padronizado) VALUES
    ('7891234000001', 'uninaltrex 50mg'),
    ('7891234000002', 'dipirona sodica 500mg'),
    ('7891234000003', 'paracetamol 500mg'),
    ('7891234000004', 'ibuprofeno 400mg'),
    ('7891234000005', 'amoxicilina 500mg'),
    ('7891234000006', 'azitromicina 500mg'),
    ('7891234000007', 'cloridrato de metformina 500mg'),
    ('7891234000008', 'losartana potassica 50mg'),
    ('7891234000009', 'sinvastatina 20mg'),
    ('7891234000010', 'omeprazol 20mg'),
    ('7891234000011', 'atorvastatina 20mg'),
    ('7891234000012', 'enalapril 20mg'),
    ('7891234000013', 'cloridrato de sertralina 50mg'),
    ('7891234000014', 'maleato de enalapril 10mg'),
    ('7891234000015', 'cloridrato de propranolol 40mg'),
    ('7891234000016', 'nimesulida 100mg'),
    ('7891234000017', 'prednisona 20mg'),
    ('7891234000018', 'alendronato de sodio 70mg'),
    ('7891234000019', 'levotiroxina sodica 50mcg'),
    ('7891234000020', 'clonazepam 2mg'),
    ('7891234000021', 'hidroclorotiazida 25mg'),
    ('7891234000022', 'sulfato ferroso 40mg'),
    ('7891234000023', 'amitriptilina 25mg'),
    ('7891234000024', 'sinvastatina 40mg'),
    ('7891234000025', 'captopril 25mg'),
    ('7891234000026', 'atenolol 50mg'),
    ('7891234000027', 'losartana potassica 100mg'),
    ('7891234000028', 'cloridrato de metformina 850mg'),
    ('7891234000029', 'carvedilol 25mg'),
    ('7891234000030', 'maleato de enalapril 5mg'),
    ('7891234000031', 'ramipril 5mg'),
    ('7891234000032', 'sinvastatina 10mg'),
    ('7891234000033', 'glibenclamida 5mg'),
    ('7891234000034', 'clopidogrel 75mg'),
    ('7891234000035', 'maleato de enalapril 20mg'),
    ('7891234000036', 'loratadina 10mg'),
    ('7891234000037', 'maleato de dexclorfeniramina 6mg'),
    ('7891234000038', 'dexametasona 4mg'),
    ('7891234000039', 'sinvastatina 5mg'),
    ('7891234000040', 'cloridrato de ranitidina 150mg'),
    ('7891234000041', 'cloridrato de ciprofloxacino 500mg'),
    ('7891234000042', 'furosemida 40mg'),
    ('7891234000043', 'cloridrato de amitriptilina 75mg'),
    ('7891234000044', 'bromoprida 10mg'),
    ('7891234000045', 'fenitoina sodica 100mg'),
    ('7891234000046', 'metformina 1000mg'),
    ('7891234000047', 'carbamazepina 200mg'),
    ('7891234000048', 'alopurinol 300mg'),
    ('7891234000049', 'diazepam 10mg'),
    ('7891234000050', 'clonazepam 0.5mg'),
    ('7891234000051', 'haloperidol 5mg'),
    ('7891234000052', 'bromazepam 3mg'),
    ('7891234000053', 'amitriptilina 75mg'),
    ('7891234000054', 'prednisona 5mg'),
    ('7891234000055', 'furosemida 20mg'),
    ('7891234000056', 'omeprazol 10mg'),
    ('7891234000057', 'verapamil 80mg'),
    ('7891234000058', 'diltiazem 60mg'),
    ('7891234000059', 'espironolactona 25mg'),
    ('7891234000060', 'sinvastatina 80mg'),
    ('7891234000061', 'gliclazida 80mg'),
    ('7891234000062', 'cloridrato de ranitidina 300mg'),
    ('7891234000063', 'captopril 50mg'),
    ('7891234000064', 'maleato de enalapril 2.5mg'),
    ('7891234000065', 'digoxina 0.25mg'),
    ('7891234000066', 'glimepirida 2mg'),
    ('7891234000067', 'metildopa 250mg'),
    ('7891234000068', 'amlodipino 5mg'),
    ('7891234000069', 'cloridrato de nortriptilina 25mg'),
    ('7891234000070', 'maleato de enalapril 15mg'),
    ('7891234000071', 'enalapril 10mg'),
    ('7891234000072', 'losartana potassica 25mg'),
    ('7891234000073', 'atenolol 100mg'),
    ('7891234000074', 'simeticona 125mg'),
    ('7891234000075', 'bromazepam 6mg'),
    ('7891234000076', 'omeprazol 40mg'),
    ('7891234000077', 'propranolol 40mg'),
    ('7891234000078', 'cetoconazol 200mg'),
    ('7891234000079', 'bromoprida 4mg'),
    ('7891234000080', 'dimenidrinato 50mg'),
    ('7891234000081', 'paracetamol 750mg'),
    ('7891234000082', 'cefalexina 500mg'),
    ('7891234000083', 'cloridrato de ciclobenzaprina 10mg'),
    ('7891234000084', 'cloridrato de sertralina 100mg'),
    ('7891234000085', 'glimepirida 4mg'),
    ('7891234000086', 'fumarato de bisoprolol 5mg'),
    ('7891234000087', 'valproato de sodio 500mg'),
    ('7891234000088', 'espironolactona 100mg'),
    ('7891234000089', 'prednisona 10mg'),
    ('7891234000090', 'bromoprida 1mg'),
    ('7891234000091', 'topiramato 50mg'),
    ('7891234000092', 'topiramato 25mg'),
    ('7891234000093', 'levetiracetam 500mg'),
    ('7891234000094', 'risperidona 2mg'),
    ('7891234000095', 'haloperidol 1mg'),
    ('7891234000096', 'risperidona 1mg'),
    ('7891234000097', 'alprazolam 1mg'),
    ('7891234000098', 'alprazolam 0.5mg'),
    ('7891234000099', 'loratadina 1mg/ml'),
    ('7891234000100', 'cloridrato de ranitidina 75mg');
`);

console.log("Banco populado com sucesso em:", dbPath);

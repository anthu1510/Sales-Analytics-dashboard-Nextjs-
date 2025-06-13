import Papa from "papaparse";
import fs from "fs";
import path from "path";

export async function loadSalesData() {
  const filePath = path.join(process.cwd(), "src/data/sample_data.csv");
  const file = fs.readFileSync(filePath, "utf8");

  return new Promise<any[]>((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => resolve(results.data),
      error: (err: unknown) => reject(err),
    });
  });
}

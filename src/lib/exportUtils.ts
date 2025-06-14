import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { SalesRecord } from "./types";

/**
 * Exports the given data as a CSV file
 */
export function exportToCSV(data: SalesRecord[], filename = "sales_data.csv") {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const rows = data.map((record) =>
    headers.map((header) => (record as any)[header])
  );

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((value) => `"${value}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Exports the given data as a PDF file
 */
export function exportToPDF(data: SalesRecord[], filename = "sales_data.pdf") {
  if (!data || data.length === 0) return;

  const doc = new jsPDF();

  const headers = Object.keys(data[0]);
  const rows = data.map((record) =>
    headers.map((header) => (record as any)[header])
  );

  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: 20,
    styles: { fontSize: 8 },
  });

  doc.save(filename);
}

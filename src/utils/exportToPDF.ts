import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportToPDF(data: object[], filename: string) {
  const doc = new jsPDF();

  const headers = Object.keys(data[0]);
  const rows = data.map((row) => headers.map((header) => (row as any)[header]));

  autoTable(doc, {
    head: [headers],
    body: rows,
  });

  doc.save(`${filename}.pdf`);
}

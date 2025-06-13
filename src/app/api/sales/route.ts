import { NextResponse } from "next/server";
import { loadSalesData } from "@/lib/csvParser";

export async function GET() {
  try {
    const data = await loadSalesData();
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

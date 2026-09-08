import { NextResponse } from "next/server";
import { saveApplicationRecord, getApplicationRecords } from "@/lib/supabase";
import { ApplicationRecord } from "@/types";

export async function GET() {
  try {
    const records = await getApplicationRecords();
    return NextResponse.json({ success: true, data: records });
  } catch (error) {
    console.error("Fetch applications error:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const record = (await req.json()) as ApplicationRecord;
    await saveApplicationRecord(record);
    return NextResponse.json({ success: true, data: record });
  } catch (error) {
    console.error("Save application error:", error);
    return NextResponse.json({ error: "Failed to save application" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { generateCareerMaterials } from "@/lib/gemini";
import { StudentProfile, JobDescription, SelectedOutputs } from "@/types";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { profile, job, outputs } = body as {
      profile: StudentProfile;
      job: JobDescription;
      outputs: SelectedOutputs;
    };

    if (!profile || !job || !outputs) {
      return NextResponse.json(
        { error: "Missing required fields: profile, job, or outputs" },
        { status: 400 }
      );
    }

    const result = await generateCareerMaterials(profile, job, outputs);
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Generate API error:", error);
    return NextResponse.json(
      { error: "Failed to generate materials" },
      { status: 500 }
    );
  }
}

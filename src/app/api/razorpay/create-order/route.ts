import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const amount = body.amount || 70; // Default ₹70

    const order = await createRazorpayOrder(amount);
    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Razorpay order API error:", error);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500 }
    );
  }
}

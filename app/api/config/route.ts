import { NextResponse } from "next/server";

export const runtime = "nodejs";

export function GET() {
  return NextResponse.json({ keyId: process.env.RAZORPAY_KEY_ID || "" });
}

import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type VerificationRequest = {
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  razorpay_signature?: unknown;
};

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payment verification is not configured." }, { status: 503 });
  }

  let body: VerificationRequest;
  try {
    body = (await request.json()) as VerificationRequest;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = body;
  if (
    typeof orderId !== "string" || !orderId ||
    typeof paymentId !== "string" || !paymentId ||
    typeof signature !== "string" || !/^[a-f\d]{64}$/i.test(signature)
  ) {
    return NextResponse.json({ error: "Missing or invalid payment verification fields." }, { status: 400 });
  }

  const expected = createHmac("sha256", secret)
    .update(`${orderId}|${paymentId}`)
    .digest();
  const received = Buffer.from(signature, "hex");
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return NextResponse.json({ error: "Payment signature mismatch." }, { status: 400 });
  }

  return NextResponse.json({ success: true, message: "Payment verified successfully." });
}

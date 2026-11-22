import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export const runtime = "nodejs";

type OrderRequest = {
  amount?: unknown;
  currency?: unknown;
  receipt?: unknown;
};

export async function POST(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return NextResponse.json({ error: "Online payments are not configured." }, { status: 503 });
  }

  let body: OrderRequest;
  try {
    body = (await request.json()) as OrderRequest;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const amount = Number(body.amount);
  if (!Number.isSafeInteger(amount) || amount < 100) {
    return NextResponse.json({ error: "Amount must be at least 100 paise." }, { status: 400 });
  }
  const currency = body.currency === undefined ? "INR" : body.currency;
  if (currency !== "INR") {
    return NextResponse.json({ error: "Only INR payments are supported." }, { status: 400 });
  }
  const receipt =
    typeof body.receipt === "string" && body.receipt.length <= 40
      ? body.receipt
      : "support";

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
    const order = await razorpay.orders.create({ amount, currency, receipt });
    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create payment order failed:", error);
    const statusCode =
      typeof error === "object" && error !== null && "statusCode" in error
        ? Number(error.statusCode)
        : 500;
    if (statusCode === 401) {
      return NextResponse.json({ error: "Razorpay authentication failed." }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create a payment order." }, { status: 500 });
  }
}

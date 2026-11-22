import { NextResponse } from "next/server";

export const runtime = "nodejs";

const maxBodyLength = 10_000;

type ContactRequest = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  company?: unknown;
};

function isBoundedString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: Request) {
  const requestOrigin = request.headers.get("origin");
  if (!requestOrigin) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  let origin: URL;
  try {
    origin = new URL(requestOrigin);
  } catch {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const expectedHost =
    request.headers.get("x-forwarded-host")?.split(",")[0].trim() ??
    request.headers.get("host");
  const expectedProtocol =
    request.headers.get("x-forwarded-proto")?.split(",")[0].trim() ??
    new URL(request.url).protocol.replace(/:$/, "");
  if (
    origin.host !== expectedHost ||
    origin.protocol !== `${expectedProtocol}:`
  ) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > maxBodyLength) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Content-Type must be application/json." }, { status: 415 });
  }

  let body: ContactRequest;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > maxBodyLength) {
      return NextResponse.json({ error: "Message is too large." }, { status: 413 });
    }
    body = JSON.parse(rawBody) as ContactRequest;
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim()) {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (
    !isBoundedString(name, 120) ||
    !isBoundedString(email, 254) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !isBoundedString(message, 5000)
  ) {
    return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 });
  }

  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  if (!publicKey || !serviceId || !templateId || !privateKey) {
    return NextResponse.json(
      { error: "Contact form is temporarily unavailable. Please email us directly." },
      { status: 503 },
    );
  }

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        accessToken: privateKey,
        template_params: { name, email, message },
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("EmailJS request failed:", error);
    return NextResponse.json(
      { error: "We couldn’t send your message. Please try again later." },
      { status: 502 },
    );
  }

  if (!emailResponse.ok) {
    console.error("EmailJS rejected contact form submission:", emailResponse.status);
    return NextResponse.json(
      { error: "We couldn’t send your message. Please try again later." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true });
}

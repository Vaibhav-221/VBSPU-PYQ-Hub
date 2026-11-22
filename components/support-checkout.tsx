"use client";

import { useState } from "react";
import { Heart, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type CheckoutResponse = {
  keyId?: string;
  order_id?: string;
  amount?: number;
  currency?: string;
  error?: string;
};

type RazorpayResult = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (result: RazorpayResult) => void;
  modal: { ondismiss: () => void };
  theme: { color: string };
};

type RazorpayInstance = { open: () => void };
type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;
declare global {
  interface Window { Razorpay?: RazorpayConstructor }
}

async function loadRazorpay() {
  if (window.Razorpay) return;
  await new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Razorpay checkout did not load. Check your connection and try again."));
    document.body.appendChild(script);
  });
}

export function SupportCheckout() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  async function checkout() {
    if (busy) return;
    setBusy(true);
    setStatus("");
    try {
      await loadRazorpay();
      const configResponse = await fetch("/api/config");
      const config = (await configResponse.json()) as CheckoutResponse;
      if (!configResponse.ok || !config.keyId) {
        throw new Error(config.error || "Online payments are not configured yet.");
      }

      const orderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 1900, currency: "INR", receipt: "support-19" }),
      });
      const order = (await orderResponse.json()) as CheckoutResponse;
      if (!orderResponse.ok || !order.order_id || !order.amount || !order.currency) {
        throw new Error(order.error || "Could not create a payment order.");
      }

      if (!window.Razorpay) {
        throw new Error("Razorpay checkout did not initialize. Please try again.");
      }
      const RazorpayCheckout = window.Razorpay;
      const razorpay = new RazorpayCheckout({
        key: config.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "VBSPU PYQ Hub",
        description: "Voluntary project support",
        order_id: order.order_id,
        theme: { color: "#ffffff" },
        modal: { ondismiss: () => setBusy(false) },
        handler: async (result) => {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(result),
            });
            const verification = (await verifyResponse.json()) as { success?: boolean; error?: string };
            if (!verifyResponse.ok || !verification.success) {
              throw new Error(verification.error || "Payment verification failed.");
            }
            setStatus("Payment verified successfully. Thank you for your support!");
          } catch (error) {
            console.error("Payment verification failed:", error);
            setStatus(error instanceof Error ? error.message : "Could not verify the payment.");
          } finally {
            setBusy(false);
          }
        },
      });
      razorpay.open();
    } catch (error) {
      console.error("Payment checkout failed:", error);
      setStatus(error instanceof Error ? error.message : "Could not start checkout.");
      setBusy(false);
    }
  }

  return (
    <div className="mt-7">
      <Button onClick={checkout} disabled={busy} className="w-full min-h-12">
        {busy ? <LoaderCircle size={16} className="animate-spin" /> : <Heart size={15} />}
        {busy ? "Connecting to secure checkout…" : "Contribute ₹19"}
      </Button>
      <p className="mt-3 min-h-5 text-center text-xs text-slate-400" role="status" aria-live="polite">{status}</p>
    </div>
  );
}

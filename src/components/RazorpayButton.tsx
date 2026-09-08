"use client";

import { useState } from "react";
import { Lock, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

interface RazorpayButtonProps {
  amountInRupees: number;
  studentName: string;
  studentEmail: string;
  onSuccess: (paymentId: string) => void;
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

export function RazorpayButton({
  amountInRupees = 70,
  studentName,
  studentEmail,
  onSuccess,
}: RazorpayButtonProps) {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amountInRupees }),
      });

      const data = await res.json();
      if (!data.success || !data.order) {
        throw new Error(data.error || "Failed to create Razorpay order");
      }

      const { id: orderId } = data.order;

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Razorpay payment gateway failed to load. Please check your internet connection.");
        setLoading(false);
        return;
      }

      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "";
      if (!razorpayKey) {
        alert("Production Notice: NEXT_PUBLIC_RAZORPAY_KEY_ID is missing in environment variables.");
      }

      const options = {
        key: razorpayKey || "rzp_test_demo123456",
        amount: amountInRupees * 100,
        currency: "INR",
        name: "CareerApply AI",
        description: `1x Custom Job Application Pack (₹${amountInRupees})`,
        order_id: orderId,
        prefill: {
          name: studentName || "Student",
          email: studentEmail || "student@example.com",
        },
        theme: {
          color: "#0c8de9",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              onSuccess(response.razorpay_payment_id);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch (e) {
            console.error("Verification error:", e);
            alert("Error verifying payment signature.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Payment initiation failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-lg">
            ₹
          </div>
          <div>
            <div className="font-semibold text-white">Customization Fee</div>
            <div className="text-xs text-slate-400">1x Tailored CV + Cover Letter + Email + LinkedIn + Q&A</div>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-white">₹{amountInRupees}</span>
          <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
            <CheckCircle2 className="w-3 h-3" /> All 5 Outputs Included
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs px-1 text-slate-400">
        <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-blue-400" /> 256-bit Secure Razorpay Checkout</span>
        <span className="text-emerald-400 font-medium">SSL Encrypted</span>
      </div>

      <button
        type="button"
        onClick={handlePayment}
        disabled={loading}
        className="w-full py-4 px-6 rounded-xl font-bold text-base text-white bg-gradient-to-r from-emerald-600 via-brand-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 shadow-xl shadow-brand-600/20 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50 cursor-pointer"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Connecting to Razorpay...</span>
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <span>Pay ₹{amountInRupees} & Generate AI Materials</span>
          </>
        )}
      </button>
    </div>
  );
}

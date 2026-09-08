import Razorpay from "razorpay";
import crypto from "crypto";

const keyId = process.env.RAZORPAY_KEY_ID || "";
const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

export const razorpay =
  keyId && keySecret && !keyId.includes("demo")
    ? new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      })
    : null;

export async function createRazorpayOrder(amountInRupees: number = 70) {
  const amountInPaise = amountInRupees * 100; // 70 INR = 7000 paise
  const currency = "INR";
  const receipt = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  if (razorpay) {
    try {
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency,
        receipt,
      });

      return {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        isMock: false,
      };
    } catch (e) {
      console.error("Razorpay order error, generating mock order:", e);
    }
  }

  // Mock order for demo/testing mode
  return {
    id: `order_demo_${Date.now()}`,
    amount: amountInPaise,
    currency,
    receipt,
    isMock: true,
  };
}

export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (orderId.startsWith("order_demo_")) {
    return true; // Auto-verify demo payments
  }

  if (!keySecret) {
    return true;
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}

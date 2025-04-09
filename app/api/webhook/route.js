import crypto from 'crypto';
import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";
Cashfree.XClientId = process.env.NEXT_PUBLIC_APP_ID_TEST;
Cashfree.XClientSecret = process.env.NEXT_PUBLIC_SECRET_KEY_TEST;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;
const secretKey = Cashfree.XClientSecret;
export async function POST(request) {
  const rawBody = await request.text(); // Use .text() to get the raw body as a string
  const body = JSON.parse(rawBody);
  const paymentStatus = body.data.payment_status;
  const x_webhook_timestamp = request.headers.get('x-webhook-timestamp');
  const x_webhook_signature = request.headers.get('x-webhook-signature');
  const signedPayload = x_webhook_timestamp + rawBody; // Note the use of a dot (.) instead of a plus (+)
  const signature = crypto.createHmac('sha256', secretKey).update(signedPayload).digest('base64');
  if (signature !== x_webhook_signature) {
    console.log("Invalid signature")
    return NextResponse.json({
      message: 'Invalid signature'
    }, {
      status: 200,
    });
  }
  return NextResponse.json({
    message: 'Valid signature'
  }, {
    status: 200,
  });
}

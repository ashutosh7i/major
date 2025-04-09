import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { order_id } = await request.json();
    const url = `https://sandbox.cashfree.com/pg/orders/${order_id}`;
    const headers = {
      'accept': 'application/json',
      'x-api-version': '2023-08-01',
      'x-client-id': process.env.NEXT_PUBLIC_APP_ID_TEST,
      'x-client-secret': process.env.NEXT_PUBLIC_SECRET_KEY_TEST
    };
    const response = await fetch(url, { method: 'POST', headers });
    const data = await response.json();
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message || 'Unknown error occurred' }, { status: 500 });
  }
}
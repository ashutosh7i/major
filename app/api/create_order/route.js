import { NextRequest, NextResponse } from "next/server";
import { Cashfree } from "cashfree-pg";

Cashfree.XClientId = process.env.NEXT_PUBLIC_APP_ID_TEST;
Cashfree.XClientSecret = process.env.NEXT_PUBLIC_SECRET_KEY_TEST;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const response = await Cashfree.PGCreateOrder("2022-09-01", reqBody);
    return NextResponse.json({ data: response.data });
  } catch (error) {
    return NextResponse.json({ error: error.response?.data?.message || 'Unknown error occurred' }, { status: 500 });
  }
}


// app/api/zoom/signature/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { stackServerApp } from "@/stack";

export async function POST(req: Request) {
  // You can also restrict who can ask for signatures here (require auth).
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const { meetingNumber, role } = await req.json();
  if (!meetingNumber || typeof role !== "number") {
    return new NextResponse("meetingNumber and role required", { status: 400 });
  }

  const sdkKey = process.env.ZOOM_SDK_KEY!;
  const sdkSecret = process.env.ZOOM_SDK_SECRET!;
  const iat = Math.floor(Date.now() / 1000) - 30;
  const exp = iat + 60 * 60; // 1 hour
  const tokenExp = exp;

  const payload = { sdkKey, mn: meetingNumber, role, iat, exp, tokenExp };
  const signature = jwt.sign(payload, sdkSecret, { algorithm: "HS256" });

  return NextResponse.json({ signature, sdkKey });
}

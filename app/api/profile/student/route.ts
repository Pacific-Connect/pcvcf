// app/api/profile/student/route.ts
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const form = await req.formData();
  const data = {
    id: auth.id,
    firstName: String(form.get("firstName") || ""),
    lastName: String(form.get("lastName") || ""),
    email: String(form.get("email") || ""),
    major: String(form.get("major") || ""),
    graduationYear: Number(form.get("graduationYear") || 0),
    websiteUrl: (form.get("websiteUrl") as string) || null,
    resumeUrl: (form.get("resumeUrl") as string) || null,
  };

  if (!data.firstName || !data.lastName || !data.email || !data.major || !data.graduationYear) {
    return new NextResponse("Missing fields", { status: 400 });
  }

  await db.student.upsert({
    where: { id: auth.id },
    update: data,
    create: data,
  });

  return NextResponse.json({ ok: true });
}

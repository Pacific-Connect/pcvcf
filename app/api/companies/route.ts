// app/api/companies/route.ts
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const form = await req.formData();
  const name = String(form.get("name") || "").trim();
  const industry = String(form.get("industry") || "").trim() || null;
  const description = String(form.get("description") || "").trim() || null;
  const websiteUrl = String(form.get("websiteUrl") || "").trim() || null;

  if (!name) return new NextResponse("Company name required", { status: 400 });

  const company = await db.company.create({
    data: { name, industry, description, websiteUrl },
  });

  return NextResponse.json({ companyId: company.id });
}

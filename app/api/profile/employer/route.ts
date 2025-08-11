// app/api/profile/employer/route.ts
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const form = await req.formData();
  const companyId = (form.get("companyId") as string) || "";

  // If the user chose "create" earlier, company was created and returned; otherwise they typed one.
  if (!companyId) return new NextResponse("companyId required", { status: 400 });

  const company = await db.company.findUnique({ where: { id: companyId } });
  if (!company) return new NextResponse("Company not found", { status: 404 });

  await db.employer.upsert({
    where: { id: auth.id },
    update: { companyId },
    create: { id: auth.id, companyId },
  });

  return NextResponse.json({ ok: true });
}

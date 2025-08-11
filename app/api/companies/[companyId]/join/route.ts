// app/api/companies/[companyId]/join/route.ts
import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

type RouteParams = { companyId: string };

export async function POST(
  _req: Request,
  { params }: { params: Promise<RouteParams> }
) {
  const { companyId } = await params;

  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const company = await db.company.findUnique({ where: { id: companyId } });
  if (!company) return new NextResponse("Company not found", { status: 404 });

  await db.employer.upsert({
    where: { id: auth.id },
    update: { companyId: company.id },
    create: { id: auth.id, companyId: company.id },
  });

  return NextResponse.json({ ok: true });
}

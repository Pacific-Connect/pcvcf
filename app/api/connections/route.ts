// app/api/connections/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { stackServerApp } from "@/stack";

export async function GET() {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  // Show my connections & requests (both sides)
  const [asStudent, asEmployer] = await Promise.all([
    db.connection.findMany({ where: { studentId: auth.id }, include: { employer: true } }),
    db.connection.findMany({ where: { employerId: auth.id }, include: { student: true } }),
  ]);

  return NextResponse.json({ asStudent, asEmployer });
}

export async function POST(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const { targetId } = await req.json();
  if (!targetId) return new NextResponse("targetId required", { status: 400 });

  // Determine my role
  const [isStudent, isEmployer] = await Promise.all([
    db.student.findUnique({ where: { id: auth.id }, select: { id: true } }),
    db.employer.findUnique({ where: { id: auth.id }, select: { id: true } }),
  ]);

  try {
    if (isStudent) {
      await db.connection.create({ data: { studentId: auth.id, employerId: targetId } });
    } else if (isEmployer) {
      await db.connection.create({ data: { studentId: targetId, employerId: auth.id } });
    } else {
      return new NextResponse("Complete onboarding first", { status: 400 });
    }
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed";
    return new NextResponse(message, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(req: Request) {
  const auth = await stackServerApp.getUser();
  if (!auth) return new NextResponse("Unauthorized", { status: 401 });

  const { studentId, employerId, action } = await req.json();
  if (!studentId || !employerId || !["ACCEPTED", "REJECTED"].includes(action)) {
    return new NextResponse("Bad request", { status: 400 });
  }

  // Only the recipient can respond:
  // - If I’m the employer, I can respond to connections where employerId == me
  // - If I’m the student, I can respond where studentId == me
  if (auth.id !== studentId && auth.id !== employerId) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const conn = await db.connection.findUnique({ where: { studentId_employerId: { studentId, employerId } } });
  if (!conn) return new NextResponse("Not found", { status: 404 });

  const updated = await db.connection.update({
    where: { studentId_employerId: { studentId, employerId } },
    data: { status: action as "ACCEPTED" | "REJECTED", respondedAt: new Date() },
  });

  return NextResponse.json(updated);
}

// lib/roles.ts
import { db } from "@/lib/db";

export async function getRole(userId: string) {
  const [s, e] = await Promise.all([
    db.student.findUnique({ where: { id: userId }, select: { id: true } }),
    db.employer.findUnique({ where: { id: userId }, select: { id: true } }),
  ]);
  return s ? "student" : e ? "employer" : null;
}

export async function needsOnboarding(userId: string) {
  return (await getRole(userId)) === null;
}

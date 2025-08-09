// lib/ensure-app-user.ts
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

/**
 * If a user is signed in, guarantee a matching row in public."User"
 * with id == NeonAuth user id. No redirect; safe to call anywhere.
 */
export async function ensureAppUser() {
  const auth = await stackServerApp.getUser();
  if (!auth) return; // guest → nothing to do

  // Atomic + race-safe: INSERT ... ON CONFLICT DO UPDATE (no-op update)
  await db.user.upsert({
    where: { id: auth.id },
    update: {},
    create: { id: auth.id },
  });
}

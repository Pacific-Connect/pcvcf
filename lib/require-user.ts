// lib/require-user.ts
import { redirect } from "next/navigation";
import { stackServerApp } from "@/stack";

/** Ensures a signed-in user and provisions an app User row. */
export async function requireUser() {
  const auth = await stackServerApp.getUser();
  if (!auth) redirect("/handler/sign-in");
  return auth;
}

// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { requireUser } from "@/lib/require-user";
import { needsOnboarding } from "@/lib/roles";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  const auth = await requireUser(); // will redirect if not signed in
  if (await needsOnboarding(auth.id)) {
    redirect("/onboarding");
  }
  return <>{children}</>;
}

// app/(protected)/layout.tsx
import { ReactNode } from "react";
import { requireUser } from "@/lib/require-user";

export default async function ProtectedLayout({ children }: { children: ReactNode }) {
  await requireUser(); // will redirect if not signed in
  return <>{children}</>;
}

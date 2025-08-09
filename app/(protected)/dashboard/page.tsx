// app/(protected)/dashboard/page.tsx
import { requireUser } from "@/lib/require-user";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="p-6 space-y-3">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>You’re signed in 🎉</p>
      <p>User ID: {user.id}</p>
    </main>
  );
}

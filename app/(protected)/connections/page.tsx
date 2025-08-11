// app/(protected)/connections/page.tsx
import { stackServerApp } from "@/stack";
import { db } from "@/lib/db";

async function accept(studentId: string, employerId: string) {
  "use server";
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/connections`, {
    method: "PATCH",
    body: JSON.stringify({ studentId, employerId, action: "ACCEPTED" }),
    headers: { "Content-Type": "application/json" },
  });
}

async function reject(studentId: string, employerId: string) {
  "use server";
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/connections`, {
    method: "PATCH",
    body: JSON.stringify({ studentId, employerId, action: "REJECTED" }),
    headers: { "Content-Type": "application/json" },
  });
}

export default async function ConnectionsPage() {
  const auth = await stackServerApp.getUser();
  if (!auth) return null;

  const [asStudent, asEmployer] = await Promise.all([
    db.connection.findMany({ where: { studentId: auth.id } }),
    db.connection.findMany({ where: { employerId: auth.id } }),
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Connections</h1>

      <section>
        <h2 className="font-semibold mb-2">Requests I sent</h2>
        <ul className="space-y-2">
          {[...asStudent, ...asEmployer].map((c) => (
            <li key={c.id} className="border p-3 rounded">
              {c.studentId} ↔ {c.employerId} — <b>{c.status}</b>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="font-semibold mb-2">Requests to me</h2>
        <ul className="space-y-2">
          {asStudent
            .filter((c) => c.status === "PENDING")
            .map((c) => (
              <li key={c.id} className="border p-3 rounded flex items-center gap-3">
                From employer {c.employerId}
                <form action={async () => accept(c.studentId, c.employerId)}>
                  <button className="px-3 py-1 rounded bg-green-600 text-white">Accept</button>
                </form>
                <form action={async () => reject(c.studentId, c.employerId)}>
                  <button className="px-3 py-1 rounded bg-red-600 text-white">Reject</button>
                </form>
              </li>
            ))}

          {asEmployer
            .filter((c) => c.status === "PENDING")
            .map((c) => (
              <li key={c.id} className="border p-3 rounded flex items-center gap-3">
                From student {c.studentId}
                <form action={async () => accept(c.studentId, c.employerId)}>
                  <button className="px-3 py-1 rounded bg-green-600 text-white">Accept</button>
                </form>
                <form action={async () => reject(c.studentId, c.employerId)}>
                  <button className="px-3 py-1 rounded bg-red-600 text-white">Reject</button>
                </form>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}

// app/(protected)/profile/employer/page.tsx
"use client";

import { useState } from "react";

export default function EditEmployerProfilePage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/profile/employer", { method: "POST", body: form });
    setSubmitting(false);
    if (res.ok) alert("Saved!"); else alert(await res.text());
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Employer Profile</h1>
      <input name="companyId" placeholder="Company ID" required className="border p-2 rounded w-full" />
      <button disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
        {submitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

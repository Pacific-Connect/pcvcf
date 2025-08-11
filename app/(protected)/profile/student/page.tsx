// app/(protected)/profile/student/page.tsx
"use client";

import { useState } from "react";

export default function EditStudentProfilePage() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/profile/student", { method: "POST", body: form });
    setSubmitting(false);
    if (res.ok) alert("Saved!"); else alert(await res.text());
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-3">
      <h1 className="text-2xl font-semibold">Edit Student Profile</h1>
      <div className="grid grid-cols-2 gap-3">
        <input name="firstName" placeholder="First name" required className="border p-2 rounded"/>
        <input name="lastName" placeholder="Last name" required className="border p-2 rounded"/>
      </div>
      <input name="email" type="email" placeholder="Email" required className="border p-2 rounded w-full"/>
      <input name="major" placeholder="Major" required className="border p-2 rounded w-full"/>
      <input name="graduationYear" type="number" placeholder="Graduation year" required className="border p-2 rounded w-full"/>
      <input name="websiteUrl" placeholder="Website URL" className="border p-2 rounded w-full"/>
      <input name="resumeUrl" placeholder="Resume URL" className="border p-2 rounded w-full"/>

      <button disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
        {submitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

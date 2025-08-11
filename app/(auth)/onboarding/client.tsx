// app/(auth)/onboarding/client.tsx  (CLIENT)
"use client";

import { useState } from "react";

export default function OnboardingClient() {
  const [role, setRole] = useState<"student" | "employer" | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submitStudent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/profile/student", { method: "POST", body: form });
    setSubmitting(false);
    if (res.ok) window.location.href = "/dashboard";
    else alert(await res.text());
  }

  async function submitEmployer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const mode = form.get("mode");
    if (mode === "create") {
      const r = await fetch("/api/companies", { method: "POST", body: form });
      if (!r.ok) { setSubmitting(false); return alert(await r.text()); }
      const { companyId } = await r.json();
      form.set("companyId", companyId);
    }
    const res = await fetch("/api/profile/employer", { method: "POST", body: form });
    setSubmitting(false);
    if (res.ok) window.location.href = "/dashboard";
    else alert(await res.text());
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-2xl font-semibold">Welcome! Tell us who you are</h1>

      <div className="flex gap-4">
        <button className={`px-4 py-2 rounded border ${role==="student"?"bg-gray-200":""}`} onClick={()=>setRole("student")}>I’m a Student</button>
        <button className={`px-4 py-2 rounded border ${role==="employer"?"bg-gray-200":""}`} onClick={()=>setRole("employer")}>I’m an Employer</button>
      </div>

      {role === "student" && (
        <form onSubmit={submitStudent} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <input name="firstName" placeholder="First name" required className="border p-2 rounded"/>
            <input name="lastName" placeholder="Last name" required className="border p-2 rounded"/>
          </div>
          <input name="email" type="email" placeholder="Email" required className="border p-2 rounded w-full"/>
          <input name="major" placeholder="Major" required className="border p-2 rounded w-full"/>
          <input name="graduationYear" type="number" placeholder="Graduation year" required className="border p-2 rounded w-full"/>
          <input name="websiteUrl" placeholder="Website URL (optional)" className="border p-2 rounded w-full"/>
          <input name="resumeUrl" placeholder="Resume URL (optional)" className="border p-2 rounded w-full"/>
          <button disabled={submitting} className="px-4 py-2 rounded bg-blue-600 text-white">
            {submitting ? "Saving..." : "Save student profile"}
          </button>
        </form>
      )}

      {role === "employer" && (
        <form onSubmit={submitEmployer} className="space-y-3">
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" value="create" defaultChecked /> Create company
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="mode" value="join" /> Join company by ID
            </label>
          </div>

          <div className="space-y-2 border p-3 rounded">
            <input name="name" placeholder="Company name" className="border p-2 rounded w-full"/>
            <input name="industry" placeholder="Industry" className="border p-2 rounded w-full"/>
            <input name="description" placeholder="Description" className="border p-2 rounded w-full"/>
            <input name="websiteUrl" placeholder="Website URL" className="border p-2 rounded w-full"/>
          </div>

          <input name="companyId" placeholder="Existing Company ID (for Join)" className="border p-2 rounded w-full"/>

          <button disabled={submitting} className="px-4 py-2 rounded bg-blue-600 text-white">
            {submitting ? "Saving..." : "Continue as employer"}
          </button>
        </form>
      )}
    </div>
  );
}

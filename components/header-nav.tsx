// components/header-nav.tsx
import Link from "next/link";
import Image from "next/image";
import { stackServerApp } from "@/stack";
import { getRole } from "@/lib/roles";
import { db } from "@/lib/db";
import { UserButton } from "@stackframe/stack";

export default async function HeaderNav() {
  const user = await stackServerApp.getUser();

  // Determine role and (if employer) the companyId for the nav link
  let role: "student" | "employer" | null = null;
  let companyId: string | null = null;

  if (user) {
    role = await getRole(user.id);
    if (role === "employer") {
      const employer = await db.employer.findUnique({
        where: { id: user.id },
        select: { companyId: true },
      });
      companyId = employer?.companyId ?? null;
    }
  }

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/mainlogo.png" alt="Logo" width={45} height={45} />
        <span className="text-2xl font-bold">Pacific Connect</span>
      </Link>

      <nav className="flex items-center space-x-6">

        {user && role === null && (
          <Link href="/onboarding">
            <button className="ml-2 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600">
              Complete onboarding
            </button>
          </Link>
        )}

        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>

        {!user && (
          <Link href="/handler/sign-in">
            <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign in
            </button>
          </Link>
        )}

        {user && (
          <>
            <Link href="/browse">Browse</Link> 
            <Link href="/dashboard">Dashboard</Link>
            {role === "employer" && companyId && (
              <Link href={`/companies/${companyId}`}>My Company</Link>
            )}
            <UserButton />
          </>
        )}
      </nav>
    </header>
  );
}

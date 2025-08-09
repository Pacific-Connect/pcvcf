// components/header-nav.tsx
import Link from "next/link";
import Image from "next/image";
import { stackServerApp } from "@/stack";
import { UserButton } from "@stackframe/stack";

export default async function HeaderNav() {
  // Server-side check: is someone signed in?
  const user = await stackServerApp.getUser();

  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/mainlogo.png" alt="Logo" width={45} height={45} />
        <span className="text-2xl font-bold">Pacific Connect</span>
      </Link>

      <nav className="flex items-center space-x-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/skills">Skills</Link>

        {user ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            {/* Nice avatar + dropdown from Stack */}
            <UserButton />
          </>
        ) : (
          <Link href="/handler/sign-in">
            <button className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign in
            </button>
          </Link>
        )}
      </nav>
    </header>
  );
}

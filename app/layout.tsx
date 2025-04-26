// app/layout.tsx
import Link from "next/link";
import "./globals.css";
import Image from "next/image";

export const metadata = {
  title: "Pacific Connect Career Fair",
  description: "Connecting students and employers across the Pacific and Asia.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
          <Image src="/mainlogo.png" alt="Logo" width={150} height={100} />
          <div className="flex items-center">
            <nav className="flex items-center space-x-6">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/skills">Skill</Link>
              <Link href="#">Find a Job</Link>
              <Link href="#">Employer</Link>
              <Link href="/auth/login">
                <button className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Login
                </button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Main takes up remaining space */}
        <main className="flex-1 w-full mx-auto px-4 py-8">{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-800 text-white text-center py-4">
          &copy; {new Date().getFullYear()} Pacific Connect
        </footer>
      </body>
    </html>
  );
}

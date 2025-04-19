// app/layout.tsx
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Pacific Connect Career Fair",
  description: "Connecting students and employers across the Pacific and Asia.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900 flex flex-col min-h-screen">
        <header className="bg-background text-primary">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight hover:opacity-90">
              Pacific Connect
            </Link>
            <nav className="space-x-6 text-sm sm:text-base">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </nav>
          </div>
        </header>

        {/* Main takes up remaining space */}
        <main className="flex-1 max-w-7xl mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Pacific Connect
        </footer>
      </body>
    </html>
  );
}

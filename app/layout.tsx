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
              <Link
                href="/"
                className="relative px-2 py-1 transition duration-200 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>

              <Link
                href="/about"
                className="relative px-2 py-1 transition duration-200 hover:text-blue-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </Link>            </nav>
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

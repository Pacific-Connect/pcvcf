// app/layout.tsx
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "@/stack";
import "./globals.css";
import HeaderNav from "@/components/header-nav";
import { ensureAppUser } from "@/lib/ensure-app-user";

export const metadata = {
  title: "Pacific Connect Career Fair",
  description: "Connecting students and employers across the Pacific and Asia.",
  icons: { icon: "/favicon.ico" },
};

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await ensureAppUser();
  return (
    <html lang="en">
      <body className="font-sans bg-white text-gray-900 flex flex-col min-h-screen">
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <HeaderNav />
            <main className="flex-1 w-full mx-auto px-4 py-8">{children}</main>
            <footer className="bg-gray-800 text-white text-center py-4">
              &copy; {new Date().getFullYear()} Pacific Connect
            </footer>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}

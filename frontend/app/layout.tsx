import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "))) ○ ((( 20-005 Beep",
  description: "Personal Services Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        <nav className="border-b border-zinc-800 bg-zinc-900">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
            <Link href="/" className="text-lg font-bold">
              🛰️ 20-005 Beep
            </Link>

            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-300 sm:justify-start">
              <Link href="/" className="hover:text-zinc-100">
                Dashboard
              </Link>
              <Link href="/services" className="hover:text-zinc-100">
                Serviços
              </Link>
              <Link href="/categories" className="hover:text-zinc-100">
                Categorias
              </Link>
              <Link href="/admin" className="hover:text-zinc-100">
                Admin
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

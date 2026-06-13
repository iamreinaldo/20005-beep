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
          <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
            <Link href="/" className="font-bold">
              🛰️ 20-005 Beep
            </Link>

            <Link href="/">Dashboard</Link>
            <Link href="/services">Serviços</Link>
            <Link href="/categories">Categorias</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </nav>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

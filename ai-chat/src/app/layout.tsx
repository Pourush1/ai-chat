import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";
import NavLink from "./NavLink";

const geistKarla = Karla({
  variable: "--font-geist-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Practice your AI skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistKarla.variable} font-karla flex flex-col antialiased`}
      >
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 mb-6 shadow-lg">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight">
              AI ChatBot 2025
            </h1>
            <nav className="flex gap-4">
              <NavLink href="/" title="Ask a Question" />
              <NavLink href="/chat" title="Chat" />
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-50 text-gray-600 text-sm py-4 mt-auto">
          <div className="text-center">
            <p>&copy; 2025 AI Chat. Practice your AI skills.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

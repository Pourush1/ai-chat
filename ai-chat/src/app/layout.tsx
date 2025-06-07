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
        className={`${geistKarla.variable} font-karla flex flex-col min-h-screen antialiased`}
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
        <main className="flex-grow">{children}</main>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-auto">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold mb-2">AI ChatBot 2025</h3>
                <p className="text-gray-300">
                  Practice your AI skills with advanced chatbot technology
                </p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <p className="text-gray-300 mb-2">
                  &copy; 2025 AI ChatBot. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

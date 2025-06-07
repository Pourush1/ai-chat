import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

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
        <header className="bg-red-500 text-white p-4 mb-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold">AI Chat</h1>
        </header>
        <main>{children}</main>
        <footer className="bg-red-50 text-sm">
          <div className="text-center text-2xl font-bold">AI Chat</div>
        </footer>
      </body>
    </html>
  );
}

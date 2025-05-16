import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Chat",
  description: "Practice your AI skills",
};

console.log("Test");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>AI Chat</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>AI Chat</p>
        </footer>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevPortfolio | Full-Stack Developer & Problem Solver",
  description: "A passionate full-stack developer crafting digital experiences through precise engineering. Explore my projects, skills, and let's build something amazing together.",
  keywords: ["developer", "portfolio", "full-stack", "web development", "react", "next.js"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "DevPortfolio | Full-Stack Developer & Problem Solver",
    description: "A passionate full-stack developer crafting digital experiences through precise engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Navbar />
        <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

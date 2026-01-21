import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ajebo Dev | Backend Engineer & System Architect",
  description: "A passionate backend engineer specializing in building robust, scalable, and high-performance systems. Expert in distributed systems, API design, and database architecture.",
  keywords: ["backend engineer", "system architect", "API design", "distributed systems", "Node.js", "Python", "PostgreSQL"],
  authors: [{ name: "Ajebo Dev" }],
  openGraph: {
    title: "Ajebo Dev | Backend Engineer & System Architect",
    description: "Building robust, scalable, and high-performance backend systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

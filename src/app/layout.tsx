import type { Metadata } from "next";
import { Syne, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AjeboDev | Backend Engineer",
  description:
    "Backend engineer building APIs, distributed systems, and data infrastructure. PropSpaceX, OpenRDB, NeuroQO.",
  keywords: [
    "backend engineer",
    "distributed systems",
    "API design",
    "Node.js",
    "Python",
    "PostgreSQL",
  ],
  authors: [{ name: "Fredrick Anyanwu" }],
  openGraph: {
    title: "AjeboDev | Backend Engineer",
    description: "APIs, distributed systems, and data infrastructure.",
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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${syne.variable} ${plexSans.variable} ${plexMono.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main style={{ paddingTop: "var(--nav-height)", minHeight: "100vh" }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

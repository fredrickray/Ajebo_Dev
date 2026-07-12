import type { Metadata } from "next";
import {
  Instrument_Sans,
  IBM_Plex_Mono,
  Bitcount_Prop_Single,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { ThemeProvider } from "@/context/ThemeContext";

const instrument = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bitcount = Bitcount_Prop_Single({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const caveat = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AjeboDev | Backend Engineer",
  description:
    "Backend engineer building APIs, distributed systems, and data infrastructure. PropSpaceX, OpenRDB, MarketLens.",
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
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',(t==='dark'||t==='light')?t:'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
      </head>
      <body
        className={`${instrument.variable} ${bitcount.variable} ${caveat.variable} ${plexMono.variable} ${instrument.className}`}
      >
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

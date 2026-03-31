import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sd-umzuege.ch"),
  title: {
    default: "SD-Umzüge — Umzugsunternehmen Zürich",
    template: "%s | SD-Umzüge",
  },
  description:
    "SD-Umzüge: Professionelles Umzugsunternehmen in Zürich. Umzug, Reinigung, Räumung & Klaviertransport mit Festpreisgarantie. Jetzt kostenlose Offerte anfordern.",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "SD-Umzüge",
    images: [
      {
        url: "/images/SD-Umzug-Logo.webp",
        width: 1200,
        height: 630,
        alt: "SD-Umzüge — Umzugsunternehmen Zürich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SD-Umzüge — Umzugsunternehmen Zürich",
    description:
      "Professionelles Umzugsunternehmen in Zürich. Umzug, Reinigung, Räumung & Klaviertransport mit Festpreisgarantie.",
    images: ["/images/SD-Umzug-Logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.webp",
    shortcut: "/favicon.webp",
    apple: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

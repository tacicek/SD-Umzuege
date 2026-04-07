import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Umzugsunternehmen Zürich`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "SD-Umzüge: Professionelles Umzugsunternehmen in Zürich. Umzug, Reinigung, Räumung & Klaviertransport mit Festpreisgarantie. Jetzt kostenlose Offerte anfordern.",
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/Umzugsfirma-sd-umzuege.webp",
        width: 1200,
        height: 630,
        alt: "SD-Umzüge — Professionelle Umzüge, Reinigung & Räumung in Zürich",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Umzugsunternehmen Zürich`,
    description:
      "Professionelles Umzugsunternehmen in Zürich. Umzug, Reinigung, Räumung & Klaviertransport mit Festpreisgarantie.",
    images: ["/images/Umzugsfirma-sd-umzuege.webp"],
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
    icon: [{ url: "/favicon.webp", type: "image/webp" }],
    shortcut: [{ url: "/favicon.webp", type: "image/webp" }],
    apple: [{ url: "/favicon.webp", type: "image/webp" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
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

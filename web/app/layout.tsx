import type { Metadata } from "next";
import { Baloo_2, Geist_Mono } from "next/font/google";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ClickSparkShell } from "@/components/layout/click-spark-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/cms";

import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Artist portfolio",
    template: "%s · Artist portfolio",
  },
  description: "Contemporary art and illustration.",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${baloo.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <ClickSparkShell>
          <Header settings={settings} />
          {children}
          <Footer settings={settings} />
        </ClickSparkShell>
        <AnalyticsProvider />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Baloo_2, Geist_Mono } from "next/font/google";

import { AnalyticsProvider } from "@/components/analytics/analytics-provider";
import { ClickSparkShell } from "@/components/layout/click-spark-shell";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SiteJsonLd } from "@/components/seo/site-json-ld";
import { getSiteSettings } from "@/lib/cms";
import { getDefaultShareImageUrl } from "@/lib/seo/share-image";
import { getSiteUrl } from "@/lib/seo/site-url";

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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const siteTitle = settings.siteTitle ?? "Artist portfolio";
  const description =
    settings.defaultSeo?.description ?? "Contemporary art and illustration.";
  const defaultTitle = settings.defaultSeo?.title ?? siteTitle;
  const ogImage = getDefaultShareImageUrl(settings);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: `%s · ${siteTitle}`,
    },
    description,
    applicationName: siteTitle,
    manifest: "/favicon/site.webmanifest",
    icons: {
      icon: "/favicon/favicon.ico",
      apple: "/favicon/apple-touch-icon.png",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteUrl,
      siteName: siteTitle,
      title: defaultTitle,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: siteTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description,
      images: [ogImage],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteUrl = getSiteUrl();
  const siteTitle = settings.siteTitle ?? "Artist portfolio";

  return (
    <html
      lang="en"
      className={`${baloo.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground flex min-h-full flex-col">
        <SiteJsonLd
          siteUrl={siteUrl}
          name={siteTitle}
          description={settings.defaultSeo?.description}
        />
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

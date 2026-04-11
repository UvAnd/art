import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";

import { getContactPage, getSiteSettings } from "@/lib/cms";
import { getDefaultShareImageUrl } from "@/lib/seo/share-image";
import { getSiteUrl } from "@/lib/seo/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const title = "Contact";
  const description = s.defaultSeo?.description ?? "Get in touch.";
  const siteUrl = getSiteUrl();
  const image = getDefaultShareImageUrl(s);
  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/contact`,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ContactPage() {
  const [page, settings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const contact =
    page ??
    ({
      headline: "Say Hello",
      sideText:
        "Don't want to fill out the form?\nWrite to us directly — we'll respond quickly.",
    } as const);

  return <ContactForm page={contact} settings={settings} />;
}

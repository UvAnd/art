import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";

import { getContactPage, getSiteSettings } from "@/lib/cms";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    title: "Contact",
    description: "Get in touch.",
    openGraph: { title: "Contact", description: s.defaultSeo?.description ?? undefined },
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

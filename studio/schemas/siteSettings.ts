import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "externalShopUrl",
      title: "External shop URL",
      type: "url",
    }),
    defineField({
      name: "heroSlides",
      title: "Hero slides",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "work" }],
        },
      ],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: "socials",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Instagram", value: "instagram" },
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Behance", value: "behance" },
                  { title: "Email", value: "email" },
                ],
                layout: "radio",
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL or email",
              type: "string",
              description:
                "Email: use the address only (recommended), e.g. name@example.com — or mailto:name@example.com. Other platforms: full https URL.",
              validation: (Rule) =>
                Rule.required().custom((value, context) => {
                  const parent = context.parent as { platform?: string } | undefined;
                  const platform = parent?.platform;
                  const v = (value ?? "").trim();
                  if (!v) return "Required";
                  if (platform === "email") {
                    const addr = v.replace(/^mailto:/i, "").split("?")[0].trim();
                    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(addr)) return true;
                    return "Enter a valid email address";
                  }
                  try {
                    const parsed = new URL(/^https?:\/\//i.test(v) ? v : `https://${v}`);
                    if (parsed.protocol !== "http:" && parsed.protocol !== "https:")
                      return "Use an https URL";
                    return true;
                  } catch {
                    return "Enter a valid URL (https://…)";
                  }
                }),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer text",
      type: "string",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "object",
      fields: [
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
      ],
    }),
  ],
});

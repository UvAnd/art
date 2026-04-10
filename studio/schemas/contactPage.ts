import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Say Hello",
    }),
    defineField({
      name: "illustration",
      title: "Illustration",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "sideText",
      title: "Side text",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "contactEmailDisplay",
      title: "Contact email (display)",
      type: "string",
    }),
  ],
});

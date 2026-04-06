import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.divider(),
      S.documentTypeListItem("category").title("Categories"),
      S.documentTypeListItem("work").title("Works"),
      S.divider(),
      S.listItem()
        .title("About page")
        .id("aboutPage")
        .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
      S.listItem()
        .title("Contact page")
        .id("contactPage")
        .child(S.document().schemaType("contactPage").documentId("contactPage")),
    ]);

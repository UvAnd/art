import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { structure } from "./desk/structure";
import { schemaTypes } from "./schemas";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "artist-portfolio",
  title: "Artist portfolio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
  },
});

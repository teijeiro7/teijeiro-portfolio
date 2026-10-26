import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://teijeiro7.vercel.app",
  integrations: [
    sitemap({
      filter: (page) => !page.endsWith("/404") && !page.endsWith("/404/"),
    }),
  ],
});

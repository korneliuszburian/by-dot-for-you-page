import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

const site = process.env.SITE_URL ?? process.env.PUBLIC_SITE_URL;

export default defineConfig({
  site,
  integrations: [
    react({
      include: ["**/three-components/**"],
    }),
    partytown(),
    ...(site ? [sitemap()] : []),
  ],
  vite: {
    optimizeDeps: {
      include: ["three"],
    },
  },
});

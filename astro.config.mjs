import { defineConfig } from "astro/config";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [
    react({
      include: ["**/three-components/**"],
    }),
    partytown(),
    sitemap(),
  ],
  vite: {
    optimizeDeps: {
      include: ["three"],
    },
  },
});

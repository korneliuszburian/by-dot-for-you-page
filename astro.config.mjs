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
    resolve: {
      alias: [{ find: /^three$/, replacement: "three/src/Three.js" }],
    },
    optimizeDeps: {
      include: ["three/src/Three.js"],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes("node_modules/three")) return;

            if (id.includes("/examples/jsm/loaders/")) {
              return "three-loaders";
            }

            if (id.includes("/examples/jsm/postprocessing/")) {
              return "three-postprocessing";
            }

            if (id.includes("/src/math/")) {
              return "three-math";
            }

            if (id.includes("/src/renderers/")) {
              return "three-renderers";
            }

            if (
              id.includes("/src/scenes/") ||
              id.includes("/src/cameras/") ||
              id.includes("/src/lights/") ||
              id.includes("/src/objects/") ||
              id.includes("/src/core/")
            ) {
              return "three-scene";
            }

            if (id.includes("/src/materials/") || id.includes("/src/textures/")) {
              return "three-materials";
            }

            if (id.includes("/src/animation/")) {
              return "three-animation";
            }

            return "three-shared";
          },
        },
      },
    },
  },
});

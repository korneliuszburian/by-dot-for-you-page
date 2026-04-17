import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");

const allFailures = [];

const pushFailures = (scope, failures) => {
  for (const failure of failures) {
    allFailures.push(`[${scope}] ${failure}`);
  }
};

const collectHtmlFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const htmlFiles = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      htmlFiles.push(...(await collectHtmlFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(entryPath);
    }
  }

  return htmlFiles;
};

const collectCandidateTokens = (content) => {
  const candidateStrings = [];
  const patterns = [
    /class="([^"]+)"/g,
    /class='([^']+)'/g,
    /class=\{`([^`]+)`\}/g,
    /classList\.(?:add|remove|toggle)\(\s*["'`]([^"'`]+)["'`]/g,
    /:\s*"([^"]+)"/g,
    /:\s*'([^']+)'/g,
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      candidateStrings.push(match[1]);
    }
  }

  return candidateStrings.flatMap((candidate) => candidate.split(/\s+/)).filter(Boolean);
};

const verifyCommerceDataSource = async () => {
  const failures = [];
  const helperPath = path.join(root, "src", "utils", "products-dataset.ts");
  const shopPagePath = path.join(root, "src", "pages", "shop.astro");
  const productPagePath = path.join(root, "src", "pages", "shop", "[slug].astro");

  try {
    await access(helperPath);
  } catch {
    failures.push("Missing src/utils/products-dataset.ts canonical runtime data helper.");
  }

  const shopPage = await readFile(shopPagePath, "utf8");
  const productPage = await readFile(productPagePath, "utf8");

  if (shopPage.includes("public/dataset/output.json")) {
    failures.push("src/pages/shop.astro still imports public/dataset/output.json directly.");
  }

  if (productPage.includes("public/dataset/output.json")) {
    failures.push("src/pages/shop/[slug].astro still imports public/dataset/output.json directly.");
  }

  if (!shopPage.includes("../utils/products-dataset")) {
    failures.push("src/pages/shop.astro does not import the canonical products-dataset helper.");
  }

  if (!productPage.includes("../../utils/products-dataset")) {
    failures.push("src/pages/shop/[slug].astro does not import the canonical products-dataset helper.");
  }

  pushFailures("commerce-data-source", failures);
};

const verifyTailwindIntegrationRemoval = async () => {
  const failures = [];
  const astroConfig = await readFile(path.join(root, "astro.config.mjs"), "utf8");
  const packageJson = await readFile(path.join(root, "package.json"), "utf8");
  const postcssConfig = await readFile(path.join(root, "postcss.config.cjs"), "utf8");
  const gridCss = await readFile(path.join(root, "src", "css", "components", "grid.css"), "utf8");
  const emittedCssFiles = (await readdir(path.join(distDir, "_astro"))).filter((file) =>
    file.endsWith(".css"),
  );

  if (astroConfig.includes("@astrojs/tailwind")) {
    failures.push("astro.config.mjs still references @astrojs/tailwind.");
  }

  if (packageJson.includes('"@astrojs/tailwind"')) {
    failures.push("package.json still depends on @astrojs/tailwind.");
  }

  if (!packageJson.includes('"autoprefixer"')) {
    failures.push("package.json no longer provides autoprefixer for the PostCSS pipeline.");
  }

  if (!postcssConfig.includes("require('autoprefixer')")) {
    failures.push("postcss.config.cjs does not run autoprefixer.");
  }

  if (gridCss.includes("@media screen(")) {
    failures.push("src/css/components/grid.css still uses Tailwind screen() media helpers.");
  }

  if (emittedCssFiles.length === 0) {
    failures.push("dist/_astro does not contain emitted CSS assets to verify the PostCSS/Tailwind pipeline.");
  } else {
    const emittedCss = (
      await Promise.all(
        emittedCssFiles.map((file) => readFile(path.join(distDir, "_astro", file), "utf8")),
      )
    ).join("\n");

    if (!emittedCss.includes("flow-space-l")) {
      failures.push("Built CSS no longer includes generated Tailwind compatibility utility flow-space-l.");
    }

    if (!emittedCss.includes("--color-highlight-bone")) {
      failures.push("Built CSS no longer includes generated design-token custom properties.");
    }
  }

  pushFailures("tailwind-integration-removal", failures);
};

const verifyDesignSystemPage = async () => {
  const designSystemHtml = await readFile(
    path.join(distDir, "design-system", "index.html"),
    "utf8",
  );

  const requiredMarkers = [
    "<title>DESIGN SYSTEM</title>",
    "Tokeny",
    "Komponenty",
    "Decyzje Systemowe",
    "Gothic Button",
    "Gothic Frame",
    "Logo 3D",
  ];

  const failures = requiredMarkers
    .filter((marker) => !designSystemHtml.includes(marker))
    .map((marker) => `Missing marker: ${marker}`);

  pushFailures("design-system-page", failures);
};

const verifyRouteOwnership = async () => {
  const failures = [];
  const homepageHtml = await readFile(path.join(distDir, "index.html"), "utf8");
  const itemsHtml = await readFile(path.join(distDir, "items", "index.html"), "utf8");
  const lookbookHtml = await readFile(path.join(distDir, "lookbook", "index.html"), "utf8");
  const photosHtml = await readFile(path.join(distDir, "photos", "index.html"), "utf8");
  const collectionsHtml = await readFile(
    path.join(distDir, "collections", "index.html"),
    "utf8",
  );

  const shopHrefCount = homepageHtml.split('href="/shop"').length - 1;

  if (!homepageHtml.includes("PRZEDMIOTY")) {
    failures.push("Homepage menu is missing the canonical PRZEDMIOTY label.");
  }

  if (homepageHtml.includes("SKLEP")) {
    failures.push("Homepage menu still exposes duplicate SKLEP label for the shop listing.");
  }

  if (homepageHtml.includes('href="/items"')) {
    failures.push("Homepage menu still links to /items instead of the canonical /shop route.");
  }

  if (shopHrefCount !== 1) {
    failures.push(`Homepage menu should expose exactly one /shop entry, found ${shopHrefCount}.`);
  }

  if (!itemsHtml.includes('http-equiv="refresh"') || !itemsHtml.includes("url=/shop")) {
    failures.push("/items does not redirect to the canonical /shop route.");
  }

  if (!lookbookHtml.includes("<title>LOOKBOOK</title>")) {
    failures.push("/lookbook does not expose the LOOKBOOK page title.");
  }

  if (!photosHtml.includes("<title>ZDJĘCIA</title>")) {
    failures.push("/photos does not expose the ZDJĘCIA page title.");
  }

  if (!collectionsHtml.includes("<title>KOLEKCJE</title>")) {
    failures.push("/collections does not expose the KOLEKCJE page title.");
  }

  pushFailures("route-ownership", failures);
};

const verifyCollectionHandoff = async () => {
  const failures = [];
  const collectionsHtml = await readFile(
    path.join(distDir, "collections", "index.html"),
    "utf8",
  );
  const shopHtml = await readFile(path.join(distDir, "shop", "index.html"), "utf8");
  const shopSource = await readFile(path.join(root, "src", "pages", "shop.astro"), "utf8");
  const dataset = JSON.parse(
    await readFile(path.join(root, "public", "dataset", "output.json"), "utf8"),
  );
  const expectedCollections = Object.entries(
    dataset.reduce((acc, product) => {
      acc[product.collection] = (acc[product.collection] || 0) + 1;
      return acc;
    }, {}),
  );

  for (const [collectionName, collectionCount] of expectedCollections) {
    const encodedHref = `/shop?collection=${encodeURIComponent(collectionName)}`;

    if (!collectionsHtml.includes(encodedHref)) {
      failures.push(`/collections is missing handoff URL ${encodedHref}.`);
    }

    if (!collectionsHtml.includes(collectionName)) {
      failures.push(`/collections is missing collection label "${collectionName}".`);
    }

    if (!collectionsHtml.includes(`${collectionCount} products`)) {
      failures.push(
        `/collections is missing the count marker "${collectionCount} products" for "${collectionName}".`,
      );
    }

    if (!shopHtml.includes(`data-collection-filter="${collectionName}"`)) {
      failures.push(`/shop does not emit a filter control for collection "${collectionName}".`);
    }
  }

  if (!shopSource.includes("Collection:")) {
    failures.push("src/pages/shop.astro does not expose a collection filter group.");
  }

  if (!shopSource.includes("URLSearchParams")) {
    failures.push("src/pages/shop.astro does not read query params for collection handoff.");
  }

  if (!shopSource.includes("data-collection-filter")) {
    failures.push("src/pages/shop.astro does not mark collection filter controls for runtime handoff.");
  }

  if (!shopSource.includes("document.documentElement.dataset.collectionFilter")) {
    failures.push("src/pages/shop.astro does not pre-seed collection state on the document root.");
  }

  pushFailures("collection-handoff", failures);
};

const verifyShellMedia = async () => {
  const failures = [];
  const astroDir = path.join(distDir, "_astro");
  const rawRuntimePaths = [
    "/assets/videos/testing-video-02.mp4",
    "/assets/videos/testing-video-poster-02.png",
  ];

  const emittedAssets = await readdir(astroDir);
  const emittedVideo = emittedAssets.find((file) => /^testing-video-02\..+\.mp4$/.test(file));
  const emittedPoster = emittedAssets.find((file) =>
    /^testing-video-poster-02\..+\.png$/.test(file),
  );
  const htmlFiles = await collectHtmlFiles(distDir);
  const productDetailHtmlFiles = htmlFiles.filter((file) =>
    /^shop\/.+\/index\.html$/.test(path.relative(distDir, file)),
  );

  if (!emittedVideo) {
    failures.push("Missing emitted video asset for testing-video-02.mp4 in dist/_astro.");
  }

  if (!emittedPoster) {
    failures.push("Missing emitted poster asset for testing-video-poster-02.png in dist/_astro.");
  }

  for (const htmlFile of htmlFiles) {
    const html = await readFile(htmlFile, "utf8");

    for (const rawRuntimePath of rawRuntimePaths) {
      if (html.includes(rawRuntimePath)) {
        failures.push(`${path.relative(root, htmlFile)} still references ${rawRuntimePath}.`);
      }
    }
  }

  if (productDetailHtmlFiles.length === 0) {
    failures.push("Missing built shop detail pages to verify shared shell media coverage.");
  } else {
    for (const productDetailHtml of productDetailHtmlFiles) {
      const html = await readFile(productDetailHtml, "utf8");

      if (emittedVideo && !html.includes(`/_astro/${emittedVideo}`)) {
        failures.push(
          `${path.relative(root, productDetailHtml)} does not reference emitted video /_astro/${emittedVideo}.`,
        );
      }

      if (emittedPoster && !html.includes(`/_astro/${emittedPoster}`)) {
        failures.push(
          `${path.relative(root, productDetailHtml)} does not reference emitted poster /_astro/${emittedPoster}.`,
        );
      }
    }
  }

  const homepageHtml = await readFile(path.join(distDir, "index.html"), "utf8");
  const shopListingHtml = await readFile(path.join(distDir, "shop", "index.html"), "utf8");

  if (emittedVideo && !homepageHtml.includes(`/_astro/${emittedVideo}`)) {
    failures.push(`dist/index.html does not reference emitted video /_astro/${emittedVideo}.`);
  }

  if (emittedPoster && !homepageHtml.includes(`/_astro/${emittedPoster}`)) {
    failures.push(`dist/index.html does not reference emitted poster /_astro/${emittedPoster}.`);
  }

  if (emittedVideo && !shopListingHtml.includes(`/_astro/${emittedVideo}`)) {
    failures.push(`dist/shop/index.html does not reference emitted video /_astro/${emittedVideo}.`);
  }

  pushFailures("shell-media", failures);
};

const verifyTailwindMigration = async () => {
  const filesToCheck = [
    {
      path: path.join(root, "src", "components", "Logo3D.astro"),
      forbidden: [
        "w-32",
        "h-32",
        "w-full",
        "h-[300px]",
        "h-[500px]",
        "h-full",
        "mx-auto",
        "overflow-hidden",
        "cursor-pointer",
        "group",
        "block",
        "outline-none",
        "transition-transform",
        "duration-700",
        "ease-out",
        "group-hover:scale-105",
        "absolute",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "pointer-events-none",
        "z-10",
        "text-xs",
        "tracking-[0.2em]",
        "text-[#444]",
        "font-serif",
        "uppercase",
        "animate-pulse",
      ],
    },
    {
      path: path.join(root, "src", "pages", "shop.astro"),
      forbidden: [
        "text-center",
        "pt-8",
        "pb-4",
        "inline-block",
        "pointer-events-none",
        "sr-only",
        "absolute",
        "inset-0",
        "flex",
        "items-center",
        "justify-center",
        "z-0",
        "w-8",
        "h-8",
        "border-2",
        "border-stone-600",
        "border-t-stone-300",
        "rounded-full",
        "animate-spin",
        "relative",
        "z-10",
        "transition-opacity",
        "duration-300",
        "opacity-0",
      ],
    },
    {
      path: path.join(root, "src", "pages", "shop", "[slug].astro"),
      forbidden: [
        "relative",
        "absolute",
        "top-6",
        "left-6",
        "z-50",
        "block",
        "drop-shadow-[0_0_15px_rgba(255,60,0,0.3)]",
        "hover:drop-shadow-[0_0_25px_rgba(255,60,0,0.6)]",
        "transition-all",
        "duration-300",
        "pointer-events-none",
        "sr-only",
        "w-full",
        "h-full",
        "flex",
        "items-center",
        "justify-center",
        "inset-0",
        "z-0",
        "w-8",
        "h-8",
        "border-2",
        "border-stone-600",
        "border-t-stone-300",
        "rounded-full",
        "animate-spin",
        "z-10",
        "transition-opacity",
        "duration-500",
        "opacity-0",
      ],
    },
  ];

  const failures = [];

  for (const file of filesToCheck) {
    const content = await readFile(file.path, "utf8");
    const candidateTokens = collectCandidateTokens(content);

    for (const token of file.forbidden) {
      if (candidateTokens.includes(token)) {
        failures.push(`${path.relative(root, file.path)} still contains forbidden utility token "${token}".`);
      }
    }
  }

  pushFailures("tailwind-utility-migration", failures);
};

await verifyCommerceDataSource();
await verifyTailwindIntegrationRemoval();
await verifyDesignSystemPage();
await verifyRouteOwnership();
await verifyCollectionHandoff();
await verifyShellMedia();
await verifyTailwindMigration();

if (allFailures.length > 0) {
  console.error("Cleanup verification failed:");
  for (const failure of allFailures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Cleanup verification passed.");

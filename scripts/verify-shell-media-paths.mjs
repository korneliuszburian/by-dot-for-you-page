import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const astroDir = path.join(distDir, "_astro");

const rawRuntimePaths = [
  "/assets/videos/testing-video-02.mp4",
  "/assets/videos/testing-video-poster-02.png",
];

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

const emittedAssets = await readdir(astroDir);
const emittedVideo = emittedAssets.find((file) =>
  /^testing-video-02\..+\.mp4$/.test(file),
);
const emittedPoster = emittedAssets.find((file) =>
  /^testing-video-poster-02\..+\.png$/.test(file),
);
const htmlFiles = await collectHtmlFiles(distDir);
const productDetailHtmlFiles = htmlFiles.filter((file) =>
  /^shop\/.+\/index\.html$/.test(path.relative(distDir, file)),
);

const failures = [];

if (!emittedVideo) {
  failures.push("Missing emitted video asset for testing-video-02.mp4 in dist/_astro.");
}

if (!emittedPoster) {
  failures.push(
    "Missing emitted poster asset for testing-video-poster-02.png in dist/_astro.",
  );
}

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");

  for (const rawRuntimePath of rawRuntimePaths) {
    if (html.includes(rawRuntimePath)) {
      failures.push(`${path.relative(process.cwd(), htmlFile)} still references ${rawRuntimePath}.`);
    }
  }
}

if (productDetailHtmlFiles.length === 0) {
  failures.push("Missing built shop detail pages to verify shared shell media coverage.");
} else {
  for (const productDetailHtml of productDetailHtmlFiles) {
    const productDetailHtmlContents = await readFile(productDetailHtml, "utf8");

    if (emittedVideo && !productDetailHtmlContents.includes(`/_astro/${emittedVideo}`)) {
      failures.push(
        `${path.relative(process.cwd(), productDetailHtml)} does not reference emitted video /_astro/${emittedVideo}.`,
      );
    }

    if (emittedPoster && !productDetailHtmlContents.includes(`/_astro/${emittedPoster}`)) {
      failures.push(
        `${path.relative(process.cwd(), productDetailHtml)} does not reference emitted poster /_astro/${emittedPoster}.`,
      );
    }
  }
}

const homepageHtml = path.join(distDir, "index.html");
const homepageHtmlContents = await readFile(homepageHtml, "utf8");
const shopListingHtml = path.join(distDir, "shop", "index.html");
const shopListingHtmlContents = await readFile(shopListingHtml, "utf8");

if (emittedVideo && !homepageHtmlContents.includes(`/_astro/${emittedVideo}`)) {
  failures.push(
    `${path.relative(process.cwd(), homepageHtml)} does not reference emitted video /_astro/${emittedVideo}.`,
  );
}

if (emittedPoster && !homepageHtmlContents.includes(`/_astro/${emittedPoster}`)) {
  failures.push(
    `${path.relative(process.cwd(), homepageHtml)} does not reference emitted poster /_astro/${emittedPoster}.`,
  );
}

if (emittedVideo && !shopListingHtmlContents.includes(`/_astro/${emittedVideo}`)) {
  failures.push(
    `${path.relative(process.cwd(), shopListingHtml)} does not reference emitted video /_astro/${emittedVideo}.`,
  );
}

if (failures.length > 0) {
  console.error("Shell media verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Shell media verification passed.");

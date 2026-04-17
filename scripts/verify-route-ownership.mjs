import { readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const homepageHtml = await readFile(path.join(distDir, "index.html"), "utf8");
const itemsHtml = await readFile(path.join(distDir, "items", "index.html"), "utf8");
const lookbookHtml = await readFile(path.join(distDir, "lookbook", "index.html"), "utf8");
const photosHtml = await readFile(path.join(distDir, "photos", "index.html"), "utf8");
const collectionsHtml = await readFile(
  path.join(distDir, "collections", "index.html"),
  "utf8",
);

const failures = [];

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

if (!itemsHtml.includes('http-equiv="refresh"') || !itemsHtml.includes('url=/shop')) {
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

if (failures.length > 0) {
  console.error("Route ownership verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Route ownership verification passed.");

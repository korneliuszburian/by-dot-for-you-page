import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const helperPath = path.join(root, "src", "utils", "products-dataset.ts");
const shopPagePath = path.join(root, "src", "pages", "shop.astro");
const productPagePath = path.join(root, "src", "pages", "shop", "[slug].astro");

const failures = [];

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

if (!shopPage.includes('../utils/products-dataset') && !shopPage.includes("../utils/products-dataset")) {
  failures.push("src/pages/shop.astro does not import the canonical products-dataset helper.");
}

if (
  !productPage.includes("../../utils/products-dataset")
  && !productPage.includes('../../utils/products-dataset')
) {
  failures.push("src/pages/shop/[slug].astro does not import the canonical products-dataset helper.");
}

if (failures.length > 0) {
  console.error("Commerce data source verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Commerce data source verification passed.");

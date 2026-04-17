import { readFile } from "node:fs/promises";
import path from "node:path";

const designSystemHtml = await readFile(
  path.join(process.cwd(), "dist", "design-system", "index.html"),
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

const failures = requiredMarkers.filter((marker) => !designSystemHtml.includes(marker));

if (failures.length > 0) {
  console.error("Design-system page verification failed:");
  for (const failure of failures) {
    console.error(`- Missing marker: ${failure}`);
  }
  process.exit(1);
}

console.log("Design-system page verification passed.");

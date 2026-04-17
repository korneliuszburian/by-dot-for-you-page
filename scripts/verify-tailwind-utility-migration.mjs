import { readFile } from "node:fs/promises";
import path from "node:path";

const filesToCheck = [
  {
    path: path.join("src", "components", "Logo3D.astro"),
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
    path: path.join("src", "pages", "shop.astro"),
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
    path: path.join("src", "pages", "shop", "[slug].astro"),
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

for (const file of filesToCheck) {
  const content = await readFile(file.path, "utf8");
  const candidateTokens = collectCandidateTokens(content);

  for (const token of file.forbidden) {
    if (candidateTokens.includes(token)) {
      failures.push(`${file.path} still contains forbidden utility token "${token}".`);
    }
  }
}

if (failures.length > 0) {
  console.error("Tailwind utility migration verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Tailwind utility migration verification passed.");

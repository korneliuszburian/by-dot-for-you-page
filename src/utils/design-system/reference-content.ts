import colors from "../../design-tokens/colors.json";
import fonts from "../../design-tokens/fonts.json";
import spacing from "../../design-tokens/spacing.json";

export type FrameVariant = "ornate" | "old";
export type FrameSize = "thin" | "medium" | "thick" | "heavy";

export interface DesignSystemPageMeta {
  title: string;
  description: string;
  backgroundVideoFilter: string;
}

export interface DesignSystemHeroContent {
  eyebrow: string;
  title: string;
  intro: string;
}

export type ComponentCardKind = "buttons" | "frame" | "logo";

export interface ComponentCardConfig {
  kind: ComponentCardKind;
  title: string;
  description: string;
  variant: FrameVariant;
  size: FrameSize;
}

export interface ColorTokenItem {
  name: string;
  value: string;
}

export interface FontTokenItem {
  name: string;
  value: string[];
}

export interface SpacingTokenItem {
  name: string;
  min: number;
  max: number;
}

export type TokenCardKind = "colors" | "fonts" | "spacing";

export interface TokenCardConfig {
  kind: TokenCardKind;
  title: string;
  variant: FrameVariant;
  size: FrameSize;
  items: ColorTokenItem[] | FontTokenItem[] | SpacingTokenItem[];
}

export interface ReferenceLink {
  href: string;
  label: string;
}

export const designSystemPageMeta: DesignSystemPageMeta = {
  title: "DESIGN SYSTEM",
  description:
    "Reference surface for the current design language, shared components, tokens, and cleanup decisions.",
  backgroundVideoFilter: "brightness(0.45)",
};

export const designSystemHero: DesignSystemHeroContent = {
  eyebrow: "Repository Reference Surface",
  title: "DESIGN SYSTEM",
  intro:
    "Jedno miejsce na aktualny język wizualny, żywe komponenty, tokeny i decyzje, które mają prowadzić dalszy cleanup repozytorium.",
};

export const componentCards: ComponentCardConfig[] = [
  {
    kind: "buttons",
    title: "Gothic Button",
    description:
      "Asset-backed CTA language used by the menu and commerce flows.",
    variant: "ornate",
    size: "thick",
  },
  {
    kind: "frame",
    title: "Gothic Frame",
    description:
      "Shared container language for menu, shop overlays, and structured content surfaces.",
    variant: "old",
    size: "medium",
  },
  {
    kind: "logo",
    title: "Logo 3D",
    description:
      "Motion-heavy shell artifact used as the immersive visual anchor of the homepage.",
    variant: "ornate",
    size: "medium",
  },
];

export const tokenCards: TokenCardConfig[] = [
  {
    kind: "colors",
    title: "Kolory",
    variant: "ornate",
    size: "medium",
    items: colors.items as ColorTokenItem[],
  },
  {
    kind: "fonts",
    title: "Typografia",
    variant: "ornate",
    size: "medium",
    items: fonts.items as FontTokenItem[],
  },
  {
    kind: "spacing",
    title: "Spacing",
    variant: "ornate",
    size: "medium",
    items: spacing.items.slice(0, 10) as SpacingTokenItem[],
  },
];

export const systemDecisions = [
  "Homepage/menu pozostaje referencją wizualną dla całego systemu.",
  "Shop jest kanoniczną listą produktów, a /items działa jako alias do /shop.",
  "Runtime commerce opiera się teraz na public/dataset/output.json przez wspólny adapter danych.",
  "Tailwind zostaje chwilowo jako cienka warstwa zgodności, ale nowy cleanup ma iść w lokalny CSS i tokeny.",
];

export const referenceLinks: ReferenceLink[] = [
  {
    href: "/",
    label: "Homepage Reference",
  },
  {
    href: "/shop",
    label: "Canonical Shop",
  },
  {
    href: "/collections",
    label: "Collections Loader",
  },
];

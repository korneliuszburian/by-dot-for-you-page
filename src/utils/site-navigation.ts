export type MenuStatus = "active" | "disabled";

export interface MenuRoute {
  key: string;
  title: string;
  pageTitle: string;
  route?: string;
  status: MenuStatus;
  owner: string;
}

export const routeCatalog = {
  newCollection: {
    key: "new-collection",
    title: "NOWA KOLEKCJA",
    pageTitle: "NOWA KOLEKCJA",
    status: "disabled",
    owner: "planned launch surface",
  },
  collections: {
    key: "collections",
    title: "WCZYTAJ KOLEKCJE",
    pageTitle: "KOLEKCJE",
    route: "/collections",
    status: "active",
    owner: "collection loading surface",
  },
  shop: {
    key: "shop",
    title: "PRZEDMIOTY",
    pageTitle: "PRZEDMIOTY",
    route: "/shop",
    status: "active",
    owner: "canonical commerce listing",
  },
  itemsAlias: {
    key: "items",
    title: "PRZEDMIOTY",
    pageTitle: "PRZEDMIOTY",
    route: "/items",
    status: "disabled",
    owner: "legacy alias to /shop",
  },
  lookbook: {
    key: "lookbook",
    title: "LOOKBOOK",
    pageTitle: "LOOKBOOK",
    route: "/lookbook",
    status: "active",
    owner: "brand editorial surface",
  },
  photos: {
    key: "photos",
    title: "ZDJĘCIA",
    pageTitle: "ZDJĘCIA",
    route: "/photos",
    status: "disabled",
    owner: "future photoblog surface",
  },
} as const satisfies Record<string, MenuRoute>;

export const mainMenuItems = [
  routeCatalog.newCollection,
  routeCatalog.collections,
  routeCatalog.shop,
  routeCatalog.lookbook,
  routeCatalog.photos,
];

export const canonicalCommerceRoute = routeCatalog.shop.route;

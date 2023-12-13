export const MENU_LIST: IAccordion[] = [
  {
    title: "News",
    content: [{ name: "NFT News", path: "/news" }],
  },
  {
    title: "Collections",
    content: [
      { name: "Explore", path: "/collections" },
      { name: "Trending", path: "/trending" },
    ],
  },
  {
    title: "Trade",
    content: [{ name: "trade", path: "/trade" }],
  },
  {
    title: "Coin Analytics",
    content: [{ name: "Crypto analytics", path: "/coins" }],
  },
];

export type IAccordion = {
  title: string;
  content: IContent[];
};

export type IContent = {
  name: string;
  path: string;
};

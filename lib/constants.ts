export const MENU_LIST: IAccordion[] = [
  {
    title: "Collections",
    content: [
      { name: "awdasd", path: "/" },
      { name: "", path: "/" },
    ],
  },
  {
    title: "Stats",
    content: [
      { name: "Rankings", path: "/rankings" },
      { name: "Activity", path: "/activity" },
    ],
  },
  {
    title: "Resources",
    content: [
      { name: "Learn", path: "/learn" },
      { name: "Blog", path: "/blog" },
      { name: "Community standards", path: "community-standards" },
    ],
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

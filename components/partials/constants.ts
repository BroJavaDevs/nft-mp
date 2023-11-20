import { SideNavItem } from "@/lib/types";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Collections",
    path: "/collections",
    submenu: true,
    subMenuItems: [
      { title: "1", path: "/1" },
      { title: "2", path: "/2" },
    ],
  },
];

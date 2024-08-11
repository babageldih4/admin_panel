// import { ReactNode } from "react";
// import { MenuProps } from "antd";

// export interface MenuItem {
//   key: string;
//   icon?: ReactNode;
//   label: string;
//   path: string;
//   children?: MenuItem[];
// }
// export type MenuItem = Required<MenuProps>["items"][number];

import { ReactNode } from "react";

// Extend the existing type to include the path property
export interface MenuItem {
  key: string;
  icon?: ReactNode;
  label: ReactNode;
  path: string;
  children?: MenuItem[];
}

import { jwtDecode } from "jwt-decode";
import { cookieGetter } from "../../functions";

export interface TagItemType {
  label: string;
  key: string;
  shouldDisplay?: boolean;
  closable?: boolean;
  children?: TagItemType[];
}

const token = cookieGetter("admin_token");
const decodedToken = jwtDecode(token);
// console.log(decodedToken);

const displayList = (type: string) => {
  const roles = decodedToken?.roles;
  if (roles?.fullAccess || (roles[type] && roles[type]?.length)) {
    return true;
  }
  return false;
};
export const TagItem: TagItemType[] = [
  {
    label: "Grupbalar",
    key: "/groups",
    shouldDisplay: displayList("mainGroup") || displayList("lastGroup"),
    children: [
      {
        label: "Esasy Grupbalar",
        key: "/groups/maingroups",
        shouldDisplay: displayList("mainGroup"),
      },
      {
        label: "Alt grupbalar",
        key: "/groups/subgroups",
        shouldDisplay: displayList("mainGroup"),
      },
    ],
  },
  {
    label: "Harytlar",
    key: "/products",
    shouldDisplay: displayList("item"),
  },
  {
    label: "Seslenmeler",
    key: "/feedbacks",
  },
  {
    label: "Brendler",
    key: "/brands",
    shouldDisplay: displayList("brand"),
  },
  {
    label: "Birimler",
    key: "/units",
    shouldDisplay: displayList("unit"),
  },

  {
    label: "Bannerler",
    key: "/banners",
    // shouldDisplay: displayList("banner") && !isQr,
    shouldDisplay: displayList("banner"),
  },
  {
    label: "Akylly Bolumler",
    key: "/smartSections",
    shouldDisplay: true,
  },
  {
    label: "Habarnamalar",
    key: "/notifications",
    shouldDisplay: true,
  },

  {
    label: "Zakazlar",
    key: "/orders",
  },
  {
    label: "Promokodlar",
    key: "/promocodes",
  },
  {
    label: "Teswirler",
    key: "/comments",
  },

  {
    label: "Bolumler",
    key: "/divisions",
  },
  {
    label: "Isgarler",
    key: "/employees",
  },
  {
    label: "Rollar",
    key: "/roles",
  },
  {
    label: "Terazi Systemi",
    key: "/scalingSystems",
  },
  {
    label: "Programmalar",
    key: "/programs",
  },
];

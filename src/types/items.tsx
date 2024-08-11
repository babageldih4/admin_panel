export type TItem = {
  uuid: string;
  code?: string;
  eCode?: string;
  eActive?: boolean;
  active?: boolean;
  mainGroupUuid?: string;
  lastGroupUuid?: string;
  brandUuid?: string;
  cardType?: number;
  name: string;
  name2?: string;
  name3?: string;
  stgrpCode?: string;
  specode?: string;
  specode2?: string;
  specode3?: string;
  specode4?: string;
  specode5?: string;
  //   paretto: "best" | "average" | "worst"; // Use a union of string literals for predefined values
  paretto: string;
  mainUnit?: string;
  mainUnitId?: number;
  brandId?: number;
  subsGoodCode?: string;
  reyonCode?: string;
  salesLimitQuantity?: number;
  nameTm?: string;
  nameTr?: string;
  nameRu?: string;
  infoTm?: string;
  infoEng?: string;
  infoTr?: string;
  infoRu?: string;
  keywords?: string[]; // Array of strings
  countOfComplect?: number;
  isNew?: boolean;
  firstPurchaseDate?: string; // Use string for ISO date format
  video?: string;
  status?: string;
  bigImg?: string;
  mediumImg?: string;
  smallImg: string;
  createdAt?: string; // Use string for ISO date format
  updatedAt?: string; // Use string for ISO date format
};

export type TItems = {
  data: TItem[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TItemSendsInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string | boolean;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

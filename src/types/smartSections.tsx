export type TSmartSection = {
  uuid: string;
  id?: number;
  active: boolean;
  brands?: string[];
  createdAt?: string;
  displayFields?: string[];
  endDate?: string;
  items?: null | string[] | number[];
  languages?: string[];
  lastGroups?: null | string[] | number[];
  mainGroup?: null | string[] | number[];
  nameEng: string;
  nameRu: string;
  nameTm: string;
  nameTr: string;
  onlyNews?: boolean;
  order: string[];
  paretto?: string[] | number[];
  priority: number;
  productDiscount?: boolean;
  programs?: string[];
  startDate?: string;
  updateDate?: string;
};

export type TSmartSections = {
  data: TSmartSection[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TSmartSectionsSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

interface orderType {
  name: string;
  type: string;
}

interface itemsType {
  uuid: string;
  name: string;
  code: string;
  smallImg: string;
}

export type TSmartSectionsItem = {
  uuid: string;
  nameTr: string;
  nameTm: string;
  nameRu: string;
  nameEng: string;
  startDate: string;
  endDate: string;
  id: number | string;
  items: itemsType[];
  mainGroups: string[];
  lastGroups: string[];
  paretto: string[];
  brands: string[];
  productDiscount: boolean;
  onlyNews: boolean;
  order: orderType[];
  priority: number;
  active: boolean;
  languages: string[];
  divisions: string[];
  programs: string[];
  displayFields: string[];
  createdAt: string;
  updatedAt: string;
};

/*

  "uuid": "string",
  "nameTr": "string",
  "nameTm": "string",
  "nameRu": "string",
  "nameEng": "string",
  "startDate": "2024-07-11T13:49:16.420Z",
  "endDate": "2024-07-11T13:49:16.420Z",
  "items": [
    {
      "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "name": "string",
      "code": "string",
      "smallImg": "string"
    }
  ],
  "mainGroups": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "lastGroup": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "paretto": [
    "best"
  ],
  "brands": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "productDiscount": true,
  "onlyNews": true,
  "order": [
    {
      "name": "price",
      "type": "asc"
    }
  ],
  "priority": 0,
  "active": true,
  "languages": [
    "tm"
  ],
  "divisions": [
    "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  ],
  "programs": [
    "web"
  ],
  "displayFields": [
    "header"
  ],
  "createdAt": "2024-07-11T13:49:16.420Z",
  "updatedAt": "2024-07-11T13:49:16.420Z"
}

*/

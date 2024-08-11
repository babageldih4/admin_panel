// export type TBanner = {
//   uuid: string;
//   active: boolean;
//   cardType: number;
//   code: string;
//   name: string;
//   name2: string;
//   eCode: string;
//   address: string;
//   address2: string;
//   district: string;
//   town: string;
//   city: string;
//   cityCode: string;
//   country: string;
//   countryCode: string;
//   phoneNumber: string;
//   phoneNumber2: string;
//   email: string;
//   email2: string;
//   email3: string;
//   incharge: string;
//   incharge2: string;
//   incharge3: string;
//   webAddress: string;
//   birthDate: string;
//   status: string;
//   exchangeRateType: string;
//   discount: string;
//   specode: string;
//   specode2: string;
//   specode3: string;
//   specode4: string;
//   specode5: string;
//   cyphcode: string;
//   card: string;
//   balanceTMT: string;
//   balanceUSD: string;
//   guid: string;
//   userName: string;
//   password: string;
//   registerationPhoneNumber: string;
//   fixedDivision: boolean;
//   divisionId: number;
//   image: string;
//   imageOrginal: string;
//   saleComplect: boolean;
//   createdAt: string;
//   updatedAt: string;
//   division: {
//     uuid: string;
//     code: string;
//     nr: number;
//     departmentNr: number;
//     nameRu: string;
//     nameTm: string;
//     addressTm: string;
//     addressRu: string;
//     latitude: number;
//     longitude: number;
//     warehouses: Array<{
//       nr: number;
//       isComplect: boolean;
//     }>;
//     phoneNumber: string;
//     phoneNumber2: string;
//     phoneNumber3: string;
//     instagram: string;
//     telegram: string;
//     imo: string;
//     icq: string;
//     email: string;
//     defaulWarehouse: number;
//     clientId: number;
//     discountForProductId: number;
//     discountForClientId: number;
//     discountForReceiptId: number;
//     deliveryCardId: number;
//     type: string;
//     minOrderPrice: number;
//     minOrderPriceCurrencyId: number;
//     expressActive: boolean;
//     expressStartTime: string;
//     expressEndTime: string;
//     expressDeliveryPrice: number;
//     expressDeliveryPriceCurrencyId: number;
//     expressAcceptableProductCount: number;
//     QRLocalServerURL: string;
//     active: boolean;
//     cashPayment: boolean;
//     terminalPayment: boolean;
//     onlinePayment: boolean;
//     fromStoreAccess: boolean;
//     orderReservedDay: number;
//     createdAt: string;
//     updatedAt: string;
//   };
// };

export type TBanner = {
  actionType: string; // "items"
  active: boolean; // true
  brands: string[]; // []
  closeSecond: number; // 5
  color: string; // "#ffffff"
  createdAt: string; // "2023-03-11T05:45:17.311Z"
  displayedUsers: null | string; // null
  divisions: string[]; // []
  endDate: null | string; // null
  imageEng: null | string; // null
  imageRu: string; // "banner-63774e3f1678513515084_RU.webp"
  imageTelEng: null | string; // null
  imageTelRu: string; // "banner-63774e3f1678513515084_TEL_RU.webp"
  imageTelTm: string; // "banner-63774e3f1678513515084_TEL_TM.webp"
  imageTelTr: null | string; // null
  imageTm: string; // "banner-63774e3f1678513515084_TM.webp"
  imageTr: null | string; // null
  items: number[]; // (2) [332, 331]
  languages: string[]; // (2) ['tm', 'ru']
  lastGroups: string[]; // []
  link: null | string; // null
  mainGroups: string[]; // []
  nameEng: string; // ""
  nameRu: string; // "мебельные крючки "
  nameTm: string; // "ilgencek"
  nameTr: string; // ""
  onceADay: boolean; // false
  oneTimeUse: boolean; // false
  onlyNews: boolean; // false
  order: Record<string, any>[]; // [{…}]
  paretto: string[]; // []
  priority: number; // 3
  productDiscount: boolean; // false
  programs: string[]; // (2) ['web', 'mobile']
  smartSectionId: null | string; // null
  startDate: string; // "2023-03-11T05:43:00.000Z"
  todayDisplayedUsers: null | string; // null
  type: string; // "carousel"
  updatedAt: string; // "2023-12-29T10:32:51.484Z"
  uuid: string; // "8134bb21-338f-41de-b182-ed7601d94c92"
};

export type TBanners = {
  data: TBanner[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TBannerSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string | boolean;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

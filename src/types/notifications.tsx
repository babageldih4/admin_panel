import { TItem } from "./items";

interface orderType {
  name: string;
  type: string;
}

export type itemsType = {
  uuid: string;
  name: string;
  code: string;
  smallImg: string;
};

export type TNotification = {
  uuid: string;
  titleTm: string;
  titleRu: string;
  bodyTm: string;
  bodyRu: string;
  imageTm: string;
  imageRu?: string;
  publishedTime?: string;
  timeToLive?: number;
  actionType?: string;
  items?: string[];
  divisons?: string[];
  link?: string;
  mainGroups?: string[];
  lastGroup?: string[];
  parreto?: string[];
  brands?: string[];
  productDiscount?: boolean;
  onlyNews?: boolean;
  order?: orderType[];
  createdAt?: string;
  updatedAt?: string;
};

export type TNotifications = {
  data: TNotification[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TNotificationSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string | boolean;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

export interface TNotificationItem {
  uuid: string;
  titleTm: string;
  titleRu: string;
  bodyTm: string;
  bodyRu: string;
  imageTm: string;
  imageRu: string;
  publishedTime?: string;
  timeToLive: number;
  actionType?:
    | {
        value: string;
        label: string;
      }
    | string;
  //   items: string[];
  items: TItem[];
  divisons?: string[];
  link?: string;
  mainGroups?: string[];
  lastGroups?: string[];
  parreto?: string[];
  brands?: string[];
  productDiscount?: boolean;
  onlyNews?: boolean;
  divisions?: string[];
  order?: orderType[];
  createdAt?: string;
  updatedAt?: string;
}

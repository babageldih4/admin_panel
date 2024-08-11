export type userType = {
  uuid: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

export type clientType = {
  uuid: string;
  code: string;
  name: string;
};

export type currencyType = {
  code: string;
  name: string;
};

export type employeeType = {
  uuid: string;
  firstName: string;
  lastName: string;
  image: null | string;
  userName: string;
};

export type orderContactType = {
  uuid: string;
  name: string;
  phoneNumber: string;
  address: string;
};

export type divisionType = {
  uuid: string;
  code: string;
  nameTm: string;
  nr: 0;
};

export type TOrder = {
  uuid?: string;
  code?: string;
  status: string;
  clientNote?: string;
  employeeNote?: string;
  deliveryType: string;
  paymentType?: string;
  createdAt: string;
  passedTime: number;
  remainedTime: number;
  program: string | string[];
  language?: string | string[];
  user: userType;
  division?: divisionType;
  assignedEmployee?: employeeType;
  operatingEmployee?: employeeType;
  deliveryEmployee?: employeeType;
  pickerEmployee?: employeeType;
  client: clientType;
  address?: string;
  clientCurrency?: currencyType;
  clientDisplayCurrency?: currencyType;
};

export type TOrders = {
  data: TOrder[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TOrdersSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string;
  divisonUuids?: string[];
  model?: string;
  status?: string[];
  // keyword?: string;
};

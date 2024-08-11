interface Employee {
  firstName: string;
  lastName: string;
  userName: string;
}

interface Currency {
  id: number;
  code: string;
  name: string;
}

export type employeeType = {
  uuid: string;
  firstName: string;
  lastName: string;
  image: null | string;
  userName: string;
};

export type TPromocode = {
  status: boolean;
  uuid: string;
  nameTm: string;
  nameRu: string;
  startDate: string;
  endDate: string;
  allUsersHaveAccess: boolean;
  active: boolean;
  erpSyncCode: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null | string;
  createdEmployee: employeeType;
  modifiedEmployee: employeeType;
};
export type TPromocodes = {
  data: TPromocode[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TPromocodesItem = {
  uuid?: string;
  nameTm: string;
  nameRu: string;
  startDate?: string;
  endDate?: string;
  active?: boolean;
  status?: boolean;
  countOfUsage?: number;
  allUsersHaveAccess: boolean;
  divisions: { uuid: string; nameTm: string }[];
  erpSyncCode: string;
  createdEmployee?: { uuid: string; firstName: string; lastName: string };
  modifiedEmployee?: { uuid: string; firstName: string; lastName: string };
  createdAt?: string;
  updatedAt?: string;
};

export type TPromocodesSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string | boolean;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

export type TCodesItemSendInfo = {
  code?: string;
  percentage?: string;
  amount?: number;
  currencyId: number;
  active: boolean;
  unlimited: boolean;
  limit?: number;
  addOnlyClientDiscount: boolean;
  uuid?: string;
  id?: string;
  type?: string;
  codes?: string;
  currency?: { id: number; code: string; name: string };
};

export interface TCode {
  active: boolean;
  addOnlyClientDiscount: boolean;
  amount: number;
  code: string;
  createdAt: string;
  createdEmployee: Employee;
  createdEmployeeId: number;
  currency: Currency;
  currencyId: number;
  deletedAt: string | null;
  id: number;
  limit: number;
  modifiedEmployee: Employee | null;
  modifiedEmployeeId: number | null;
  percentage: number;
  promocodeMasterId: number;
  type: string;
  unlimited: boolean;
  updatedAt: string;
  usedCount: number;
  uuid: string;
}

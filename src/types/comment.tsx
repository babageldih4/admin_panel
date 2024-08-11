export type TComment = {
  uuid: string;
  userId: number;
  clientId: number;
  email: string;
  phoneNumber: string;
  name: "string";
  message: "string";
  type: "string";
  result: "string";
  employeeId: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TComments = {
  data: TComment[];
  count?: number;
  noData?: boolean;
  isLoading?: boolean;
  isError?: boolean;
  isEnd?: boolean;
};

export type TCommentsSendInfo = {
  limit: number;
  offset?: number;
  search?: string;
  active?: string;
  divisonUuids?: string[];
  model?: string;
  status?: string;
  // keyword?: string;
};

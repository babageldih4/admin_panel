// import { TCompany } from "./company";
// import { TJob } from "./job";

// export type TInfiniteLoadSendInfo = {
//   offset?: number | string;
//   limit?: number | string;
//   keyword?: string;
// };

// export type TItemInfo = {
//   uuid?: string;
//   name?: any;
// };

// export type TStateInfo<T, S> = {
//   data: T;
//   setData: (data: T) => void;
//   sendInfo: S;
//   sendInfoName: string;
//   setSendInfo: (sendInfo: S) => void;
//   fetchData: (info: S) => void;
//   searchPlaceholder: string;
//   header: string;
// };

// export type TOption = {
//   value: string | number | null;
//   label: string | number;
//   key: string | number;
//   job?: TJob;
//   avatar?: string;
//   quantity?: number;
//   images?: string[];
//   logo?: string;
//   isEnd?: boolean;
//   company?: TCompany;
//   employeeCount?: string;
//   memberCount?: string;
//   isBlocked?: boolean;
// };
// export type TOptions = {
//   data: TOption[];
//   isEnd?: boolean;
//   isLoading?: boolean;
// };

export type TFile = {
  name?: string;
  destination?: string;
  size?: number;
  status?: string;
};

type TButton = {
  display: boolean;
  title?: string;
  function?: () => void;
};
export type TButtonObjProps = {
  transfer?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  transferResponsibility?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  views?: boolean;
  tableTypeOptions?: boolean;
  access: string;
  add?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };

  save?: TButton & {
    showIcon?: boolean;
  };
  download?: TButton;
  merge?: TButton;
  deleteButton?: TButton;
  print?: TButton;
  commentButton?: TButton;
  commentAllButton?: TButton;
  submitButton?: TButton;
  readButton?: TButton;
  unreadButton?: TButton;
  acceptButton?: TButton;
  calculate?: TButton & { loading: boolean };
  contactButton?: TButton;
  search?: boolean;
  header?: string;
  withoutAccessCreate?: boolean;
};

// export type TPrinter = {
//   value?: string;
//   label?: string;
//   socketId?: string;
//   name?: string;
//   printers?: { value: string; label: string }[];
// };
// export type TPrinters = {
//   data: TPrinter[];
//   isLoading?: boolean;
//   isError?: boolean;
//   isEnd?: boolean;
// };

// export type TItem<T> = {
//   data: T;
//   isLoading?: boolean;
//   isError?: boolean;
// };

export type TOption = {
  active: boolean;
  code: number | string;
  createdAt: string;
  image: string | null;
  keywords: string[];
  name?: string;
  nameTm?: string;
  nameEn?: string;
  nameTr?: string;
  nameRu?: string;
  namePluralEng: string;
  namePluralRu: string;
  namePluralTm: string;
  namePluralTr: string;
  nameSingularEng: string;
  nameSingularRu: string;
  nameSingularTm: string;
  nameSingularTr: string;
  priority: number;
  updatedAt: string;
  uuid: string;
};

export type TOptions = {
  data: TOption[];
  isEnd?: boolean;
  isLoading?: boolean;
};

export type TButtonLoading = {
  save?: boolean;
  transferResponsibility?: boolean;
  delete?: boolean;
  download?: boolean;
  submit?: boolean;
  readNotification?: boolean;
  unreadNotification?: boolean;
  reassignTask?: boolean;
  makeTaskDone?: boolean;
  rejectTask?: boolean;
  reevaluateTask?: boolean;
  ok?: boolean;
  ficheItemDelete?: boolean;
  submitReview?: boolean;
  submitControlReview?: boolean;
  submitControlReviewHistory?: boolean;
  rejectFicheRequest?: boolean;
  acceptFicheRequest?: boolean;
  accept?: boolean;
  merge?: boolean;
  profileDelete?: boolean;
  employeeTransferAdd?: boolean;
  saveWage?: boolean;
  saveType?: boolean;
};

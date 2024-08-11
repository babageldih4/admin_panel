export type FetchParams = {
  [key: string]: any;
  limit: number;
};

export type Callback<T> = (data: T) => T;

export type UseAxiosInfiniteFetchResult<T> = {
  data: T[];
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  isEnd: boolean;
  loadMore: () => void;
  refreshData: () => void;
};

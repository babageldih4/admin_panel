import api from "../plugins/axios";
import useSWRInfinite from "swr/infinite";
import { emptyRemover, isObject } from "../functions";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setRevalidateAll } from "../store/general/generalSlice";

const useSwrInfiniteFetch = (
  url: string,
  params: any,
  cb?: any,
  dataKey = "data"
) => {
  const { revalidateAll } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const fetcher = async (url: any) => {
    const sendInfo = { ...url[1] };
    const response = await api.get(url[0], { params: sendInfo });
    // console.log("response?.data: " + JSON.stringify(response?.data));

    let revalidateCopy = JSON.parse(
      JSON.stringify(JSON.parse(localStorage.getItem("revalidateAll") ?? "[]"))
    );
    revalidateCopy = revalidateCopy?.filter((rev: string) => rev !== url[0]);
    dispatch(setRevalidateAll(revalidateCopy));
    localStorage.setItem("revalidateAll", JSON.stringify(revalidateCopy));

    return response.data;
  };

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.length) return null; // Reached the end

    let paramsCopy = { ...params };
    paramsCopy = emptyRemover(paramsCopy);
    Object.keys(paramsCopy).forEach((key) => {
      if (Array.isArray(paramsCopy[key])) {
        paramsCopy[key] = paramsCopy[key].map((info: any) => isObject(info));
      } else if (
        typeof paramsCopy[key] === "object" &&
        paramsCopy[key] !== null &&
        !Array.isArray(paramsCopy[key])
      ) {
        paramsCopy[key] = isObject(paramsCopy[key]);
      }
    });
    return [url, { ...paramsCopy, offset: pageIndex * paramsCopy?.limit }];
  };

  const includeWord = (word: string) => {
    return (
      url?.includes(word) &&
      revalidateAll?.filter((rea) => rea?.includes(word))?.length > 0
    );
  };

  const { data, error, size, setSize, mutate } = useSWRInfinite(
    getKey,
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateAll:
        revalidateAll?.includes(url) || includeWord("notification"),
    }
  );

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData || (data && typeof data[size - 1] === "undefined");

  const isError = !!error;
  const isEnd = data ? data?.[data?.length - 1]?.length < params.limit : false;

  const loadMore = () => {
    if (!isEnd && !isLoadingMore) {
      setSize(size + 1);
    }
  };

  const refreshData = () => {
    mutate();
  };

  let returnData = data ? [].concat(...data) : [];
  if (cb) {
    returnData = cb(returnData);
  }

  return {
    data: returnData,
    isLoading: isLoadingInitialData,
    isLoadingMore,
    isError,
    isEnd,
    loadMore,
    refreshData,
    mutate,
  };
};

export default useSwrInfiniteFetch;

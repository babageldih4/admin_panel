import { TItem } from "../types/items";

export const useItemsHook = () => {
  const getItems = (dataParams: TItem[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };

  return {
    getItems,
  };
};

import { TComment } from "../types/comment";

export const useCommentsHook = () => {
  const getComments = (dataParams: TComment[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };
  return {
    getComments,
  };
};

import { TOrder } from "../types/orders";

export const useOrdersHook = () => {
  const getOrders = (dataParams: TOrder[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };
  // const getOrders = async () => {
  //   try {
  //     dispatch(setIsLoading(true));
  //     const res = await api.get("/orders");
  //     dispatch(setOrdersData(res?.data));
  //     console.log("orders: ", res?.data);
  //   } catch (err) {
  //     console.log("err: ", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return {
    getOrders,
  };
};

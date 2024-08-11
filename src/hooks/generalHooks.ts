import api from "../plugins/axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setBrandsOptions,
  setDiscountOptions,
  setDivisionOptions,
  setMainGroupsOptions,
  setRevalidateAll,
} from "../store/general/generalSlice";
import { SelectProps } from "antd";

export const useGeneralHook = () => {
  const dispatch = useAppDispatch();
  const { revalidateAll, divisionOptions, mainGroupsOptions, brandsOptions } =
    useAppSelector((state) => state.general);
  const getMainGroupsOptions = async () => {
    try {
      const res = await api.get("/mainGroups");
      dispatch(setMainGroupsOptions({ data: res?.data }));
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const getDivisionOptions = async () => {
    try {
      const res = await api.get("/divisions");
      dispatch(setDivisionOptions({ data: res?.data }));
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getBrandOptions = async () => {
    try {
      const res = await api.get("/brands");
      dispatch(setBrandsOptions({ data: res?.data }));
      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const getDiscountOptions = async () => {
    // /discountExpenceCards/discounts
    try {
      const res = await api.get("/discountExpenceCards/discounts");
      dispatch(setDiscountOptions({ data: res?.data }));
      return res?.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getEmployeeOptions = async () => {
    try {
      const res = await api.get("/employees");
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getUserOptions = async () => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getCityOptions = async () => {
    try {
      const res = await api.get("/cities");
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getFirmOptions = async () => {
    try {
      const res = await api.get("/firms");
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const getWarehouseOptions = async () => {
    try {
      const res = await api.get("/warehouses");
      return res.data;
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const revalidateHandler = (revalidateValues: string[]) => {
    let revalidateCopy = JSON.parse(JSON.stringify(revalidateAll));
    revalidateCopy = revalidateCopy.concat(revalidateValues);
    dispatch(setRevalidateAll(revalidateCopy));
    localStorage.setItem("revalidateAll", JSON.stringify(revalidateCopy));
  };

  const divisionOptionss: SelectProps["options"] = divisionOptions?.data?.map(
    (option) => {
      return { value: option.uuid, label: option.nameTm };
    }
  );

  const mainGroupsOptionss: SelectProps["options"] =
    mainGroupsOptions?.data?.map((option) => {
      return {
        value: option.uuid,
        label: option.name,
      };
    });
  const brandsOptionss: SelectProps["options"] = brandsOptions?.data?.map(
    (option: TOption) => {
      return {
        value: option.uuid,
        label: option.name,
      };
    }
  );
  return {
    getDivisionOptions,
    getDiscountOptions,
    getMainGroupsOptions,
    getBrandOptions,
    getEmployeeOptions,
    getUserOptions,
    getCityOptions,
    getFirmOptions,
    getWarehouseOptions,
    revalidateHandler,
    divisionOptionss,
    mainGroupsOptionss,
    brandsOptionss,
  };
};

import api from "../plugins/axios";
import { useAppDispatch } from "../store/hooks";
import { TOrder } from "../types/orders";
import {
  setGeneratePromocodeSlice,
  setPromocodesItem,
} from "../store/promocodes/promocodesSlice";
import { Modal, notification } from "antd";
import { t } from "i18next";
import { TCodesItemSendInfo } from "../types/promocodes";
import { setButtonLoading } from "../store/general/generalSlice";
import { useNavigate } from "react-router-dom";
import { useGeneralHook } from "./generalHooks";
import { errorHandler, handleError } from "../functions";

const { confirm } = Modal;

export const usePromocodesHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { revalidateHandler } = useGeneralHook();

  const getPromocodes = (dataParams: TOrder[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };

  const deletePromocode = (uuid = "", cb: any) => {
    confirm({
      content: "Are you sure you want to delete",
      title: "Delete Promocode",
      async onOk() {
        try {
          dispatch(setButtonLoading({ delete: true }));
          const res = await api.delete(`/promocodes/${uuid}`);
          if (res?.status?.toString()?.startsWith("2")) {
            dispatch(
              setButtonLoading({
                delete: false,
              })
            );
            notification.success({
              message: t("Success"),
              description: t("DeleteCodeSuccess"),
            });
            revalidateHandler([`/promocodes`]);
            cb();
          }
        } catch (err) {
          handleError(err);
          dispatch(
            setButtonLoading({
              delete: false,
            })
          );
        }
      },
    });
  };
  const getPromocode = async (uuid = "") => {
    try {
      const res = await api.get(`/promocodes/${uuid}`);
      dispatch(setPromocodesItem(res?.data));
      // console.log(res?.data);
    } catch (err) {
      console.log("err: ", err);
      notification.error({
        message: "Can't get Promocode",
        description: "Can't get Promocode",
      });
    }
  };
  const addPromocode = async (updateData: any) => {
    try {
      const res = await api.post("/promocodes", updateData);
      if (res?.status?.toString()?.startsWith("2")) {
        notification.success({
          message: t("Success"),
          description: t("AddedSuccessfully"),
        });
        // revalidateHandler(["/responsibilities"]);
        // navigate(-1);
      }
      console.log("res of post: ", res);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const updatePromocode = async (uuid = "", updateData: any) => {
    try {
      const res = await api.put(`/promocodes/${uuid}`, updateData);
      if (res?.status?.toString()?.startsWith("2")) {
        notification.success({
          message: t("Success"),
          description: t("Updated Successfully"),
        });
      }
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const generatePromocode = async () => {
    try {
      const res = await api.get("/promocodes/generate");
      dispatch(setGeneratePromocodeSlice(res?.data));
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const addCodePromocode = async (uuid = "", updateData: any) => {
    try {
      dispatch(setButtonLoading({ ok: true }));
      const res = await api.post(`/promocodes/${uuid}/codes`, updateData);
      if (res?.status?.toString()?.startsWith("2")) {
        dispatch(setButtonLoading({ ok: false }));
        notification.success({
          message: t("Success"),
          description: t("Updated Successfully"),
        });
      }
    } catch (err) {
      handleError(err);
      dispatch(setButtonLoading({ ok: false }));
      console.log("err: ", err);
    }
  };

  const getCodes = (dataParams: TCodesItemSendInfo[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };

  const deleteCode = (uuid = "", codeUuid = "", cb: any) => {
    confirm({
      content: "Are you sure you want to delete",
      title: "Delete Promocode",
      async onOk() {
        try {
          dispatch(setButtonLoading({ delete: true }));
          const res = await api.delete(`/promocodes/${uuid}/codes/${codeUuid}`);
          if (res?.status?.toString()?.startsWith("2")) {
            dispatch(
              setButtonLoading({
                delete: false,
              })
            );
            notification.success({
              message: t("Success"),
              description: t("DeleteCodeSuccess"),
            });
            // navigate(-1);
            // revalidateHandler([`/assets/history/${urlUuid}`, "/fiches"]);
            // promocodes/e6e5a678-24c8-46aa-ae0c-e4bffa8aa87e
            revalidateHandler([`/promocodes/${uuid}`]);
            cb();
          }
        } catch (err) {
          dispatch(
            setButtonLoading({
              delete: false,
            })
          );
        }
      },
    });
  };
  return {
    getPromocodes,
    deletePromocode,
    getPromocode,
    addPromocode,
    addCodePromocode,
    generatePromocode,
    updatePromocode,
    getCodes,
    deleteCode,
  };
};

import api from "../plugins/axios";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsLoading } from "../store/general/generalSlice";
import { setBannerItemData } from "../store/banners/bannersSlice";
import { TBanner } from "../types/banners";
import { Modal, notification } from "antd";
import { useTranslation } from "react-i18next";

const { confirm } = Modal;

export const useBannersHook = () => {
  const dispatch = useAppDispatch();
  const getBanners = (dataParams: TBanner[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };
  const { t } = useTranslation();
  const deleteBanner = (uuid = "", cb: any) => {
    confirm({
      content: "Are you sure you want to delete",
      title: "Delete Banner",
      async onOk() {
        try {
          const res = await api.delete(`/banners/${uuid}`);
          cb();
          console.log(res);
        } catch (err) {
          console.log("err: ", err);
        }
      },
    });
  };

  const getBanner = async (uuid: string) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/banners/${uuid}`);
      dispatch(setBannerItemData(res?.data));
      console.log(res?.data);
    } catch (err) {
      console.log("err: ", err);
      notification.error({
        message: "Error fetching notification",
        description: "Error fetching notification",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const addBanner = async (formData: any) => {
    try {
      const res = await api.post("/banners", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status?.toString()?.startsWith("2")) {
        notification.success({
          message: t("Success"),
          description: t("AddedSuccessfully"),
        });
        // revalidateHandler(["/responsibilities"]);
        // navigate(-1);
      }
      console.log("res: ", res);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  return {
    getBanners,
    deleteBanner,
    getBanner,
    addBanner,
  };
};

import api from "../plugins/axios";
import { Modal } from "antd";
import { useAppDispatch } from "../store/hooks";
import { setSmartSectionsItemData } from "../store/smartSections/smartSectionsSlice";
import { setIsLoading } from "../store/general/generalSlice";
import { TSmartSections } from "../types/smartSections";
const { confirm } = Modal;

export const useSmartSectionsHook = () => {
  const dispatch = useAppDispatch();
  const getSmartSections = (dataParams: TSmartSections[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };
  // const getSmartSections = async () => {
  //   try {
  //     dispatch(setIsLoading(true));
  //     const res = await api.get("/admin/v1/smartSections");
  //     dispatch(setSmartSectionsData(res?.data));
  //     console.log(res?.data);
  //   } catch (err) {
  //     console.log("err: ", err);
  //   } finally {
  //     dispatch(setIsLoading(false));
  //   }
  // };
  const getSmartSectionsItem = async (uuid: string) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/smartSections/${uuid}`);
      console.log(res?.data);
      dispatch(setSmartSectionsItemData(res?.data));
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setIsLoading(false);
    }
  };
  const deleteSmartSectionItem = (uuid = "", cb: any) => {
    // const deleteNotification = uuid;
    console.log("uuid: ", uuid);
    confirm({
      content: "Are you sure you want to delete",
      title: "Delete Notification",
      async onOk() {
        try {
          const res = await api.delete(`/smartSections/${uuid}`); ///admin/v1/smartSections/{uuid}
          cb();
          console.log(res);
        } catch (err) {
          console.log("err: ", err);
        }
      },
    });
  };

  const updateSmartSectionItem = async (uuid: string, formData: any) => {
    try {
      const res = await api.put(`/smartSections/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (err) {
      console.log("err: ", err);
    }
  };
  const createSmartSectionItem = async (formData: any) => {
    try {
      const response = await api.post<any>("/smartSections", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response?.data;
    } catch (error) {
      console.error("Failed to create smart section item", error);
      throw error;
    }
  };

  return {
    getSmartSections,
    getSmartSectionsItem,
    deleteSmartSectionItem,
    updateSmartSectionItem,
    createSmartSectionItem,
  };
};

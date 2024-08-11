import { Modal, App } from "antd";
import api from "../plugins/axios";
import { useAppDispatch } from "../store/hooks";
import { setNotificationItemData } from "../store/notifications/notificationSlice";
import { setButtonLoading, setIsLoading } from "../store/general/generalSlice";
import { TNotification } from "../types/notifications";
import { useTranslation } from "react-i18next";
const { confirm } = Modal;

export const useNotificationsHook = () => {
  const { notification } = App.useApp();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  // const { notificationsData, notificationSendInfo } = useAppSelector(
  //   (state) => state.notifications
  // );
  // const { loading } = useAppSelector((state) => state.general);
  const getNotifications = (dataParams: TNotification[]) => {
    const fetchedData = JSON.parse(JSON.stringify([...dataParams]));
    return fetchedData;
  };
  const getNotification = async (uuid: string) => {
    try {
      setIsLoading(true);
      const res = await api.get(`/userNotifications/${uuid}`);
      dispatch(setNotificationItemData(res?.data));
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
  const deleteNotification = (uuid = "", cb: any) => {
    confirm({
      content: "Are you sure you want to delete",
      title: "Delete Notification",
      async onOk() {
        dispatch(
          setButtonLoading({
            delete: true,
          })
        );
        try {
          const res = await api.delete(`/userNotifications/${uuid}`);
          if (res?.status?.toString()?.startsWith("2")) {
            dispatch(
              setButtonLoading({
                delete: false,
              })
            );
            cb();
            notification.success({
              message: "Success",
              description: "DeleteNotificationSuccess",
            });
            // notification.success({
            //   message: t("Success"),
            //   description: "DeleteNotificationSuccess",
            // });
          }
        } catch (err) {
          console.log("err: ", err);
        }
      },
    });
  };
  const publishNotification = (uuid = "") => {
    console.log("uuid in publish", uuid);
    confirm({
      content:
        "Siz hakykatdan hem habarnamany ugratmak isleýärsiňizmi? Eger-de içinde üýtgeşmeler girizen bolsaňyz ilki bilen ýatda sakladyp soň ugratmagyňyzy maslahat berýäris, ýogsam üýtgeşmelerden öňki ýagdaýy ugradylar",
      title: "Warning",
      async onOk() {
        try {
          const res = await api.post(`/userNotifications/${uuid}/publish`);
          if (res?.status === 200) {
            getNotification(uuid);
          }
          console.log(res);
        } catch (err) {
          console.log("err: ", err);
        }
      },
    });
  };

  const addNotification = async (formData: any) => {
    try {
      const res = await api.post("/userNotifications", formData, {
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
  const updateNotification = async (uuid = "", formData: any) => {
    try {
      const res = await api.put(`/userNotifications/${uuid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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

  return {
    getNotifications,
    getNotification,
    updateNotification,
    deleteNotification,
    addNotification,
    publishNotification,
  };
};

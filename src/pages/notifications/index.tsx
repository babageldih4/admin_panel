import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import defaultImage from "../../assets/images/default.png";
import brokenImage from "../../assets/images/brokenImage.png";
import {
  setBreadcrumbs,
  setSearchValue,
} from "../../store/general/generalSlice";
import { Space, Spin, Tag } from "antd";
import TableComponent from "../../components/tableComponent/TableComponent";
import { type ColumnsType } from "antd/lib/table";
import { useNotificationsHook } from "../../hooks/notificaton";
import { DeleteOutlined } from "@ant-design/icons";
import { TNotification } from "../../types/notifications";
import useSwrInfiniteFetch from "../../hooks/useSwrInfiniteFetch"; // Adjust the import path if necessary
import { cookieGetter } from "../../functions";
import { setNotificationSendInfo } from "../../store/notifications/notificationSlice";
import PlusCircleOutlinedButton from "../../components/PlusButton";
import { useGeneralHook } from "../../hooks/generalHooks";

const NotificationsComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { deleteNotification, getNotifications } = useNotificationsHook();
  const { getDivisionOptions } = useGeneralHook();
  const { notificationSendInfo } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(
      setBreadcrumbs([{ title: "Notifications", path: "/notifications" }])
    );
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, []);

  let tempSendInfo = {
    limit: 20,
  };

  const parseValue = cookieGetter("notificationSendInfo");
  const cookieValue = parseValue ? JSON.parse(parseValue) : null;

  if (cookieValue) {
    tempSendInfo = cookieValue;
  }

  useEffect(() => {
    if (cookieValue) {
      dispatch(setSearchValue(cookieValue?.search));
    } else {
      dispatch(setSearchValue(""));
    }
    dispatch(setNotificationSendInfo(tempSendInfo));
  }, []);

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/userNotifications",
      {
        ...notificationSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TNotification[]) => getNotifications(fetchedData),
      "notifications"
    );

  const handleDelete = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    deleteNotification(uuid, refreshData);
  };

  useEffect(() => {
    refreshData();
  }, []);
  useEffect(() => {
    getDivisionOptions();
  }, []);

  const handleFetchMore = () => {
    loadMore();
  };

  const columns: ColumnsType<TNotification> = [
    {
      title: "Suraty",
      dataIndex: "imageTm",

      render: (image) =>
        image ? (
          <img
            src={`${
              import.meta.env.VITE_BACKEND_PORT
            }/api/images/notifications/${image}`}
            alt="notification"
            style={{ width: "80px", height: "80px" }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = brokenImage;
            }}
          />
        ) : (
          <img
            src={defaultImage}
            style={{
              width: "70px",
              height: "70px",
            }}
            alt="doorhandle"
          />
        ),
    },
    {
      title: "Turkmence ady",
      dataIndex: "titleTm",
    },
    {
      title: "Rusca ady",
      dataIndex: "titleRu",
    },
    {
      title: "Turkmençe tekst",
      dataIndex: "bodyTm",
    },
    {
      title: "Rusça tekst",
      dataIndex: "bodyRu",
    },
    {
      title: "Güýjini ýetirmegine galan wagt",
      dataIndex: "publishedTime",
      render: (publishedTime) =>
        typeof publishedTime === "string" ? (
          <Tag style={{ fontSize: "15px" }} color="success">
            Çap edildi
          </Tag>
        ) : (
          <Tag style={{ fontSize: "15px" }} color="warning">
            Çap edilmedik
          </Tag>
        ),
    },
    {
      title: "Görnüşi",
      dataIndex: "actionType",
      render: (actionType) =>
        actionType === "items"
          ? "Harytlar"
          : actionType === "news"
          ? "Habar"
          : "Beýlekiler",
    },
    {
      title: "Hereketler",
      dataIndex: "actions",
      fixed: "right",
      width: 100,
      render: (_: unknown, notification: TNotification) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",

            // width: "10px",
          }}
        >
          <DeleteOutlined
            onClick={(e) => handleDelete(notification.uuid, e)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </Space>
      ),
    },
  ];
  const items = [...data];
  return (
    <div>
      {isLoading && (
        <Spin
          size="large"
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        />
      )}
      <TableComponent<TNotification>
        handleFetchMore={handleFetchMore}
        columns={columns}
        data={{ items, isEnd, isError, isLoading }}
      />
      <PlusCircleOutlinedButton navigation="/notifications/add" />
    </div>
  );
};

export default NotificationsComponent;

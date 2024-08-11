import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { TabsProps, Typography } from "antd";
import Information from "./Information";
import Russian from "./Russian";
import Turkmen from "./Turkmen";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNotificationsHook } from "../../../hooks/notificaton";
import { Button, Space, UploadFile } from "antd/lib";
import { useLocation } from "react-router-dom";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
const { Title } = Typography;
const NotificationItem: FC = () => {
  const [imageTm, setImageTm] = useState<File | null>(null);
  const [imageRu, setImageRu] = useState<File | null>(null);
  const [fileListTm, setFileListTm] = useState<UploadFile[]>([]);
  const [fileListRu, setFileListRu] = useState<UploadFile[]>([]);
  const [activeTab, setActiveTab] = useState<string>("information");

  const { getNotification, publishNotification } = useNotificationsHook();
  const { notificationItemData, notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const dispatch = useAppDispatch();
  const uuid = useLocation().pathname.split("/")[2];
  const { updateNotification } = useNotificationsHook();
  useEffect(() => {
    getNotification(uuid);
  }, []);

  useEffect(() => {
    dispatch(setNotificationItemSendInfo({}));
  }, [notificationItemData]);
  useEffect(() => {
    dispatch(setNotificationItemSendInfo({ ...notificationItemData }));
  }, [notificationItemData]);

  const items: TabsProps["items"] = [
    {
      key: "information",
      label: "Information",
      children: <Information />,
    },
    {
      key: "turkmen",
      label: "Turkmen",
      children: (
        <Turkmen
          handleImageSelect={(file) => setImageTm(file)}
          fileListTm={fileListTm}
          setFileListTm={setFileListTm}
        />
      ),
    },
    {
      key: "russian",
      label: "Russian",
      children: (
        <Russian
          handleImageSelect={(file) => setImageRu(file)}
          fileListRu={fileListRu}
          setFileListRu={setFileListRu}
        />
      ),
    },
  ];
  const handlePublish = (uuid: string) => {
    publishNotification(uuid);
  };

  const handleUpdate = (uuid: string) => {
    const updateNotificationData = notificationItemSendInfo;
    updateNotification(uuid, updateNotificationData);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "15px",
        }}
      >
        <Title>
          {notificationItemSendInfo.titleTm || notificationItemSendInfo.titleRu}
        </Title>
        <Space>
          <Button
            onClick={() => handleUpdate(uuid)}
            type="text"
            style={{ color: "orange" }}
          >
            KAYDET
          </Button>
          <Button
            onClick={() => handlePublish(uuid)}
            type="text"
            style={{ color: "orange" }}
            // disabled
            disabled={!notificationItemData?.publishedTime}
          >
            TÄZEDEN UGRAT
          </Button>
        </Space>
      </div>
      <StyledTabs
        defaultActiveKey="information"
        items={items}
        onChange={(e) => {
          setActiveTab(e);
        }}
        activeKey={activeTab}
        style={{ height: "100%" }}
        destroyInactiveTabPane={true}
      />
    </>
  );
};

export default NotificationItem;

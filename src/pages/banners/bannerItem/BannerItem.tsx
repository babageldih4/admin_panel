import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { Badge, TabsProps, UploadFile, Button, Space, Typography } from "antd";
import Information from "./Information";
import Russian from "./Russian";
import Turkmen from "./Turkmen";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setBannerItemSendInfo } from "../../../store/banners/bannersSlice";
import { useNavigate } from "react-router-dom";
import { setHasEmtpy } from "../../../store/general/generalSlice";
import { useBannersHook } from "../../../hooks/banners";
import { useLocation } from "react-router-dom";
import { mergeObjectsData } from "../../../functions";
const { Title } = Typography;

const BannerItem: FC = () => {
  const [imageTm, setImageTm] = useState<File | null>(null);
  const [imageRu, setImageRu] = useState<File | null>(null);
  const [imageTelRu, setImageTelRu] = useState<File | null>(null);
  const [imageTelTm, setImageTelTm] = useState<File | null>(null);
  const [fileListTm, setFileListTm] = useState<UploadFile[]>([]);
  const [fileListRu, setFileListRu] = useState<UploadFile[]>([]);
  const [fileListTelRu, setFileListTelRu] = useState<UploadFile[]>([]);
  const [fileListTelTm, setFileListTelTm] = useState<UploadFile[]>([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("myNotificationActiveTab") || "information"
  );

  const { bannerItemData, bannerItemSendInfo } = useAppSelector(
    (state) => state.banners
  );
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const { getBanner, addBanner } = useBannersHook();
  const type = useLocation().pathname.split("/")[2];
  const uuid = useLocation().pathname.split("/")[3];

  useEffect(() => {
    dispatch(setBannerItemSendInfo({}));
  }, [dispatch]);

  useEffect(() => {
    getBanner(uuid);
  }, []);

  useEffect(() => {
    localStorage.setItem("myBannerActiveTab", activeTab!);
  }, [activeTab]);

  useEffect(() => {
    dispatch(setHasEmtpy(false));
  }, [dispatch]);

  const updateBannersData = mergeObjectsData(
    bannerItemData,
    bannerItemSendInfo
  );

  // const handleUpdate = (uuid: string) => {
  //   console.log("notificationItemSendInfo: ", notificationItemSendInfo);
  //   const updateNotificationData = mergeObjectsData(
  //     notificationItemData,
  //     notificationItemSendInfo
  //   );
  //   console.log("updateNotificationData: ", updateNotificationData);
  //   updateNotification(uuid, updateNotificationData);
  // };

  const checkMissingFields = (tabKey: string): boolean => {
    if (tabKey === "information") {
      const { startDate } = updateBannersData;
      return !startDate && hasEmtpy;
    } else if (tabKey === "turkmen") {
      const { nameTm } = updateBannersData;
      return (!nameTm || !imageTm) && hasEmtpy;
    } else if (tabKey === "russian") {
      const { nameRu } = updateBannersData;
      return (!nameRu || !imageRu || !imageTelRu) && hasEmtpy;
    }
    return false;
  };

  const items: TabsProps["items"] = [
    {
      key: "information",
      label: <Badge dot={checkMissingFields("information")}>Information</Badge>,
      children: <Information />,
    },
    {
      key: "turkmen",
      label: <Badge dot={checkMissingFields("turkmen")}>Turkmen</Badge>,
      children: (
        <Turkmen
          handleImageSelectTm={(file) => setImageTm(file)}
          handleImageSelectTelTm={(file) => setImageTelTm(file)}
          fileListTm={fileListTm}
          setFileListTm={setFileListTm}
          fileListTelTm={fileListTelTm}
          setFileListTelTm={setFileListTelTm}
        />
      ),
    },
    {
      key: "russian",
      label: <Badge dot={checkMissingFields("russian")}>Russian</Badge>,
      children: (
        <Russian
          handleImageSelectRu={(file) => setImageRu(file)}
          handleImageSelectTelRu={(file) => setImageTelRu(file)}
          fileListRu={fileListRu}
          setFileListRu={setFileListRu}
          fileListTelRu={fileListTelRu}
          setFileListTelRu={setFileListTelRu}
        />
      ),
    },
  ];

  const startDate = updateBannersData?.startDate
    ? new Date(updateBannersData?.startDate)
    : null;
  const endDate = updateBannersData?.endDate
    ? new Date(updateBannersData?.endDate)
    : null;

  const handleAdd = async () => {
    const formData = new FormData();
    if (imageTm) {
      formData.append("imageTm", imageTm);
    }
    if (imageRu) {
      formData.append("imageRu", imageRu);
    }
    if (imageTelTm) {
      formData.append("imageTelTm", imageTelTm);
    }
    if (imageTelRu) {
      formData.append("imageTelRu", imageTelRu);
    }

    if (startDate) {
      formData.append("startDate", startDate);
    }
    if (endDate) {
      formData.append("endDate", endDate);
    }
    if (updateBannersData?.programs) {
      formData.append("programs", JSON.stringify(updateBannersData?.programs));
    }
    if (updateBannersData?.nameRu && updateBannersData?.nameTm) {
      formData.append("nameRu", updateBannersData?.nameRu);
      formData.append("nameTm", updateBannersData?.nameTm);
      formData.append("actionType", updateBannersData?.actionType);
      formData.append("languages", updateBannersData?.languages);
      formData.append("priority", updateBannersData?.priority);
      formData.append("type", type);
      try {
        await addBanner(formData);
      } catch (err) {
        console.log("Error adding Banner", err);
      }
    } else {
      dispatch(setHasEmtpy(true));
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
        }}
      >
        <Title level={5}>
          {bannerItemData?.nameTm || bannerItemData?.nameRu}
        </Title>
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            onClick={handleAdd}
            type="text"
            style={{
              color: "orange",
            }}
          >
            KAYDET
          </Button>
          <Button
            onClick={() => navigate("/notifications")}
            type="text"
            style={{
              color: "orange",
            }}
          >
            Iptal
          </Button>
        </Space>
      </div>
      <StyledTabs
        defaultActiveKey="information"
        items={items}
        onChange={(e) => setActiveTab(e)}
        activeKey={activeTab ?? "information"}
        style={{ height: "100%" }}
        destroyInactiveTabPane={true}
      />
    </div>
  );
};

export default BannerItem;

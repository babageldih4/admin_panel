import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { Badge, TabsProps } from "antd";
import Information from "./Information";
import Russian from "./Russian";
import Turkmen from "./Turkmen";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Button, Space } from "antd";
import { setBannerItemSendInfo } from "../../../store/banners/bannersSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { setHasEmtpy } from "../../../store/general/generalSlice";
import { useBannersHook } from "../../../hooks/banners";
import { UploadFile } from "antd";

const AddBannersComponent: FC = () => {
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
  const type = useLocation().pathname.split("/")[2];
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("myNotificationActiveTab") || "information"
  );

  const { bannerItemSendInfo } = useAppSelector((state) => state.banners);
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const { addBanner } = useBannersHook();

  useEffect(() => {
    dispatch(setBannerItemSendInfo({}));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("myBannerActiveTab", activeTab!);
  }, [activeTab]);

  useEffect(() => {
    dispatch(setHasEmtpy(false));
  }, [dispatch]);

  const checkMissingFields = (tabKey: string): boolean => {
    if (tabKey === "information") {
      const { startDate } = bannerItemSendInfo;
      return !startDate && hasEmtpy;
    } else if (tabKey === "turkmen") {
      const { nameTm } = bannerItemSendInfo;
      return (!nameTm || !imageTm) && hasEmtpy;
    } else if (tabKey === "russian") {
      const { nameRu } = bannerItemSendInfo;
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

  const startDate = bannerItemSendInfo?.startDate
    ? new Date(bannerItemSendInfo?.startDate)
    : null;
  const endDate = bannerItemSendInfo?.endDate
    ? new Date(bannerItemSendInfo?.endDate)
    : null;
  // const addData = {
  //   startDate: startDate,
  //   endDate: endDate,
  //   ...bannerItemSendInfo,
  // };

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
    if (bannerItemSendInfo?.programs) {
      formData.append("programs", JSON.stringify(bannerItemSendInfo?.programs));
    }
    if (bannerItemSendInfo?.nameRu && bannerItemSendInfo?.nameTm) {
      formData.append("nameRu", bannerItemSendInfo?.nameRu);
      formData.append("nameTm", bannerItemSendInfo?.nameTm);
      formData.append("actionType", bannerItemSendInfo?.actionType);
      formData.append("languages", bannerItemSendInfo?.languages);
      formData.append("priority", bannerItemSendInfo?.priority);
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
          justifyContent: "flex-end",
          marginBottom: "15px",
        }}
      >
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

export default AddBannersComponent;

import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { Badge, TabsProps } from "antd";
import Information from "./Information";
import Russian from "./Russian";
import Turkmen from "./Turkmen";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNotificationsHook } from "../../../hooks/notificaton";
import { Button, Space } from "antd/lib";
import {
  setNotificationEmptyValues,
  setNotificationItemSendInfo,
} from "../../../store/notifications/notificationSlice";
import { useNavigate } from "react-router-dom";
import { setHasEmtpy } from "../../../store/general/generalSlice";
// import ProductsModal from "../../../components/ProductsModal";

const AddNotificationsComponent: FC = () => {
  const [imageTm, setImageTm] = useState<File | null>(null);
  const [imageRu, setImageRu] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("myNotificationActiveTab")
      ? localStorage.getItem("myNotificationActiveTab")
      : "information"
  );
  const { notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const { addNotification } = useNotificationsHook();

  useEffect(() => {
    dispatch(
      setNotificationItemSendInfo({
        uuid: "",
        titleTm: "",
        titleRu: "",
        bodyTm: "",
        bodyRu: "",
        // endDate: "",
        link: "",
        items: [],
        brands: [],
        mainGroups: [],
        lastGroups: [],
        parreto: [],
        timeToLive: 48,
        actionType: "",
        divisions: [],
        imageRu: "",
        imageTm: "",
        onlyNews: false,
        order: [],
        productDiscount: false,
        publishedTime: "",
      })
    );
  }, []);

  useEffect(() => {
    localStorage.setItem("myNotificationActiveTab", activeTab!);
  }, [activeTab]);

  useEffect(() => {
    dispatch(setHasEmtpy(false));
  }, []);
  const checkMissingFields = (tabKey: string): boolean => {
    if (tabKey === "information") {
      const { timeToLive, actionType } = notificationItemSendInfo;
      return (!timeToLive || !actionType) && hasEmtpy;
    } else if (tabKey === "turkmen") {
      const { titleTm, bodyTm } = notificationItemSendInfo;
      return (!titleTm || !bodyTm) && hasEmtpy;
    } else if (tabKey === "russian") {
      const { titleRu, bodyRu } = notificationItemSendInfo;
      return (!titleRu || !bodyRu) && hasEmtpy;
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
      children: <Turkmen handleImageSelect={(file) => setImageTm(file)} />,
    },
    {
      key: "russian",
      label: <Badge dot={checkMissingFields("russian")}>Russian</Badge>,
      children: <Russian handleImageSelect={(file) => setImageRu(file)} />,
    },
  ];
  const handleAdd = async () => {
    console.log("imageTm: ", imageTm);
    const formData = new FormData();
    if (imageRu) {
      formData.append("imageRu", imageRu);
    }
    if (imageTm) {
      formData.append("imageTm", imageTm);
    }
    console.log("formData: ", formData);
    if (
      notificationItemSendInfo?.actionType &&
      notificationItemSendInfo?.bodyRu &&
      notificationItemSendInfo?.bodyTm &&
      notificationItemSendInfo?.titleRu &&
      notificationItemSendInfo?.titleTm &&
      notificationItemSendInfo?.timeToLive
    ) {
      formData.append("actionType", notificationItemSendInfo?.actionType);
      formData.append("bodyTm", notificationItemSendInfo?.bodyTm);
      formData.append("bodyRu", notificationItemSendInfo?.bodyRu);
      formData.append("titleTm", notificationItemSendInfo?.titleTm);
      formData.append("titleRu", notificationItemSendInfo?.titleRu);
      formData.append(
        "timeToLive",
        notificationItemSendInfo?.timeToLive.toString()
      );
      console.log("formData: ", formData);
      if (notificationItemSendInfo?.actionType?.value === "link") {
        if (notificationItemSendInfo?.link !== "") {
          formData.append("link", notificationItemSendInfo?.link);
          try {
            await addNotification(formData);
            console.log("Successfully Added");
          } catch (err) {
            console.log("Error adding notification");
          }
        }
        try {
          await addNotification(formData);
          console.log("Successfully Added");
        } catch (err) {
          console.log("Error adding notification");
        }
      } else if (notificationItemSendInfo?.actionType?.value === "items") {
        if (notificationItemSendInfo?.items.length > 0) {
          formData.append(
            "items",
            JSON.stringify(notificationItemSendInfo?.items)
          );
          try {
            await addNotification(formData);
            console.log("Successfully Added");
          } catch (err) {
            console.log("Error adding notification");
          }
        } else {
          dispatch(setHasEmtpy(true));
        }
      } else {
        try {
          await addNotification(formData);
          console.log("Successfully Added");
        } catch (err) {
          console.log("Error adding notification");
        }
      }
    } else {
      dispatch(setHasEmtpy(true));
    }
  };

  return (
    <>
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
            // onSubmit={() => handleSubmit()}
            onClick={() => handleAdd()}
            type="text"
            style={{
              color: "orange",
            }}
          >
            KAYDET
          </Button>
          <Button
            // onSubmit={() => handleSubmit()}
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
      {/* <Badge> */}
      <StyledTabs
        defaultActiveKey="information"
        items={items}
        onChange={(e) => {
          setActiveTab(e);
        }}
        activeKey={activeTab ?? "information"}
        style={{ height: "100%" }}
        destroyInactiveTabPane={true}
      />
      {/*     <ProductsModal /> */}
    </>
  );
};

export default AddNotificationsComponent;

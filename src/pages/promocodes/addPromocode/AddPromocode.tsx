import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { TabsProps } from "antd";
import Information from "./Information";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Button, Space } from "antd/lib";
import { useNavigate } from "react-router-dom";
import Codes from "./Codes";
import { usePromocodesHook } from "../../../hooks/promocodes";
import { setPromocodesItemSendInfo } from "../../../store/promocodes/promocodesSlice";
const AddPromocode: FC = () => {
  const { promocodeItemSendInfo } = useAppSelector((state) => state.promocodes);
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("promocodesActiveTab")
      ? localStorage.getItem("promocodesActiveTab")
      : "information"
  );
  const { addPromocode } = usePromocodesHook();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const items: TabsProps["items"] = [
    {
      key: "information",
      label: "Information",
      children: <Information />,
    },

    {
      key: "Kodlar",
      label: "Kodlar",
      children: <Codes />,
    },
  ];
  useEffect(() => {
    localStorage.setItem("promocodesActiveTab", activeTab!);
  }, [activeTab]);
  const handleIptal = () => {
    navigate("/promocodes");
  };
  useEffect(() => {
    dispatch(setPromocodesItemSendInfo({}));
  }, []);

  const handleAdd = async () => {
    console.log("promocodeItemSendInfo: ", promocodeItemSendInfo);
    const startDate = promocodeItemSendInfo?.startDate
      ? new Date(promocodeItemSendInfo?.startDate)
      : null;
    const endDate = promocodeItemSendInfo?.endDate
      ? new Date(promocodeItemSendInfo?.endDate)
      : null;
    const addData = {
      startDate: startDate,
      endDate: endDate,
      ...promocodeItemSendInfo,
    };
    await addPromocode(addData);
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
        <Space>
          <Button
            onClick={() => handleAdd()}
            type="text"
            style={{ color: "orange" }}
          >
            KAYDET
          </Button>
          <Button
            onClick={() => handleIptal()}
            type="text"
            style={{ color: "orange" }}
          >
            Iptal
          </Button>
        </Space>
      </div>
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
    </>
  );
};

export default AddPromocode;

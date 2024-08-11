import { type FC, useState, useEffect } from "react";
import StyledTabs from "../../../components/StyledTabs";
import { TabsProps, Typography } from "antd";
import Information from "./Information";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { usePromocodesHook } from "../../../hooks/promocodes";
import { Button, Space } from "antd/lib";
import { useLocation, useNavigate } from "react-router-dom";
// import Codes from "./CodesModal";
import Codes from "./Codes";
import { setPromocodesItemSendInfo } from "../../../store/promocodes/promocodesSlice";
const { Title } = Typography;
const PromocodesItem: FC = () => {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("promocodesActiveTab")
      ? localStorage.getItem("promocodesActiveTab")
      : "information"
  );
  const { getPromocode, updatePromocode } = usePromocodesHook();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { promocodeItem, promocodeItemSendInfo } = useAppSelector(
    (state) => state.promocodes
  );
  const uuid = useLocation().pathname.split("/")[2];
  useEffect(() => {
    getPromocode(uuid);
  }, []);

  useEffect(() => {
    dispatch(setPromocodesItemSendInfo({}));
  }, []);
  useEffect(() => {
    dispatch(setPromocodesItemSendInfo({ ...promocodeItem }));
  }, []);
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
      // disabled: promocodeItem?.codes?.length === 0,
    },
  ];
  useEffect(() => {
    localStorage.setItem("promocodesActiveTab", activeTab!);
  }, [activeTab]);
  const handleIptal = () => {
    navigate("/promocodes");
  };

  const handleUpdate = (uuid: string) => {
    const startDate = promocodeItemSendInfo?.startDate
      ? new Date(promocodeItemSendInfo?.startDate)
      : null;
    const endDate = promocodeItemSendInfo?.endDate
      ? new Date(promocodeItemSendInfo?.endDate)
      : null;
    const updatePromocodeData1 = {
      startDate,
      endDate,
      ...promocodeItemSendInfo,
    };
    // console.log("updatePromocodeData1", updatePromocodeData1);
    updatePromocode(uuid, updatePromocodeData1);
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
        <Title>{promocodeItem?.nameTm || promocodeItem?.nameRu}</Title>
        <Space>
          <Button
            onClick={() => handleUpdate(uuid)}
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

export default PromocodesItem;

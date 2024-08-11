import { type FC, useState, ChangeEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  Modal,
  Row,
  Col,
  Space,
  Checkbox,
  Typography,
  Select,
  Input,
  Button,
} from "antd";
import styles from "../../../styles/smartSection.module.scss";
import { AiOutlineSlack } from "react-icons/ai";
import { RiCheckboxMultipleBlankLine, RiCoupon3Line } from "react-icons/ri";
import { TbCirclePercentage, TbNumbers } from "react-icons/tb";
import { BsExclamationCircle, BsPercent } from "react-icons/bs";
import { usePromocodesHook } from "../../../hooks/promocodes";
import {
  setCodesItemSendInfo,
  setIsCodeModalOpen,
} from "../../../store/promocodes/promocodesSlice";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useLocation, useNavigate } from "react-router-dom";
import { setHasEmtpy } from "../../../store/general/generalSlice";
import { handleRequired } from "../../../functions";

const { Text } = Typography;
const { TextArea } = Input;

interface CodesModalProps {
  refreshData: () => void;
}

const CodesModal: FC<CodesModalProps> = ({ refreshData }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [filterValue, setFilterValue] = useState<string>("birli");
  const { hasEmtpy, buttonLoading } = useAppSelector((state) => state.general);
  const { generatePromocodeSlice, codesItemSendInfo, isCodeModalOpen } =
    useAppSelector((state) => state.promocodes);
  const { generatePromocode, addCodePromocode } = usePromocodesHook();
  const uuid = useLocation().pathname.split("/")[2];
  const { ok } = buttonLoading;
  useEffect(() => {
    dispatch(
      setCodesItemSendInfo({
        currencyId: 158,
        active: true,
        unlimited: false,
        addOnlyClientDiscount: false,
      })
    );
  }, []);

  const handleGeneratePromocode = () => {
    generatePromocode();
    const newCode = generatePromocodeSlice?.code;
    dispatch(
      setCodesItemSendInfo({
        ...codesItemSendInfo,
        code: newCode,
      })
    );
  };

  const handleSelectChange = (value: string[], key: string) => {
    dispatch(
      setCodesItemSendInfo({
        ...codesItemSendInfo,
        [key]: value,
      })
    );
  };

  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | number,
    key: string
  ) => {
    const value = typeof e === "number" ? e : e.target.value;
    dispatch(
      setCodesItemSendInfo({
        ...codesItemSendInfo,
        [key]: value,
      })
    );
  };
  const handleCheckbox = (e: CheckboxChangeEvent, key: string) => {
    const { checked } = e.target;
    dispatch(
      setCodesItemSendInfo({
        ...codesItemSendInfo,
        [key]: checked,
      })
    );
  };

  const handleOk = async () => {
    if (codesItemSendInfo?.code) {
      if (codesItemSendInfo?.type === "amount") {
        if (codesItemSendInfo?.amount) {
          if (codesItemSendInfo?.unlimited) {
            await addCodePromocode(uuid, codesItemSendInfo);
            dispatch(setIsCodeModalOpen(false));
            refreshData();
          } else {
            if (codesItemSendInfo?.limit) {
              await addCodePromocode(uuid, codesItemSendInfo);
              dispatch(setIsCodeModalOpen(false));
              refreshData();
            } else {
              dispatch(setHasEmtpy(true));
            }
          }
        } else {
          dispatch(setHasEmtpy(true));
        }
      } else if (codesItemSendInfo?.type === "percentage") {
        if (codesItemSendInfo?.percentage) {
          if (codesItemSendInfo?.unlimited) {
            await addCodePromocode(uuid, codesItemSendInfo);
            dispatch(setIsCodeModalOpen(false));
            refreshData();
          } else {
            if (codesItemSendInfo?.limit) {
              await addCodePromocode(uuid, codesItemSendInfo);
              dispatch(setIsCodeModalOpen(false));
              refreshData();
            } else {
              dispatch(setHasEmtpy(true));
            }
          }
        } else {
          dispatch(setHasEmtpy(true));
        }
      }
    } else {
      dispatch(setHasEmtpy(true));
    }
  };

  return (
    <div>
      <Modal
        centered
        open={isCodeModalOpen}
        onCancel={() => dispatch(setIsCodeModalOpen(false))}
        // height={1000}
        onOk={handleOk}
        confirmLoading={ok}
      >
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%", height: "80vh" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <AiOutlineSlack />
              <Text className={styles["text-font-size2"]}>Aktiw</Text>
            </Col>
            <Col span={8}>
              <Checkbox
                onChange={(e) => handleCheckbox(e, "active")}
                checked={codesItemSendInfo?.active}
              />
              <Text className={styles["text-font-size2"]}>Passiw</Text>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <RiCheckboxMultipleBlankLine />
              <Text className={styles["text-font-size2"]}>Kod gornusi: </Text>
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => setFilterValue(value)}
                defaultValue={{
                  label: "Birli Promocode",
                  value: "birli",
                }}
                options={[
                  {
                    label: "Birli Promocode",
                    value: "birli",
                  },
                  {
                    label: "Kopli Promocode",
                    value: "kopli",
                  },
                ]}
                style={{ width: "300px" }}
                placeholder="Saýlaň..."
              />
            </Col>
          </Row>
          {filterValue === "birli" && (
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <RiCoupon3Line />
                <Text className={styles["text-font-size2"]}>Kod: </Text>
              </Col>
              <Col span={8}>
                <Input
                  value={codesItemSendInfo?.code}
                  style={{ width: "300px" }}
                  placeholder="Kod"
                  onChange={(e) => handleChange(e, "code")}
                  status={
                    handleRequired("code", codesItemSendInfo) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleRequired("code", codesItemSendInfo) && hasEmtpy ? (
                  <span style={{ color: "red" }}>**Kod girizilmedik!!!</span>
                ) : null}
                <Button
                  onClick={() => handleGeneratePromocode()}
                  type="primary"
                  style={{ width: "300px", marginTop: "5px" }}
                >
                  Kod doret
                </Button>
              </Col>
            </Row>
          )}
          {filterValue === "kopli" && (
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <RiCoupon3Line />
                <Text className={styles["text-font-size2"]}>Kodlar: </Text>
              </Col>
              <Col span={15}>
                <TextArea
                  placeholder="Kodlar"
                  rows={6}
                  style={{ width: "600px" }}
                />
              </Col>
            </Row>
          )}

          <Row gutter={[16, 16]}>
            <Col span={17} className={styles["item-font"]}>
              <AiOutlineSlack />
              <Text className={styles["text-font-size2"]}>
                Musderi arzanladysa tasir etsin:{" "}
              </Text>
            </Col>
            <Col span={7}>
              <Checkbox
                onChange={(e) => handleCheckbox(e, "addOnlyClientDiscount")}
                checked={codesItemSendInfo?.addOnlyClientDiscount}
                style={{ marginRight: "10px" }}
              />
              <Text className={styles["text-font-size2"]}>Yok</Text>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <TbCirclePercentage />
              <Text className={styles["text-font-size2"]}>Gornusi: </Text>
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleSelectChange(value, "type")}
                options={[
                  {
                    label: "Prosent",
                    value: "percentage",
                  },
                  {
                    label: "Mukdar",
                    value: "amount",
                  },
                ]}
                style={{ width: "300px" }}
                placeholder="Saýlaň..."
                status={
                  handleRequired("type", codesItemSendInfo) && hasEmtpy
                    ? "error"
                    : undefined
                }
              />
              {handleRequired("type", codesItemSendInfo) && hasEmtpy ? (
                <span style={{ color: "red" }}>**Gornus girizilmedik!!!</span>
              ) : null}
            </Col>
          </Row>
          {codesItemSendInfo?.type === "percentage" && (
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <BsPercent />
                <Text className={styles["text-font-size2"]}>Prosent </Text>
              </Col>
              <Col span={8}>
                <Input
                  onChange={(e) => handleChange(e, "percentage")}
                  style={{ width: "300px" }}
                  type="number"
                  placeholder="prosent"
                  status={
                    handleRequired("code", codesItemSendInfo) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleRequired("percentage", codesItemSendInfo) && hasEmtpy ? (
                  <span style={{ color: "red" }}>
                    **Prosent girizilmedik!!!
                  </span>
                ) : null}
              </Col>
            </Row>
          )}
          {codesItemSendInfo?.type === "amount" && (
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <TbNumbers />
                <Text className={styles["text-font-size2"]}>Mukdary </Text>
              </Col>
              <Col span={8}>
                <Input
                  onChange={(e) => handleChange(e, "amount")}
                  value={codesItemSendInfo?.amount}
                  style={{ width: "300px" }}
                  type="number"
                  placeholder="mukdary"
                  status={
                    handleRequired("amount", codesItemSendInfo) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleRequired("amount", codesItemSendInfo) && hasEmtpy ? (
                  <span style={{ color: "red" }}>
                    **Prosent girizilmedik!!!
                  </span>
                ) : null}
              </Col>
            </Row>
          )}
          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <BsExclamationCircle />
              <Text className={styles["text-font-size2"]}>Çäksiz: </Text>
            </Col>
            <Col span={8}>
              <Checkbox
                checked={codesItemSendInfo?.unlimited}
                onChange={(e) => handleCheckbox(e, "unlimited")}
                style={{ marginRight: "10px" }}
              />
              <Text className={styles["text-font-size2"]}>Çäksiz</Text>
            </Col>
          </Row>
          {!codesItemSendInfo?.unlimited && (
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <BsExclamationCircle />
                <Text className={styles["text-font-size2"]}>Limit: </Text>
              </Col>
              <Col span={8}>
                <Input
                  onChange={(e) => handleChange(e, "limit")}
                  value={codesItemSendInfo?.limit}
                  type="number"
                  style={{ width: "300px" }}
                  placeholder="Limit"
                  status={
                    handleRequired("limit", codesItemSendInfo) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleRequired("limit", codesItemSendInfo) && hasEmtpy ? (
                  <span style={{ color: "red" }}>
                    **Prosent girizilmedik!!!
                  </span>
                ) : null}
              </Col>
            </Row>
          )}
        </Space>
      </Modal>
    </div>
  );
};

export default CodesModal;

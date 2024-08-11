import { type FC, useState, ChangeEvent } from "react";
import { Typography, InputNumber, Select, Input, Checkbox } from "antd";
import { Row, Col, Space, Button, type SelectProps } from "antd";
import {
  options,
  options2,
  options3,
  options4,
  options5,
} from "../../../data/index";
import {
  FaBoxOpen,
  FaBuilding,
  FaClock,
  FaLayerGroup,
  FaPercentage,
} from "react-icons/fa";
import { AiOutlineGroup, AiOutlineInteraction } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GiBallGlow, GiBowlSpiral } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ProductChip from "../../../components/productChip/ProducChip";
import { setIsProductsSelectModalOpen } from "../../../store/general/generalSlice";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
import { MdDateRange, MdOutlineLowPriority } from "react-icons/md";
import styles from "../../../styles/smartSection.module.scss";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useGeneralHook } from "../../../hooks/generalHooks";
const { Text } = Typography;

const Information: FC = () => {
  const [filterValue, setFilterValue] = useState<string>("Beylekiler");
  const dispatch = useAppDispatch();
  const { notificationItemData, notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const { mainGroupsOptionss, brandsOptionss } = useGeneralHook();
  const { divisionOptions } = useAppSelector((state) => state.general);
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | number,
    key: string
  ) => {
    const value = typeof e === "number" ? e : e.target.value;
    dispatch(
      setNotificationItemSendInfo({
        ...notificationItemSendInfo,
        [key]: value,
      })
    );
  };

  const handleSelectChange = (value: string[], key: string) => {
    dispatch(
      setNotificationItemSendInfo({
        ...notificationItemSendInfo,
        [key]: value,
      })
    );
  };

  const handleCheckbox = (e: CheckboxChangeEvent, key: string) => {
    const { checked } = e.target;
    dispatch(
      setNotificationItemSendInfo({
        ...notificationItemSendInfo,
        [key]: checked,
      })
    );
  };
  const divisionOptions1: SelectProps["options"] = divisionOptions?.data?.map(
    (option) => {
      return { value: option.uuid, label: option.nameTm };
    }
  );
  return (
    <div
      style={{
        width: "100%",
        paddingTop: "20px",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaClock />
            <Text className={styles["text-font-size2"]}>
              Guyjini yetirme wagty:
            </Text>
          </Col>
          <Col span={8}>
            <InputNumber
              value={notificationItemSendInfo?.timeToLive}
              required={true}
              onChange={(e) => handleChange(e, "timeToLive")}
              min={0}
              max={100}
              type="number"
              style={{ width: "100%" }}
              addonAfter="sagat"
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaBuilding />
            <Text className={styles["text-font-size2"]}>Bölumler:</Text>
          </Col>
          <Col span={8}>
            <Select
              value={notificationItemSendInfo?.divisions}
              onChange={(e) => handleChange(e, "divisions")}
              size="large"
              mode="tags"
              placeholder="Saylan..."
              style={{ width: "300px" }}
              options={divisionOptions1}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <AiOutlineInteraction />
            <Text className={styles["text-font-size2"]}>Baglanmak: </Text>
          </Col>
          <Col span={8}>
            <Select
              value={notificationItemSendInfo?.actionType}
              aria-required
              size="large"
              onChange={(value) => {
                handleSelectChange(value, "actionType");
                setFilterValue(value);
              }}
              style={{ width: "300px" }}
              options={options2}
            />
          </Col>
        </Row>
        {notificationItemSendInfo?.actionType === "others" ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdOutlineLowPriority />
                <Text className={styles["text-font-size2"]}>Tertiplemek: </Text>
              </Col>
              <Col span={8}>
                <Select
                  size="large"
                  mode="tags"
                  defaultValue={["Arzandan-Gymmada"]}
                  style={{ width: "300px" }}
                  options={options3}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <GiBowlSpiral />
                <Text className={styles["text-font-size2"]}>Paretto: </Text>
              </Col>
              <Col span={8}>
                <Select
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={options4}
                />
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <FaLayerGroup />
                <Text className={styles["text-font-size2"]}>
                  Esasy Gruplar:{" "}
                </Text>
              </Col>
              <Col span={8}>
                <Select
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={mainGroupsOptionss}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <AiOutlineGroup />
                <Text className={styles["text-font-size2"]}>ALt Gruplar: </Text>
              </Col>
              <Col span={8}>
                {/* <Select
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={options5}
                /> */}
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <GiBowlSpiral />
                <Text className={styles["text-font-size2"]}>Brendler: </Text>
              </Col>
              <Col span={8}>
                <Select
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={brandsOptionss}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <GiBallGlow />
                <Text className={styles["text-font-size"]}>
                  Täze gelen harytlar:{" "}
                </Text>
              </Col>
              <Col span={8}>
                <Checkbox
                  onChange={(e) => handleCheckbox(e, "onlyNews")}
                  checked={notificationItemSendInfo?.onlyNews}
                />
                <Text className={styles["text-font-size2"]}>
                  Täze gelen harytlar
                </Text>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <FaPercentage />
                <Text className={styles["text-font-size"]}>
                  Malzeme bazinda indirim:{" "}
                </Text>
              </Col>
              <Col span={8}>
                <Checkbox
                  onChange={(e) => handleCheckbox(e, "productDiscount")}
                  checked={notificationItemSendInfo?.productDiscount}
                />
                <Text className={styles["text-font-size2"]}>
                  Malzeme bazinda indirim
                </Text>
              </Col>
            </Row>
          </>
        ) : null}
        {notificationItemSendInfo?.actionType === "link" ? (
          <>
            {" "}
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdDateRange />
                <Text className={styles["text-font-size"]}>Link: </Text>
              </Col>
              <Col span={8}>
                <Input
                  placeholder="url..."
                  size="large"
                  style={{ width: "300px" }}
                />
              </Col>
            </Row>
          </>
        ) : null}
        {notificationItemSendInfo?.actionType === "items" && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdOutlineLowPriority />
                <Text className={styles["text-font-size"]}>Tertiplemek: </Text>
              </Col>
              <Col span={8}>
                <Select
                  size="large"
                  mode="tags"
                  defaultValue={["Arzandan-Gymmada"]}
                  style={{ width: "300px" }}
                  options={options3}
                />
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <FaBoxOpen />
                <Text className={styles["text-font-size"]}>Harytlar: </Text>
              </Col>
              <Col span={8}>
                <div className="product-add">
                  <Button
                    onClick={() => dispatch(setIsProductsSelectModalOpen(true))}
                  >
                    <IoMdAdd />
                  </Button>
                </div>
                <Space
                  direction="vertical"
                  size="middle"
                  // style={{ grid: "none" }}
                >
                  {notificationItemData?.items?.map((el) => {
                    return <ProductChip item={el} />;
                  })}
                </Space>
              </Col>
            </Row>
          </>
        )}
      </Space>
    </div>
  );
};

export default Information;

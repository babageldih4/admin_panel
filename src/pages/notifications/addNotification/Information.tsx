import { type FC, ChangeEvent } from "react";
import {
  Typography,
  InputNumber,
  Select,
  Input,
  Checkbox,
  SelectProps,
} from "antd";
import { Row, Col, Space, Button } from "antd";
import { options2, options3, options4 } from "../../../data/index";
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
import { getDefaultValue } from "../../../functions";
import { TOption } from "../../../types/generalType";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useGeneralHook } from "../../../hooks/generalHooks";
import ProductsModal from "../../../components/ProductsModal";

const { Text } = Typography;

const Information: FC = () => {
  // const [filterValue, setFilterValue] = useState<string>("Beylekiler");

  const dispatch = useAppDispatch();
  const { notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );

  const { divisionOptionss, mainGroupsOptionss, brandsOptionss } =
    useGeneralHook();

  const { hasEmtpy, brandsOptions } = useAppSelector((state) => state.general);
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
    console.log("value", value);
    console.log("key", key);

    dispatch(
      setNotificationItemSendInfo({
        ...notificationItemSendInfo,
        [key]: value,
      })
    );
  };

  const brandsOptions1: SelectProps["options"] = brandsOptions?.data?.map(
    (option: TOption) => {
      return {
        value: option.uuid,
        label: option.name,
      };
    }
  );

  const handleRequired = (data: any, field: string) => {
    const fieldValue = data[field];
    return fieldValue === "" || fieldValue === undefined || fieldValue === null;
  };
  const handleSelectRequired = (data: any, field: string, key: string) => {
    if (field === "actionType") {
      if (key === "link") {
        return (
          data?.link === "" || data?.link === undefined || data?.link === null
        );
      } else if (key === "items") {
        return data?.items?.length === 0 && data?.order[0]?.name === "";
      } else if (key === "others") {
        return data?.order[0]?.name === "";
      }
    }
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
  console.log("mainGroupsOptionss: ", mainGroupsOptionss);

  // dispatch(
  //   setNotificationItemSendInfo({
  //     ...notificationItemSendInfo,
  //     items: [...selectedProducts],
  //   })
  // );

  const seletVal = notificationItemSendInfo?.actionType;
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
              defaultValue={1}
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
              value={getDefaultValue(
                notificationItemSendInfo?.divisions,
                divisionOptionss,
                true
              )}
              onChange={(e) => handleSelectChange(e, "divisions")}
              size="large"
              mode="tags"
              placeholder="Saýlaň..."
              style={{ width: "300px" }}
              options={divisionOptionss}
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
              value={getDefaultValue(
                notificationItemSendInfo?.actionType,
                options2,
                false
              )}
              aria-required
              size="large"
              onChange={(value) => {
                handleSelectChange(value, "actionType");
                // setFilterValue(value);
              }}
              style={{ width: "300px" }}
              options={options2}
              placeholder="Saýlaň..."
              status={
                handleRequired(notificationItemSendInfo, "actionType") &&
                hasEmtpy
                  ? "error"
                  : undefined
              }
            />
            {handleRequired(notificationItemSendInfo, "actionType") &&
            hasEmtpy ? (
              <span style={{ color: "red" }}>**Saýlaň!!!</span>
            ) : null}
          </Col>
        </Row>
        {seletVal === "others" && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdOutlineLowPriority />
                <Text className={styles["text-font-size2"]}>Tertiplemek: </Text>
              </Col>
              <Col span={8}>
                <Select
                  value={getDefaultValue(
                    notificationItemSendInfo?.order,
                    options3,
                    true
                  )}
                  size="large"
                  mode="tags"
                  placeholder="Saýlaň..."
                  style={{ width: "300px" }}
                  options={options3}
                  onChange={(value) => {
                    handleSelectChange(value, "order");
                  }}
                  status={
                    handleSelectRequired(
                      notificationItemSendInfo,
                      "actionType",
                      "others"
                    ) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleSelectRequired(
                  notificationItemSendInfo,
                  "actionType",
                  "others"
                ) && hasEmtpy ? (
                  <span style={{ color: "red" }}>
                    **Tertiplemek girizilmedik!!!
                  </span>
                ) : null}
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
                  onChange={(value) => {
                    handleSelectChange(value, "parreto");
                  }}
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
                  placeholder="Saýlaň..."
                  style={{ width: "300px" }}
                  options={mainGroupsOptionss}
                  onChange={(value) => {
                    handleSelectChange(value, "mainGroups");
                  }}
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
                  value={getDefaultValue(
                    notificationItemSendInfo?.brands,
                    brandsOptionss,
                    false
                  )}
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={brandsOptionss}
                  onChange={(value) => {
                    handleSelectChange(value, "brands");
                  }}
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
                  checked={notificationItemSendInfo?.onlyNews}
                  onChange={(e: CheckboxChangeEvent) =>
                    handleCheckbox(e, "onlyNews")
                  }
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
                  checked={notificationItemSendInfo?.productDiscount}
                  onChange={(e: CheckboxChangeEvent) =>
                    handleCheckbox(e, "productDiscount")
                  }
                />
                <Text className={styles["text-font-size2"]}>
                  Malzeme bazinda indirim
                </Text>
              </Col>
            </Row>
          </>
        )}
        {seletVal === "link" ? (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdDateRange />
                <Text className={styles["text-font-size"]}>Link: </Text>
              </Col>
              <Col span={8}>
                <Input
                  value={notificationItemSendInfo?.link}
                  onChange={(e) => handleChange(e, "link")}
                  placeholder="url..."
                  size="large"
                  style={{ width: "300px" }}
                  status={
                    handleSelectRequired(
                      notificationItemSendInfo,
                      "actionType",
                      "link"
                    ) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                />
                {handleSelectRequired(
                  notificationItemSendInfo,
                  "actionType",
                  "link"
                ) && hasEmtpy ? (
                  <span style={{ color: "red" }}>**Link girizilmedik!!!</span>
                ) : null}
              </Col>
            </Row>
          </>
        ) : null}
        {seletVal === "items" && (
          <>
            <Row gutter={[16, 16]}>
              <Col span={6} className={styles["item-font"]}>
                <MdOutlineLowPriority />
                <Text className={styles["text-font-size"]}>Tertiplemek: </Text>
              </Col>
              <Col span={8}>
                <Select
                  value={getDefaultValue(
                    notificationItemSendInfo?.order,
                    options3,
                    true
                  )}
                  size="large"
                  mode="tags"
                  placeholder="Saýlaň..."
                  // defaultValue={["Arzandan-Gymmada"]}
                  style={{ width: "300px" }}
                  options={options3}
                  status={
                    handleSelectRequired(
                      notificationItemSendInfo,
                      "actionType",
                      "items"
                    ) && hasEmtpy
                      ? "error"
                      : undefined
                  }
                  onChange={(value) => {
                    handleSelectChange(value, "order");
                  }}
                />
                {handleSelectRequired(
                  notificationItemSendInfo,
                  "actionType",
                  "items"
                ) && hasEmtpy ? (
                  <span style={{ color: "red" }}>
                    **Tertiplemek girizilmedik!!!
                  </span>
                ) : null}
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
                  <ProductsModal />
                  {notificationItemSendInfo?.items?.map((el) => {
                    return <ProductChip item={el} />;
                  })}
                </Space>
                {/* </Row> */}
              </Col>
            </Row>
          </>
        )}
      </Space>
    </div>
  );
};

export default Information;

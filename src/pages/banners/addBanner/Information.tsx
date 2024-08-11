import { type FC, useState, ChangeEvent, useEffect } from "react";
import {
  Typography,
  InputNumber,
  Select,
  Input,
  Checkbox,
  SelectProps,
  DatePicker,
} from "antd";
import { Row, Col, Space, Button } from "antd";
import {
  options,
  options2,
  options3,
  options4,
  options5,
  priorityOptions,
} from "../../../data/index";
import {
  FaBoxOpen,
  FaBuilding,
  FaClock,
  FaCloudscale,
  FaEye,
  FaLayerGroup,
  FaPercentage,
  FaRegCalendarAlt,
} from "react-icons/fa";
import {
  AiOutlineGlobal,
  AiOutlineGroup,
  AiOutlineInteraction,
} from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { GiBallGlow, GiBowlSpiral } from "react-icons/gi";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import ProductChip from "../../../components/productChip/ProducChip";
import { setIsProductsSelectModalOpen } from "../../../store/general/generalSlice";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
import {
  MdDateRange,
  MdEdit,
  MdLowPriority,
  MdOutlineClose,
  MdOutlineLowPriority,
} from "react-icons/md";
import styles from "../../../styles/smartSection.module.scss";
import { isObject } from "../../../functions";
import { TOption } from "../../../types/generalType";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import moment from "moment";
import { setBannerItemSendInfo } from "../../../store/banners/bannersSlice";
import { IoCodeSlashOutline } from "react-icons/io5";
import { waitingTimeOptions } from "../../smartSections/data";

const { Text } = Typography;

const Information: FC = () => {
  // const [filterValue, setFilterValue] = useState<string>("Beylekiler");

  const dispatch = useAppDispatch();
  const { bannerItemSendInfo } = useAppSelector((state) => state.banners);

  const {
    divisionOptions,
    hasEmtpy,
    brandsOptions,
    mainGroupsOptions,
    selectedProducts,
  } = useAppSelector((state) => state.general);
  const handleChange = (
    e:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | number,
    key: string
  ) => {
    const value = typeof e === "number" ? e : e.target.value;
    dispatch(
      setBannerItemSendInfo({
        ...bannerItemSendInfo,
        [key]: value,
      })
    );
  };

  const handleSelectChange = (value: string[], key: string) => {
    console.log("value", value);
    console.log("key", key);

    dispatch(
      setBannerItemSendInfo({
        ...bannerItemSendInfo,
        [key]: value,
      })
    );
  };

  const getDefaultValue = (defaultValue, options, multiple) => {
    let compareValue = isObject(defaultValue);

    if (!defaultValue) return null;

    if (!multiple) {
      return options.find((option) => option.value === compareValue);
    }

    let tempOptions = defaultValue.map((dv) => {
      return options.find((option) => option.value === isObject(dv));
    });
    return tempOptions;
  };

  const divisionOptions1: SelectProps["options"] = divisionOptions?.data?.map(
    (option) => {
      return { value: option.uuid, label: option.nameTm };
    }
  );

  const brandsOptions1: SelectProps["options"] = brandsOptions?.data?.map(
    (option: TOption) => {
      return {
        value: option.uuid,
        label: option.name,
      };
    }
  );

  const mainGroupsOptions1: SelectProps["options"] =
    mainGroupsOptions?.data?.map((option: TOption) => {
      return {
        value: option.uuid,
        label: option.name,
      };
    });

  const handleRequired = (field: string) => {
    const fieldValue = bannerItemSendInfo[field];
    return fieldValue === "" || fieldValue === undefined || fieldValue === null;
  };

  const handleCheckbox = (e: CheckboxChangeEvent, key: string) => {
    const { checked } = e.target;
    dispatch(
      setBannerItemSendInfo({
        ...bannerItemSendInfo,
        [key]: checked,
      })
    );
  };

  const defaultStartDate = bannerItemSendInfo?.startDate
    ? moment(bannerItemSendInfo.startDate)
    : null;
  const defaultendDate = bannerItemSendInfo?.endDate
    ? moment(bannerItemSendInfo.endDate)
    : null;
  const handleDateChange = (date: moment.Moment | null, key: string) => {
    if (date) {
      dispatch(
        setBannerItemSendInfo({
          ...bannerItemSendInfo,
          [key]: date.toISOString(), // Dispatching the Moment object directly
        })
      );
    }
  };

  const seletVal = bannerItemSendInfo?.actionType;
  return (
    <div
      style={{
        width: "100%",
        padding: "25px 20px",
      }}
    >
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaClock />
            <Text className={styles["text-font-size2"]}>Aktiw</Text>
          </Col>
          <Col span={8}>
            <Checkbox
              // checked={promocodeItemSendInfo?.active}
              onClick={(e) => handleCheckbox(e, "active")}
            />
            <Text className={styles["text-font-size2"]}>Passiw</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaEye />
            <Text className={styles["text-font-size2"]}>
              Bir gezek görünsin:{" "}
            </Text>
          </Col>
          <Col span={8}>
            <Checkbox
              // checked={promocodeItemSendInfo?.active}
              onClick={(e) => handleCheckbox(e, "active")}
            />
            <Text className={styles["text-font-size2"]}>Ýok</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaEye />
            <Text className={styles["text-font-size2"]}>
              Her gün bir gezek görünsin:{" "}
            </Text>
          </Col>
          <Col span={8}>
            <Checkbox
              // checked={promocodeItemSendInfo?.active}
              onClick={(e) => handleCheckbox(e, "active")}
            />
            <Text className={styles["text-font-size2"]}>Hawa</Text>
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <MdOutlineClose />
            <Text className={styles["text-font-size2"]}>
              Ýapmak ün garaşmaly wagty:{" "}
            </Text>
          </Col>
          <Col span={8}>
            <Select
              placeholder="Saýlaň..."
              options={waitingTimeOptions}
              style={{ width: "300px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <FaRegCalendarAlt />
            <Text className={styles["text-font-size"]}>Baslanyan wagty: </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              value={defaultStartDate}
              onChange={(date) => handleDateChange(date, "startDate")}
              showTime
              required
              placeholder="mm/dd/yyyy --:-- --"
              style={{ width: "300px" }}
              status={
                handleRequired("startDate") && hasEmtpy ? "error" : undefined
              }
            />
            {hasEmtpy && handleRequired("startDate") ? (
              <span style={{ color: "red" }}>
                **Başlanýan wagty girizilmedik!!!
              </span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <FaRegCalendarAlt />
            <Text className={styles["text-font-size"]}>Gutaryan wagty: </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              value={defaultendDate}
              showTime
              onChange={(date) => handleDateChange(date, "endDate")}
              required
              placeholder="mm/dd/yyyy --:-- --"
              style={{ width: "300px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <MdLowPriority />
            <Text className={styles["text-font-size"]}>Onçelik: </Text>
          </Col>
          <Col span={8}>
            <Select
              onChange={(e) => handleSelectChange(e, "priority")}
              options={priorityOptions}
              style={{ width: "300px" }}
              placeholder="Saýlaň..."
              status={
                handleRequired("priority") && hasEmtpy ? "error" : undefined
              }
            />
            {handleRequired("priority") && hasEmtpy ? (
              <span style={{ color: "red" }}>**Saýlaň!!!</span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <AiOutlineGlobal />
            <Text className={styles["text-font-size"]}>Diller: </Text>
          </Col>
          <Col span={8}>
            <Select
              onChange={(e) => handleSelectChange(e, "languages")}
              mode="tags"
              placeholder="Saýlaň..."
              options={[
                { label: "Turkmen", value: "tm" },
                { label: "Rus", value: "ru" },
              ]}
              style={{ width: "300px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <IoCodeSlashOutline />
            <Text className={styles["text-font-size"]}>Programma: </Text>
          </Col>
          <Col span={8}>
            <Select
              onChange={(e) => handleSelectChange(e, "programs")}
              mode="tags"
              options={[
                { label: "Web Sahypa", value: "web" },
                { label: "Mobil", value: "mobile" },
              ]}
              style={{ width: "300px" }}
              placeholder="Saýlaň..."
              status={
                handleRequired("programs") && hasEmtpy ? "error" : undefined
              }
            />
            {handleRequired("programs") && hasEmtpy ? (
              <span style={{ color: "red" }}>**Saýlaň!!!</span>
            ) : null}
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
                bannerItemSendInfo?.divisions,
                divisionOptions1,
                true
              )}
              onChange={(e) => handleSelectChange(e, "divisions")}
              size="large"
              mode="tags"
              placeholder="Saýlaň..."
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
              value={getDefaultValue(
                bannerItemSendInfo?.actionType,
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
                handleRequired("actionType") && hasEmtpy ? "error" : undefined
              }
            />
            {handleRequired("actionType") && hasEmtpy ? (
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
                    bannerItemSendInfo?.order,
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
                    handleRequired("orders") && hasEmtpy ? "error" : undefined
                  }
                />
                {handleRequired("orders") && hasEmtpy ? (
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
                  options={mainGroupsOptions1}
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
                    bannerItemSendInfo?.brands,
                    brandsOptions1,
                    false
                  )}
                  size="large"
                  mode="tags"
                  placeholder="Saylan"
                  style={{ width: "300px" }}
                  options={brandsOptions1}
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
                  checked={bannerItemSendInfo?.onlyNews}
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
                  checked={bannerItemSendInfo?.productDiscount}
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
                  value={bannerItemSendInfo?.link}
                  onChange={(e) => handleChange(e, "link")}
                  placeholder="url..."
                  size="large"
                  style={{ width: "300px" }}
                  status={
                    handleRequired("link") && hasEmtpy ? "error" : undefined
                  }
                />
                {handleRequired("link") && hasEmtpy ? (
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
                    bannerItemSendInfo?.order,
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
                    handleRequired("order") && hasEmtpy ? "error" : undefined
                  }
                  onChange={(value) => {
                    handleSelectChange(value, "order");
                  }}
                />
                {handleRequired("order") && hasEmtpy ? (
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
                  {/* <Row style={{ display: "grid", columns: "two" }}> */}
                  {bannerItemSendInfo?.items?.map((el) => {
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

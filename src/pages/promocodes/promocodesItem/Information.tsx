import { type FC, ChangeEvent, useEffect } from "react";
import { Typography, Input, Checkbox, DatePicker, Select, Tooltip } from "antd";
import { Row, Col, Space, Form } from "antd";
import { FaBuilding, FaClock, FaRegCalendarAlt, FaUsers } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setPromocodesItemSendInfo } from "../../../store/promocodes/promocodesSlice";
import styles from "../../../styles/smartSection.module.scss";
import { GiTigerHead } from "react-icons/gi";
import { BiRename } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { useGeneralHook } from "../../../hooks/generalHooks";
import { SelectProps } from "antd/lib";
import moment from "moment";
import { mergeObjectsData } from "../../../functions";
const { Text } = Typography;

const Information: FC = () => {
  const dispatch = useAppDispatch();
  const { promocodeItem, promocodeItemSendInfo } = useAppSelector(
    (state) => state.promocodes
  );
  const { discountOptions, divisionOptions } = useAppSelector(
    (state) => state.general
  );
  const { getDiscountOptions } = useGeneralHook();

  useEffect(() => {
    getDiscountOptions();
  }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: string
  ) => {
    const value = e.target.value;
    dispatch(
      setPromocodesItemSendInfo({
        ...promocodeItemSendInfo,
        [key]: value,
      })
    );
  };

  const handleDateChange = (date: moment.Moment | null, key: string) => {
    if (date) {
      dispatch(
        setPromocodesItemSendInfo({
          ...promocodeItemSendInfo,
          [key]: date, // Dispatching the Moment object directly
        })
      );
    }
  };

  const handleSelectChange = (value: string[], key: string) => {
    dispatch(
      setPromocodesItemSendInfo({
        ...promocodeItemSendInfo,
        [key]: value,
      })
    );
  };

  const divisionOptions1: SelectProps["options"] = divisionOptions?.data?.map(
    (option) => {
      return { value: option.uuid, label: option.nameTm };
    }
  );

  // const defaultStartDate = promocodeItem?.startDate
  //   ? moment(promocodeItemSendInfo.startDate)
  //   : null;
  // const defaultEndDate = promocodeItem?.endDate
  //   ? moment(promocodeItemSendInfo?.endDate)
  //   : null;
  const defaultStartDate = promocodeItemSendInfo?.startDate
    ? moment(promocodeItemSendInfo?.startDate)
    : null;
  const defaultEndDate = promocodeItemSendInfo?.endDate
    ? moment(promocodeItemSendInfo?.endDate)
    : null;
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
            <Text className={styles["text-font-size2"]}>Aktiw</Text>
          </Col>
          <Col span={8}>
            <Checkbox
              onClick={(e) => handleChange(e, "active")}
              checked={promocodeItemSendInfo?.active}
            />
            <Text className={styles["text-font-size2"]}>Passiw</Text>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <FaUsers />
            <Text className={styles["text-font-size2"]}>
              Ähli müşderilere görünsin
            </Text>
          </Col>
          <Col span={8}>
            <Checkbox checked={promocodeItemSendInfo?.allUsersHaveAccess} />
            <Text className={styles["text-font-size2"]}>Hawa</Text>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <BiRename />
            <Text className={styles["text-font-size2"]}>Türkmençe ady</Text>
          </Col>
          <Col span={8}>
            <Input
              value={promocodeItemSendInfo?.nameTm}
              onChange={(e) => handleChange(e, "nameTm")}
              className={styles["text-font-size"]}
              placeholder="Türkmençe ady"
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={6} className={styles["item-font"]}>
            <BiRename />
            <Text className={styles["text-font-size2"]}>Rusça ady</Text>
          </Col>
          <Col span={8}>
            <Input
              value={promocodeItemSendInfo?.nameRu}
              onChange={(e) => handleChange(e, "nameRu")}
              className={styles["text-font-size"]}
              placeholder="Rusça ady"
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
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <FaRegCalendarAlt />
            <Text className={styles["text-font-size"]}>Gutaryan wagty: </Text>
          </Col>
          <Col span={8}>
            <DatePicker
              value={defaultEndDate}
              onChange={(date) => handleDateChange(date, "endDate")}
              showTime
              required
              placeholder="mm/dd/yyyy --:-- --"
              style={{ width: "300px" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <FaBuilding />
            <Text className={styles["text-font-size"]}>Bolumler: </Text>
          </Col>
          <Col span={8}>
            <Space
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Select
                onChange={(value) => handleSelectChange(value, "divisions")}
                options={divisionOptions1}
                style={{ width: "300px" }}
                placeholder="Saýlaň..."
                mode="tags"
                value={promocodeItemSendInfo?.divisions}
              />
              <Tooltip
                placement="right"
                title={
                  "Eger-de bölüm saýlanmasa bu promocode ähli bölümlere degişli bolar"
                }
              >
                <BsInfoCircleFill
                  color="orange"
                  style={{
                    fontSize: "20px",
                    // marginLeft: "5px",
                  }}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={6} className={styles["item-font"]}>
            <GiTigerHead />
            <Text className={styles["text-font-size"]}>ERP Sinhron kody: </Text>
          </Col>
          <Col span={8}>
            <Select
              onChange={(value) => handleSelectChange(value, "erpSyncCode")}
              options={discountOptions?.data?.map((el) => {
                return {
                  label: el.name,
                  value: el.code,
                };
              })}
              style={{ width: "300px" }}
              placeholder="Saýlaň..."
              value={promocodeItemSendInfo?.erpSyncCode}
            />
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Information;

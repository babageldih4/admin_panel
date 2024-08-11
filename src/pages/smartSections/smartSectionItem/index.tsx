import { useState, type FC, useEffect } from "react";
import {
  Row,
  Col,
  Typography,
  Checkbox,
  DatePicker,
  Input,
  Select,
  Space,
  Button,
  Form,
} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import { FaBuilding, FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineSlack, AiOutlineGlobal } from "react-icons/ai";
import { MdLowPriority } from "react-icons/md";
import { IoCodeSlashOutline } from "react-icons/io5";
import { BsCardList } from "react-icons/bs";
import {
  options1,
  options3,
  options4,
  options5,
  useOptions,
  divisionOptions,
} from "../data";
import styles from "../../../styles/smartSection.module.scss";
import styles2 from "../../../styles/editableButtons.module.scss";
import { useSmartSectionsHook } from "../../../hooks/smartSections";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const SmartSectionItem: FC = () => {
  const [products, setProducts] = useState<boolean>(false);
  const { getSmartSectionsItem, updateSmartSectionItem } =
    useSmartSectionsHook();
  const { smartSectionsItemData, smartSectionsItemSendInfo } = useAppSelector(
    (state) => state.smartSections
  );
  const [form] = Form.useForm();
  const location = useLocation().pathname;
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getSmartSectionsItem(uuid);
  }, []);
  const handleFilter = (value: string) => {
    setProducts(value === "Harytlar");
  };
  const uuid = location.split("/")[2];

  const handleSubmit = async (values: any) => {
    console.log("values :", values);
    try {
      await updateSmartSectionItem(uuid, values);
      // await getSmartSections();
      console.log("Form submitted successfully");
    } catch (err) {
      console.error("Error submitting form: ", err);
    }
  };
  useEffect(() => {
    if (smartSectionsItemData?.startDate) {
      form.setFieldsValue({
        startDate: dayjs(smartSectionsItemData.startDate),
      });
    }
  }, [smartSectionsItemData, form]);

  const getLanguageDefaultValue = () => {
    const defaultValue = [];
    if (smartSectionsItemData?.languages) {
      if (smartSectionsItemData?.languages.includes("tm")) {
        defaultValue.push({
          label: "Türkmen",
          value: "tm",
        });
      }
      if (smartSectionsItemData?.languages.includes("ru")) {
        defaultValue.push({
          label: "Rus",
          value: "ru",
        });
      }
    }
    return defaultValue;
  };

  const getDisplayFieldsValue = () => {
    const defaultValue = [];
    if (smartSectionsItemData?.displayFields) {
      if (smartSectionsItemData?.displayFields.includes("mainSection")) {
        defaultValue.push({
          label: "Esasy",
          value: "mainSection",
        });
      }
      if (smartSectionsItemData?.displayFields.includes("header")) {
        defaultValue.push({
          label: "Header",
          value: "header",
        });
      }
      if (smartSectionsItemData?.displayFields.includes("footer")) {
        defaultValue.push({
          label: "Footer",
          value: "footer",
        });
      }
    }
    return defaultValue;
  };

  const getOrdersDefaultValue = (field: any) => {
    const defaultValue = [];
    if (field?.orders) {
      if (field?.orders.includes("random")) {
        defaultValue.push({
          name: "random",
        });
      }
      //  if(field?.orders.includes("")){}
    }
    return defaultValue;
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          active: smartSectionsItemData?.active,
          languages: getLanguageDefaultValue(),
          programs: [],
          displayFields: getDisplayFieldsValue(),
          order: [],
          pareto: [],
          mainGroups: [],
          brands: [],
          newProducts: false,
          productDiscount: false,
          nameTm: smartSectionsItemData?.nameTm,
          nameRu: smartSectionsItemData?.nameRu,
          // startDate: smartSectionsItemData?.startDate,
          priority: smartSectionsItemData?.priority,
          onlyNews: smartSectionsItemData?.onlyNews,
        }}
        layout="vertical"
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row>
            <Col
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              span={6}
              className={styles["item-font"]}
            >
              <Text style={{ fontSize: "20px" }}>
                {smartSectionsItemData?.nameTm || smartSectionsItemData?.nameRu}
              </Text>
            </Col>
            <Col span={10} className={styles2["editableButtons"]}>
              <Button
                type="text"
                className={styles2["button"]}
                htmlType="submit"
              >
                KAYDET
              </Button>
              <Button
                type="text"
                className={styles2["button"]}
                onClick={() => form.resetFields()}
              >
                SIFIRLA
              </Button>
              <Button
                type="text"
                className={styles2["button"]}
                onClick={() => navigate("/smartSections")}
              >
                IPTAL
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <AiOutlineSlack />
              <Text className={styles["text-font-size"]}>Aktiwlylyk: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="active" valuePropName="checked">
                <Checkbox
                  className={styles["text-font-size2"]}
                  checked={smartSectionsItemData?.active}
                />
                Aktiw
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <FaRegCalendarAlt />
              <Text className={styles["text-font-size"]}>
                Baslanyan wagty:{" "}
              </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="startDate">
                <DatePicker
                  // value={}
                  showTime
                  required
                  placeholder="mm/dd/yyyy --:-- --"
                  style={{ width: "300px" }}
                  // defaultValue={smartSectionsItemData?.startDate}
                  // defaultPickerValue={smartSectionsItemData?.startDate}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <FaRegCalendarAlt />
              <Text className={styles["text-font-size"]}>Gutaryan wagty: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="endDate">
                <DatePicker
                  showTime
                  placeholder="mm/dd/yyyy --:-- --"
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <Text className={styles["text-font-size"]}>Türkmençe ady: </Text>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nameTm"
                rules={[
                  { required: true, message: "Türkmençe ady is required" },
                ]}
              >
                <Input
                  // defaultValue={smartSectionsItemData?.nameTm}
                  value={smartSectionsItemData?.nameTm}
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <Text className={styles["text-font-size"]}>Rusça ady: </Text>
            </Col>
            <Col span={8}>
              <Form.Item
                name="nameRu"
                rules={[{ required: true, message: "Rusça ady is required" }]}
              >
                <Input
                  defaultValue={smartSectionsItemData?.nameRu}
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <MdLowPriority />
              <Text className={styles["text-font-size"]}>Onçelik: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="priority">
                <Select options={options1} style={{ width: "300px" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <FaBuilding />
              <Text className={styles["text-font-size"]}>Bolumler: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="divisions">
                <Select
                  options={divisionOptions}
                  style={{ width: "300px" }}
                  placeholder="Saýlaň..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <AiOutlineGlobal />
              <Text className={styles["text-font-size"]}>Diller: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="languages">
                <Select
                  mode="tags"
                  placeholder="Saýlaň..."
                  value={[
                    { label: "Turkmen", value: "tm" },
                    { label: "Rus", value: "ru" },
                  ]}
                  // defaultValue={[
                  //   { label: "Türkmen", value: "tm" },
                  //   { label: "Rus", value: "ru" },
                  // ]}
                  options={[
                    { label: "Turkmen", value: "tm" },
                    { label: "Rus", value: "ru" },
                  ]}
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <IoCodeSlashOutline />
              <Text className={styles["text-font-size"]}>Programma: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="programs">
                <Select
                  mode="tags"
                  options={[
                    { label: "Web Sahypa", value: "web" },
                    { label: "Mobil", value: "mobile" },
                  ]}
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <BsCardList />
              <Text className={styles["text-font-size"]}>
                Ulanyljak ýerleri:{" "}
              </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="displayFields">
                <Select
                  mode="tags"
                  options={useOptions}
                  style={{ width: "300px" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <Text className={styles["text-font-size"]}>Tertiplemek: </Text>
            </Col>
            <Col span={8}>
              <Form.Item
                name="order"
                rules={[
                  { required: true, message: "Tertiplemek girizilmedik" },
                ]}
              >
                <Select
                  size="large"
                  mode="tags"
                  defaultValue={["Arzandan-Gymmada"]}
                  style={{ width: "300px" }}
                  options={options3}
                  // onChange={(value) => handleChange("order", value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6} className={styles["item-font"]}>
              <Text className={styles["text-font-size"]}>Görnüşi: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="filterType">
                <Select onChange={handleFilter} options={options3} />
              </Form.Item>
            </Col>
          </Row>
          {products ? (
            <>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>Harytlar: </Text>
                </Col>
                <Col span={8}>
                  <PlusSquareOutlined />
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>Paretto: </Text>
                </Col>
                <Col span={8}>
                  <Form.Item name="pareto">
                    <Select
                      size="large"
                      mode="tags"
                      options={options4}
                      style={{ width: "300px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>
                    Esasy Gruplar:{" "}
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item name="mainGroups">
                    <Select
                      size="large"
                      mode="tags"
                      options={options5}
                      style={{ width: "300px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>
                    Alt Gruplar:{" "}
                  </Text>
                </Col>
                <Col span={8}></Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>Brendler: </Text>
                </Col>
                <Col span={8}>
                  <Form.Item name="brands">
                    <Select
                      size="large"
                      mode="tags"
                      options={options5}
                      style={{ width: "300px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>
                    Täze gelen harytlar:{" "}
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item name="onlyNews" valuePropName="checked">
                    <Checkbox checked={smartSectionsItemData?.onlyNews} />
                    <Text className={styles["text-font-size2"]}>
                      Täze gelen harytlar
                    </Text>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={6} className={styles["item-font"]}>
                  <Text className={styles["text-font-size"]}>
                    Malzeme bazinda indirim:{" "}
                  </Text>
                </Col>
                <Col span={8}>
                  <Form.Item name="productDiscount" valuePropName="checked">
                    <Checkbox
                      checked={smartSectionsItemData?.productDiscount}
                    />
                    <Text className={styles["text-font-size2"]}>
                      Malzeme bazinda indirim
                    </Text>
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
        </Space>
      </Form>
    </div>
  );
};

export default SmartSectionItem;

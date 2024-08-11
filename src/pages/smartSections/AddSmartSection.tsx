import { useState, type FC } from "react";
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
} from "./data";
import styles from "../../styles/smartSection.module.scss";
import styles2 from "../../styles/editableButtons.module.scss";
import { useSmartSectionsHook } from "../../hooks/smartSections";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const AddSmartSection: FC = () => {
  const [products, setProducts] = useState<boolean>(false);
  const { createSmartSectionItem } = useSmartSectionsHook();
  const [form] = Form.useForm();
  // const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFilter = (value: string) => {
    setProducts(value === "Harytlar");
  };

  const handleSubmit = async (values: any) => {
    console.log("startDate: ", values.startDate);
    console.log(typeof values.startDate);
    console.log("values :", values);
    try {
      await createSmartSectionItem(values);
      // await getSmartSections();
      console.log("Form submitted successfully");
    } catch (err) {
      console.error("Error submitting form: ", err);
    }
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{
          active: false,
          languages: [],
          programs: [],
          displayFields: [],
          order: [],
          pareto: [],
          mainGroups: [],
          brands: [],
          newProducts: false,
          productDiscount: false,
        }}
        layout="vertical"
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          <Row>
            <Col span={6} className={styles["item-font"]}>
              <AiOutlineSlack />
              <Text className={styles["text-font-size"]}>Aktiwlylyk: </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="active" valuePropName="checked">
                <Checkbox className={styles["text-font-size2"]}>Aktiw</Checkbox>
              </Form.Item>
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
              <FaRegCalendarAlt />
              <Text className={styles["text-font-size"]}>
                Baslanyan wagty:{" "}
              </Text>
            </Col>
            <Col span={8}>
              <Form.Item name="startDate">
                <DatePicker
                  showTime
                  required
                  placeholder="mm/dd/yyyy --:-- --"
                  style={{ width: "300px" }}
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
                <Input style={{ width: "300px" }} />
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
                <Input style={{ width: "300px" }} />
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
                  <Form.Item name="newProducts" valuePropName="checked">
                    <Checkbox />
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
                    <Checkbox />
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

export default AddSmartSection;

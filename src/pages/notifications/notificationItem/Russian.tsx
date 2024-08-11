import { type FC, useState, useEffect } from "react";
import {
  Space,
  Row,
  Col,
  Typography,
  Input,
  Upload,
  UploadFile,
  UploadProps,
  Image,
  type GetProp,
} from "antd";
import { ChangeEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import styles from "../../../styles/smartSection.module.scss";
import { BiRename } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { TextArea } = Input;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const Russian: FC<{
  handleImageSelect: (file: File) => void;
  fileListRu: UploadFile[];
  setFileListRu: (fileList: UploadFile[]) => void;
}> = ({ handleImageSelect, fileListRu, setFileListRu }) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const { notificationItemData, notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const defaultImageUrlRu = notificationItemSendInfo?.imageRu;

  useEffect(() => {
    if (defaultImageUrlRu) {
      const defaultFile: UploadFile = {
        uid: "-1",
        name: defaultImageUrlRu,
        status: "done",
        url: `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/images/notifications/${defaultImageUrlRu}`,
      };
      setFileListRu([defaultFile]);
      setPreviewImage(
        `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/images/notifications/${defaultImageUrlRu}`
      );
    }
  }, [defaultImageUrlRu, setFileListRu]);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: any
  ) => {
    dispatch(
      setNotificationItemSendInfo({
        ...notificationItemSendInfo,
        [key]: e.target.value,
      })
    );
  };
  const handleImageChangeRu: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListRu(newFileList);
  };

  const handleBeforeUploadRu = (file: File) => {
    handleImageSelect(file);
    return false; // Prevent automatic upload
  };

  const handleRequired = (field: string) => {
    const fieldValue = notificationItemSendInfo[field];
    return fieldValue === "" || fieldValue === undefined || fieldValue === null;
  };

  const uploadButton = (
    <button
      style={{ border: 0, background: "none", color: "white" }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const titleRu = notificationItemSendInfo?.titleRu || "";
  const textRu = notificationItemSendInfo?.bodyRu || "";

  return (
    <div>
      <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BiRename />
            <Text className={styles["text-font-size2"]}>Ady: </Text>
          </Col>
          <Col span={6}>
            <Input
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "titleRu")
              }
              type="text"
              style={{ width: "300px" }}
              defaultValue={titleRu}
            />
            {handleRequired("titleRu") && hasEmtpy ? (
              <span style={{ color: "red" }}>**Ady girizilmedik!!!</span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BiRename />
            <Text className={styles["text-font-size2"]}>Tekst: </Text>
          </Col>
          <Col span={6}>
            <TextArea
              // size="l"
              required
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                handleChange(e, "bodyRu")
              }
              rows={7}
              style={{ width: "100%" }}
              defaultValue={textRu}
            />
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BsCardImage />
            <Text className={styles["text-font-size2"]}>Web Suraty: </Text>
          </Col>
          <Col span={6}>
            <Upload
              maxCount={1}
              listType="picture-card"
              fileList={fileListRu}
              onPreview={handlePreview}
              onChange={handleImageChangeRu}
              beforeUpload={handleBeforeUploadRu}
            >
              {fileListRu?.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Russian;

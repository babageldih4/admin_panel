import React, { ChangeEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Col, Row, Input, Space, Typography } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { BiRename } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import styles from "../../../styles/smartSection.module.scss";
import { setBannerItemSendInfo } from "../../../store/banners/bannersSlice";

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

const Russian: React.FC<{
  handleImageSelectRu: (file: File) => void;
  handleImageSelectTelRu: (file: File) => void;
  fileListRu: UploadFile[];
  setFileListRu: (fileList: UploadFile[]) => void;
  fileListTelRu: UploadFile[];
  setFileListTelRu: (fileList: UploadFile[]) => void;
}> = ({
  handleImageSelectRu,
  handleImageSelectTelRu,
  fileListRu,
  setFileListRu,
  fileListTelRu,
  setFileListTelRu,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const dispatch = useAppDispatch();
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const { bannerItemSendInfo } = useAppSelector((state) => state.banners);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleImageChangeRu: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListRu(newFileList);
  };

  const handleImageChangeTelRu: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListTelRu(newFileList);
  };

  const handleBeforeUploadRu = (file: File) => {
    handleImageSelectRu(file);
    return false; // Prevent automatic upload
  };

  const handleBeforeUploadTelRu = (file: File) => {
    handleImageSelectTelRu(file);
    return false; // Prevent automatic upload
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
    key: any
  ) => {
    dispatch(
      setBannerItemSendInfo({
        ...bannerItemSendInfo,
        [key]: e.target.value,
      })
    );
  };
  const handleRequired = (field: string) => {
    const fieldValue = bannerItemSendInfo[field];
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

  return (
    <div style={{ padding: "25px 20px" }}>
      <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BiRename />
            <Text className={styles["text-font-size2"]}>Ady: </Text>
          </Col>
          <Col span={8}>
            <Input
              value={bannerItemSendInfo?.nameRu}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "nameRu")
              }
              type="text"
              status={
                handleRequired("nameRu") && hasEmtpy ? "error" : undefined
              }
              style={{ width: "100%" }}
            />
            {handleRequired("nameRu") && hasEmtpy ? (
              <span style={{ color: "red" }}>**Ady girizilmedik!!!</span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BsCardImage />
            <Text className={styles["text-font-size2"]}>Web Suraty: </Text>
          </Col>
          <Col
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              fileList={fileListRu}
              onPreview={handlePreview}
              onChange={handleImageChangeRu}
              beforeUpload={handleBeforeUploadRu}
            >
              {fileListRu.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                style={{
                  height: "300px",
                  width: "300px",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            {handleRequired("imageRu") &&
            hasEmtpy &&
            !(fileListRu.length >= 1) ? (
              <span style={{ color: "red" }}>**Web suraty girizilmedik!!!</span>
            ) : null}
          </Col>
        </Row>
        <Row>
          <Col span={4} className={styles["item-font"]}>
            <BsCardImage />
            <Text className={styles["text-font-size2"]}>Tel Web Suraty: </Text>
          </Col>
          <Col
            span={6}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Upload
              maxCount={1}
              listType="picture-card"
              fileList={fileListTelRu}
              onPreview={handlePreview}
              onChange={handleImageChangeTelRu}
              beforeUpload={handleBeforeUploadTelRu}
            >
              {fileListTelRu.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                style={{
                  height: "300px",
                  width: "300px",
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}
            {handleRequired("imageTelRu") &&
            hasEmtpy &&
            !(fileListTelRu.length >= 1) ? (
              <span style={{ color: "red" }}>**Tel suraty girizilmedik!!!</span>
            ) : null}
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default Russian;

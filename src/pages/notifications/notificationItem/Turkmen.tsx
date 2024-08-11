import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Col, Row, Input, Space, Typography } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { BiRename } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import styles from "../../../styles/smartSection.module.scss";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
import { backendUrl } from "../../../plugins/axios";

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

const Turkmen: React.FC<{
  handleImageSelect: (file: File) => void;
  fileListTm: UploadFile[];
  setFileListTm: (fileList: UploadFile[]) => void;
}> = ({ handleImageSelect, fileListTm, setFileListTm }) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const { notificationItemSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

  const defaultImageUrlTm = notificationItemSendInfo?.imageTm;

  useEffect(() => {
    if (defaultImageUrlTm) {
      const defaultFile: UploadFile = {
        uid: "-1",
        name: defaultImageUrlTm,
        status: "done",
        url: `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/images/notifications/${defaultImageUrlTm}`,
      };
      setFileListTm([defaultFile]);
      setPreviewImage(
        `${
          import.meta.env.VITE_BACKEND_PORT
        }/api/images/notifications/${defaultImageUrlTm}`
      );
    }
  }, [defaultImageUrlTm, setFileListTm]);

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

  const handleImageChangeTm: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    setFileListTm(newFileList);
  };

  const handleBeforeUploadTm = (file: File) => {
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

  return (
    <>
      <div>
        <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
          <Row>
            <Col span={4} className={styles["item-font"]}>
              <BiRename />
              <Text className={styles["text-font-size2"]}>Ady: </Text>
            </Col>
            <Col span={8}>
              <Input
                value={notificationItemSendInfo?.titleTm}
                required
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "titleTm")
                }
                type="text"
                status={
                  handleRequired("titleTm") && hasEmtpy ? "error" : undefined
                }
                style={{ width: "100%" }}
              />
              {handleRequired("titleTm") && hasEmtpy ? (
                <span style={{ color: "red" }}>**Ady girizilmedik!!!</span>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col span={4} className={styles["item-font"]}>
              <BiRename />
              <Text className={styles["text-font-size2"]}>Tekst: </Text>
            </Col>
            <Col span={8}>
              <TextArea
                // size="l"
                required
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleChange(e, "bodyTm")
                }
                rows={7}
                style={{ width: "100%" }}
                defaultValue={notificationItemSendInfo?.bodyTm}
              />
              {handleRequired("bodyTm") && hasEmtpy ? (
                <span style={{ color: "red" }}>**Tekst girizilmedik!!!</span>
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
                fileList={fileListTm}
                onPreview={handlePreview}
                onChange={handleImageChangeTm}
                beforeUpload={handleBeforeUploadTm}
              >
                {fileListTm.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
              {hasEmtpy && !(fileListTm.length >= 1) ? (
                <span style={{ color: "red" }}>
                  **Web suraty girizilmedik!!!
                </span>
              ) : null}
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
};

export default Turkmen;

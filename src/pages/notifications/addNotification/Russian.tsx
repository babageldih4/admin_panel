import React, { ChangeEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload, Col, Row, Input, Space, Typography } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { BiRename } from "react-icons/bi";
import { BsCardImage } from "react-icons/bs";
import styles from "../../../styles/smartSection.module.scss";
import { setNotificationItemSendInfo } from "../../../store/notifications/notificationSlice";
import setFileList from "../../../store/general/generalSlice";

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

const Russian: React.FC<{ handleImageSelect: (file: File) => void }> = ({
  handleImageSelect,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { notificationItemSendInfo, fileList } = useAppSelector(
    (state) => state.notifications
  );
  const { hasEmtpy } = useAppSelector((state) => state.general);
  const dispatch = useAppDispatch();

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

  const handleImageChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    console.log("fileList: ", fileList);
    dispatch(setFileList(newFileList));
    // setFileList(newFileList);
  };

  const handleBeforeUpload = (file: File) => {
    console.log("file: ", file);
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
                value={notificationItemSendInfo?.titleRu}
                required
                // maxLength={7}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleChange(e, "titleRu")
                }
                type="text"
                style={{ width: "100%" }}
                status={
                  handleRequired("titleRu") && hasEmtpy ? "error" : undefined
                }
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
            <Col span={8}>
              <TextArea
                value={notificationItemSendInfo?.bodyRu}
                maxLength={10}
                required
                onChange={(e) => handleChange(e, "bodyRu")}
                rows={6}
                status={
                  handleRequired("bodyRu") && hasEmtpy ? "error" : undefined
                }
              />
              {handleRequired("bodyRu") && hasEmtpy ? (
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
                style={{
                  height: "500px",
                  width: "500px",
                }}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleImageChange}
                beforeUpload={handleBeforeUpload}
              >
                {/* {uploadButton} */}
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              {previewImage && (
                <Image
                  style={{
                    height: "300px",
                    width: "300px",
                  }}
                  wrapperStyle={{
                    display: "none",
                    height: "300px",
                    width: "300px",
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(""),
                  }}
                  src={previewImage}
                />
              )}
            </Col>
          </Row>
        </Space>
      </div>
    </>
  );
};

export default Russian;

// import React, { ChangeEvent, useState } from "react";
// import { useAppSelector, useAppDispatch } from "../../../store/hooks";
// import { PlusOutlined } from "@ant-design/icons";
// import { Image, Upload, Col, Row, Input, Space, Typography } from "antd";
// import type { GetProp, UploadFile, UploadProps } from "antd";
// import { BiRename } from "react-icons/bi";
// import { BsCardImage } from "react-icons/bs";
// import styles from "../../../styles/smartSection.module.scss";
// import {
//   setNotificationItemSendInfo,
//   setFileList,
// } from "../../../store/notifications/notificationSlice";

// const { Text } = Typography;
// const { TextArea } = Input;

// type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

// const getBase64 = (file: FileType): Promise<string> =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result as string);
//     reader.onerror = (error) => reject(error);
//   });

// const Russian: React.FC<{ handleImageSelect: (file: File) => void }> = ({
//   handleImageSelect,
// }) => {
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [previewImage, setPreviewImage] = useState("");
//   const { notificationItemSendInfo, fileList } = useAppSelector(
//     (state) => state.notifications
//   );
//   const { hasEmtpy } = useAppSelector((state) => state.general);
//   const dispatch = useAppDispatch();

//   const handlePreview = async (file: UploadFile) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj as FileType);
//     }

//     setPreviewImage(file.url || (file.preview as string));
//     setPreviewOpen(true);
//   };

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
//     key: any
//   ) => {
//     dispatch(
//       setNotificationItemSendInfo({
//         ...notificationItemSendInfo,
//         [key]: e.target.value,
//       })
//     );
//   };

//   const handleImageChange: UploadProps["onChange"] = ({
//     fileList: newFileList,
//   }) => {
//     dispatch(setFileList(newFileList));
//   };

//   const handleBeforeUpload = (file: File) => {
//     handleImageSelect(file);
//     return false; // Prevent automatic upload
//   };

//   const handleRequired = (field: string) => {
//     const fieldValue = notificationItemSendInfo[field];
//     return fieldValue === "" || fieldValue === undefined || fieldValue === null;
//   };

//   const uploadButton = (
//     <button
//       style={{ border: 0, background: "none", color: "white" }}
//       type="button"
//     >
//       <PlusOutlined />
//       <div style={{ marginTop: 8 }}>Upload</div>
//     </button>
//   );

//   return (
//     <>
//       <div>
//         <Space direction="vertical" style={{ width: "100%", padding: "20px" }}>
//           <Row>
//             <Col span={4} className={styles["item-font"]}>
//               <BiRename />
//               <Text className={styles["text-font-size2"]}>Ady: </Text>
//             </Col>
//             <Col span={8}>
//               <Input
//                 value={notificationItemSendInfo?.titleRu}
//                 required
//                 onChange={(e: ChangeEvent<HTMLInputElement>) =>
//                   handleChange(e, "titleRu")
//                 }
//                 type="text"
//                 style={{ width: "100%" }}
//                 status={
//                   handleRequired("titleRu") && hasEmtpy ? "error" : undefined
//                 }
//               />
//               {handleRequired("titleRu") && hasEmtpy ? (
//                 <span style={{ color: "red" }}>**Ady girizilmedik!!!</span>
//               ) : null}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={4} className={styles["item-font"]}>
//               <BiRename />
//               <Text className={styles["text-font-size2"]}>Tekst: </Text>
//             </Col>
//             <Col span={8}>
//               <TextArea
//                 value={notificationItemSendInfo?.bodyRu}
//                 maxLength={10}
//                 required
//                 onChange={(e) => handleChange(e, "bodyRu")}
//                 rows={6}
//                 status={
//                   handleRequired("bodyRu") && hasEmtpy ? "error" : undefined
//                 }
//               />
//               {handleRequired("bodyRu") && hasEmtpy ? (
//                 <span style={{ color: "red" }}>**Ady girizilmedik!!!</span>
//               ) : null}
//             </Col>
//           </Row>
//           <Row>
//             <Col span={4} className={styles["item-font"]}>
//               <BsCardImage />
//               <Text className={styles["text-font-size2"]}>Web Suraty: </Text>
//             </Col>
//             <Col
//               span={6}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Upload
//                 maxCount={1}
//                 style={{
//                   height: "500px",
//                   width: "500px",
//                 }}
//                 listType="picture-card"
//                 fileList={fileList}
//                 onPreview={handlePreview}
//                 onChange={handleImageChange}
//                 beforeUpload={handleBeforeUpload}
//               >
//                 {fileList.length >= 1 ? null : uploadButton}
//               </Upload>
//               {previewImage && (
//                 <Image
//                   style={{
//                     height: "300px",
//                     width: "300px",
//                   }}
//                   wrapperStyle={{
//                     display: "none",
//                     height: "300px",
//                     width: "300px",
//                   }}
//                   preview={{
//                     visible: previewOpen,
//                     onVisibleChange: (visible) => setPreviewOpen(visible),
//                     afterOpenChange: (visible) =>
//                       !visible && setPreviewImage(""),
//                   }}
//                   src={previewImage}
//                 />
//               )}
//             </Col>
//           </Row>
//         </Space>
//       </div>
//     </>
//   );
// };

// export default Russian;

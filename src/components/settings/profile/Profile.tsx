import { FC } from "react";
import styles from "../../../styles/settingsModal.module.scss";
import { FileImageOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Divider } from "antd";
import ProfileInfo from "./ProfileInfo";
// import PictureChange from './PictureChange';

const Profile: FC<{ setProfileType: any; profileType: string }> = ({
  profileType,
  setProfileType,
}) => {
  const { t } = useTranslation();
  const profilePicture = (
    <div className={styles["profilePictureContainer"]}>
      <div className={styles["left"]}>
        <FileImageOutlined />
        <p>{t("ProfilePicture")}</p>
      </div>
      <div
        className={styles["right"]}
        onClick={() => setProfileType("picture")}
      >
        <RightOutlined style={{ marginLeft: "10px", color: "grey" }} />
      </div>
    </div>
  );
  return (
    <div className={styles["container"]}>
      {profileType === "main" && (
        <>
          <p className={styles["title"]}>Your Profile</p>
          {profilePicture}
          <Divider style={{ margin: "10px 0" }} />
          <ProfileInfo setProfileType={setProfileType} />
        </>
      )}
      {/* {profileType === "picture" && (
        <PictureChange setProfileType={setProfileType} />
      )} */}
    </div>
  );
};

export default Profile;

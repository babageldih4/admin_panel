import { FC, useState } from "react";
import { Modal, Typography, Grid, Menu } from "antd";
import { SettingOutlined, UserOutlined } from "@ant-design/icons";
import { styled } from "styled-components";
import Profile from "./profile/Profile";
import General from "./General";
import { setIsSettingsModalOpen } from "../../store/general/generalSlice";
import styles from "../../styles/settingsModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const StyledModal = styled(Modal)`
  //   &.ant-modal .ant-modal-content {
  //     background-color: var(--ant-color-bg-container);
  //     padding: 10px 0 0;
  //     height: 100%;
  //     min-height: 400px;
  //     & .title {
  //       background-color: var(--ant-color-bg-container);
  //     }
  //   }
`;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
};

const SettingsModal: FC = () => {
  const [profileType, setProfileType] = useState("main");
  const [settingsType, setSettingsType] = useState("profile");

  const screens = useBreakpoint();
  const dispatch = useAppDispatch();

  const { isSettingsModalOpen } = useAppSelector((state) => state.general);
  const menuItems: MenuItem[] = [
    { key: "profile", icon: <UserOutlined />, label: "Account & Profile" },
    { key: "general", icon: <SettingOutlined />, label: "General" },
  ];

  const disabledMenuItems = ["notification", "help"];

  const menu = (
    <Menu
      mode={screens.xs ? "horizontal" : "vertical"}
      selectedKeys={[settingsType]}
      onSelect={({ key }) => {
        setSettingsType(key);
      }}
      style={{ minHeight: !screens.xs ? "410px" : undefined }}
    >
      {menuItems.map((item) => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          disabled={disabledMenuItems?.includes(item?.key)}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <StyledModal
      footer={null}
      centered
      title={
        <Text
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Settings
        </Text>
      }
      open={isSettingsModalOpen}
      onOk={() => {
        dispatch(setIsSettingsModalOpen(false));
        setProfileType("main");
      }}
      onCancel={() => {
        dispatch(setIsSettingsModalOpen(false));
        setProfileType("main");
      }}
      className={styles["modal"]}
    >
      <div
        style={{
          display: !screens.xs ? "flex" : "block",
          borderTop: "0.5px solid #d3d3d3",
        }}
      >
        <div
          style={{
            width: !screens.xs ? "55%" : "100%",
            borderRight: !screens.xs ? "0.5px solid #d3d3d3" : undefined,
          }}
        >
          {menu}
        </div>

        {settingsType === "profile" && (
          <Profile profileType={profileType} setProfileType={setProfileType} />
        )}

        {settingsType === "general" && <General />}
      </div>
    </StyledModal>
  );
};

export default SettingsModal;

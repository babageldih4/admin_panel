import React from "react";
import { Divider, Menu, Typography } from "antd";
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import styled from "styled-components";
import { useAppDispatch } from "../../store/hooks";
import { useNavigate } from "react-router-dom";
import SettingsModal from "../settings/SettingsModal";
import {
  setIsPopoverOpen,
  setIsSettingsModalOpen,
} from "../../store/general/generalSlice";
import { logout } from "../../functions/index";

const StyledDropdown = styled("div")`
  width: unset !important;
  min-width: 200px !important;
  & .ant-popover {
    width: auto !important;
  }

  & .ant-menu {
    background-color: var(--ant-layout-color-bg-body) !important;
    border-inline-end: unset !important;
    & .ant-menu-item-selected {
      background-color: unset !important;
    }
    & .ant-menu-item {
      display: flex;
      align-items: center !important;
      padding: 0 !important;
      display: flex !important;

      &:hover {
        background-color: unset !important;
      }
    }
    & .ant-menu-title-content {
      width: 100%;
    }
  }
`;

type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
};

const ProfileDropdown: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { me } = useAppSelector((state) => state.general);

  const handleNotificationsClick = () => {
    navigate("/notifications");
  };

  // const listItemWithTag = (label: string, tag: string) => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "space-between",
  //         gap: "10px",
  //         width: "100%",
  //       }}
  //     >
  //       <span>{t(label)}</span>
  //       <span>
  //         <Tag
  //           color="default"
  //           style={{ marginInlineEnd: "2px", fontSize: "9px" }}
  //         >
  //           {isMac() ? "cmd" : "ctrl"}
  //         </Tag>
  //         <Tag
  //           color="default"
  //           style={{ marginInlineEnd: "2px", fontSize: "9px" }}
  //         >
  //           shift
  //         </Tag>
  //         <Tag
  //           color="default"
  //           style={{ marginInlineEnd: "2px", fontSize: "9px" }}
  //         >
  //           {tag}
  //         </Tag>
  //       </span>
  //     </div>
  //   );
  // };

  const menuItems: MenuItem[] = [
    {
      key: "notifications",
      icon: <IoIosNotificationsOutline />,
      label: "Notifications",
    },
    {
      key: "settings",
      icon: <IoSettingsOutline />,
      label: "Settings",
    },
    {
      key: "logout",
      icon: <AiOutlineLogout />,
      label: "Logout",
    },
  ];

  const handleMenuItemClick = (key: string) => {
    if (key === "logout") {
      logout();
      navigate("/login");
    } else if (key === "notifications") {
      handleNotificationsClick();
    } else if (key === "settings") {
      dispatch(setIsSettingsModalOpen(true));
    }
  };

  const menu = (
    <Menu
      onClick={(e) => {
        handleMenuItemClick(e.key);
        dispatch(setIsPopoverOpen(false));
      }}
      selectedKeys={[""]}
    >
      {menuItems.map((item) => (
        <>
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
          {item?.key === "settings" || item.key === "keyboardShortcuts" ? (
            <Divider style={{ margin: "2px" }} />
          ) : (
            ""
          )}
        </>
      ))}
    </Menu>
  );

  return (
    <StyledDropdown className="profile-dropdown">
      <Typography.Text>Agamyrat Teacher</Typography.Text>
      {/* <EmployeeAbout employee={me} shortSurnamed={false} /> */}
      <Divider style={{ margin: "5px" }} />
      {menu}
      <SettingsModal />
    </StyledDropdown>
  );
};

export default ProfileDropdown;

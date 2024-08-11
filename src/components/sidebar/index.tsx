import { useState } from "react";
import Sider from "antd/es/layout/Sider";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsSidebarOpen } from "../../store/general/generalSlice";
import { Avatar, Button, Divider, Drawer, Grid, Menu, Typography } from "antd";
const { useBreakpoint } = Grid;
import e_commerce_logo2 from "../../../public/e_commerce_logo2.ico";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/sidebar.module.scss";
import { styled } from "styled-components";
import SiderItems from "./SiderItems";
import Scrollbar from "../scrollbar";

const StyledMenu = styled(Menu)`
  border-inline-end: unset !important;
  height: 100vh !important;
`;
const StyledDrawer = styled(Drawer)`
  background-color: var(--ant-color-bg-container);
  & .ant-drawer-body {
    padding: 0;
    position: relative;
  }
`;
const { Text } = Typography;

function SideBarComponent() {
  const { isSidebarOpen, userTheme } = useAppSelector((state) => state.general);
  const [localSearch, setLocalSearch] = useState<string>("");
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const activeMode = () => {
    return location.pathname.split("/").splice(0, 2).join("/");
  };

  const doesItemIncludeSearch = (item1: any) => {
    if (!item1) return false;
    const label = "label" in item1 ? item1.label : "";
    const labelLower = (label ?? "").toLowerCase();
    const searchLower = localSearch.toLowerCase();
    const index = labelLower.indexOf(searchLower);
    if (index !== -1) {
      const highlightedLabel = (
        <span>
          {label?.substring(0, index)}
          <span
            style={{
              backgroundColor:
                userTheme?.mode === "dark" ? "orange" : "#ffd591",
            }}
          >
            {label?.substr(index, localSearch.length)}
          </span>
          {label?.substring(index + localSearch.length)}
        </span>
      );
      item1.label = highlightedLabel;

      return true;
    }
    if ("children" in item1 && Array.isArray(item1.children)) {
      for (const child of item1.children) {
        if (doesItemIncludeSearch(child)) {
          return true;
        }
      }
    }

    return false;
  };

  const logoWithOpenSection = () => {
    return (
      <div
        style={{
          flexDirection:
            isSidebarOpen || (!isSidebarOpen && !screens.lg) ? "row" : "column",
        }}
        className={styles["sidebar-logo-open-control"]}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar src={e_commerce_logo2} size={40} shape="circle"></Avatar>
          {(isSidebarOpen || !screens.lg) && (
            <div style={{ marginLeft: "10px" }}>
              <Text
                type="warning"
                style={{
                  fontSize: "30px",
                }}
              >
                timar
              </Text>
            </div>
          )}
        </div>
        <Button
          type="text"
          icon={
            isSidebarOpen ? <DoubleLeftOutlined /> : <DoubleRightOutlined />
          }
          onClick={() => dispatch(setIsSidebarOpen(!isSidebarOpen))}
          className={styles["sidebar-open-button"]}
        />
      </div>
    );
  };
  const menuSection = () => {
    return (
      <StyledMenu
        selectedKeys={[activeMode()]}
        onSelect={({ key }) => {
          navigate(key);
        }}
        style={{
          color: "#002453",
          fontSize: "16px",
          fontWeight: "10px",
        }}
        className={styles["menu-section"]}
        mode="inline"
        // items={SiderItems().filter((e) => {
        //   return doesItemIncludeSearch(e);
        // })}
        items={SiderItems().filter((el) => el.shouldDisplay === true)}
        onClick={(e) => {
          navigate(`${e.key}`, { replace: true });
        }}
      />
    );
  };
  return screens.lg ? (
    <Sider
      breakpoint="lg"
      width={250}
      trigger={null}
      collapsible
      collapsed={!isSidebarOpen}
      onCollapse={(value) => dispatch(setIsSidebarOpen(!value))}
      className={styles["sidebar"]}
    >
      {logoWithOpenSection()}
      <Divider style={{ margin: "10px 0" }} />

      <Scrollbar>{menuSection()}</Scrollbar>
    </Sider>
  ) : (
    <StyledDrawer
      placement="left"
      closable={true}
      onClose={() => {
        dispatch(setIsSidebarOpen(false));
      }}
      closeIcon={""}
      width={280}
      open={isSidebarOpen}
      title={logoWithOpenSection()}
    >
      <Scrollbar>{menuSection()}</Scrollbar>
    </StyledDrawer>
  );
}

export default SideBarComponent;

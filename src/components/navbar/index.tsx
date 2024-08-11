import { MenuOutlined } from "@ant-design/icons";
import { Button, Grid, Popover, Avatar } from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LanguageSelect from "../LanguageSelect";
// import ProfileDropdown from "../sidebar/ProfileDropdown";
import styles from "../../styles/navbar.module.scss";
import Breadcrumbs from "./Breadcrumbs";
import {
  setIsPopoverOpen,
  setIsSidebarOpen,
} from "../../store/general/generalSlice";
import SearchComponent from "../searchComponent";
import { FC, useEffect, useRef } from "react";
import ProfileDropdown from "./ProfileDropdown";
import SearchDrawer from "../searchDrawer";

const { useBreakpoint } = Grid;
const Navbar: FC = () => {
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();
  const { isPopoverOpen } = useAppSelector((state) => state.general);
  // const pathname = useLocation()?.pathname;
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleDocumentClick = (e: any) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        dispatch(setIsPopoverOpen(false));
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [dispatch]);

  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar-top"]}>
        {screens.lg ? <Breadcrumbs /> : ""}
        {!screens.lg && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => dispatch(setIsSidebarOpen(true))}
            style={{
              fontSize: "14px",
              width: "unset",
              height: "unset",
              padding: 0,
            }}
          />
        )}
        <div className={styles["navbar-items"]}>
          <SearchComponent />
          <SearchDrawer />

          <LanguageSelect />

          <div ref={popoverRef}>
            <Popover
              open={isPopoverOpen}
              overlayStyle={
                {
                  // width: "100px",
                }
              }
              content={<ProfileDropdown />}
              trigger="click"
              placement="bottomRight"
              style={{
                backgroundColor: "var(--ant-layout-color-bg-body) !important",
              }}
            >
              <div
                className={styles["avatar-and-name"]}
                onClick={() => dispatch(setIsPopoverOpen(!isPopoverOpen))}
              >
                <Avatar size="large" shape="square">
                  AÇ
                </Avatar>
                {/* <EmployeeAvatar employee={me} clickable={false} /> */}
              </div>
            </Popover>
          </div>
        </div>
        {/* {!pathname?.includes("Notes") ? <NoteDrawer /> : null}
        <ConflictModal /> */}
      </div>
    </nav>
  );
};

export default Navbar;

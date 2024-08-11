import { type FC, useRef, useEffect } from "react";
import { Layout, Button, Avatar, Space, Popover } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setIsPopoverOpen } from "../../store/general/generalSlice";
import ProfileDropdown from "./ProfileDropdown";

const { Header } = Layout;

interface HeaderComponentProps {
  toggleSidebar: () => void;
  collapsed: boolean;
}

// interface PopoverContentType {
//   key: string | number;
//   icon: ReactNode;
//   label: string;
// }

const HeaderComponent: FC<HeaderComponentProps> = ({
  toggleSidebar,
  collapsed,
}) => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();
  const { isPopoverOpen } = useAppSelector((state) => state.general);
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
    <Header
      className="site-layout-background"
      style={{ padding: 0, display: "flex", alignItems: "center" }}
    >
      <Space
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: "0px 5px",
        }}
      >
        <Button onClick={toggleSidebar} style={{ marginLeft: 16 }}>
          {collapsed ? (
            <MenuUnfoldOutlined size={20} />
          ) : (
            <MenuFoldOutlined size={20} />
          )}
        </Button>

        <div ref={popoverRef}>
          <Popover
            content={<ProfileDropdown />}
            trigger="click"
            placement="bottomRight"
            open={isPopoverOpen}
          >
            <div onClick={() => dispatch(setIsPopoverOpen(!isPopoverOpen))}>
              {" "}
              <Avatar size="large">AÇ</Avatar>
            </div>
          </Popover>
        </div>
      </Space>
    </Header>
  );
};

export default HeaderComponent;

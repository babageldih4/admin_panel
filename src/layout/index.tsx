import { type FC, Suspense } from "react";
import { FloatButton, Grid, Layout, Spin } from "antd";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Sidebar from "../components/sidebar/index";
import Navbar from "../components/navbar/index";
import styles from "../styles/mainLayout.module.scss";
import ProgressBar from "../components/progress-bar";
// import TagsView from "../components/tagView";
import "./index.css";
import Header from "../components/navbar/Header";

const { Content } = Layout;
const { useBreakpoint } = Grid;

const MainLayout: FC = () => {
  const { isSidebarOpen, userTheme } = useAppSelector((state) => state.general);
  const screens = useBreakpoint();

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <ProgressBar />
      <Sidebar />
      <Layout
        className={styles["main-layout-container"]}
        style={{
          width: !screens.lg
            ? "100%"
            : isSidebarOpen
            ? "calc(100% - 250px)"
            : "calc(100% - 80px)",
          paddingLeft: !screens.lg ? "0" : isSidebarOpen ? "250px" : "80px",
          minHeight: "100vh",
        }}
      >
        <Navbar />

        <FloatButton.BackTop visibilityHeight={400} />
        <Suspense
          fallback={
            <Spin
              size="large"
              style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                alignItems: "center",
              }}
            />
          }
        >
          <Content
            className={styles["content"]}
            style={{
              padding: "5px",
            }}
          >
            {/* <TagsView /> */}

            <Outlet />
          </Content>
        </Suspense>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

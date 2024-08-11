import { useState } from "react";
import { Divider, Select, Switch, Button } from "antd";
import styles from "../../styles/settingsModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { setUserTheme } from "../../store/general/generalSlice";
import screenfull from "screenfull";
import { SvgIcon } from "../icon/index";

const General = () => {
  const { userTheme } = useAppSelector((state) => state.general);
  const [isFullscreen, setIsFullscreen] = useState(screenfull.isFullscreen);
  const dispatch = useAppDispatch();
  const oneRow = (props: {
    label: string;
    children: any;
    isSection?: boolean;
    style?: any;
  }) => {
    const { label, children, style = "column" } = props;
    return (
      <div
        className={styles["one-row"]}
        style={{
          flexDirection: style,
          justifyContent: style === "row" ? "space-between" : "flex-start",
          marginBottom: style === "row" ? "15px" : "10px",
        }}
      >
        <div className={styles["top"]}>{label}</div>
        <div className={styles["bottom"]}>{children}</div>
      </div>
    );
  };

  const colorSquare = (color: string) => {
    return (
      <div
        style={{ height: "15px", width: "30px", backgroundColor: color }}
      ></div>
    );
  };
  const themeColorOptions = [
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {colorSquare("#1677ff")}
          <div>blue</div>
        </div>
      ),
      value: "#1677ff",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {colorSquare("#ff4d4f")}
          <div>red</div>
        </div>
      ),
      value: "#ff4d4f",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {colorSquare("#52c41a")}
          <div>green</div>
        </div>
      ),
      value: "#52c41a",
    },
    {
      label: (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {colorSquare("#faad14")}
          <div>orange</div>
        </div>
      ),
      value: "#faad14",
    },
  ];

  const handleThemeChange = (e: any, type: string) => {
    const tempValue = type === "mode" ? (e ? "dark" : "light") : e;
    const themeTemp = {
      ...userTheme,
      [type]: tempValue,
    };
    dispatch(setUserTheme(themeTemp));
    console.log(themeTemp);
    localStorage.setItem("userTheme", JSON.stringify(themeTemp));
  };

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
      setIsFullscreen(!isFullscreen);
    }
  };
  return (
    <div className={styles["container"]}>
      {oneRow({
        label: "Modes",
        children: (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              onChange={(e) => handleThemeChange(e, "mode")}
              checked={userTheme?.mode === "dark"}
              checkedChildren={<MoonOutlined />}
              unCheckedChildren={<SunOutlined />}
            />
            {/* {userTheme?.mode === "dark" ? t("Dark") : t("Light")} */}
          </div>
        ),
        style: "row",
      })}
      <Divider style={{ margin: "8px 0" }} />
      {oneRow({
        label: "Compactness",
        children: (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              onChange={(e) => handleThemeChange(e, "compact")}
              checked={userTheme?.compact}
            />
            {/* {userTheme?.compact ? t('Compact') : t('Wide')} */}
          </div>
        ),
        style: "row",
      })}
      {oneRow({
        label: "Stretch",
        children: (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Switch
              onChange={(e) => handleThemeChange(e, "stretch")}
              checked={userTheme?.stretch}
            />
            {/* <Switch
              onChange={() => dispatch(setUserThemeStretch(!userThemeStretch))}
              checked={userThemeStretch}
            /> */}
          </div>
        ),
        style: "row",
      })}
      <Divider style={{ margin: "8px 0" }} />
      {oneRow({
        label: "Language",
        children: (
          <Select
            // onChange={(e) => {
            //   onSelectLang(e);
            // }}
            // value={language}
            style={{ width: "100%" }}
            // options={languages}
          />
        ),
      })}

      {oneRow({
        label: "ThemeColor",
        children: (
          <Select
            onChange={(e) => handleThemeChange(e, "colorPrimary")}
            value={userTheme?.colorPrimary}
            style={{ width: "100%" }}
            options={themeColorOptions}
          />
        ),
      })}
      <Button type="dashed" block size="large" onClick={toggleFullScreen}>
        <div className="flex items-center justify-center">
          {isFullscreen ? (
            <>
              <SvgIcon
                icon="ic-settings-exit-fullscreen"
                // color={colorPrimary}
                className="!m-0"
              />
              <span className="ml-2">Exit FullScreen</span>
            </>
          ) : (
            <>
              <SvgIcon icon="ic-settings-fullscreen" className="!m-0" />
              <span className="ml-2 text-gray">FullScreen</span>
            </>
          )}
        </div>
      </Button>
    </div>
  );
};

export default General;

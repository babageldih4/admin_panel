import styles from "../../styles/header.module.scss";
import { useAppSelector } from "../../store/hooks";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
// import HeaderButtons from "../HeaderButtons";
import React, { useCallback } from "react";
import { TButtonObjProps } from "../../types/generalType";
import Paragraph from "antd/es/typography/Paragraph";
import { Divider } from "antd";
import SearchComponent from "../searchComponent";
import SearchModal from "../searchDrawer";

function Header({
  buttonsObj,
  renderedIn = "",
}: // renderedIn,
{
  buttonsObj: TButtonObjProps;
  renderedIn?: string;
}) {
  const { breadcrumbs, language } = useAppSelector((state) => state.general);
  const { search = true, header = "" } = buttonsObj;

  const navigate = useNavigate();

  const heading = useCallback(() => {
    const headerTranslation = breadcrumbs[breadcrumbs?.length - 1]?.title;
    return (
      <h2 style={{ width: "100%" }}>
        {header !== "" ? (
          <div style={{ wordBreak: "break-all" }}>
            <Paragraph
              ellipsis={true}
              style={{
                width: "100%",
                fontSize: "var(--ant-font-size-xl)",
                marginBottom: "0",
              }}
            >
              <ArrowLeftOutlined
                style={{ marginRight: "10px" }}
                onClick={() => {
                  navigate(-1);
                }}
              />
              {header}
            </Paragraph>
          </div>
        ) : (
          headerTranslation
        )}
      </h2>
    );
  }, [language, breadcrumbs]);

  return (
    <>
      <Divider style={{ margin: "0" }} />
      <div className={styles["header"]}>
        {search ? (
          <div className={styles["header-middle"]}>{heading()}</div>
        ) : (
          ""
        )}

        <div className={styles["header-bottom"]}>
          {!search ? (
            <div className={styles["header-middle"]}>{heading()}</div>
          ) : (
            ""
          )}
          <SearchComponent renderedIn={renderedIn} />
          <SearchModal />
          {/* <HeaderButtons buttonsObj={buttonsObj} renderedIn={renderedIn} /> */}
        </div>
      </div>
    </>
  );
}

export default Header;

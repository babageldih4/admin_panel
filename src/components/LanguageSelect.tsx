import { Dropdown } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { GlobalOutlined } from "@ant-design/icons";
import { useAppSelector } from "../store/hooks";
import styled from "styled-components";

const StyledDiv = styled("div")`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: var(--ant-color-text);
`;

const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();
  const { languages } = useAppSelector((state) => state.general);

  return (
    <Dropdown
      menu={{ items: languages }}
      placement="bottomLeft"
      arrow
      trigger={["click"]}
    >
      <StyledDiv>
        <GlobalOutlined style={{ fontSize: "var(--ant-font-size-lg)" }} />
        <div>
          {
            languages?.filter(
              (item: { label: string; key: string }) =>
                item?.key === i18n.language
            )[0]?.label
          }
        </div>
      </StyledDiv>
    </Dropdown>
  );
};

export default LanguageSelect;

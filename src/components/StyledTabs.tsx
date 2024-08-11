import { Tabs } from "antd";
import React from "react";
import { styled } from "styled-components";

const StyledTabs = styled(Tabs)`
  & .ant-tabs-nav {
    padding: 0 20px;
    background-color: var(--ant-color-bg-container);
    margin: 0;
    position: sticky;
  }
  & .ant-tabs-tab {
    font-size: 18px;
    position: sticky;
  }

  & .ant-tabs-tab-btn {
    font-size: 18px;
    position: sticky;
  }
`;
export default React.memo(StyledTabs);

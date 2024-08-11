import type { FC } from "react";

import { SettingOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useDispatch } from "react-redux";

// import { LocaleFormatter } from '@/locales';
import {
  removeAllTag,
  removeOtherTag,
  removeTag,
} from "../../store/tagsView/tags-view.store";
import { useAppSelector } from "../../store/hooks";

const TagsViewAction: FC = () => {
  const { activeTagId } = useAppSelector((state) => state.tagsView);
  const dispatch = useDispatch();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "0",
            onClick: () => dispatch(removeTag(activeTagId)),
            // label: <LocaleFormatter id="tagsView.operation.closeCurrent" />,
            label: "Close current",
          },
          {
            key: "1",
            onClick: () => dispatch(removeOtherTag()),
            // label: <LocaleFormatter id="tagsView.operation.closeOther" />,
            label: "Close Other",
          },
          {
            key: "2",
            onClick: () => dispatch(removeAllTag()),
            // label: <LocaleFormatter id="tagsView.operation.closeAll" />,
            label: "Close All",
          },
          {
            key: "3",
            type: "divider",
          },
          {
            key: "4",
            onClick: () => dispatch(removeOtherTag()),
            // label: <LocaleFormatter id="tagsView.operation.dashboard" />,
            label: "Dashboard",
          },
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;

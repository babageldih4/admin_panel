import styles from "../../styles/sort.module.scss";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { default as ReactSelect } from "react-select";
import "./sort.scss";
import styled from "styled-components";

type TProps = {
  states?: any;
  handleOkButton?: any;
  searchPlaceholder?: string;
  sortValue?: any;
  localSendState?: any;
  setLocalSendState?: any;
};
const StyledReactSelect = styled(ReactSelect)`
  & .react-select__control {
    background-color: var(--ant-color-bg-container) !important;
  }
  & .react-select__menu {
    background-color: var(--ant-color-bg-container) !important;
  }

  & .react-select__option {
    &:hover {
      // background-color: unset;
      color: #000;
      cursor: pointer;
    }
  }
  & .react-select__single-value {
    color: var(--ant-color-text);
  }
`;

function Sort(props: TProps) {
  const { states, sortValue, localSendState, setLocalSendState } = props;
  const { sendInfo } = states;
  const { t } = useTranslation();
  const getDefaultValue = () => {
    if (
      localSendState?.orderName === undefined ||
      localSendState?.orderType === null
    )
      return null;
    return sortValue.find(
      (option: any) =>
        option?.value?.orderName === localSendState?.orderName &&
        option?.value?.orderType === localSendState?.orderType
    );
  };

  useEffect(() => {
    setLocalSendState(sendInfo);
  }, [sendInfo]);
  const handleInputChange = (e: any) => {
    setLocalSendState({
      ...localSendState,
      ...e.value,
    });
  };
  return sortValue ? (
    <div className={styles["sort-div"]}>
      <div className={styles["sort-header"]}>Tertiplemek </div>
      <StyledReactSelect
        value={getDefaultValue()}
        onChange={(e) => handleInputChange(e)}
        options={sortValue}
        isSearchable={true}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="Saýlaň"
        isMulti={false}
      />
    </div>
  ) : (
    <></>
  );
}

export default React.memo(Sort);

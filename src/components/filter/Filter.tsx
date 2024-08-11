import DebounceSelect from "../../hooks/DebounceSelect";
import { DatePicker, Input, Select } from "antd";
import { styled } from "styled-components";
import styles from "../../styles/filter.module.scss";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import { TOption, TOptions } from "../../types/generalType";
// import SkillFilterModal from "./SkillFilterModal";
import { separateDateTimeFormat } from "../../functions/index";
import dayjs from "dayjs";
type TProps = {
  states?: any;
  handleOkButton?: any;
  searchPlaceholder?: string;
  filterValue?: any;
  localSendState?: any;
  setLocalSendState?: any;
  handleClose?: any;
};

const StyledSelect = styled(Select)`
  min-width: 150px;
  & .ant-select-selector {
    border: none !important;
    // padding-right: 0 !important;
    box-shadow: none !important;
  }
  & .ant-select-selection-search {
    margin-right: 0 !important;
  }
`;
const StyledInput = styled(Input)`
  min-width: 150px;
  border: none;

  &:focus-within {
    border: none;
    box-shadow: none !important;
  }
`;

const StyledDebounceSelect = styled(DebounceSelect)`
  box-sizing: border-box;
  & .ant-select-selector {
    min-width: 150px;
    border: none !important;
    padding-right: 0 !important;
    box-shadow: none !important;
  }
  & .ant-select-selection-placeholder {
    padding-right: 10px;
  }

  & .ant-select-selection-overflow-item {
    padding-right: 10px;
  }

  & .ant-select-selection-overflow {
    max-width: unset;
  }
  & .ant-select-selection-search {
    margin-right: 10px;
  }
`;
function Filter(props: TProps) {
  const { states, filterValue, localSendState, setLocalSendState } = props;
  const { sendInfo } = states;
  const { t } = useTranslation();

  const handleChange = (newValue: any, value: string | number) => {
    let valueToSet = newValue;
    valueToSet = newValue?.map((nv: any) => {
      if (typeof nv?.label === "string") {
        return nv;
      }
      return nv?.label?.props?.option;
    });
    setLocalSendState({ ...localSendState, [value]: valueToSet });
  };
  useEffect(() => {
    setLocalSendState(sendInfo);
  }, [sendInfo]);

  const reactSelect = (filter: {
    name: string;
    value: string | number;
    options: TOptions | TOption[];
    fetchOptions: (search: string) => Promise<any[]>;
    withSearch?: boolean;
    hide?: boolean;
    selectType?: string;
    isMultiple?: boolean;
    inputType?: string;
    translateName?: boolean;
  }) => {
    const {
      name,
      value,
      options,
      fetchOptions,
      withSearch = true,
      hide = false,
      selectType = "",
      isMultiple = false,
      inputType = "select",
      translateName = true,
    } = filter;

    return !hide ? (
      <div
        className={styles["select-div"]}
        key={name}
        style={{ width: selectType ? "97%" : "auto" }}
      >
        <div className={styles["select-name"]}>
          {translateName ? t(name) : name}
        </div>
        {inputType === "select" ? (
          withSearch ? (
            <StyledDebounceSelect
              mode="multiple"
              value={localSendState[value]}
              placeholder={t("All0")}
              fetchOptions={fetchOptions}
              onChange={(newValue) => {
                handleChange(newValue, value);
              }}
              style={{ width: "100%" }}
              options={"data" in options ? options?.data : options}
              type={selectType}
              labelInValue={true}
            />
          ) : (
            <StyledSelect
              value={
                isMultiple ||
                (localSendState[value] !== null &&
                  localSendState[value] !== undefined)
                  ? localSendState[value] === ""
                    ? undefined
                    : localSendState[value]
                  : ""
              }
              style={{ width: "100%" }}
              onChange={(newValue) => {
                if (value === "refModel") {
                  setLocalSendState({
                    ...localSendState,
                    [value]: newValue,
                    refUuids: [],
                  });
                } else {
                  setLocalSendState({ ...localSendState, [value]: newValue });
                }
              }}
              options={options as TOption[]}
              mode={isMultiple ? "multiple" : undefined}
              placeholder={t("All1")}
            />
          )
        ) : inputType === "number" || inputType === "text" ? (
          <StyledInput
            placeholder={t("InputPlaceholder")}
            value={localSendState[value]}
            onChange={(e) =>
              setLocalSendState({ ...localSendState, [value]: e.target.value })
            }
            type={inputType}
          />
        ) : (
          // <Button
          //   style={{ border: "unset", borderLeft: "1px solid #d9d9d9" }}
          //   onClick={handleAddSkill}
          // >
          //   {localSendState?.skillUuids?.length ? (
          //     <span>
          //       {" "}
          //       {`${t("selected")} (${localSendState?.skillUuids?.length})`}
          //     </span>
          //   ) : (
          //     t("Select")
          //   )}
          // </Button>
          // ) :
          <DatePicker
            value={
              localSendState?.[value] ? dayjs(localSendState?.[value]) : ""
            }
            format={separateDateTimeFormat(me?.datetimeStyle)?.dateFormat}
            placeholder={t("Select") ?? ""}
            onChange={(e: any) => {
              setLocalSendState({ ...localSendState, [value]: e });
            }}
            allowClear={true}
            style={{ width: "100%", borderRadius: "2px" }}
          />
        )}
      </div>
    ) : (
      ""
    );
  };

  return filterValue?.length ? (
    <div className={styles["filter-div"]}>
      <div className={styles["filter-header"]}>Filterlemek </div>
      <div className={styles["filters"]}>
        {filterValue.map((filter: any) => reactSelect(filter))}
      </div>
    </div>
  ) : null;
}

export default React.memo(Filter);

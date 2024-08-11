import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import debounce from "lodash/debounce";
import { Avatar, Grid, Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import {
  BankOutlined,
  BarcodeOutlined,
  RobotOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { TOption } from "../types/generalType";
import styled from "styled-components";
import { backendUrl } from "../plugins/axios";
import { useTranslation } from "react-i18next";
const { useBreakpoint } = Grid;

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => void;
  debounceTimeout?: number;
  options: any;
  type?: string;
  labelInValue?: boolean;
  debounceSearch?: boolean;
}

const StyledAvatar = styled(Avatar)`
  img {
    object-fit: contain;
  }
`;
function DebounceSelect<ValueType extends TOption = any>({
  fetchOptions,
  debounceTimeout = 800,
  type = "",
  options,
  labelInValue = false,
  debounceSearch = true,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [selectOptions, setSelectOptions] = useState<ValueType[]>(options);
  const fetchRef = useRef(0);
  const screens = useBreakpoint();
  const { t } = useTranslation();

  const CustomEmployeeOption = useCallback(({ option }: { option: any }) => {
    const splittedLabel = option?.label?.split(" ");
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          opacity: option?.isBlocked ? 0.6 : 1,
        }}
      >
        <Avatar
          src={`${backendUrl}/employee/100_${option?.avatar}`}
          shape="square"
          size={32}
          icon={
            option?.type === "artificial" ? <RobotOutlined /> : <UserOutlined />
          }
        />
        <div style={{ marginLeft: 10, lineHeight: "22px" }}>
          <div>
            {screens?.xs
              ? `${splittedLabel?.[0]} ${splittedLabel?.[1]?.[0]}`
              : option.label}
          </div>
          <div>
            {option?.type === "artificial"
              ? t("ArtificialEmployee")
              : option?.job}
          </div>
        </div>
      </div>
    );
  }, []);
  const CustomCompanyOption = useCallback(
    ({ option }: { option: any }) => (
      <div style={{ display: "flex", alignItems: "center", padding: "5px 0" }}>
        <StyledAvatar
          src={`${backendUrl}/company/100_${option?.logo}`}
          shape="square"
          size={40}
          icon={<BankOutlined />}
        />
        <div style={{ marginLeft: 10, lineHeight: "22px" }}>
          <div>{option.label}</div>
        </div>
      </div>
    ),
    []
  );
  const CustomAssetOption = useCallback(
    ({ option }: { option: any }) => (
      <div style={{ display: "flex", alignItems: "center" }}>
        <StyledAvatar
          src={`${backendUrl}/asset/${option?.avatar}`}
          shape="square"
          size={40}
          icon={<BarcodeOutlined />}
          style={{ margin: "5px 0" }}
        />
        <div style={{ marginLeft: 10, lineHeight: "22px" }}>
          <div>{option.label}</div>
        </div>
      </div>
    ),
    []
  );
  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      setSelectOptions([]);
      setFetching(true);
      fetchOptions(value);
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  useEffect(() => {
    setSelectOptions(options);
    setFetching(false);
  }, [options]);
  const transformedOptions = selectOptions?.map((option) => ({
    ...option,
    label:
      type === "employee" ? (
        <CustomEmployeeOption option={option} />
      ) : type === "company" ? (
        <CustomCompanyOption option={option} />
      ) : type === "asset" ? (
        <CustomAssetOption option={option} />
      ) : (
        option?.label
      ),
  }));
  const transformDefaultValue = (defaultValue: ValueType | ValueType[]) => {
    if (!Array.isArray(defaultValue)) {
      let valueToOption =
        typeof defaultValue === "string"
          ? options.find((option: TOption) => option.value === defaultValue)
          : defaultValue;
      return typeof valueToOption?.label === "string"
        ? type === "employee"
          ? {
              ...defaultValue,
              label: <CustomEmployeeOption option={valueToOption} />,
            }
          : type === "company"
          ? {
              ...defaultValue,
              label: <CustomCompanyOption option={valueToOption} />,
            }
          : type === "asset"
          ? {
              ...defaultValue,
              label: <CustomAssetOption option={valueToOption} />,
            }
          : defaultValue
        : defaultValue;
    }

    return defaultValue.map((value) => {
      let valueToOption =
        typeof value === "string"
          ? options.find((option: TOption) => option.value === value)
          : value;
      return typeof valueToOption?.label === "string"
        ? type === "employee"
          ? {
              ...valueToOption,
              label: <CustomEmployeeOption option={valueToOption} />,
            }
          : type === "company"
          ? {
              ...valueToOption,
              label: <CustomCompanyOption option={valueToOption} />,
            }
          : type === "asset"
          ? {
              ...valueToOption,
              label: <CustomAssetOption option={valueToOption} />,
            }
          : value
        : value;
    });
  };

  return (
    <Select
      labelInValue={labelInValue}
      filterOption={false}
      onSearch={debounceSearch ? debounceFetcher : undefined}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={transformedOptions}
      value={props.value ? transformDefaultValue(props.value) : undefined}
      style={{
        borderRadius: "2px !important",
        width: "100%",
        lineHeight: "22px",
      }}
      status={props.status}
      maxTagCount={5}
    />
  );
}

export default React.memo(DebounceSelect);

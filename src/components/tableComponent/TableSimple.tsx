import InfiniteScroll from "react-infinite-scroll-component";
import { Empty, Spin, Table } from "antd";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { ColumnsType } from "antd/es/table";
import StyledContainer from "../StyledContainer";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServerError from "../../pages/error/ServerError";
import styled from "styled-components";
import { TButtonObjProps } from "../../types/generalType";

type ColumnDataType = Record<string, any>;
type TProps = TButtonObjProps;

type TableComponentProps<T extends ColumnDataType> = {
  rowClick?: {
    // clickable: boolean;
    model?: string;
    customFunction?: any;
  };
  columns?: ColumnsType<T>;
  // data: { data: T[]; isLoading?: boolean; isError?: boolean; isEnd?: boolean };
  data: { items: T[]; isLoading?: boolean; isError?: boolean; isEnd?: boolean };
  handleFetchMore: () => void;
  lazy?: boolean;
  scroll?: number | string;
  withModes?: boolean;
  add?: {
    display: boolean;
    function?: () => void;
    name?: string;
  };
  search?: boolean;
  access?: string;
  buttonsObj?: TProps;
  renderedIn?: string;
  emptyComponentPass?: any;
  isSelectable?: boolean;
  hideSelectAll?: boolean;
  handleTableSelect?: (keys: React.Key[]) => void;
  rowClassName?: any;
  selectedRows?: string[];
};

export const StyledTopbar = styled("div")`
  width: 100%;
  background: var(--ant-color-bg-container);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;

function BeforeTableComponent<T extends ColumnDataType>(
  props: TableComponentProps<T>
) {
  const location = useLocation().pathname;
  const defaultRowClassName = (record: T) => {
    return record &&
      typeof record !== "string" &&
      (!("isActive" in record) || record?.isActive)
      ? "active"
      : "passive";
  };
  const {
    rowClick = {
      clickable: true,
      model: location?.split("/")?.[1],
    },
    columns,
    data,
    handleFetchMore,
    rowClassName = defaultRowClassName,
  } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleRowClick = (record: any) => {
    if (rowClick?.customFunction) {
      return {
        onClick: () => {
          rowClick?.customFunction?.(record);
        },
      };
    } else {
      if (rowClick?.clickable) {
        return {
          onClick: () => {
            navigate(`/${rowClick?.model}/${record?.uuid}`);
          },
        };
      } else {
        return {};
      }
    }
  };
  return (
    <StyledContainer style={{ width: "100%", overflowX: "auto" }}>
      {data?.items?.length ? (
        <InfiniteScroll
          dataLength={data?.items?.length}
          next={() => {
            handleFetchMore();
          }}
          hasMore={!data?.isEnd}
          loader={
            <Spin
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
              }}
            />
          }
          endMessage={
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div
                style={{
                  // marginBottom: "20px",
                  color: "var(--ant-color-text-secondary)",
                }}
              >
                {t("NoData")}!
              </div>
            </div>
          }
        >
          <Table
            onRow={(record) => handleRowClick(record)}
            columns={columns}
            dataSource={data?.items}
            scroll={{ x: 1200 }}
            rowKey={uuidv4()}
            pagination={false}
            rowClassName={rowClassName}
          />
        </InfiniteScroll>
      ) : data?.isLoading ? (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "90vh",
          }}
        />
      ) : data?.isError ? (
        <ServerError />
      ) : (
        <Empty />
      )}
    </StyledContainer>
  );
}

const TableComponent = React.memo(
  BeforeTableComponent as React.ComponentType<any>
) as typeof BeforeTableComponent;
export default TableComponent;

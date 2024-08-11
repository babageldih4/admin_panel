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
    clickable: boolean;
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
      clickable:
        true &&
        location?.split("/")?.[1] !== "comments" &&
        location?.split("/")?.[2] === undefined,
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
/*

// import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../Loader';
import { Grid, Table } from 'antd';
// import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../store/hooks';
import { ColumnsType } from 'antd/es/table';
import ExpandableTable from './ExpandableTable';
import StyledContainer from '../StyledContainer';
import HeaderButtons from '../HeaderButtons';
import EmptyComponent from '../EmptyComponent';
import SelectableTable from './SelectableTable';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ServerError from '../ServerError';
import styled from 'styled-components';
import { TButtonObjProps } from '../../types/generalType';

const { useBreakpoint } = Grid;

type ColumnDataType = Record<string, any>;
type TProps = TButtonObjProps;

type TableComponentProps<T extends ColumnDataType> = {
  rowClick?: {
    clickable: boolean;
    model?: string;
    customFunction?: any;
  };
  columns?: ColumnsType<T>;
  data: { data: T[]; isLoading?: boolean; isError?: boolean; isEnd?: boolean };
  handleFetchMore: () => void;
  lazy?: boolean;
  renderCardComponent: any;
  withModes?: boolean;
  isExpandable?: boolean;
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

export const StyledTopbar = styled('div')`
  width: 100%;
  background: var(--ant-color-bg-container);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;

function BeforeTableComponent<T extends ColumnDataType>(props: TableComponentProps<T>) {
  let position: any = sessionStorage.getItem('position');
  const [alt, setAlt] = useState(0);
  const location = useLocation().pathname;
  const tableRef = useRef<any>(null);
  const defaultRowClassName = (record: T) => {
    return record && typeof record !== 'string' && (!('isActive' in record) || record?.isActive)
      ? 'active'
      : 'passive';
  };
  const {
    rowClick = {
      clickable: true,
      model: location?.split('/')?.[1],
    },
    columns,
    data,
    handleFetchMore,
    renderCardComponent,
    isExpandable = false,
    buttonsObj = '',
    renderedIn = '',
    emptyComponentPass,
    isSelectable,
    handleTableSelect,
    rowClassName = defaultRowClassName,
    selectedRows,
    hideSelectAll = true,
  } = props;
  const screens = useBreakpoint();
  // const { t } = useTranslation();
  const { tableDisplayMode } = useAppSelector(state => state.general);
  const navigate = useNavigate();
  const handleRowClick = (record: any) => {
    if (rowClick?.customFunction) {
      return {
        onClick: () => {
          if (+position) {
            sessionStorage.setItem('position', position);
          } else {
            console.log('state alt: ', alt);
            sessionStorage.setItem('position', alt.toString());
          }
          rowClick?.customFunction?.(record);
        },
      };
    } else {
      if (rowClick?.clickable) {
        return {
          onClick: () => {
            if (+position) {
              sessionStorage.setItem('position', position);
            } else {
              console.log('state alt: ', alt);
              sessionStorage.setItem('position', alt.toString());
            }
            navigate(`/${rowClick?.model}/${record?.uuid}`);
          },
        };
      } else {
        return {};
      }
    }
  };
  useEffect(() => {
    setAlt(+sessionStorage.getItem('position')!);
  }, []);
  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        top: +sessionStorage.getItem('position')!,
      });
      sessionStorage.removeItem('position');
    }
  }, [tableRef.current]);
  return (
    <>
      <StyledContainer style={{ width: '100%', overflowX: 'auto' }}>
        {renderedIn !== '' ? (
          <StyledTopbar
            style={{
              padding: buttonsObj ? '8px 12px' : '',
              justifyContent: buttonsObj?.search !== false ? 'space-between' : 'flex-end',
            }}
          >
            {buttonsObj && <HeaderButtons buttonsObj={buttonsObj} renderedIn={renderedIn} />}
          </StyledTopbar>
        ) : (
          ''
        )}
        {data?.data?.length ? (
          // <InfiniteScroll
          //  dataLength={data?.data?.length}
          //  next={() => handleFetchMore()}
          //  hasMore={!data?.isEnd}
          //  loader={<Loader />}
          //  scrollThreshold={0.7}
          //  scrollableTarget='scrollableDiv'
          //  endMessage={
          //    <div style={{ textAlign: 'center', padding: '40px' }}>
          //      <div style={{ marginBottom: '20px', color: 'var(--ant-color-text-secondary)' }}>
          //        {t('NoData')}!
          //      </div>
          //    </div>
          //  }
          // >
          ((tableDisplayMode === 'table' && screens?.lg) || location.includes('notifications')) &&
          columns?.length ? (
            isExpandable ? (
              <ExpandableTable<T>
                columns={columns!}
                data={data.data}
                handleRowClick={handleRowClick}
              />
            ) : isSelectable ? (
              <>
                <SelectableTable<T>
                  columns={columns!}
                  data={data.data}
                  handleTableSelect={keys => handleTableSelect!(keys)}
                  selectedRows={selectedRows!}
                  handleRowClick={handleRowClick}
                  hideSelectAll={hideSelectAll}
                  rowClassName={rowClassName}
                />
              </>
            ) : (
              <Table
                ref={tableRef}
                onRow={record => handleRowClick(record)}
                columns={columns}
                // rowKey={record => record.uuid}
                onScroll={e => {
                  position = e.currentTarget.scrollTop;
                  if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop < 1000)
                    handleFetchMore();
                }}
                dataSource={data.data.map(item => ({
                  ...item,
                  key: item.uuid,
                }))}
                scroll={{ x: '100%', y: '70vh' }}
                pagination={false}
                rowClassName={rowClassName}
              />
            )
          ) : (
            <div style={{ paddingTop: '10px' }}>{renderCardComponent()}</div>
          )
        ) : // </InfiniteScroll>
        data?.isLoading ? (
          <Loader height='80vh' />
        ) : data?.isError ? (
          <ServerError />
        ) : (
          <EmptyComponent
            height={emptyComponentPass?.height}
            emptyHeader={emptyComponentPass?.emptyHeader}
            emptyBody={emptyComponentPass?.emptyBody}
            buttonTitle={emptyComponentPass?.buttonTitle}
            onClickButton={emptyComponentPass?.onClickButton}
            buttonIcon={emptyComponentPass?.buttonIcon}
            imgSrc={emptyComponentPass?.imgSrc}
          />
        )}
      </StyledContainer>
    </>
  );
}

const TableComponent = React.memo(
  BeforeTableComponent as React.ComponentType<any>,
) as typeof BeforeTableComponent;
export default TableComponent;



*/

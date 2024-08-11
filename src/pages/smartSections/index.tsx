import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useSwrInfiniteFetch from "../../hooks/useSwrInfiniteFetch";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import { useSmartSectionsHook } from "../../hooks/smartSections";
import { FloatButton, Space, Table, Spin, notification, Tag } from "antd";
import { TSmartSections, TSmartSection } from "../../types/smartSections";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { TableColumnsType } from "antd";
import TableComponent from "../../components/tableComponent/TableComponent";
import {
  formatDate,
  handleFilterCell,
  orderTranslator,
  cookieGetter,
} from "../../functions";
import { setSmartSectionsSendInfo } from "../../store/smartSections/smartSectionsSlice";
import { DeleteOutlined, EyeOutlined, EditOutlined } from "@ant-design/icons";
import { setSearchValue } from "../../store/general/generalSlice";
import PlusCircleOutlinedButton from "../../components/PlusButton";

const SmartSectionsComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { getSmartSections, deleteSmartSectionItem, getSmartSectionsItem } =
    useSmartSectionsHook();
  const { smartSectionsSendInfo } = useAppSelector(
    (state) => state.smartSections
  );
  // const { isLoading } = useAppSelector((state) => state.general);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "SmartSections",
          path: "/smartSections",
        },
      ])
    );
  }, [dispatch]);
  let tempSendInfo = {
    limit: 20,
  };

  const parseValue = cookieGetter("smartSectionSendInfo");
  const cookieValue = parseValue ? JSON.parse(parseValue) : null;

  if (cookieValue) {
    tempSendInfo = cookieValue;
  }
  console.log("cookieValue: ", cookieValue);

  useEffect(() => {
    if (cookieValue) {
      dispatch(setSearchValue(cookieValue?.search));
    } else {
      dispatch(setSearchValue(""));
    }
    dispatch(setSmartSectionsSendInfo(tempSendInfo));
  }, []);

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/smartSections",
      {
        ...smartSectionsSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TSmartSections[]) => getSmartSections(fetchedData),
      "smartSections"
    );

  useEffect(() => {
    refreshData();
  });
  const handleFetchMore = () => {
    loadMore();
  };
  const handleDelete = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }

    deleteSmartSectionItem(uuid, refreshData);
  };
  const handleClick = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    // notification.warning("This is not ready");
    console.log("This is not ready");
  };

  const columns: TableColumnsType<TSmartSections> = [
    {
      title: "Öňdeligi",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Tm Ady",
      dataIndex: "nameTm",
      key: "nameTm",
    },
    {
      title: "Ru Ady",
      dataIndex: "nameRu",
      key: "nameRu",
    },
    {
      title: "Filter",
      dataIndex: "filter",
      key: "filter",
    },
    {
      title: "Tertibi",
      dataIndex: "order",
      key: "order",
    },
    {
      title: "Başlanýan wagty",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "Gutarýan wagty",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "active",
      key: "active",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_: unknown, smartSection: TSmartSection) => (
        <Space>
          <DeleteOutlined
            onClick={(e) => handleDelete(smartSection.uuid, e)}
            style={{ cursor: "pointer", color: "red" }}
          />
          <EyeOutlined
            onClick={(e) => handleClick(smartSection.uuid, e)}
            style={{ cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];
  const orderByCell = (row: TSmartSection) => {
    return row?.order?.length
      ? row.order?.map((order: any, i: string | number) => (
          <div key={i} className="smart-order">
            <span>{`${orderTranslator(order?.name ? order?.name : order)}${
              order?.type === "asc"
                ? ": Artýan"
                : order?.type === "desc"
                ? ": Kemelýän"
                : ""
            }`}</span>
          </div>
        ))
      : null;
  };
  console.log("data: ", data);

  const items: any = data.map((smartSection: TSmartSection) => ({
    key: smartSection.uuid,
    uuid: smartSection.uuid,
    id: smartSection.id,
    priority: smartSection.priority,
    nameTm: smartSection.nameTm,
    nameRu: smartSection.nameRu,
    filter: handleFilterCell(smartSection),
    order: orderByCell(smartSection.order),
    startDate: formatDate(smartSection.startDate),
    endDate: formatDate(smartSection.endDate),
    active: smartSection.active ? (
      <Tag style={{ fontSize: "15px" }} color="success">
        Aktiw
      </Tag>
    ) : (
      <Tag style={{ fontSize: "15px" }} color="error">
        Passiw
      </Tag>
    ),
    actions: {},
  }));
  console.log("items: ", items);
  return (
    <div>
      {isLoading && (
        <Spin
          size="large"
          style={{
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        />
      )}
      <TableComponent<TSmartSections>
        handleFetchMore={handleFetchMore}
        columns={columns}
        data={{ items, isEnd, isError, isLoading }}
      />
      <PlusCircleOutlinedButton navigation="/smartSections/add" />
    </div>
  );
};

export default SmartSectionsComponent;

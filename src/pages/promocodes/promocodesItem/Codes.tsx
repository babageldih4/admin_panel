import { type FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Space, TableColumnsType, Tag } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { setIsCodeModalOpen } from "../../../store/promocodes/promocodesSlice";
import CodesModal from "./CodesModal";
import { setHasEmtpy } from "../../../store/general/generalSlice";
import useSwrInfiniteFetch from "../../../hooks/useSwrInfiniteFetch";
import Loader from "../../../components/Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { TCode, TCodesItemSendInfo } from "../../../types/promocodes";
import { usePromocodesHook } from "../../../hooks/promocodes";
import TableComponent from "../../../components/tableComponent/TableComponent";
import { formatDate, separateDateTimeFormat } from "../../../functions";

const Codes: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getCodes, deleteCode } = usePromocodesHook();
  const { isCodeModalOpen } = useAppSelector((state) => state.general);
  const { codesSendInfo } = useAppSelector((state) => state.promocodes);
  const uuid = useLocation().pathname.split("/")[2];
  useEffect(() => {
    return () => {
      dispatch(setIsCodeModalOpen(false));
    };
  }, []);
  useEffect(() => {
    dispatch(setHasEmtpy(false));
  }, []);

  let tempSendInfo = {
    limit: 20,
  };

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      `/promocodes/${uuid}/codes`,
      {
        ...codesSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TCodesItemSendInfo[]) => getCodes(fetchedData),
      "codes"
    );

  const handleFetchMore = () => {
    loadMore();
  };
  useEffect(() => {
    refreshData();
  }, []);

  if (isLoading) {
    return (
      <Loader
        style={{
          height: "100vh",
        }}
      />
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleEdit = (e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    dispatch(setIsCodeModalOpen(true));
  };

  const handleDelete = (CodeUuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    deleteCode(uuid, CodeUuid, refreshData);
  };

  const columns: TableColumnsType<TCode[]> = [
    {
      title: "Kody",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Mukdary",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Aktiwlik",
      dataIndex: "active",
      key: "active",
      render: (active: boolean) => (
        <Tag color={active ? "success" : "warning"}>
          {active ? "Aktiw" : "Passiw"}
        </Tag>
      ),
    },
    {
      title: "Limit",
      dataIndex: "limit",
      key: "limit",
    },
    {
      title: "Ulanylan Sany",
      dataIndex: "usedCount",
      key: "usedCount",
    },
    {
      title: "Doreden Isgar",
      dataIndex: "createdEmployeeId",
      key: "createdEmployeeId",
    },
    {
      title: "Doredilen wagty",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_: unknown, code: TCode) => (
        <Space
          style={{
            justifyContent: "center",
          }}
        >
          <EditOutlined
            onClick={(e) => handleEdit(e)}
            style={{
              cursor: "pointer",
            }}
          />

          {/* <DeleteOutlined onClick={() => handleDelete(code.uuid)} style={{ cursor: "pointer", color: "red" }} /> */}
          <DeleteOutlined
            onClick={(e) => handleDelete(code.uuid, e)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </Space>
      ),
    },
  ];

  const items: any = data.map((code: TCode) => ({
    uuid: code.uuid,
    code: code.code,
    amount: code.amount,
    active: code.active,
    limit: code?.unlimited === true ? "Çäksiz" : code.limit,
    usedCount: code.usedCount,
    createdEmployeeId:
      code?.createdEmployee?.firstName + " " + code.createdEmployee?.lastName,
    createdAt: formatDate(formatDate(code.createdAt)),
    actions: {},
  }));

  return (
    <div>
      <TableComponent
        handleFetchMore={handleFetchMore}
        columns={columns}
        data={{ items, isEnd, isError, isLoading }}
      />

      <CodesModal refreshData={refreshData} />
      <PlusCircleOutlined
        onClick={() => dispatch(setIsCodeModalOpen(true))}
        style={{
          zIndex: 100,
          position: "fixed",
          right: "28px",
          bottom: "15px",
          borderRadius: "50%",
          cursor: "pointer",
          color: "orange",
          fontSize: "30px",
        }}
      />
    </div>
  );
};

export default Codes;

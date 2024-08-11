import { type FC, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import useSwrInfiniteFetch from "../../hooks/useSwrInfiniteFetch";
import TableComponent from "../../components/tableComponent/TableComponent";
import { TPromocode } from "../../types/promocodes";
import { usePromocodesHook } from "../../hooks/promocodes";
import { TableColumnsType, Space, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { formatDate } from "../../functions";
import PlusCircleOutlinedButton from "../../components/PlusButton";

const PromocodesComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { promocodesSendInfo } = useAppSelector((state) => state.promocodes);
  const { getPromocodes, deletePromocode } = usePromocodesHook();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Promocodes",
          path: "/promocodes",
        },
      ])
    );
  }, []);
  let tempSendInfo = {
    limit: 15,
  };
  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/promocodes",
      {
        ...promocodesSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TPromocode[]) => getPromocodes(fetchedData),
      "promocodes"
    );

  const handleFetchMore = () => {
    loadMore();
  };

  const handleDelete = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    deletePromocode(uuid, refreshData);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleNavigate = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/employees/${uuid}`);
  };
  const columns: TableColumnsType<TPromocode[]> = [
    {
      title: "Türkmençe ady",
      dataIndex: "nameTm",
      key: "nameTm",
    },
    {
      title: "Rusça ady",
      dataIndex: "nameRu",
      key: "nameRu",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      title: "Ähli ulanyjylar üçin",
      dataIndex: "allUsersHaveAccess",
      key: "allUsersHaveAccess",
    },
    {
      title: "Döreden işgär",
      dataIndex: "createdEmployee",
      key: "createdEmployee",
      // render: (_: unknown, promocode: TPromocode) => (
      //   <Space
      //     style={{
      //       justifyContent: "center",
      //     }}
      //   >
      //     <Link to={`employees/${promocode?.createdEmployee?.uuid}`}>
      //       {promocode?.createdEmployee?.userName}
      //     </Link>
      //   </Space>
      // ),
    },
    {
      title: "Üýtgeden işgär",
      dataIndex: "modifiedEmployee",
      key: "modifiedEmployee",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_: unknown, promocode: TPromocode) => (
        <Space
          style={{
            justifyContent: "center",
          }}
        >
          {/* <EditOutlined
            onClick={() => handleClick(promocode.uuid)}
            style={{
              cursor: "pointer",
            }}
          /> */}
          <DeleteOutlined
            onClick={(e) => handleDelete(promocode.uuid, e)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </Space>
      ),
    },
  ];

  const items: any = data.map((promocode: TPromocode) => ({
    key: promocode.uuid,
    uuid: promocode.uuid,
    nameTm: promocode.nameTm,
    nameRu: promocode.nameRu,
    status: promocode.status === true ? "Geçerli" : "Geçersiz",
    startDate: formatDate(promocode.startDate),
    endDate: formatDate(promocode.endDate),
    allUsersHaveAccess: promocode.allUsersHaveAccess === true ? "Hawa" : "Ýok",
    createdEmployee: (
      <Button
        type="link"
        size="small"
        style={{ width: "100%" }}
        onClick={(e) => handleNavigate(promocode?.createdEmployee?.uuid, e)}
      >
        {" "}
        {promocode?.createdEmployee?.firstName +
          " " +
          promocode?.createdEmployee?.lastName}
      </Button>
    ),
    modifiedEmployee: promocode?.modifiedEmployee ? (
      <Button
        type="link"
        size="small"
        style={{ width: "100%" }}
        onClick={(e) => handleNavigate(promocode?.modifiedEmployee?.uuid, e)}
      >
        {promocode?.modifiedEmployee?.firstName +
          " " +
          promocode?.modifiedEmployee?.lastName}
      </Button>
    ) : null,

    actions: {},
  }));

  console.log("items: ", items);
  return (
    <div
      style={{
        height: "100%",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableComponent
        columns={columns}
        data={{ items, isEnd, isError, isLoading }}
        handleFetchMore={handleFetchMore}
      />
      <PlusCircleOutlinedButton navigation="/promocodes/add " />
    </div>
  );
};

export default PromocodesComponent;

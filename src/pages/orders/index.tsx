import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useSwrInfiniteFetch from "../../hooks/useSwrInfiniteFetch";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import { useOrdersHook } from "../../hooks/orders";
import { Table, TableColumnsType, Space, Spin } from "antd";
import { TOrder } from "../../types/orders";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDate } from "../../functions";
import moment from "moment";
import TableComponent from "../../components/tableComponent/TableComponent";

const OrdersComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { ordersData, ordersSendInfo } = useAppSelector(
    (state) => state.orders
  );
  const { getOrders } = useOrdersHook();
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Orders",
          path: "/orders",
        },
      ])
    );
  }, []);
  let tempSendInfo = {
    limit: 20,
  };

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/orders",
      {
        ...ordersSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TOrder[]) => getOrders(fetchedData),
      "notifications"
    );
  const columns: TableColumnsType<TOrder[]> = [
    {
      title: "Bölüm",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "Müşderi",
      dataIndex: "client",
      key: "client",
    },
    {
      title: "Agza",
      dataIndex: "user",
      key: "user",
    },
    {
      title: "Eltip bermek",
      dataIndex: "deliveryType",
      key: "deliveryType",
    },
    {
      title: "Zakaz edilen wagty",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Geçen wagty",
      dataIndex: "passedTime",
      key: "passedTime",
    },
    {
      title: "Galan wagty",
      dataIndex: "remainedTime",
      key: "remainedTime",
    },
    {
      title: "Statusy",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Adresi",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      fixed: "right",
      render: (_: unknown, order: TOrder) => (
        <Space>
          <EditOutlined
            // onClick={() => handleClick(order.uuid)}
            style={{
              cursor: "pointer",
            }}
          />
          <DeleteOutlined
            // onClick={() => handleDelete(order.uuid)}
            style={{ cursor: "pointer" }}
          />
          <EyeOutlined
            // onClick={() => handleClick(smartSection.uuid)}
            style={{ cursor: "pointer" }}
          />
        </Space>
      ),
    },
  ];
  console.log(data);

  const handleFetchMore = () => {
    loadMore();
  };
  // const data1 = data.filter(
  //   (el: TOrder) => el.status === "delivering" || el.status === "picking"
  // );
  // console.log("data1", data1);

  const items: any = data.map((order: TOrder) => ({
    key: order.uuid,
    uuid: order.uuid,
    division: order.division?.nameTm,
    client: order.client?.name,
    user: order.user?.firstName + "  " + order?.user?.phoneNumber,
    deliveryType:
      order.deliveryType === "normalDelivery" ? "Adaty" : "Adaty dal",
    createdAt: formatDate(order.createdAt),
    passedTime: order.passedTime,
    // remainedTime: moment(order.remainedTime),
    remainedTime: moment(order.remainedTime),
    status: order.status,
    address: order.address,
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
      <TableComponent
        // scroll = {x:10000}
        columns={columns}
        handleFetchMore={handleFetchMore}
        data={{ items, isEnd, isError, isLoading }}
      />
      {/* <Table
        virtual
        columns={columns}
        dataSource={items}
        pagination={false}
        scroll={{ x: 1300 }}
      /> */}
    </div>
  );
};

export default OrdersComponent;

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useSwrInfiniteFetch from "../../hooks/useSwrInfiniteFetch";
import { setBreadcrumbs } from "../../store/general/generalSlice";
import { Space, Spin } from "antd";
import type { TableColumnsType } from "antd";
import { TComment } from "../../types/comment";
import { useCommentsHook } from "../../hooks/comments";
import { formatDate, cookieGetter } from "../../functions";
import { setSearchValue } from "../../store/general/generalSlice";
import TableComponent from "../../components/tableComponent/TableComponent";
import { setCommentsSendInfo } from "../../store/comments/commentsSlice";
import { TOrder } from "../../types/orders";
import { DeleteOutlined } from "@ant-design/icons";

const CommentsComponent: FC = () => {
  const dispatch = useAppDispatch();
  const { getComments } = useCommentsHook();
  const { commentsSendInfo } = useAppSelector((state) => state.comments);
  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Comments",
          path: "/comments",
        },
      ])
    );
  }, []);
  let tempSendInfo = {
    limit: 20,
  };

  const parseValue = cookieGetter("smartSectionSendInfo");
  const cookieValue = parseValue ? JSON.parse(parseValue) : null;

  if (cookieValue) {
    tempSendInfo = cookieValue;
  }

  useEffect(() => {
    if (cookieValue) {
      dispatch(setSearchValue(cookieValue?.search));
    } else {
      dispatch(setSearchValue(""));
    }
    dispatch(setCommentsSendInfo(tempSendInfo));
  }, []);
  const columns: TableColumnsType<TComment> = [
    {
      title: "Ady",
      dataIndex: "name",
    },
    {
      title: "E-Poçtasy",
      dataIndex: "email",
    },
    {
      title: "Telefon Nomeri",
      dataIndex: "phoneNumber",
    },
    {
      title: "Teswiri",
      dataIndex: "message",
    },
    {
      title: "Görnüşi",
      dataIndex: "type",
    },
    {
      title: "Döredilen wagty",
      dataIndex: "createdAt",
    },
    {
      title: "Hereketler",
      dataIndex: "actions",
      fixed: "right",
      width: 100,
      render: (_: unknown, comment: TComment) => (
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",

            // width: "10px",
          }}
        >
          <DeleteOutlined
            // onClick={(e) => handleDelete(notification.uuid, e)}
            style={{ cursor: "pointer", color: "red" }}
          />
        </Space>
      ),
    },
  ];
  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/feedbacks",
      {
        ...commentsSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TComment[]) => getComments(fetchedData),
      "notifications"
    );

  useEffect(() => {
    refreshData();
  }, []);
  const handleFetchMore = () => {
    loadMore();
  };

  const items: any = data?.map((comment: TComment) => {
    return {
      key: comment.uuid,
      uuid: comment.uuid,
      name: comment.name,
      email: comment.email,
      phoneNumber: comment.phoneNumber,
      message: comment.message,
      type: comment.type,
      createdAt: formatDate(comment.createdAt),
    };
  });
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
      <TableComponent<TComment>
        handleFetchMore={handleFetchMore}
        columns={columns}
        data={{ items, isLoading, isEnd, isError }}
      />
    </div>
  );
};

export default CommentsComponent;

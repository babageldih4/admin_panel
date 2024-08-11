import { FC, useEffect, useState } from "react";
import {
  Modal,
  Space,
  Input,
  Card,
  Checkbox,
  Spin,
  Empty,
  Typography,
  Avatar,
} from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import useSwrInfiniteFetch from "../hooks/useSwrInfiniteFetch";
import { useItemsHook } from "../hooks/items";
import { TItem } from "../types/items";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  setIsProductsSelectModalOpen,
  setSelectedProducts,
} from "../store/general/generalSlice";
import { backendUrl } from "../plugins/axios";
import brokenImage from "../../src/assets/images/brokenImage.png";
import defaultImage from "../../src/assets/images/default.png";

const { Title, Text } = Typography;
const { Search } = Input;

const ProductsModal: FC = () => {
  const [searchText, setSearchText] = useState("");
  const { itemsSendInfo } = useAppSelector((state) => state.items);
  const { isProductsSelectModalOpen, selectedProducts } = useAppSelector(
    (state) => state.general
  );
  const { getItems } = useItemsHook();
  const dispatch = useAppDispatch();
  // const [tempSendInfo] = useState({ limit: 20 });
  let tempSendInfo = {
    limit: 20,
  };

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/items",
      { ...itemsSendInfo, ...tempSendInfo },
      (fetchedData: TItem[]) => getItems(fetchedData),
      "items"
    );

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleFetchMore = () => {
    console.log("loadingMore");
    loadMore();
  };

  const handleCheckboxChange = (item: TItem, checked: boolean) => {
    if (checked) {
      dispatch(
        setSelectedProducts([
          ...selectedProducts,
          {
            uuid: item.uuid,
            name: item.name,
            paretto: item.paretto,
            code: item.code,
            smallImg: item.smallImg,
          },
        ])
      );
    } else {
      dispatch(
        setSelectedProducts(
          selectedProducts.filter((product) => product.uuid !== item.uuid)
        )
      );
    }
  };

  const onErrorHandler = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = brokenImage;
  };

  return (
    <Modal
      title={
        <>
          <Title>Haryt Gozlegi:</Title>
          <Search
            placeholder="Search for a product"
            onSearch={handleSearch}
            style={{ marginBottom: 16, position: "relative", zIndex: 10 }}
          />
        </>
      }
      open={isProductsSelectModalOpen}
      onOk={() => dispatch(setIsProductsSelectModalOpen(false))}
      onCancel={() => dispatch(setIsProductsSelectModalOpen(false))}
      width={800}
      style={{
        marginTop: "10px",
      }}
    >
      <div style={{ height: "60vh", overflowY: "auto" }}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <InfiniteScroll
            dataLength={data?.length || 0}
            next={handleFetchMore}
            hasMore={!isEnd}
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
                <div style={{ color: "var(--ant-color-text-secondary)" }}>
                  No more items!
                </div>
              </div>
            }
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {data?.map((item: TItem) => (
                <Card key={item.uuid} bordered={true}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      gap: "8px",
                    }}
                  >
                    <Avatar
                      src={
                        item.smallImg
                          ? `${backendUrl}/images/items/${item.smallImg}`
                          : defaultImage
                      }
                      onError={onErrorHandler}
                      alt="doorhandle"
                      shape="square"
                      size={64}
                      className="card-medium-photo"
                    />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        marginLeft: "16px",
                        width: "calc(100% - 128px)",
                        overflow: "hidden",
                      }}
                    >
                      <Text> {item.name}</Text>
                      <Text> {item.code}</Text>
                      <Text> {item?.paretto}</Text>
                    </div>
                    <Checkbox
                      checked={selectedProducts.some(
                        (product) => product.uuid === item.uuid
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(item, e.target.checked)
                      }
                    />
                  </div>
                </Card>
              ))}
              {isLoading && (
                <Spin
                  size="large"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                />
              )}
              {isError && (
                <div style={{ textAlign: "center", padding: "20px" }}>
                  Error loading data
                </div>
              )}
              {!isLoading && !data?.length && !isError && (
                <Empty description="No data" />
              )}
            </div>
          </InfiniteScroll>
        </Space>
      </div>
    </Modal>
  );
};

export default ProductsModal;

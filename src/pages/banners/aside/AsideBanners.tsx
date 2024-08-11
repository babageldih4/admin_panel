// import { type FC, useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../../../store/hooks";
// import useSwrInfiniteFetch from "../../../hooks/useSwrInfiniteFetch";
// import {
//   setBreadcrumbs,
//   setSearchValue,
// } from "../../../store/general/generalSlice";
// import { cookieGetter, formatDate } from "../../../functions/index";
// import { TBanner } from "../../../types/banners";
// import { setBannersSendInfo } from "../../../store/banners/bannersSlice";
// import { useBannersHook } from "../../../hooks/banners";
// import { Space, Card, Spin, Typography, Row, Col } from "antd";
// import InfiniteScroll from "react-infinite-scroll-component";
// // import brokenImage from "../../assets/images/brokenImage.png";
// import defaultImage from "../../../assets/images/default.png";
// import defaultImage2 from "../../../assets/images/defaultImage2.jpg";

// const { Text } = Typography;

// const AsideBanners: FC = () => {
//   const dispatch = useAppDispatch();
//   const { searchValue } = useAppSelector((state) => state.general);
//   const { bannerSendInfo } = useAppSelector((state) => state.banners);
//   const { getBanners } = useBannersHook();

//   useEffect(() => {
//     dispatch(
//       setBreadcrumbs([
//         {
//           title: "Banners",
//           path: "/banners",
//         },
//       ])
//     );
//   }, [dispatch]);

//   let tempSendInfo = {
//     limit: 7,
//     type: "aside",
//   };

//   const parseValue = cookieGetter("bannerSendInfo");
//   const cookieValue = parseValue ? JSON.parse(parseValue) : null;

//   if (cookieValue) {
//     tempSendInfo = cookieValue;
//   }

//   useEffect(() => {
//     if (cookieValue) {
//       dispatch(setSearchValue(cookieValue?.search));
//     } else {
//       dispatch(setSearchValue(""));
//     }
//     dispatch(setBannersSendInfo(tempSendInfo));
//   }, [dispatch, cookieValue]);

//   const { data, isLoading, isError, isEnd, loadMore, refreshData } =
//     useSwrInfiniteFetch(
//       "/banners",
//       {
//         ...bannerSendInfo,
//         ...tempSendInfo,
//       },
//       (fetchedData: TBanner[]) => getBanners(fetchedData),
//       "banners"
//     );

//   if (isLoading) {
//     return <Spin />;
//   }

//   if (isError) {
//     return <div>Error loading data</div>;
//   }
//   console.log(data);

//   return (
//     <div>
//       {data && data.length > 0 && (
//         <InfiniteScroll
//           dataLength={data.length}
//           next={loadMore}
//           hasMore={!isEnd}
//           loader={
//             <Spin
//               size="large"
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 height: "10vh",
//               }}
//             />
//           }
//           endMessage={
//             <p style={{ textAlign: "center" }}>
//               <b>No data</b>
//             </p>
//           }
//         >
//           {data.map((item: TBanner, index) => (
//             <Space
//               key={index}
//               direction="vertical"
//               style={{ width: "100%", marginBottom: 16 }}
//             >
//               <Row>
//                 <Col>
//                   <Card
//                     style={{
//                       width: "100%",
//                       marginBottom: 16,
//                       height: "300px",
//                       overflow: "hidden",
//                       borderRadius: "4px",
//                       boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
//                     }}
//                     title={item.nameTm}
//                     bordered={false}
//                   >
//                     <Row>
//                       <Col span={18}>
//                         {item?.imageTm ? (
//                           <img
//                             alt="example"
//                             src={`${
//                               import.meta.env.VITE_BACKEND_PORT
//                             }/api/images/banners/${item?.imageTm}`}
//                             style={{
//                               height: "100%",
//                               width: "90%",
//                               objectFit: "cover",
//                             }}
//                             onError={(e) => {
//                               const target = e.target as HTMLImageElement;
//                               target.onerror = null;
//                               // target.src = brokenImage;
//                               target.src = defaultImage2;
//                             }}
//                           />
//                         ) : (
//                           <img
//                             src={defaultImage}
//                             style={{
//                               width: "70px",
//                               height: "70px",
//                             }}
//                             alt="doorhandle"
//                           />
//                         )}
//                       </Col>
//                       <Col span={6}>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                           }}
//                         >
//                           <Text> Ady: {item?.nameTm}</Text>
//                           <Text> Priority: {item?.priority}</Text>
//                           <Text>TimeToLive: {formatDate(item?.startDate)}</Text>
//                           <Text>Type: {item.actionType}</Text>
//                           <Text>Statusy: {item?.active}</Text>
//                         </div>
//                       </Col>
//                     </Row>
//                   </Card>
//                 </Col>
//                 <Col></Col>
//               </Row>
//             </Space>
//           ))}
//         </InfiniteScroll>
//       )}
//     </div>
//   );
// };

// export default AsideBanners;

import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import useSwrInfiniteFetch from "../../../hooks/useSwrInfiniteFetch";
import {
  setBreadcrumbs,
  setSearchValue,
} from "../../../store/general/generalSlice";
import { cookieGetter, formatDate } from "../../../functions/index";
import { TBanner } from "../../../types/banners";
import { setBannersSendInfo } from "../../../store/banners/bannersSlice";
import { useBannersHook } from "../../../hooks/banners";
import { Tag, Card, Typography, Row, Col } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import defaultImage from "../../../assets/images/default.png";
import defaultImage2 from "../../../assets/images/defaultImage2.jpg";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Loader from "../../../components/Loader/Loader";
import PlusCircleOutlinedButton from "../../../components/PlusButton";

const { Text } = Typography;

const AsideBanners: FC = () => {
  const dispatch = useAppDispatch();
  const { searchValue } = useAppSelector((state) => state.general);
  const { bannerSendInfo } = useAppSelector((state) => state.banners);
  const { getBanners, deleteBanner } = useBannersHook();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        {
          title: "Banners",
          path: "/banners",
        },
      ])
    );
  }, [dispatch]);

  let tempSendInfo = {
    limit: 7,
    type: "aside",
  };

  const parseValue = cookieGetter("bannerSendInfo");
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
    dispatch(setBannersSendInfo(tempSendInfo));
  }, []);

  const { data, isLoading, isError, isEnd, loadMore, refreshData } =
    useSwrInfiniteFetch(
      "/banners",
      {
        ...bannerSendInfo,
        ...tempSendInfo,
      },
      (fetchedData: TBanner[]) => getBanners(fetchedData),
      "banners"
    );
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

  const handleDelete = (uuid: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    deleteBanner(uuid, refreshData);
  };

  return (
    <div>
      {data && data.length > 0 && (
        <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={!isEnd}
          loader={
            <Loader
              style={{
                height: "10vh",
              }}
            />
          }
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>No data</b>
            </p>
          }
        >
          <Row gutter={[16, 16]}>
            {data.map((item: TBanner, index) => (
              <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                <Card
                  style={{
                    width: "100%",
                    marginBottom: 16,
                    height: "300px",
                    overflow: "hidden",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.3)",
                  }}
                  title={item.nameTm}
                  bordered={false}
                  extra={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "8px",
                        cursor: "pointer",
                      }}
                    >
                      <DeleteOutlined
                        onClick={(e) => handleDelete(item.uuid, e)}
                        style={{
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "red",
                        }}
                      />
                      <EyeOutlined
                        style={{
                          color: "orange",
                        }}
                      />
                    </div>
                  }
                  onClick={() => navigate(`/banners/aside/${item.uuid}`)}
                >
                  <Row>
                    <Col span={18}>
                      {item?.imageTm ? (
                        <img
                          alt="example"
                          src={`${
                            import.meta.env.VITE_BACKEND_PORT
                          }/api/images/banners/${item?.imageTm}`}
                          style={{
                            height: "100%",
                            width: "90%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = defaultImage2;
                          }}
                        />
                      ) : (
                        <img
                          src={defaultImage}
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                          alt="doorhandle"
                        />
                      )}
                    </Col>
                    <Col span={6}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Text> Ady: {item?.nameTm}</Text>
                        <Text> Priority: {item?.priority}</Text>
                        <Text>TimeToLive: {formatDate(item?.startDate)}</Text>
                        <Text>Type: {item.actionType}</Text>
                        <Text
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            textAlign: "center",
                          }}
                        >
                          Statusy:{" "}
                          {item?.active ? (
                            <Tag color="success">Aktiw</Tag>
                          ) : (
                            <Tag color="error">Passiw</Tag>
                          )}
                        </Text>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))}
          </Row>
        </InfiniteScroll>
      )}
      <PlusCircleOutlinedButton navigation="/banners/aside/add" />
    </div>
  );
};

export default AsideBanners;

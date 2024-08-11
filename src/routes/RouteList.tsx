import "../styles/App.scss";
import { Spin, ConfigProvider } from "antd";
import { App as AntApp } from "antd";
import { FC, lazy, Suspense } from "react";
import { useAppSelector } from "../store/hooks";
import { darkTheme, lightTheme, sharedTheme } from "../plugins/antd";
import { theme } from "antd";
import { Routes, Route } from "react-router-dom";
import MainGroups from "../pages/group/MainGroups";
import SubGroups from "../pages/group/SubGroups";

//lazy load all routes
const SignIn = lazy(() => import("../components/auth/SignIn"));
const Protected = lazy(() => import("../components/auth/ProtectedRoute"));
const HomePage = lazy(() => import("../pages/HomePage"));
const MainLayout = lazy(() => import("../layout/index"));
const GroupComponent = lazy(() => import("../pages/group/Index"));
const FeedBacksComponent = lazy(() => import("../pages/feedbacks/index"));
const NotificationsComponent = lazy(
  () => import("../pages/notifications/index")
);
const NotificationItem = lazy(
  () => import("../pages/notifications/notificationItem/NotifcationItem")
);
const AddNotificationItem = lazy(
  () => import("../pages/notifications/addNotification/index")
);
const NotFound = lazy(() => import("../pages/error/404"));
const OrdersComponent = lazy(() => import("../pages/orders/index"));
const ProductsComponent = lazy(() => import("../pages/products/index"));
const CarouselBanners = lazy(() => import("../pages/banners/carousel/index"));
const AsideBanners = lazy(() => import("../pages/banners/aside/AsideBanners"));
const SmartSectionsComponent = lazy(
  () => import("../pages/smartSections/index")
);
const PopUpBanners = lazy(() => import("../pages/banners/popup/PopUpBanners"));
const BannerItem = lazy(() => import("../pages/banners/bannerItem/BannerItem"));
const AddBanner = lazy(() => import("../pages/banners/addBanner/AddBanner"));
const AddSmartSectionItem = lazy(
  () => import("../pages/smartSections/AddSmartSection")
);
const SmartSectionItem = lazy(
  () => import("../pages/smartSections/smartSectionItem/index")
);
const UnitsComponent = lazy(() => import("../pages/units/index"));
const SettingsComponent = lazy(() => import("../pages/settings/index"));
const BrandsComponent = lazy(() => import("../pages/brands/index"));
const PromocodesComponent = lazy(() => import("../pages/promocodes/index"));
const PromocodesItem = lazy(
  () => import("../pages/promocodes/promocodesItem/PromocodesItem")
);
const AddPromocodeItem = lazy(
  () => import("../pages/promocodes/addPromocode/AddPromocode")
);
const CommentsComponent = lazy(() => import("../pages/comments/index"));
const DivisionsComponent = lazy(() => import("../pages/divisions/index"));
const Clients = lazy(() => import("../pages/clients/index"));
const Users = lazy(() => import("../pages/users/index"));
const QRDevices = lazy(() => import("../pages/qrDevices/index"));
const QRTerminals = lazy(() => import("../pages/qrTerminals/index"));
const ClientEmails = lazy(() => import("../pages/clientEmails/index"));
const ClientEmailHistory = lazy(
  () => import("../pages/clientEmailHistory/index")
);
const CrmDevices = lazy(() => import("../pages/crmDevices"));
const CrmCalls = lazy(() => import("../pages/crmCalls"));
const CrmSms = lazy(() => import("../pages/crmSms"));
const Firms = lazy(() => import("../pages/exhibitions/Firms"));
const Products = lazy(() => import("../pages/exhibitions/Products"));
const SHistories = lazy(() => import("../pages/syncs/SHistories"));
const SManual = lazy(() => import("../pages/syncs/SManual"));
const SSchedules = lazy(() => import("../pages/syncs/SSchedules"));
const EmployeesComponent = lazy(() => import("../pages/employees/index"));
const RolesComponent = lazy(() => import("../pages/roles/index"));
const ScalingSystemsComponent = lazy(
  () => import("../pages/scalingSystems/index")
);
const ProgramsComponent = lazy(() => import("../pages/programs/index"));

const RouteList: FC = () => {
  const { userTheme } = useAppSelector((state) => state.general);
  const themeToken = {
    ...sharedTheme,
    ...(userTheme?.mode === "dark"
      ? {
          ...darkTheme,
          algorithm: userTheme?.compact
            ? [theme.darkAlgorithm, theme.compactAlgorithm]
            : theme.darkAlgorithm,
          // algorithm: userTheme?.stretch
          //   ? [theme.stretchAlgorithm, theme.compactAlgorithm]
          //   : theme.darkAlgorithm,
        }
      : {
          ...lightTheme,
          algorithm: userTheme?.compact
            ? [theme.defaultAlgorithm, theme.compactAlgorithm]
            : theme.defaultAlgorithm,
        }),
  };
  return (
    <ConfigProvider
      theme={{
        ...themeToken,
        token: { ...themeToken?.token, ...userTheme },
      }}
    >
      <AntApp>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense
                fallback={
                  <Spin
                    size="large"
                    style={{
                      display: "flex",
                      height: "100vh",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  />
                }
              >
                <SignIn />
              </Suspense>
            }
          />
          <Route path="/" element={<Protected outlet={<MainLayout />} />}>
            <Route index element={<HomePage />} />
            <Route path="/groups" element={<GroupComponent />} />
            <Route path="/groups/mainGroups" element={<MainGroups />} />
            <Route path="/groups/subGroups" element={<SubGroups />} />
            <Route path="/feedbacks" element={<FeedBacksComponent />} />
            <Route path="/brands" element={<BrandsComponent />} />
            <Route path="/notifications" element={<NotificationsComponent />} />
            <Route
              path="/notifications/add"
              element={<AddNotificationItem />}
            />
            <Route path="/notifications/:uuid" element={<NotificationItem />} />
            {/* <Route path="/banners" element={<BannersComponent />} /> */}
            <Route path="/banners/carousel" element={<CarouselBanners />} />
            <Route path="/banners/carousel/:uuid" element={<BannerItem />} />
            <Route path="/banners/carousel/add" element={<AddBanner />} />
            <Route path="/banners/aside" element={<AsideBanners />} />
            <Route path="/banners/aside/:uuid" element={<BannerItem />} />
            <Route path="/banners/aside/add" element={<AddBanner />} />
            <Route path="/banners/popup" element={<PopUpBanners />} />
            <Route path="/banners/popup/:uuid" element={<BannerItem />} />
            <Route path="/banners/popup/add" element={<AddBanner />} />
            <Route path="/orders" element={<OrdersComponent />} />
            <Route path="/products" element={<ProductsComponent />} />
            <Route path="/smartSections" element={<SmartSectionsComponent />} />
            <Route path="/smartSections/:uuid" element={<SmartSectionItem />} />
            <Route
              path="/smartSections/add"
              element={<AddSmartSectionItem />}
            />
            <Route path="/units" element={<UnitsComponent />} />
            <Route path="/promocodes" element={<PromocodesComponent />} />
            <Route path="/promocodes/:uuid" element={<PromocodesItem />} />
            <Route path="/promocodes/add" element={<AddPromocodeItem />} />
            <Route path="/comments" element={<CommentsComponent />} />
            <Route path="/divisions" element={<DivisionsComponent />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/users" element={<Users />} />
            <Route path="/qrDevices" element={<QRDevices />} />
            <Route path="/qrTerminals" element={<QRTerminals />} />
            <Route path="/clientEmails" element={<ClientEmails />} />
            <Route
              path="/clientEmailHistory"
              element={<ClientEmailHistory />}
            />
            <Route path="/crmDevices" element={<CrmDevices />} />
            <Route path="/crmCalls" element={<CrmCalls />} />
            <Route path="crmSms" element={<CrmSms />} />
            <Route path="/exhibitions/firms" element={<Firms />} />
            <Route path="/exhibitions/products" element={<Products />} />
            <Route path="/syncs/shistories" element={<SHistories />} />
            <Route path="/syncs/smanual" element={<SManual />} />
            <Route path="/syncs/sschedules" element={<SSchedules />} />
            <Route path="/employees" element={<EmployeesComponent />} />
            <Route path="/roles" element={<RolesComponent />} />
            <Route
              path="/scalingSystems"
              element={<ScalingSystemsComponent />}
            />
            <Route path="/programs" element={<ProgramsComponent />} />
            <Route path="/settings" element={<SettingsComponent />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AntApp>
    </ConfigProvider>
  );
};

export default RouteList;

import { MenuProps } from "antd";
import {
  MdOutlineDashboard,
  MdOutlineQrCode,
  MdOutlineSettings,
} from "react-icons/md";
import { VscGroupByRefType } from "react-icons/vsc";
import {
  FaBalanceScaleLeft,
  FaBoxOpen,
  FaHistory,
  FaLayerGroup,
  FaSms,
} from "react-icons/fa";
import { AiOutlineGroup, AiOutlineQrcode, AiOutlineSync } from "react-icons/ai";
import {
  MdOutlineCall,
  MdProductionQuantityLimits,
  MdRecordVoiceOver,
} from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";
import { AiFillTags } from "react-icons/ai";
import { MdNotificationsActive } from "react-icons/md";
import { RiCellphoneFill, RiRulerLine } from "react-icons/ri";
import { RiAdvertisementFill } from "react-icons/ri";
import { CgSmartphoneRam } from "react-icons/cg";
import { TiShoppingCart } from "react-icons/ti";
import { RiCoupon3Line } from "react-icons/ri";
import { FaBuilding } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { BsBriefcaseFill } from "react-icons/bs";
import { BiCarousel, BiDevices } from "react-icons/bi";
import { BsLayoutSidebarReverse } from "react-icons/bs";
import { BiWindowOpen } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FiUsers } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import exhibitionIcon from "../../assets/exhibition.png";
import { TbBuildingStore } from "react-icons/tb";
import { jwtDecode } from "jwt-decode";
import { cookieGetter } from "../../functions";

export type MenuItem = Required<MenuProps>["items"][number];

const token = cookieGetter("admin_token");
const token1 = JSON.stringify(token);
const decodedToken = jwtDecode(token1);

const displayList = (type: string) => {
  const roles = decodedToken?.roles;
  if (roles?.fullAccess || (roles[type] && roles[type]?.length)) {
    return true;
  }
  return false;
};

const SiderItems: () => MenuItem[] = () => {
  return [
    {
      label: "Dashboard",
      key: "/",
      shouldDisplay: true,
      visible: [],
      icon: <MdOutlineDashboard />,
    },
    {
      label: "Grupbalar",
      key: "/groups",
      shouldDisplay: displayList("mainGroup") || displayList("lastGroup"),
      visible: [],
      icon: <AiOutlineGroup />,
      children: [
        {
          label: "Esasy Grupbalar",
          key: "/groups/maingroups",
          shouldDisplay: displayList("mainGroup"),
          icon: <VscGroupByRefType />,
          visible: [],
        },
        {
          label: "Alt grupbalar",
          key: "/groups/subgroups",
          shouldDisplay: displayList("mainGroup"),
          icon: <FaLayerGroup />,
          visible: [],
        },
      ],
    },
    {
      label: "Harytlar",
      key: "/products",
      shouldDisplay: displayList("item"),
      visible: [],
      icon: <MdProductionQuantityLimits />,
    },
    {
      label: "Seslenmeler",
      key: "/feedbacks",
      // shouldDisplay: isAccessableWithIncludes("item", "viewRating") && !isQr,
      visible: [],
      icon: <VscFeedback />,
    },
    {
      label: "Brendler",
      key: "/brands",
      shouldDisplay: displayList("brand"),
      visible: [],
      icon: <AiFillTags />,
    },
    {
      label: "Birimler",
      key: "/units",
      shouldDisplay: displayList("unit"),
      visible: [],
      icon: <RiRulerLine />,
    },
    { type: "divider" },

    {
      label: "Bannerler",
      key: "/banners",
      // shouldDisplay: displayList("banner") && !isQr,
      shouldDisplay: displayList("banner"),
      visible: [],
      icon: <RiAdvertisementFill />,
      children: [
        {
          label: "Karusel Bannerler",
          key: "/banners/carousel",
          shouldDisplay: true,
          // children: [],
          icon: <BiCarousel />,
          visible: [],
        },
        {
          label: "Gapdal Bannerler",
          key: "/banners/aside",
          shouldDisplay: true,
          // children: [],
          icon: <BsLayoutSidebarReverse />,
          visible: [],
        },
        {
          label: "Açylýan Bannerler",
          key: "/banners/popup",
          shouldDisplay: true,
          // children: [],
          icon: <BiWindowOpen />,
          visible: [],
        },
      ],
    },
    {
      label: "Akylly Bolumler",
      key: "/smartSections",
      // shouldDisplay: displayList("smartSection") && !isQr,
      shouldDisplay: displayList("smartSection"),
      visible: [],
      icon: <CgSmartphoneRam />,
    },
    {
      label: "Habarnamalar",
      key: "/notifications",
      // shouldDisplay: displayList("userNotifications") && !isQr,
      shouldDisplay: displayList("userNotifications"),
      visible: [],
      icon: <MdNotificationsActive />,
    },
    { type: "divider" },
    {
      label: "Zakazlar",
      key: "/orders",
      shouldDisplay: true,
      // shouldDisplay: isAccessable("orderPermissions") && !isQr,
      visible: [],
      icon: <TiShoppingCart />,
    },
    {
      label: "Promokodlar",
      key: "/promocodes",
      shouldDisplay: true,
      // shouldDisplay: isAccessable("promocode") && !isQr,
      visible: [],
      icon: <RiCoupon3Line />,
    },
    {
      label: "Teswirler",
      key: "/comments",
      // shouldDisplay: displayList("feedback") && !isQr,
      shouldDisplay: displayList("feedback"),
      visible: [],
      icon: <VscFeedback />,
    },
    { type: "divider" },
    {
      label: "Bolumler",
      key: "/divisions",
      shouldDisplay: displayList("division"),
      visible: [],
      icon: <FaBuilding />,
    },
    {
      label: "Müşderi Maglumaty",
      key: "/clients",
      shouldDisplay:
        displayList("client") ||
        displayList("device") ||
        displayList("user") ||
        displayList("QRDevice") ||
        displayList("qrTerminals") ||
        displayList("email"),
      visible: [],
      icon: <IoIosPeople />,
      children: [
        {
          label: "Müşderiler",
          key: "/clients",
          shouldDisplay: displayList("client"),
          // children: [],
          icon: <IoIosPeople />,
          visible: [],
        },
        {
          label: "Agzalar",
          key: "/users",
          // shouldDisplay: displayList("user") && !isQr,
          shouldDisplay: displayList("user"),
          // children: [],
          icon: <FiUsers />,
          visible: [],
        },
        {
          label: "QR Enjamlar",
          key: "/qrDevices",
          shouldDisplay: displayList("QRDevice"),
          // children: [],
          icon: <AiOutlineQrcode />,
          visible: [],
        },
        {
          label: "QR Terminallar",
          key: "/qrTerminals",
          shouldDisplay: displayList("qrTerminals"),
          // children: [],
          icon: <RiCellphoneFill />,
          visible: [],
        },
        {
          label: "E-poçtalar",
          key: "/clientEmails",
          // shouldDisplay: displayList("email") && !isQr,
          shouldDisplay: displayList("email"),
          // children: [],
          icon: <HiOutlineMail />,
          visible: [],
        },
        {
          label: "E-poçta taryhy",
          key: "/clientEmailHistory",
          // children: [],
          // shouldDisplay:
          //   displayList("email") &&
          //   !isQr &&
          //   isAccessableWithIncludes("email", "histories"),
          shouldDisplay: displayList("email"),
          icon: <FaHistory />,
          visible: [],
        },
      ],
    },
    {
      label: "CRM",
      key: "/crmDevices",
      shouldDisplay: displayList("CRMRecorder"),
      visible: [],
      icon: <MdRecordVoiceOver />,
      children: [
        {
          label: "CRM Enjamlar",
          key: "/crmDevices",
          // children: [],
          // shouldDisplay: isAccessableWithIncludes(
          //   "CRMRecorder",
          //   "viewDevice"
          // ),
          icon: <BiDevices />,
          visible: [],
        },
        {
          label: "SMS",
          key: "/crmSms",
          // children: [],
          // shouldDisplay: isAccessableWithIncludes("CRMRecorder", "viewSms"),
          icon: <FaSms />,
          visible: [],
        },
        {
          label: "Jaňlar",
          key: "/crmCalls",
          // children: [],
          // shouldDisplay: isAccessableWithIncludes("CRMRecorder", "viewCalls"),
          icon: <MdOutlineCall />,
          visible: [],
        },
      ],
    },
    {
      label: "Sergi",
      key: "/exhibitions",
      // shouldDisplay: displayList("exhibition") && !isQr,
      shouldDisplay: displayList("exhibition"),
      visible: [],
      icon: (
        <img
          src={exhibitionIcon}
          className="sidebar-icon"
          style={{ width: "20px", height: "20px" }}
          alt="exhibition icon"
        />
      ),
      children: [
        {
          label: "Firmalar",
          key: "/exhibitions/firms",
          shouldDisplay: true,
          // children: [],
          icon: <TbBuildingStore />,
          visible: [],
        },
        {
          label: "Harytlar",
          key: "/exhibitions/products",
          shouldDisplay: true,
          // children: [],
          icon: <FaBoxOpen />,
          visible: [],
        },
      ],
    },
    { type: "divider" },
    {
      label: "Sinhronlar",
      key: "/syncs",
      shouldDisplay: displayList("sync"),
      visible: [],
      icon: <AiOutlineSync />,
      children: [
        {
          label: "Manual Synhronlar",
          key: "/syncs/smanual",
          // shouldDisplay:
          //   isAccessableWithIncludes("sync", "manuelSyncAll") ||
          //   isAccessableWithIncludes("sync", "manuelSyncQuickly"),
          // children: [],
          icon: <TbBuildingStore />,
          visible: [],
        },
        {
          label: "Tertip Synhronlar",
          key: "/syncs/sschedules",
          // shouldDisplay:
          //   isAccessableWithIncludes("sync", "updateSchedule") ||
          //   isAccessableWithIncludes("sync", "addSchedule"),
          // children: [],
          icon: <FaBoxOpen />,
          visible: [],
        },
        {
          label: "Taryh",
          key: "/syncs/shistories",
          shouldDisplay: true,
          // children: [],
          icon: <FaHistory />,
          visible: [],
        },
      ],
    },
    {
      label: "Terazi Systemi",
      key: "/scalingSystems",
      shouldDisplay: displayList("scalingSystem"),
      visible: [],
      icon: <FaBalanceScaleLeft />,
    },
    {
      label: "Isgarler",
      key: "/employees",
      shouldDisplay: displayList("employee"),
      visible: [],
      icon: <FaUsers />,
    },
    {
      label: "Rollar",
      key: "/roles",
      shouldDisplay: displayList("role"),
      visible: [],
      icon: <BsBriefcaseFill />,
    },
    {
      label: "Programmalar",
      key: "/programs",
      shouldDisplay: displayList("qrApp"),
      visible: [],
      icon: <MdOutlineQrCode />,
    },
    {
      label: "Settings",
      key: "/settings",
      shouldDisplay: decodedToken?.roles?.fullAccess,
      visible: [],
      icon: <MdOutlineSettings />,
    },
  ];
};

export default SiderItems;

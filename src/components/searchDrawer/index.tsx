import { FC, useState, useEffect } from "react";
import { Button, Carousel, Modal } from "antd";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setIsSearchModalOpen } from "../../store/general/generalSlice";
import SearchInput from "./searchInput/SearchInput";
import { setNotificationSendInfo } from "../../store/notifications/notificationSlice";
import { useLocation } from "react-router-dom";
import { cookieSetter, searchEmptyRemover } from "../../functions";
import { uuidChecher } from "../../functions/uuidChecker";
import Filter from "../filter/Filter";
import {
  setSearchValue,
  setFilterExists,
} from "../../store/general/generalSlice";
import { useGeneralHook } from "../../hooks/generalHooks";
import { TOption } from "../../types/generalType";
import { setSmartSectionsSendInfo } from "../../store/smartSections/smartSectionsSlice";
import Sort from "../sort/Sort";
import { setOrdersSendInfo } from "../../store/orders/ordersSlice";
import { setCommentsSendInfo } from "../../store/comments/commentsSlice";
import { setPromocodesSendInfo } from "../../store/promocodes/promocodesSlice";
import { setBannersSendInfo } from "../../store/banners/bannersSlice";

type TProps = {
  renderedIn?: string;
};

const SearchModal: FC<TProps> = (props: TProps) => {
  const { renderedIn = "" } = props;
  const dispatch = useAppDispatch();
  const [localSendState, setLocalSendState] = useState<any>({});
  const { isSearchModalOpen, searchValue, divisionOptions } = useAppSelector(
    (state) => state.general
  );
  const { bannersSendInfo } = useAppSelector((state) => state.banners);
  const { notificationSendInfo } = useAppSelector(
    (state) => state.notifications
  );
  const { smartSectionsSendInfo } = useAppSelector(
    (state) => state.smartSections
  );
  const { ordersSendInfo } = useAppSelector((state) => state.orders);
  const { promocodesSendInfo } = useAppSelector((state) => state.promocodes);
  const { commentsSendInfo } = useAppSelector((state) => state.comments);
  const { getDivisionOptions } = useGeneralHook();
  const location = useLocation().pathname;

  useEffect(() => {
    getDivisionOptions();
  }, []);

  const divisionOptions1 =
    divisionOptions?.data?.map((option: TOption) => {
      return {
        label: option.nameTm,
        value: option.uuid,
      };
    }) || {};

  const states: any = {
    carousel: {
      sendInfo: bannersSendInfo,
      sendInfoName: "bannerSendInfo",
      setSendInfo: (value: any) => dispatch(setBannersSendInfo(value)),
      searchPlaceholder: "Ady",
      header: "Banners",
      modelName: "banners",
      defaultFilters: [
        {
          label: "division",
          value: [],
        },
        {
          label: "Active",
          value: "",
        },
      ],
    },
    aside: {
      sendInfo: bannersSendInfo,
      sendInfoName: "bannerSendInfo",
      setSendInfo: (value: any) => dispatch(setBannersSendInfo(value)),
      searchPlaceholder: "Ady",
      header: "Banners",
      modelName: "banners",
      defaultFilters: [
        {
          label: "division",
          value: [],
        },
        {
          label: "Active",
          value: "",
        },
      ],
    },
    popup: {
      sendInfo: bannersSendInfo,
      sendInfoName: "bannerSendInfo",
      setSendInfo: (value: any) => dispatch(setBannersSendInfo(value)),
      searchPlaceholder: "Ady",
      header: "Banners",
      modelName: "banners",
      defaultFilters: [
        {
          label: "division",
          value: [],
        },
        {
          label: "Active",
          value: "",
        },
      ],
    },
    notification: {
      sendInfo: notificationSendInfo,
      sendInfoName: "notificationSendInfo",
      setSendInfo: (value: any) => dispatch(setNotificationSendInfo(value)),
      searchPlaceholder: "Ady, teksti",
      header: "Notifications",
      modelName: "notifications",
      defaultFilters: [
        {
          label: "division",
          value: [],
        },
        {
          label: "Active",
          value: "",
        },
      ],
    },
    smartSections: {
      sendInfo: smartSectionsSendInfo,
      sendInfoName: "smartSectionSendInfo",
      setSendInfo: (value: any) => dispatch(setSmartSectionsSendInfo(value)),
      searchPlaceholder: "Ady",
      header: "SmartSections",
      modelName: "smartSections",
      defaultFilters: [
        {
          label: "division",
          value: [],
        },
        {
          label: "Active",
          value: "",
        },
      ],
    },
    comments: {
      sendInfo: commentsSendInfo,
      sendInfoName: "commentsSendInfo",
      setSendInfo: (value: any) => dispatch(setCommentsSendInfo(value)),
      searchPlaceholder: "Ady, e-poçtasy,telefon belgisi",
      header: "Comments",
      modelName: "comments",
    },
    promocodes: {
      sendInfo: promocodesSendInfo,
      sendInfoName: "promocodesSendInfo",
      setSendInfo: (value: any) => dispatch(setPromocodesSendInfo(value)),
      searchPlaceholder: "Ady",
      header: "Promocodes",
      modelName: "promocodes",
      defaultFilters: [
        {
          label: "active",
          value: true,
        },
      ],
    },
    orders: {
      sendInfo: ordersSendInfo,
      sendInfoName: "ordersSendInfo",
      setSendInfo: (value: any) => dispatch(setOrdersSendInfo(value)),
      searchPlaceholder:
        "Zakaz kody, addresi, müşderi belligi, müsderi ady,ulanyjy ady,ulanyjy",
      header: "Orders",
      modelName: "orders",
      defaultFilters: [
        // {
        //   label: "status",
        //   value: [
        //     "waitingForConfirmation",
        //     "reviewing",
        //     "picking",
        //     "delivering",
        //   ],
        // },
        {
          label: "status",
          value: "waitingForConfirmation",
        },
        {
          label: "status",
          value: "reviewing",
        },
        {
          label: "status",
          value: "picking",
        },
        {
          label: "status",
          value: "delivering",
        },
      ],
    },
  };

  const activeFilter = {
    name: "Aktiw",
    value: "active",
    options: [
      {
        label: "All",
        value: "",
      },
      {
        label: "Active",
        value: true,
      },
      {
        label: "Passive",
        value: false,
      },
    ],
    withSearch: false,
  };

  const divisionFilter = {
    name: "Division",
    value: "divisionUuids",
    options: divisionOptions1,
  };
  const languageFilter = {
    name: "Language",
    value: "languages",
    options: [
      {
        label: "Türkmen",
        value: "tm",
      },
      {
        label: "Rus",
        value: "ru",
      },
    ],
    withSearch: false,
  };
  const assignedMeFilter = {
    name: "Maňa degişli",
    value: "assignedMe",
    options: [
      {
        label: "Hemmesi",
        value: "",
      },
      {
        label: "Maňa degişli",
        value: true,
      },
      {
        label: "Başgalara degişli",
        value: false,
      },
    ],
    withSearch: false,
  };
  const programsFilter = {
    name: "Program",
    value: "programs",
    options: [
      {
        label: "Web",
        value: "web",
      },
      {
        label: "Mobile",
        value: "mobile",
      },
    ],
    withSearch: false,
  };
  const displayFieldsFilter = {
    name: "Ulanyljak ýerleri",
    value: "displayFields",
    options: [
      {
        label: "Header",
        value: "header",
      },
      {
        label: "Footer",
        value: "footer",
      },
      {
        label: "Esasy",
        value: "mainSection",
      },
    ],
  };
  const statusFilter = {
    name: "Status",
    value: "status",
    isMultiple: true,
    options: [
      {
        label: "Tassyklanmaga garaşylýar",
        value: "waitingForConfirmation",
      },
      {
        label: "Gözden geçirilýär",
        value: "reviewing",
      },
      {
        label: "Ýygnalýar",
        value: "picking",
      },
      {
        label: "Dostawka edilýär",
        value: "delivering",
      },
      {
        label: "Ýygnaldy",
        value: "collected",
      },
      {
        label: "Tamamlandy",
        value: "completed",
      },
      {
        label: "Işgär goý bolsun etdi",
        value: "employeeCanceled",
      },
      {
        label: "Müşderi goý bolsun etdi",
        value: "clientCanceled",
      },
    ],
    withSearch: true,
  };
  const deliveryTypeFilter = {
    name: "Hyzmatyň görnüşi",
    value: "deliveryType",
    options: [
      {
        label: "Hemmesi",
        value: "",
      },
      {
        label: "Ekspress",
        value: "express",
      },
      {
        label: "Özi gelip alan",
        value: "fromStore",
      },
      {
        label: "Adaty Dostawka",
        value: "normalDelivery",
      },
    ],
    withSearch: false,
  };
  const paymentTypeFilter = {
    name: "Töleg görnüşi",
    value: "paymentType",
    options: [
      {
        label: "Hemmesi",
        value: "",
      },
      {
        label: "Nagt",
        value: "cash",
      },
      {
        label: "Terminal",
        value: "withTerminal",
      },
      {
        label: "Online",
        value: "withOnline",
      },
      {
        label: "Nagt we Terminal",
        value: "cashAndTerminal",
      },
    ],
    withSearch: false,
  };
  const filters: any = {
    notification: [activeFilter, divisionFilter],
    smartSections: [
      activeFilter,
      divisionFilter,
      languageFilter,
      programsFilter,
      displayFieldsFilter,
    ],
    orders: [
      assignedMeFilter,
      statusFilter,
      deliveryTypeFilter,
      paymentTypeFilter,
      divisionFilter,
    ],
    promocodes: [activeFilter, divisionFilter],
    carousel: [activeFilter, divisionFilter],
    popup: [activeFilter, divisionFilter],
    aside: [activeFilter, divisionFilter],
  };

  const stateName = renderedIn
    ? renderedIn
    : Object.keys(states).find((key) => location.includes(key)) || "";

  useEffect(() => {
    let filterTypes = (
      renderedIn
        ? filters[renderedIn]
        : filters[
            Object.keys(filters).filter((key) => location.includes(key))?.[0]
          ]
    )
      ?.filter((filtering: any) => !filtering?.hide)
      ?.map((filtering: any) => filtering?.value);
    let emptyFiltered = searchEmptyRemover(states[stateName]?.sendInfo);
    Object.keys(emptyFiltered).forEach((ef) => {
      let isDefault = states[stateName]?.defaultFilters
        ?.filter((def: any) => {
          if (def?.label === ef) {
            return Array.isArray(def?.value)
              ? states[stateName]?.sendInfo?.[ef]?.length === def?.value?.length
              : states[stateName]?.sendInfo?.[ef] === def?.value;
          }
          return false;
        })
        .map((def: any) => def?.label);
      if (!filterTypes?.includes(ef) || isDefault?.includes(ef)) {
        delete emptyFiltered[ef];
      }
    });
    dispatch(setFilterExists(!!Object.keys(emptyFiltered)?.length));
  }, [
    location,
    renderedIn,
    states[stateName]?.sendInfoName,
    states[stateName]?.sendInfo,
    stateName,
  ]);

  const handleCookieSetting = (cookiePutValue: any) => {
    const stateValues = states[stateName];
    const { sendInfoName } = stateValues;
    const tempLocation = location.split("/");
    const isUuid = uuidChecher(tempLocation[tempLocation.length - 1]);

    if (!renderedIn || (renderedIn && renderedIn.includes("Task"))) {
      if (!isUuid) {
        cookieSetter(sendInfoName, JSON.stringify(cookiePutValue));
      }
    } else {
      cookieSetter(
        `${sendInfoName}${tempLocation[tempLocation.length - 1]}`,
        JSON.stringify(cookiePutValue)
      );
    }
  };
  const orderSort = [
    {
      label: "Status artýan",
      value: { orderName: "status", orderType: "asc" },
    },
    {
      label: "Status kemelýän",
      value: { orderName: "status", orderType: "desc" },
    },
  ];
  const sorts: any = {
    orders: orderSort,
    // sorts: sorts,
  };
  const handleClose = () => {
    setLocalSendState({});
    dispatch(setIsSearchModalOpen(false));
  };
  const handleOkButton = (sendInfo: any = "") => {
    const stateValues = states[stateName];

    const { setSendInfo } = stateValues;

    let tempSendInfo = { ...localSendState };

    if (sendInfo) {
      tempSendInfo = { ...tempSendInfo, ...sendInfo };
      setLocalSendState({ ...tempSendInfo, ...sendInfo });
    }

    tempSendInfo.search = searchValue;
    // tempSendInfo.isActive = "";
    // tempSendInfo.divisionUuids = [];

    if (tempSendInfo?.refModel && !tempSendInfo?.refUuids?.length) {
      tempSendInfo.refModel = "";
    }
    handleCookieSetting(tempSendInfo);
    setSendInfo(tempSendInfo);
    handleClose();
  };

  const sort = () => {
    let sortValue = renderedIn
      ? sorts[renderedIn]
      : sorts[Object.keys(sorts).filter((key) => location.includes(key))?.[0]];
    return (
      <Sort
        sortValue={sortValue}
        states={states[stateName]}
        handleOkButton={handleOkButton}
        localSendState={localSendState}
        setLocalSendState={setLocalSendState}
      />
    );
  };
  const filter = () => {
    const filterValue = renderedIn
      ? filters[renderedIn]
      : filters[
          Object.keys(filters).find((key) => location.includes(key)) || ""
        ];
    return (
      <Filter
        filterValue={filterValue}
        states={states[stateName]}
        handleOkButton={handleOkButton}
        localSendState={localSendState}
        setLocalSendState={setLocalSendState}
        handleClose={handleClose}
      />
    );
  };

  const handleRemoveFilter = () => {
    const stateValues = states[stateName];
    const { setSendInfo } = stateValues;
    const tempSendInfo = { ...localSendState };
    tempSendInfo.keyword = "";
    dispatch(setSearchValue(""));
    const filterTypes = (
      renderedIn
        ? filters[renderedIn]
        : filters[
            Object.keys(filters).filter((key) => location.includes(key))?.[0]
          ]
    )
      ?.filter((filtering: any) => !filtering?.hide)
      ?.map((filtering: any) => filtering?.value);

    filterTypes?.forEach((type: string) => {
      delete tempSendInfo[type];
    });
    delete tempSendInfo?.sortBy;
    delete tempSendInfo?.sortAs;
    states[stateName]?.defaultFilters?.forEach((defFilter: any) => {
      tempSendInfo[defFilter?.label] = defFilter?.value;
    });
    handleClose();
    handleCookieSetting(tempSendInfo);
    setSendInfo(tempSendInfo);
    setLocalSendState(tempSendInfo);
  };

  const customFooter = () => {
    return (
      <div>
        <Button onClick={handleRemoveFilter} style={{ marginRight: "10px" }}>
          Cancel
        </Button>
        <Button onClick={() => handleOkButton("")} type="primary">
          {/* <Button onClick={() => handleClose()} type="primary"> */}
          Ok
        </Button>
      </div>
    );
  };

  return (
    <Modal
      title="Search"
      open={isSearchModalOpen}
      onCancel={handleClose}
      closable
      footer={customFooter()}
    >
      <SearchInput states={states[stateName]} handleOkButton={handleOkButton} />
      {filter()}
      {sort()}
    </Modal>
  );
};

export default SearchModal;

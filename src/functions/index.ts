import Cookies from "js-cookie";
import i18next from "i18next";

export const cookieSetter = (
  name: string,
  value: string,
  expireTime = 1 / 12
) => {
  Cookies.set(name, value, { expires: expireTime });
};
export const cookieGetter = (name: string) => {
  return Cookies.get(name);
};
export const isMac = () => {
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
};

export const logout = () => {
  // if (status !== "409" && status !== "401") {
  //   await api.post<any>(`/employees/logout`, { program: "web" });
  // }
  sessionStorage.removeItem("token");
  // Cookies.remove('access_token');
  // Cookies.remove('refresh_token');
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
  // deleteToken(messaging);
  window.location.href = "/login";
};

let notificationInstance: any = null;
// let modalInstance: any = null;

export const getNotificationInstance = () => {
  if (!notificationInstance) {
    throw new Error("Notification instance has not been initialized.");
  }
  return notificationInstance;
};

export const showSuccessNotification = (config: any) => {
  const notification = getNotificationInstance();
  notification.success(config);
};
export const showErrorNotification = (config: any) => {
  const notification = getNotificationInstance();
  notification.error(config);
};

export const handleTokenNotValid = (status = "") => {
  showErrorNotification({
    message: i18next.t("TokenNotValid"),
    description: i18next.t("TokenNotValidBody"),
  });
  logout(status);
};

export const errorHandler = (statusCode: number, failedRequest: any) => {
  if (statusCode !== 409) {
    switch (statusCode) {
      case 400:
        showErrorNotification({
          message: i18next.t("InvalidCredentials"),
          description: i18next.t("InvalidCredentialsBody"),
        });
        return Promise.reject("request");
      case 401: //TODO: gorag maksatly token not valid cykarmaly
        handleTokenNotValid("401");
      case 403:
        showErrorNotification({
          message: i18next.t("NoAccessHeader"),
          description: i18next.t("NoAccessBody"),
        });
        return Promise.reject("request");
      case 404:
        showErrorNotification({
          message: i18next.t("RequestNotFound"),
          description: i18next.t("RequestNotFoundBody"),
        });
        return Promise.reject("request");
      case 500:
        showErrorNotification({
          message: i18next.t("500ErrorMessageHeader"),
          description: i18next.t("500ErrorMessage"),
        });
        return Promise.reject("request");
      case 413:
        showErrorNotification({
          message: i18next.t("FileLimitExceedsHeader"),
          description: i18next.t("FileLimitExceedsBody"),
        });
        return Promise.reject("request");

      default:
        showErrorNotification({
          message: statusCode,
          description: failedRequest?.response?.message,
        });
    }
  }
  return Promise.reject("request");
};

export const searchEmptyRemover = <T extends ParamsType>(params: T): T => {
  let returnParams = { ...params };
  for (let value in returnParams) {
    if (returnParams[value] === undefined || returnParams[value] === null) {
      delete returnParams[value];
    }
    if (Array.isArray(returnParams[value])) {
      if (returnParams[value]?.length) {
        returnParams[value] = returnParams[value]
          .map((rp: any) => isObject(rp))
          .filter((rpf: any) => rpf !== "");
      } else {
        delete returnParams[value];
      }
    }
  }
  return returnParams;
};

export const isAccessableWithIncludes = (objectSlice, includeValue) => {
  const { decodedToken } = store.getState();
  const tempDecodedToken = decodedToken.decodedToken;

  return (
    tempDecodedToken?.roles?.[objectSlice]?.includes(includeValue) ||
    tempDecodedToken?.roles?.fullAccess
  );
};

export const isObject = (obj: { label: string; value: any } | string | any) => {
  if (typeof obj === "object" && obj !== null && !Array.isArray(obj)) {
    return obj.value;
  }
  return obj;
};
type ParamsType = Record<string, any>;
export const emptyRemover = <T extends ParamsType>(params: T): T => {
  let returnParams = { ...params };
  for (let value in returnParams) {
    if (
      returnParams[value] === "" ||
      returnParams[value] === undefined ||
      returnParams[value] === null
    ) {
      delete returnParams[value];
    }
    if (Array.isArray(returnParams[value])) {
      if (returnParams[value]?.length) {
        returnParams[value] = returnParams[value]
          .map((rp: any) => isObject(rp))
          .filter((rpf: any) => rpf !== "");
      } else {
        delete returnParams[value];
      }
    }
  }
  return returnParams;
};
export const formatDate = (dateString: string | undefined) => {
  if (typeof dateString === "string") {
    const date = new Date(dateString);

    // Adjust for the local timezone
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
};

export const handleFilterCell = (data: any) => {
  const filterArr = [];
  if (data?.items?.length) {
    filterArr.push("Harytlar");
  }
  if (data?.mainGroups?.length) {
    filterArr.push("Esasy Gruplar");
  }
  if (data?.lastGroups?.length) {
    filterArr.push("Alt gruplar");
  }
  if (data?.paretto?.length) {
    filterArr.push("Paretto");
  }
  if (data?.brands?.length) {
    filterArr.push("Brendler");
  }
  return filterArr.join(", ");
};

export const orderTranslator = (order: any) => {
  switch (order) {
    case "price":
      return "Bahasy";

    case "paretto":
      return "Paretto";

    case "discount":
      return "Arzanladyş";

    case "name":
      return "Ady";

    case "random":
      return "Tötänleýin";
    case "purchaseDate":
      return "Gelen güni";

    default:
      return order;
  }
};

export function separateDateTimeFormat(formatString: string | undefined) {
  if (formatString) {
    const dateComponentRegex = /Y{2,4}|M{1,4}|D{1,2}/g;
    const timeComponentRegex = /H{1,2}|h{1,2}|m{2}|s{2}|A/g;

    let dateFormat = "";
    let timeFormat = "";
    let separatorBuffer = "";
    let isLastDate = false;

    for (let i = 0; i < formatString.length; i++) {
      const char = formatString.charAt(i);
      const upcomingChars = formatString.substr(i);

      const dateMatch = upcomingChars.match(dateComponentRegex);
      const timeMatch = upcomingChars.match(timeComponentRegex);

      if (dateMatch && upcomingChars.startsWith(dateMatch[0])) {
        if (isLastDate) dateFormat += separatorBuffer;
        separatorBuffer = "";

        dateFormat += dateMatch[0];
        i += dateMatch[0].length - 1;
        isLastDate = true;
      } else if (timeMatch && upcomingChars.startsWith(timeMatch[0])) {
        if (!isLastDate) timeFormat += separatorBuffer;
        separatorBuffer = "";

        timeFormat += timeMatch[0];
        i += timeMatch[0].length - 1;
        isLastDate = false;
      } else {
        separatorBuffer += char;
      }
    }

    if (isLastDate) {
      dateFormat += separatorBuffer;
    } else {
      timeFormat += separatorBuffer;
    }

    return { dateFormat: dateFormat.trim(), timeFormat: timeFormat.trim() };
  }
  return {
    dateFormat: "DD.MM.YYYY",
    timeFormat: "HH:mm:ss",
  };
}

export const mergeObjectsData = (data: any, sendInfo: any) => {
  const filteredSendInfo = Object.keys(sendInfo).reduce((acc, key) => {
    const value = sendInfo[key];
    if (
      value !== null &&
      value !== "" &&
      (!Array.isArray(value) || (Array.isArray(value) && value.length > 0))
    ) {
      acc[key] = value;
    }
    return acc;
  }, {} as any);

  return Object.assign({}, data, filteredSendInfo);
};

export const handleRequired = (field: string, updatedData: any) => {
  const fieldValue = updatedData[field];
  return fieldValue === "" || fieldValue === undefined || fieldValue === null;
};

export const handleError = (request: any) => {
  return errorHandler(request?.response?.status, request);
};

export const getDefaultValue = (defaultValue, options, multiple) => {
  let compareValue = isObject(defaultValue);

  if (!defaultValue) return null;

  if (!multiple) {
    return options.find((option) => option.value === compareValue);
  }

  let tempOptions = defaultValue.map((dv) => {
    return options.find((option) => option.value === isObject(dv));
  });
  return tempOptions;
};

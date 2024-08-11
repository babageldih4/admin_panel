import { FC, useState } from "react";
import styles from "../../../styles/settingsModal.module.scss";
// import EmployeeAvatar from "../../EmployeeAvatar";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { App, Button, Divider, Grid, Input, Avatar } from "antd";
import { useTranslation } from "react-i18next";
import { AxiosResponse } from "axios";
import api from "../../../plugins/axios";
import { errorHandler } from "../../../functions";
import { setButtonLoading } from "../../../store/general/generalSlice";
// import { useGeneralHook } from "../../../hooks/generalHooks";
const { useBreakpoint } = Grid;

const ProfileInfo: FC<{
  setProfileType: any;
  changePassword?: boolean;
}> = ({ setProfileType }) => {
  const { me: Me, buttonLoading } = useAppSelector((state) => state.general);
  const [changePassword, setChangePassword] = useState(false);
  const [sendInfo, setSendInfo] = useState<{
    oldPassword?: string;
    newPassword?: string;
  }>({});
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const dispatch = useAppDispatch();
  //   const { formatDateAndTime } = useGeneralHook();
  const { notification } = App.useApp();

  const change = async (
    body: any
  ): Promise<AxiosResponse<{ oldPassword: string; newPassword: string }>> =>
    api.patch<{ oldPassword: string; newPassword: string }>(
      `/employees/password`,
      body
    );

  const func = async () => {
    try {
      dispatch(setButtonLoading({ save: true }));
      await change(sendInfo);
      dispatch(setButtonLoading({ save: false }));

      notification.success({
        message: "Updated successfully",
      });
      setSendInfo({});
    } catch (err: any) {
      dispatch(setButtonLoading({ save: false }));

      errorHandler(err?.response?.status, err);
    }
  };

  const oneRow = (params: { label: string; value: any }) => {
    const { label, value } = params;
    return (
      <>
        <Divider style={{ margin: "10px 0" }} />
        <div
          style={{
            display: screens.xs ? undefined : "flex",
          }}
          className={styles["profile-info-row"]}
        >
          <div>{t(label)}</div>
          <div>{value}</div>
        </div>
      </>
    );
  };

  return (
    <div className={styles["profileInfoContainer"]}>
      <div className={styles["avatarContainer"]}>
        <p>{t("Avatar")}</p>
        <div onClick={() => setProfileType("picture")}>
          {/* <EmployeeAvatar employee={Me} size={50} clickable={false} /> */}
          <Avatar />
        </div>
      </div>
      {oneRow({
        label: "Name",
        value: `${Me?.name} ${Me?.surname}`,
      })}
      {oneRow({
        label: "Username",
        value: `@${Me?.username}`,
      })}
      {/* {oneRow({
			label: "Email",
			value: Me?.email,
		})}
		{oneRow({
			label: "Phones",
			value: Me?.phones?.join(","),
		})} */}
      {/* {oneRow({
        label: "BirthDate",
        value: formatDateAndTime(Me?.birthDate),
      })} */}

      {changePassword && (
        <>
          {oneRow({
            label: "OldPassword",
            value: (
              <Input.Password
                value={sendInfo?.oldPassword}
                placeholder={t("OldPassword") ?? ""}
                style={{ width: "200px" }}
                onChange={(e) => {
                  setSendInfo({ ...sendInfo, oldPassword: e.target.value });
                }}
              />
            ),
          })}
          {oneRow({
            label: "NewPassword",
            value: (
              <Input.Password
                value={sendInfo?.newPassword}
                placeholder={t("NewPassword") ?? ""}
                style={{ width: "200px" }}
                onChange={(e) => {
                  setSendInfo({ ...sendInfo, newPassword: e.target.value });
                }}
              />
            ),
          })}
        </>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px 0",
        }}
      >
        <Button
          onClick={() => {
            if (!changePassword) {
              setChangePassword(true);
            } else {
              func();
            }
          }}
          type="primary"
          loading={buttonLoading?.save}
        >
          {t("ChangePassword")}
        </Button>
      </div>
    </div>
  );
};

export default ProfileInfo;

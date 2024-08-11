import { useEffect, type FC } from "react";
import { Navigate } from "react-router-dom";
import { setToken } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../store/hooks";
import { cookieGetter } from "../../functions";

export type TProps = {
  authPath?: string;
  outlet: JSX.Element;
};

const Protected: FC<TProps> = ({ authPath = "/login", outlet }) => {
  const dispatch = useAppDispatch();

  const token = sessionStorage.getItem("admin_token");
  const cookieToken = cookieGetter("admin_token");
  useEffect(() => {
    if (token || cookieGetter("admin_token")) {
      dispatch(setToken(token || cookieGetter("admin_token")!));
    }
  }, [dispatch, token, cookieToken]);
  if (token || cookieToken) {
    return outlet;
  }
  return <Navigate to={{ pathname: authPath }} />;
};

export default Protected;

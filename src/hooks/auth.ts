import { AxiosResponse } from "axios";
import api from "../plugins/axios";
import { TLogin, TLoginResponse } from "../types/auth";

export const useAuthHook = () => {
  const login = async (
    values: TLogin
  ): Promise<AxiosResponse<TLoginResponse>> =>
    await api.post<TLoginResponse>("/employees/login", values);

  return { login };
};

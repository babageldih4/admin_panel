export type TLogin = {
  userName: string;
  password: string;
  longitude?: number;
  latitude?: number;
  program?: string;
};

export type TLoginResponse = {
  token: string;
  refreshToken: string;
  accesses: { [key: string]: string[] };
  subscription: { daysLeft: any };
};

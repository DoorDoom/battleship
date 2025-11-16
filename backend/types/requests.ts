import type { LoginExportData, LoginData } from "./dates";

export type CustomRequest = {
  type: string;
  data: LoginData | LoginExportData;
  id: number;
};

export type CustomResponse = {
  type: string;
  data: string;
  id: number;
};

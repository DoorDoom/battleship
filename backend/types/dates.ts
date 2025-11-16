export type LoginData = {
  name: string;
  password: string;
};

export type LoginExportData = {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
};

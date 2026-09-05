import type { AxiosInstance } from "axios";

export type AddAdminData = {
  firstName: string;
  lastName: string;
  email: string;
  phone_code: string;
  phone_number: string;
  password: string;
  confirmPassword: string;
  permissions: number[];
};

export const addAdmin = (axios: AxiosInstance, data: AddAdminData) => {
  return axios.post("/admins", data);
};

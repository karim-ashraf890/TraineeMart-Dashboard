import type { AxiosInstance } from "axios";

export type UpdateAdminData = {
  firstName: string;
  lastName: string;
  email: string;
  phone_code: string;
  phone_number: string;
  password?: string;
  confirmPassword?: string;
  permissions: number[];
};

export const getAdmin = (axios: AxiosInstance, id: string | number) => {
  return axios.get(`/admins/${id}`);
};

export const updateAdmin = (
  axios: AxiosInstance,
  id: string | number,
  data: FormData,
) => {
  return axios.post(`/admins/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAdmin = (axios: AxiosInstance, id: string | number) => {
  return axios.delete(`/admins/${id}`);
};
export type UpdatePasswordData = {
  currentPassword: string;
  newPassword: string;
};
export const UpdatePassword = (
  axios: AxiosInstance,
  data: UpdatePasswordData,
) => {
  return axios.post("/authentication/update_password", data);
};

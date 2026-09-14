import type { AxiosInstance } from "axios";

export type UpdateTraineeData = {
  firstName: string;
  lastName: string;
  email: string;
  phone_code: string;
  phone_number: string;
  password?: string;
  confirmPassword?: string;
};

export const getTrainee = (axios: AxiosInstance, id: string | number) => {
  return axios.get(`/dashboard_students/${id}`);
};

export const updateTrainee = (
  axios: AxiosInstance,
  id: string | number,
  data: FormData,
) => {
  return axios.post(`/dashboard_students/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteTrainee = (axios: AxiosInstance, id: string | number) => {
  return axios.delete(`/dashboard_students/${id}`);
};

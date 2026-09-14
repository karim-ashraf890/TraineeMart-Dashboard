import type { AxiosInstance } from "axios";

export const addTrainee = (axios: AxiosInstance, data: FormData) => {
  return axios.post("/dashboard_students", data);
};

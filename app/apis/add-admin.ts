import type { AxiosInstance } from "axios";

export const addAdmin = async (axios: AxiosInstance, formData: FormData) => {
  return axios.post("/admins", formData);
};

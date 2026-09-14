import type { AxiosInstance } from "axios";

export const addAdmin = (axios: AxiosInstance, data: FormData) => {
  return axios.post("/admins", data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

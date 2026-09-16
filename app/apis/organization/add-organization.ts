import type { AxiosInstance } from "axios";

export const addOrganization = (axios: AxiosInstance, data: FormData) => {
  return axios.post("/dashboard_organizations", data);
};

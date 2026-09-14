import type { AxiosInstance } from "axios";

export const GetMyProfile = (axios: AxiosInstance) => {
  return axios.get("/admins/my-profile");
};

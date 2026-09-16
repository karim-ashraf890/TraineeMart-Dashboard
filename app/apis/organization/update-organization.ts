import type { AxiosInstance } from "axios";

export const getOrganization = (axios: AxiosInstance, id: string | number) => {
  return axios.get(`/dashboard_organizations/${id}`);
};

export const updateOrganization = (
  axios: AxiosInstance,
  id: string | number,
  data: FormData,
) => {
  return axios.post(`/dashboard_organizations/${id}`, data, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOrganization = (
  axios: AxiosInstance,
  id: string | number,
) => {
  return axios.delete(`/dashboard_organizations/${id}`);
};

export const getServiceTypes = (axios: AxiosInstance) => {
  return axios.get("/servicetypes");
};

export const getCourseTypes = (axios: AxiosInstance) => {
  return axios.get("/coursetypes");
};

import axios, { type AxiosInstance } from "axios";
import { useEffect, useRef } from "react";
import { clearAuthData } from "../apis/clearAuthData";

let refreshPromise: Promise<any> | null = null;

export const useAxios = (options?: {
  onUploadProgress?: (uploadedPercent: number) => void;
  loadResHeaders?: boolean;
}) => {
  const apiRef = useRef<AxiosInstance | null>(null);

  if (!apiRef.current) {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    apiRef.current = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Timezone: timezone,
      },
      onUploadProgress: function (progressEvent) {
        // Do whatever you want with the native progress event
        const total = progressEvent.total ?? 0;
        const uploadedPercent = Math.round(
          (100 * progressEvent.loaded) / total,
        );
        options?.onUploadProgress?.(uploadedPercent);
      },
    });
  }
  const api = apiRef.current;

  useEffect(() => {
    const reqId = api.interceptors.request.use(
      async (config) => {
        if (typeof window === "undefined") return config;

        const token = localStorage.getItem("accessToken");

        if (token) {
          config.headers.Authorization = `${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      },
    );

    const resId = api.interceptors.response.use(
      (response) => {
        if (options?.loadResHeaders)
          return {
            data: response.data,
            headers: response.headers,
          };
        return response.data;
      },
      async function (error) {
        const originalConfig = error.config;
        if (
          error.code === "ERR_CANCELED" ||
          error.message === "canceled" ||
          error.name == "CanceledError"
        ) {
          return { message: "ERR_CANCELED" };
        }
        if (
          error.response &&
          error.response.status === 401 &&
          !originalConfig._retry
        ) {
          if (window.location.pathname === "/sign-in") {
            return Promise.reject(error);
          }
          originalConfig._retry = true;
          // If no refresh in-flight, start one
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            return Promise.reject(error);
          }

          if (!refreshPromise) {
            refreshPromise = (async () => {
              try {
                // Use bare axios to avoid infinite loops on this instance
                const res: any = await axios({
                  method: "GET",
                  url:
                    import.meta.env.VITE_BASE_URL +
                    "/authentication/refresh-token",
                  headers: {
                    Authorization: `${refreshToken}`,
                  },
                });
                localStorage.setItem("accessToken", res.data.access_token);
                localStorage.setItem("refreshToken", res.data.refresh_token);
                return res.data;
              } catch (nestedErr: any) {
                // Refresh failed → session is invalid; clean up
                clearAuthData();
                window.location.href = "/sign-in";
                // invalid refresh token as well
                if (nestedErr.message && nestedErr.message == "canceled") {
                  return { message: "ERR_CANCELED" };
                }
                return Promise.reject(error);
              } finally {
                // Allow future refreshes
                refreshPromise = null;
              }
            })();
          }
          // Wait for the in-flight refresh (or the one we just started)
          await refreshPromise;

          // Retry the original request with the new token
          originalConfig.headers = originalConfig.headers ?? {};
          const accessToken = localStorage.getItem("accessToken");
          originalConfig.headers.Authorization = `${accessToken}`;
          return (await axios(originalConfig)).data;
        }
        return Promise.reject(error);
      },
    );
    // remove previous interceptors that hold the old Access/Re-fresh tokens
    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [api]);

  return { axios: api };
};

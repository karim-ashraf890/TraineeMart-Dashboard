import axios from "axios";

export const signIn = (data: { email: string; password: string }) => {
  return axios.post("/login", data);
};

import { fetchClient } from "@/api/fetchClient";


export const login = (name: string, email: string) => {
  return fetchClient.post("/auth/login", { name, email });
};

export const logout = () => {
  return fetchClient.post("/auth/logout");
};
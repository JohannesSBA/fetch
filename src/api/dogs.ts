import { fetchClient } from "./fetchClient";

export const getBreeds = async (): Promise<string[]> => {
  const { data } = await fetchClient.get("/dogs/breeds");
  return data;
};

export const searchDogs = async (params: {
  breeds?: string[];
  size?: number;
  from?: number;
  sort?: string;
}) => {
  const query = new URLSearchParams();

  if (params.breeds) params.breeds.forEach(b => query.append("breeds", b));
  if (params.size) query.append("size", params.size.toString());
  if (params.from) query.append("from", params.from.toString());
  if (params.sort) query.append("sort", params.sort);

  const { data } = await fetchClient.get(`/dogs/search?${query.toString()}`);
  return data;
};

export const getDogsByIds = async (ids: string[]) => {
  const { data } = await fetchClient.post("/dogs", ids);
  return data;
};

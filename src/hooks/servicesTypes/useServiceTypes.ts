import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IServices {
  id: number;
  name: ILocals;
}

export const getServicesTypes = async () => {
  const res = await apiClient.get<IServices[]>("/api/dashboard/types");
  console.log(res);

  return res.data;
};

export const useFetchServicesTypes = () => {
  return useQuery({
    queryKey: ["services_types"],
    queryFn: () => getServicesTypes(),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

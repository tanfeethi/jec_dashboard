import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IServices {
  id: number;
  title: ILocals;
  text: ILocals;
  icon: string;
  type_name: ILocals;
}

export interface IServicesResponse {
  data: IServices[];
  status: string;
  error: string;
  code: number;
}

export const getServices = async () => {
  const res = await apiClient.get<IServicesResponse>("/api/dashboard/services");
  console.log(res);

  return res.data.data;
};

export const useFetchServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: () => getServices(),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

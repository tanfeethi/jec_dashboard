import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface ISliders {
  id: number;
  background: string;
  title: ILocals;
  text: ILocals;
  btnTitle: ILocals;
  btnUrl: string;
  btnActive: string;
}

export interface ISlidersResponse {
  data: ISliders[];
  status: string;
  error: string;
  code: number;
}

export const getSliders = async () => {
  const res = await apiClient.get<ISlidersResponse>("/api/dashboard/sliders");

  return res.data.data;
};

export const useFetchSliders = () => {
  return useQuery({
    queryKey: ["sliders"],
    queryFn: () => getSliders(),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

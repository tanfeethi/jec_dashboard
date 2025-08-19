import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IServiceImage {
  id: number;
  service_detail_id: number;
  image_path: string;
  created_at: string;
  updated_at: string;
}

export interface IServiceDetail {
  id: number;
  service_id: number;
  title: ILocals;
  description: ILocals;
  created_at: string;
  updated_at: string;
  images: IServiceImage[];
}

export interface IService {
  id: number;
  title: ILocals;
  text: ILocals;
  icon: string;
  type: string;
  created_at: string;
  updated_at: string;
  service_details: IServiceDetail[];
}

export const getServicesDetails = async (serviceID: number) => {
  const res = await apiClient.get<IService>(
    `/api/frontend/service-details/${serviceID}`
  );

  return res.data;
};

export const useFetchServicesDetails = (serviceID: number) => {
  return useQuery({
    queryKey: ["serviceDetails", serviceID], // ✅ include serviceID for caching
    queryFn: () => getServicesDetails(serviceID),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

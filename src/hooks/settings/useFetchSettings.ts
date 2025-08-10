import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IContactResponse {
  id: number;
  title: ILocals;
  address: ILocals;
  phones: {
    phones: string[];
    mobiles: string[];
  };
  social_media: {
    x: string;
    tiktok: string;
    facebook: string;
    linkedin: string;
    instagram: string;
  };
  long: string;
  lat: string;
  email: string;
  created_at: string;
  updated_at: string;
  statistics: {
    trips: string;
    hours: string;
    programs: string;
    clients: string;
  };
}

export interface IContactApiResponse {
  data: IContactResponse;
  status: string;
  error: string;
  code: number;
}

export const getSettings = async () => {
  const res = await apiClient.get<IContactApiResponse>(
    "/api/dashboard/settings/list"
  );
  return res.data.data;
};

export const useFetchSettings = () => {
  return useQuery({
    queryKey: ["contact-details"],
    queryFn: getSettings,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

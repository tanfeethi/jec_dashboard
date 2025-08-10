import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

// Localized interface
export interface ILocals {
  ar: string;
  en: string;
}

// Interface for each static page item
export interface IStaticPage {
  name: string;
  title: ILocals;
  text: ILocals;
  image: string;
}

// Full API response
export interface IStaticPagesResponse {
  data: IStaticPage[];
  status: string;
  error: string;
  code: number;
}

// Fetch function
export const getStaticPages = async (): Promise<IStaticPage[]> => {
  const res = await apiClient.get<IStaticPagesResponse>(
    "/api/dashboard/staticPages"
  );
  return res.data.data;
};

// React Query hook
export const useFetchStaticPages = () => {
  return useQuery<IStaticPage[]>({
    queryKey: ["static-pages"],
    queryFn: getStaticPages,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

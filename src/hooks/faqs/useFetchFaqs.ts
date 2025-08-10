import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

// Interface for localized content
export interface ILocals {
  ar: string;
  en: string;
}

// Interface for each FAQ
export interface IFaq {
  id: number;
  question: ILocals;
  answer: ILocals;
}

// Full response interface
export interface IFaqsResponse {
  data: IFaq[];
  status: string;
  error: string;
  code: number;
}

// Fetch function
export const getFaqs = async (): Promise<IFaq[]> => {
  const res = await apiClient.get<IFaqsResponse>("/api/dashboard/faqs");
  return res.data.data;
};

// React Query hook
export const useFetchFaqs = () => {
  return useQuery<IFaq[]>({
    queryKey: ["faqs"],
    queryFn: getFaqs,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface ITestimonial {
  id: number;
  name: ILocals;
  position: ILocals;
  text: ILocals;
  image: string;
  socialType: string;
  socialUrl: string;
  date: string;
}

export interface ITestimonialsResponse {
  data: ITestimonial[];
  status: string;
  error: string;
  code: number;
}

export const getTestimonials = async () => {
  const res = await apiClient.get<ITestimonialsResponse>(
    "/api/dashboard/testimonials"
  );
  return res.data.data;
};

export const useFetchTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

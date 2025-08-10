import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IReview {
  id: number;
  name: ILocals;
  link: string;
  image: string;
  text: ILocals;
}

export interface IReviewsResponse {
  data: IReview[];
  status: string;
  error: string;
  code: number;
}

export const getReviews = async (): Promise<IReview[]> => {
  const res = await apiClient.get<IReviewsResponse>("/api/dashboard/reviews");
  return res.data.data;
};

export const useFetchReviews = () => {
  return useQuery<IReview[]>({
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

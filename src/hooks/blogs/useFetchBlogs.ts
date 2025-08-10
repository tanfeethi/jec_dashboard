import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
export interface ILocals {
  ar: string;
  en: string;
}

export interface IBlog {
  id: number;
  background: string;
  title: ILocals;
  text: ILocals;
  status: number;
  tags: string[] | null;
}

export interface IPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface IPaginationMetaLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface IPaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: IPaginationMetaLink[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IBlogsData {
  data: IBlog[];
  links: IPaginationLinks;
  meta: IPaginationMeta;
}

export interface IBlogsApiResponse {
  data: IBlogsData;
  status: string;
  error: string;
  code: number;
}

export const getBlogs = async (page = 1): Promise<IBlogsData> => {
  const res = await apiClient.get<IBlogsApiResponse>(
    `/api/dashboard/blogs?page=${page}`
  );
  return res.data.data;
};
export const useFetchBlogs = (page: number) => {
  return useQuery({
    queryKey: ["blogs", page],
    queryFn: () => getBlogs(page),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

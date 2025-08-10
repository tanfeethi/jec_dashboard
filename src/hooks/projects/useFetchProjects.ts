import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface IVersion {
  id: number;
  title: ILocals;
  text: ILocals;
  number_of_beneficiaries: number | null;
  parent_id: number;
  version: ILocals | null;
  thumbnail: string[];
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  tags: string[] | null;
  type: string;
  report: string | null;
}

export interface IProject {
  id: number;
  title: ILocals;
  text: ILocals;
  numberOfBeneficiaries: number | null; // camelCase for main object
  version: ILocals | null;
  tags: string[] | null;
  thumbnail: string[];
  versions: IVersion[];
  managers: any[]; // TODO: Replace any[] with proper manager type if known
  trainers: any[]; // TODO: Replace any[] with proper trainer type if known
  type: string;
  report: string | null;
}

export interface IProjectsListApiResponse {
  pagination: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  status: string;
  data: IProject[];
}

// Fetch projects from API
export const getProjects = async (
  page = 1
): Promise<IProjectsListApiResponse> => {
  const res = await apiClient.get<IProjectsListApiResponse>(
    `/api/dashboard/projects?page=${page}`
  );
  return res.data; // ✅ Return the whole API response
};

// React Query hook
export const useFetchProjects = (page: number) => {
  return useQuery({
    queryKey: ["projects", page],
    queryFn: () => getProjects(page),
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

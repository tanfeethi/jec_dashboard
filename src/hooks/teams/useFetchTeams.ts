import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface ILocals {
  ar: string;
  en: string;
}

export interface ITeam {
  id: number;
  name: ILocals;
  position: ILocals;
  text: ILocals;
  image: string;
  details: ILocals;
  cv: string;
}

export interface ITeamsResponse {
  data: ITeam[];
  status: string;
  error: string;
  code: number;
}

export const getTeams = async (): Promise<ITeam[]> => {
  const res = await apiClient.get<ITeamsResponse>("/api/dashboard/teams");
  return res.data.data;
};

export const useFetchTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
    staleTime: 0,
    retry: 3,
    refetchOnWindowFocus: false,
  });
};

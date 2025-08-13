import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface Client {
    id: number;
    logo: string;
    link: string;
}

export interface ClientsResponse {
    data: Client[];
    status: string;
    error: string;
    code: number;
}

export const getClients = async (): Promise<Client[]> => {
    const res = await apiClient.get<ClientsResponse>("/api/dashboard/clients");
    return res.data.data;
};

export const useFetchClients = () => {
    return useQuery<Client[]>({
        queryKey: ["clients"],
        queryFn: getClients,
        staleTime: 0,
        retry: 3,
        refetchOnWindowFocus: false,
    });
};
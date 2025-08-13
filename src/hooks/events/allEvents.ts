import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";

export interface Locals {
    ar: string;
    en: string;
}

export interface Event {
    id: number;
    title: Locals;
    image: string;
}

export interface IEventsResponse {
    data: Event[];
    status: string;
    error: string;
    code: number;
}

export const getEvents = async (): Promise<Event[]> => {
    const res = await apiClient.get<IEventsResponse>("/api/dashboard/events");
    return res.data.data;
};

export const useFetchEvents = () => {
    return useQuery<Event[]>({
        queryKey: ["events"],
        queryFn: getEvents,
        staleTime: 0,
        retry: 3,
        refetchOnWindowFocus: false,
    });
};
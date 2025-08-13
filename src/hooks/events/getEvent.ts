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

export interface EventResponse {
    data: Event;
    status: string;
    error: string;
    code: number;
}

export const getEvent = async (id: number): Promise<Event> => {
    const res = await apiClient.get<EventResponse>(`/api/dashboard/events/${id}`);
    return res.data.data;
};

export const useFetchEvent = (id: number) => {
    return useQuery<Event>({
        queryKey: ["event", id],
        queryFn: () => getEvent(id),
        enabled: !!id,
        staleTime: 0,
        retry: 3,
        refetchOnWindowFocus: false,
    });
};
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface CreateEventPayload {
    titleEn: string;
    titleAr: string;
    image: File;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const createEvent = async (payload: CreateEventPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("title[en]", payload.titleEn);
    formData.append("title[ar]", payload.titleAr);
    formData.append("image", payload.image);

    const res = await apiClient.post<ApiResponse>("/api/dashboard/events", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const useCreateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createEvent,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Event created successfully!");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            } else {
                toast.error(data.error || "Failed to create event");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
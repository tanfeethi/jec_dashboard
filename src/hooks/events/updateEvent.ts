import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface UpdateEventPayload {
    id: number;
    titleEn: string;
    titleAr: string;
    image?: File;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const updateEvent = async (payload: UpdateEventPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("title[en]", payload.titleEn);
    formData.append("title[ar]", payload.titleAr);

    if (payload.image) {
        formData.append("image", payload.image);
    }

    const res = await apiClient.post<ApiResponse>(
        `/api/dashboard/events/${payload.id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateEvent,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Event updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            } else {
                toast.error(data.error || "Failed to update event");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
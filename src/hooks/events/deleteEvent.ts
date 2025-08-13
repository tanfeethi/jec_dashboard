import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface DeleteEventPayload {
    id: number;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const deleteEvent = async (payload: DeleteEventPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("_method", "delete");

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

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteEvent,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Event deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["events"] });
            } else {
                toast.error(data.error || "Failed to delete event");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
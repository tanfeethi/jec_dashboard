import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface DeleteClientPayload {
    id: number;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const deleteClient = async (payload: DeleteClientPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("_method", "delete");

    const res = await apiClient.post<ApiResponse>(
        `/api/dashboard/clients/${payload.id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return res.data;
};

export const useDeleteClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteClient,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Client deleted successfully!");
                queryClient.invalidateQueries({ queryKey: ["clients"] });
            } else {
                toast.error(data.error || "Failed to delete client");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
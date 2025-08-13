import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface UpdateClientPayload {
    id: number;
    logo?: File;
    link: string;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const updateClient = async (payload: UpdateClientPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("_method", "put");
    formData.append("link", payload.link);

    if (payload.logo) {
        formData.append("logo", payload.logo);
    }

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

export const useUpdateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateClient,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Client updated successfully!");
                queryClient.invalidateQueries({ queryKey: ["clients"] });
            } else {
                toast.error(data.error || "Failed to update client");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
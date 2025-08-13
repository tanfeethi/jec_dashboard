import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

interface CreateClientPayload {
    logo: File;
    link: string;
}

interface ApiResponse {
    data: [];
    status: string;
    error: string;
    code: number;
}

const createClient = async (payload: CreateClientPayload): Promise<ApiResponse> => {
    const formData = new FormData();
    formData.append("logo", payload.logo);
    formData.append("link", payload.link);

    const res = await apiClient.post<ApiResponse>("/api/dashboard/clients", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
};

export const useCreateClient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClient,
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.success("Client created successfully!");
                queryClient.invalidateQueries({ queryKey: ["clients"] });
            } else {
                toast.error(data.error || "Failed to create client");
            }
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.error || "Something went wrong");
        },
    });
};
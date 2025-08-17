import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateServicePayload {
  id: number;
  values: {
    title_en: string;
    title_ar: string;
    text_en: string;
    text_ar: string;
    icon?: File | null;
    type: string;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateService = async (
  data: UpdateServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("title[en]", data.values.title_en);
  formData.append("title[ar]", data.values.title_ar);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("type", data.values.type);

  if (data.values.icon) {
    formData.append("icon", data.values.icon);
  }

  const response = await apiClient.post(
    `/api/dashboard/services/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );

  return response.data;
};

const useUpdateService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateServicePayload
  >({
    mutationFn: updateService,
    onSuccess: () => {
      toast.success("Service updated successfully", { position: "top-center" });
      navigate("/services");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      console.error(
        "Update service error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateService;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddServicePayload {
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
  icon: File | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createService = async (
  data: AddServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);

  if (data.icon) {
    formData.append("icon", data.icon);
  }

  const response = await apiClient.post("/api/dashboard/services", formData);
  return response.data;
};

const useAddService = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddServicePayload
  >({
    mutationFn: createService,
    onSuccess: () => {
      toast.success("Service added successfully", { position: "top-center" });
      navigate("/services");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: (error) => {
      console.error(
        "Add service error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddService;

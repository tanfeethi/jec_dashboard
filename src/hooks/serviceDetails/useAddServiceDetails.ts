import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddServicePayload {
  service_id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  images: File[] | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createServiceDetails = async (
  data: AddServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("description[en]", data.description_en);
  formData.append("description[ar]", data.description_ar);
  formData.append("service_id", data.service_id.toString());

  if (data.images) {
    data.images.forEach((file) => {
      formData.append("images[]", file);
    });
  }

  const response = await apiClient.post(
    "/api/dashboard/service-details",
    formData
  );
  return response.data;
};

const useAddServiceDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddServicePayload
  >({
    mutationFn: createServiceDetails,
    onSuccess: () => {
      toast.success("Service added successfully", { position: "top-center" });
      navigate("/services");
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
    },
    onError: (error) => {
      console.error(
        "Add service error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddServiceDetails;

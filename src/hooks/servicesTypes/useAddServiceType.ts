import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddServicePayload {
  name_en: string;
  name_ar: string;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createServiceType = async (
  data: AddServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("name[en]", data.name_en);
  formData.append("name[ar]", data.name_ar);

  const response = await apiClient.post("/api/dashboard/types", formData);
  return response.data;
};

const useAddServiceType = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddServicePayload
  >({
    mutationFn: createServiceType,
    onSuccess: () => {
      toast.success("Service added successfully", { position: "top-center" });
      navigate("/services_types");
      queryClient.invalidateQueries({ queryKey: ["services_types"] });
    },
    onError: (error) => {
      console.error(
        "Add service error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddServiceType;

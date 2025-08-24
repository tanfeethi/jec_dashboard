import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddServicePayload {
  id: number;
  name: {
    name_en: string;
    name_ar: string;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateServiceType = async (
  data: AddServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("name[en]", data.name.name_en);
  formData.append("name[ar]", data.name.name_ar);
  formData.append("_method", "put");

  const response = await apiClient.post(
    `/api/dashboard/types/${data.id}`,
    formData
  );
  return response.data;
};

const useUpdateServiceType = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddServicePayload
  >({
    mutationFn: updateServiceType,
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

export default useUpdateServiceType;

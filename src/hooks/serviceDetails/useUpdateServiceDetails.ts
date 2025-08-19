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
    description_en: string;
    description_ar: string;
    images?: File[] | null;
    type?: string; // made optional
    service_id: number;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateServiceDetails = async (
  data: UpdateServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("title[en]", data.values.title_en);
  formData.append("title[ar]", data.values.title_ar);
  formData.append("description[en]", data.values.description_en);
  formData.append("description[ar]", data.values.description_ar);
  formData.append("service_id", data.values.service_id.toString());

  if (data.values.images) {
    formData.append("images", data.values.images[0]);
  }

  const response = await apiClient.post(
    `/api/dashboard/service-details/${data.id}`,
    formData,
    {
      params: { _method: "put" },
    }
  );

  return response.data;
};

const useUpdateServiceDetails = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateServicePayload
  >({
    mutationFn: updateServiceDetails,
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

export default useUpdateServiceDetails;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateSettingsPayload {
  values: {
    title: {
      en: string;
      ar: string;
    };
    address: {
      en: string;
      ar: string;
    };
    email: string;
    phones: {
      phones: string[];
      mobiles: string[];
    };
    social_media: Record<string, string>;
    statistics?: Record<string, string | number>;
    long?: string;
    lat?: string;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateSettings = async (
  data: UpdateSettingsPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Required fields
  formData.append("title[en]", data.values.title.en);
  formData.append("title[ar]", data.values.title.ar);
  formData.append("address[en]", data.values.address.en);
  formData.append("address[ar]", data.values.address.ar);
  formData.append("email", data.values.email);

  // Flattened phone and mobile arrays
  data.values.phones.phones.forEach((phone) => {
    formData.append("phones[]", phone);
  });

  data.values.phones.mobiles.forEach((mobile) => {
    formData.append("mobiles[]", mobile);
  });

  // Social media
  Object.entries(data.values.social_media).forEach(([platform, url]) => {
    formData.append(`social_media[${platform}]`, url);
  });

  // Statistics
  if (data.values.statistics) {
    Object.entries(data.values.statistics).forEach(([key, value]) => {
      formData.append(`statistics[${key}]`, String(value));
    });
  }

  // Lat & Long
  if (data.values.lat) formData.append("lat", data.values.lat);
  if (data.values.long) formData.append("long", data.values.long);

  // Put method
  formData.append("_method", "put");

  const response = await apiClient.post(
    `/api/dashboard/settings/update`,
    formData
  );

  return response.data;
};

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateSettingsPayload
  >({
    mutationFn: updateSettings,
    onSuccess: () => {
      toast.success("Settings updated successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      navigate("/settings");
    },
    onError: (error) => {
      console.error(
        "Update Settings error:",
        error.response?.data || error.message
      );
      toast.error("Failed to update settings", { position: "top-center" });
    },
  });
};

export default useUpdateSettings;

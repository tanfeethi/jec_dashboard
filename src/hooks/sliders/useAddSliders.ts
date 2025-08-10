import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddServicePayload {
  title_en: string;
  title_ar: string;
  btn_title_en: string;
  btn_title_ar: string;
  btn_url: string;
  text_en: string;
  text_ar: string;
  background: File | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createSlider = async (
  data: AddServicePayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Backend expects multilingual keys like title[en]
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("btn_title[en]", data.btn_title_en);
  formData.append("btn_title[ar]", data.btn_title_ar);
  formData.append("btn_url", data.btn_url);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("btn_active", "1");

  if (data.background) {
    formData.append("background", data.background);
  }

  const response = await apiClient.post("/api/dashboard/sliders", formData);
  return response.data;
};

const useAddSlider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddServicePayload
  >({
    mutationFn: createSlider,
    onSuccess: () => {
      toast.success("Slider added successfully", { position: "top-center" });
      navigate("/sliders");
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
    onError: (error) => {
      console.error("Add slider error:", error.response?.data || error.message);
    },
  });
};

export default useAddSlider;

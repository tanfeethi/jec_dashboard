import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateSliderPayload {
  id: number;
  values: {
    title_en: string;
    title_ar: string;
    btn_title_en: string;
    btn_title_ar: string;
    btn_url: string;
    text_en: string;
    text_ar: string;
    background: File | null;
  };
}

export interface SliderErrorResponse {
  message: string;
  error: string;
}

const createSlider = async (
  data: UpdateSliderPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Backend expects multilingual keys like title[en]
  formData.append("title[en]", data.values.title_en);
  formData.append("title[ar]", data.values.title_ar);
  formData.append("btn_title[en]", data.values.btn_title_en);
  formData.append("btn_title[ar]", data.values.btn_title_ar);
  formData.append("btn_url", data.values.btn_url);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("btn_active", "1");

  if (data.values.background) {
    formData.append("background", data.values.background);
  }

  const response = await apiClient.post(
    `/api/dashboard/sliders/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );
  return response.data;
};

const useAddSlider = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<SliderErrorResponse>,
    UpdateSliderPayload
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

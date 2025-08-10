// hooks/faqs/useAddFaq.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateFaqPayload {
  id: number;
  values: {
    question: {
      en: string;
      ar: string;
    };
    answer: {
      en: string;
      ar: string;
    };
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateFaq = async (
  data: UpdateFaqPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("question[en]", data.values.question.en);
  formData.append("question[ar]", data.values.question.ar);
  formData.append("answer[en]", data.values.answer.en);
  formData.append("answer[ar]", data.values.answer.ar);

  const response = await apiClient.post(
    `/api/dashboard/faqs/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );
  return response.data;
};

const useUpdateFaq = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateFaqPayload
  >({
    mutationFn: updateFaq,
    onSuccess: () => {
      toast.success("FAQ updated successfully", { position: "top-center" });
      navigate("/faqs");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: (error) => {
      console.error("Add FAQ error:", error.response?.data || error.message);
    },
  });
};

export default useUpdateFaq;

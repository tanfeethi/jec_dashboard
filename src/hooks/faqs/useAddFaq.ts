// hooks/faqs/useAddFaq.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddFaqPayload {
  question: {
    en: string;
    ar: string;
  };
  answer: {
    en: string;
    ar: string;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createFaq = async (
  data: AddFaqPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("question[en]", data.question.en);
  formData.append("question[ar]", data.question.ar);
  formData.append("answer[en]", data.answer.en);
  formData.append("answer[ar]", data.answer.ar);

  const response = await apiClient.post("/api/dashboard/faqs", formData);
  return response.data;
};

const useAddFaq = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddFaqPayload
  >({
    mutationFn: createFaq,
    onSuccess: () => {
      toast.success("FAQ added successfully", { position: "top-center" });
      navigate("/faqs");
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
    onError: (error) => {
      console.error("Add FAQ error:", error.response?.data || error.message);
    },
  });
};

export default useAddFaq;

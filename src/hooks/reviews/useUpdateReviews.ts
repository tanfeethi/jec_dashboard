import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateReviewsPayload {
  id: number;
  values: {
    name_en: string;
    name_ar: string;
    text_en: string;
    text_ar: string;
    link: string;
    image: File | null;
  };
}

export interface ReviewsErrorResponse {
  message: string;
  error: string;
}

const updateReview = async (
  data: UpdateReviewsPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("name[en]", data.values.name_en);
  formData.append("name[ar]", data.values.name_ar);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("link", data.values.link);

  if (data.values.image) {
    formData.append("image", data.values.image);
  }

  const response = await apiClient.post(
    `/api/dashboard/reviews/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );
  return response.data;
};

const useUpdateReview = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ReviewsErrorResponse>,
    UpdateReviewsPayload
  >({
    mutationFn: updateReview,
    onSuccess: () => {
      toast.success("Review updated successfully", { position: "top-center" });
      navigate("/reviews");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.error(
        "Add service error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateReview;

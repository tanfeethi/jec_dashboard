import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddReviewsPayload {
  name_en: string;
  name_ar: string;
  text_en: string;
  text_ar: string;
  link: string;
  image: File | null;
}

export interface ReviewsErrorResponse {
  message: string;
  error: string;
}

const createReview = async (
  data: AddReviewsPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  // Use the exact field names your backend expects
  formData.append("name[en]", data.name_en);
  formData.append("name[ar]", data.name_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("link", data.link);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await apiClient.post("/api/dashboard/reviews", formData);
  return response.data;
};

const useAddReview = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ReviewsErrorResponse>,
    AddReviewsPayload
  >({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review added successfully", { position: "top-center" });
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

export default useAddReview;

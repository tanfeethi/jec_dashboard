import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/blogs/useAddBlogs.ts
export interface AddTestimonialPayload {
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  text_en: string;
  text_ar: string;
  image: File | null;
  social_type: string;
  social_url: string;
}
export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createTestimonial = async (
  data: AddTestimonialPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("name[en]", data.name_en);
  formData.append("name[ar]", data.name_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("social_type", data.social_type);
  formData.append("social_url", data.social_url);
  formData.append("position[en]", data.position_en);
  formData.append("position[ar]", data.position_ar);
  formData.append("position[ar]", data.position_ar);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await apiClient.post(
    "/api/dashboard/testimonials",
    formData
  );
  return response.data;
};

const useAddTestimonial = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddTestimonialPayload
  >({
    mutationFn: createTestimonial,

    onSuccess: () => {
      toast.success("Testimonial added successfully", {
        position: "top-center",
      });
      navigate("/testimonials");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] }); // Ensure this matches your query key
    },
    onError: (error) => {
      console.error("Add blog error:", error.response?.data || error.message);
    },
  });
};

export default useAddTestimonial;

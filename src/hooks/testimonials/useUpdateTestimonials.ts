import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/blogs/useAddBlogs.ts
export interface AddTestimonialPayload {
  id: number;
  values: {
    name_en: string;
    name_ar: string;
    position_en: string;
    position_ar: string;
    text_en: string;
    text_ar: string;
    image: File | null;
    social_type: string;
    social_url: string;
  };
}
export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateTestimonial = async (
  data: AddTestimonialPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("name[en]", data.values.name_en);
  formData.append("name[ar]", data.values.name_ar);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("social_type", data.values.social_type);
  formData.append("social_url", data.values.social_url);
  formData.append("position[en]", data.values.position_en);
  formData.append("position[ar]", data.values.position_ar);
  formData.append("position[ar]", data.values.position_ar);

  if (data.values.image) {
    formData.append("image", data.values.image);
  }

  const response = await apiClient.post(
    `/api/dashboard/testimonials/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );
  return response.data;
};

const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddTestimonialPayload
  >({
    mutationFn: updateTestimonial,
    onSuccess: () => {
      toast.success("Testimonial updated successfully", {
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

export default useUpdateTestimonial;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/blogs/useAddBlogs.ts
export interface AddBlogPayload {
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
  icon: File | null;
  status: number;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createBlog = async (
  data: AddBlogPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("status", Number(data.status).toString());

  if (data.icon) {
    formData.append("background", data.icon);
  }

  const response = await apiClient.post("/api/dashboard/blogs", formData);
  return response.data;
};

const useAddBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddBlogPayload
  >({
    mutationFn: createBlog,
    onSuccess: () => {
      toast.success("Blog added successfully", { position: "top-center" });
      navigate("/blogs");
      queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Ensure this matches your query key
    },
    onError: (error) => {
      console.error("Add blog error:", error.response?.data || error.message);
    },
  });
};

export default useAddBlog;

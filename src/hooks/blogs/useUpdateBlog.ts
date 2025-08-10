import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

export interface UpdateBlogPayload {
  id: number;
  values: {
    title_en: string;
    title_ar: string;
    text_en: string;
    text_ar: string;
    icon: File | null;
    status: number;
  };
}

export interface BlogErrorResponse {
  message: string;
  error: string;
}

const updateBlog = async (
  data: UpdateBlogPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("title[en]", data.values.title_en);
  formData.append("title[ar]", data.values.title_ar);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("status", Number(data.values.status).toString());

  if (data.values.icon) {
    formData.append("background", data.values.icon);
  }

  const response = await apiClient.post(
    `/api/dashboard/blogs/${data.id}`,
    formData,
    {
      params: {
        _method: "put",
      },
    }
  );
  return response.data;
};

const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<BlogErrorResponse>,
    UpdateBlogPayload
  >({
    mutationFn: updateBlog,
    onSuccess: () => {
      navigate("/blogs");
      queryClient.invalidateQueries({ queryKey: ["blogs"] }); // Ensure this matches your query key
    },
    onError: (error) => {
      console.error(
        "Update blog error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateBlog;

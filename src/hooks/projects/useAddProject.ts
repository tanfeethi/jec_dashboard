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
  thumbnail: File[] | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createProject = async (
  data: AddBlogPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("tags[0]", "_");
  formData.append("type", "main");

  if (data.thumbnail?.length) {
    formData.append("thumbnail[]", data.thumbnail[0]);
  }

  const response = await apiClient.post("/api/dashboard/projects", formData);
  return response.data;
};

const useAddProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddBlogPayload
  >({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project added successfully", { position: "top-center" });
      navigate("/projects");
      queryClient.invalidateQueries({ queryKey: ["projects"] }); // Ensure this matches your query key
    },
    onError: (error) => {
      console.error(
        "Add Project error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddProject;

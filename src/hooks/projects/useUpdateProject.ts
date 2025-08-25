import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/projects/useUpdateProject.ts
export interface UpdateProjectPayload {
  id: number;
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
  thumbnail: File[] | null; // single or multiple (clarify with backend)
  images?: File[] | null; // optional (same as add)
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateProject = async (
  data: UpdateProjectPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);

  // Thumbnail (only 1 allowed)
  if (data.thumbnail?.length) {
    formData.append("thumbnail", data.thumbnail[0]);
  }

  // Images (if multiple allowed, append all)
  if (data.images?.length) {
    data.images.forEach((file) => {
      formData.append("images[]", file);
    });
  }

  const response = await apiClient.post(
    `/api/dashboard/projects/${data.id}?_method=PUT`,
    formData
  );
  return response.data;
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateProjectPayload
  >({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/projects");
    },
    onError: (error) => {
      const errorMsg =
        error.response?.data?.message || "Failed to update project";
      toast.error(errorMsg, { position: "top-center" });
      console.error(
        "Update Project error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateProject;

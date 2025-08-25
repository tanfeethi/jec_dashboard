import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/projects/useAddProject.ts
export interface AddProjectPayload {
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
  thumbnail: File[] | null; // Single or multiple files (clarify your backend requirement)
  images: File[] | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createProject = async (
  data: AddProjectPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);
  formData.append("type", "main");

  // Thumbnail (assuming only 1 allowed)
  if (data.thumbnail?.length) {
    formData.append("thumbnail", data.thumbnail[0]);
  }

  // Images (append all if multiple allowed)
  if (data.images?.length) {
    data.images.forEach((file) => {
      formData.append("images[]", file);
    });
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
    AddProjectPayload
  >({
    mutationFn: createProject,
    onSuccess: () => {
      toast.success("Project added successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/projects");
    },
    onError: (error) => {
      const errorMsg = error.response?.data?.message || "Failed to add project";
      toast.error(errorMsg, { position: "top-center" });
      console.error(
        "Add Project error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddProject;

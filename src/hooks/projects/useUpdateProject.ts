import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

// hooks/projects/useUpdateProject.ts
export interface updateProjectPayload {
  id: number;
  title: {
    en: string;
    ar: string;
  };
  text: {
    en: string;
    ar: string;
  };
  thumbnail: File[] | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateProject = async (
  data: updateProjectPayload
): Promise<{ success: boolean }> => {
  // If we have a thumbnail file, send FormData
  if (data.thumbnail?.length) {
    const formData = new FormData();
    formData.append("title[en]", data.title.en);
    formData.append("title[ar]", data.title.ar);
    formData.append("text[en]", data.text.en);
    formData.append("text[ar]", data.text.ar);

    const file = data.thumbnail[0];
    if (file instanceof File) {
      formData.append("thumbnail[]", file);
    }

    const response = await apiClient.put(
      `/api/dashboard/projects/${data.id}`,
      formData
    );
    return response.data;
  }

  // Otherwise send JSON (matches your Postman request)
  const jsonPayload = {
    title: {
      en: data.title.en,
      ar: data.title.ar,
    },
    text: {
      en: data.text.en,
      ar: data.text.ar,
    },
  };

  const response = await apiClient.put(
    `/api/dashboard/projects/${data.id}`,
    jsonPayload
  );
  return response.data;
};

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    updateProjectPayload
  >({
    mutationFn: updateProject,
    onSuccess: () => {
      toast.success("Project updated successfully", { position: "top-center" });
      navigate("/projects");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => {
      console.error(
        "Update Project error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateProject;

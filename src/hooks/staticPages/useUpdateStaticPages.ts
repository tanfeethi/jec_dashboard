import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateBlogPayload {
  name: string;
  title_en: string;
  title_ar: string;
  text_en: string;
  text_ar: string;
  image: File | null;
}

export interface BlogErrorResponse {
  message: string;
  error: string;
}

const updateStaticPage = async (
  data: UpdateBlogPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("title[en]", data.title_en);
  formData.append("title[ar]", data.title_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);

  if (data.image) {
    formData.append("image", data.image);
  }

  console.log("formData >>>", formData);

  const response = await apiClient.post(
    `api/dashboard/update/staticPages`,
    formData
  );
  return response.data;
};

const useUpdateStaticPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation<
    { success: boolean },
    AxiosError<BlogErrorResponse>,
    UpdateBlogPayload
  >({
    mutationFn: updateStaticPage,
    onSuccess: () => {
      toast.success("Static Page updated successfully", {
        position: "top-center",
      });
      navigate("/static-pages");
      queryClient.invalidateQueries({ queryKey: ["static-pages"] }); // Ensure this matches your query key
    },
    onError: (error) => {
      console.error(
        "Update blog error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useUpdateStaticPage;

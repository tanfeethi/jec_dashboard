import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface AddTeamMemberPayload {
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  text_en: string;
  text_ar: string;
  image: File | null;
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const createTeamMember = async (
  data: AddTeamMemberPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  formData.append("name[en]", data.name_en);
  formData.append("name[ar]", data.name_ar);
  formData.append("position[en]", data.position_en);
  formData.append("position[ar]", data.position_ar);
  formData.append("text[en]", data.text_en);
  formData.append("text[ar]", data.text_ar);

  if (data.image) {
    formData.append("image", data.image);
  }

  const response = await apiClient.post("/api/dashboard/teams", formData);
  return response.data;
};

const useAddTeamMember = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    AddTeamMemberPayload
  >({
    mutationFn: createTeamMember,
    onSuccess: () => {
      toast.success("Team member added successfully", {
        position: "top-center",
      });
      navigate("/teams");
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
    onError: (error) => {
      console.error(
        "Add team member error:",
        error.response?.data || error.message
      );
    },
  });
};

export default useAddTeamMember;

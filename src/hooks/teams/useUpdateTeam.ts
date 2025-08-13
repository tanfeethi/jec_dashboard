// hooks/teams/useUpdateTeam.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export interface UpdateTeamPayload {
  teamId: string | number;
  values: {
    name_en: string;
    name_ar: string;
    position_en: string;
    position_ar: string;
    text_en: string;
    text_ar: string;
    image: File | null;
  };
}

export interface ServiceErrorResponse {
  message: string;
  error: string;
}

const updateTeam = async (
  data: UpdateTeamPayload
): Promise<{ success: boolean }> => {
  const formData = new FormData();

  formData.append("name[en]", data.values.name_en);
  formData.append("name[ar]", data.values.name_ar);
  formData.append("position[en]", data.values.position_en);
  formData.append("position[ar]", data.values.position_ar);
  formData.append("text[en]", data.values.text_en);
  formData.append("text[ar]", data.values.text_ar);
  formData.append("_method", "put");

  if (data.values.image) {
    formData.append("image", data.values.image);
  }

  const response = await apiClient.post(
    `/api/dashboard/teams/${data.teamId}`,
    formData
  );

  return response.data;
};

const useUpdateTeam = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<
    { success: boolean },
    AxiosError<ServiceErrorResponse>,
    UpdateTeamPayload
  >({
    mutationFn: updateTeam,
    onSuccess: () => {
      toast.success("Team member updated successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
      navigate("/teams");
    },
    onError: (error) => {
      console.error(
        "Update team error:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to update team");
    },
  });
};

export default useUpdateTeam;

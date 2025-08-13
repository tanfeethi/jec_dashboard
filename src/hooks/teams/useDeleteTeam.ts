import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteTeam = async (teamID: number) => {
  const res = await apiClient.post(`/api/dashboard/teams/${teamID}`, {
    _method: "DELETE",
  });
  return res.data;
};

const useDeleteTeam = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTeam,
    onSuccess: () => {
      toast.success("Team deleted successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["teams"] });
    },
  });
};

export default useDeleteTeam;

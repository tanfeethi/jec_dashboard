import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteProjects = async (blogID: number) => {
  const res = await apiClient.post(`/api/dashboard/projects/${blogID}`, {
    _method: "delete",
  });
  return res.data;
};

const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProjects,
    onSuccess: () => {
      toast.success("Project deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useDeleteProject;

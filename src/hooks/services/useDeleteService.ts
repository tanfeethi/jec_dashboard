import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteService = async (serviceID: number) => {
  const res = await apiClient.delete(`/api/dashboard/services/${serviceID}`, {
    params: { _method: "DELETE" },
  });
  return res.data;
};

const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      toast.success("Service deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export default useDeleteService;

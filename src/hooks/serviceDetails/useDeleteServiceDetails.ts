import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteServiceDetails = async (serviceID: number) => {
  const res = await apiClient.delete(
    `/api/dashboard/service-details/${serviceID}`,
    {
      params: { _method: "DELETE" },
    }
  );
  return res.data;
};

const useDeleteServiceDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceDetails,
    onSuccess: () => {
      toast.success("Service deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["serviceDetails"] });
    },
  });
};

export default useDeleteServiceDetails;

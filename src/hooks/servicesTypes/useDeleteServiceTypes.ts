import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteServicetype = async (serviceTypeID: number) => {
  const res = await apiClient.delete(`/api/dashboard/types/${serviceTypeID}`, {
    params: { _method: "DELETE" },
  });
  return res.data;
};

const useDeleteServiceTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServicetype,
    onSuccess: () => {
      toast.success("Service type deleted successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["services_types"] });
    },
  });
};

export default useDeleteServiceTypes;

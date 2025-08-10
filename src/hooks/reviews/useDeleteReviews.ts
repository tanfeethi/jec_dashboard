import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteReviews = async (reviewsID: number) => {
  const res = await apiClient.delete(`/api/dashboard/reviews/${reviewsID}`, {
    params: { _method: "DELETE" },
  });
  return res.data;
};

const useDeleteReviews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReviews,
    onSuccess: () => {
      toast.success("Review deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export default useDeleteReviews;

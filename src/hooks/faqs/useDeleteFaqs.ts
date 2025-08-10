import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteFaqs = async (faqsID: number) => {
  const res = await apiClient.delete(`/api/dashboard/faqs/${faqsID}`, {
    params: { _method: "DELETE" },
  });
  return res.data;
};

const useDeleteFaqs = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFaqs,
    onSuccess: () => {
      toast.success("FAQ deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
};

export default useDeleteFaqs;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteTestimonial = async (serviceID: number) => {
  const res = await apiClient.delete(
    `/api/dashboard/testimonials/${serviceID}`,
    {
      params: { _method: "DELETE" },
    }
  );
  return res.data;
};

const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      toast.success("Testimonial deleted successfully", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export default useDeleteTestimonial;

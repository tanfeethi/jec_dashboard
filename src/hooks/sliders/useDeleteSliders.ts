import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteSlider = async (sliderID: number) => {
  const res = await apiClient.post(`/api/dashboard/sliders/${sliderID}`, {
    _method: "DELETE",
  });
  return res.data;
};

const useDeleteSlider = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSlider,
    onSuccess: () => {
      toast.success("Slider deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["sliders"] });
    },
  });
};

export default useDeleteSlider;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/apiClient";
import { toast } from "react-toastify";

const deleteBlog = async (blogID: number) => {
  const res = await apiClient.post(`/api/dashboard/blogs/${blogID}`, {
    _method: "delete",
  });
  return res.data;
};

const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      toast.success("Blog deleted successfully", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export default useDeleteBlog;

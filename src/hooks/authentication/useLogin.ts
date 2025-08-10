// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import apiClient from "../../utils/apiClient";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  id: number;
  name: string;
  email: string;
  image: string;
  access_token: string;
};

export type LoginApiResponse = {
  data: LoginResponse[];
  status: string;
  error: string;
  code: number;
};
// hooks/useLogin.ts

const loginUser = async (
  credentials: LoginRequest
): Promise<LoginApiResponse> => {
  const response = await apiClient.post<LoginApiResponse>(
    "/api/auth/login",
    credentials
  );
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
      console.log("Login Response:", response);

      const user: LoginResponse = response.data[0]; // destructure first item

      useAuthStore.getState().login(
        {
          id: user.id,
          name: user.name,
          email: user.email, // trims whitespace if any
        },
        user.access_token
      );

      setTimeout(() => navigate("/"), 100);
    },
    onError: (error: any) => {
      toast.error("Login failed", { position: "top-center" });
      console.error("Login failed:", error);
    },
  });
};

import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../../store/authStore";

const ProtectedLayout = () => {
  const user = useAuthStore((state) => state.user);

  return user ? <Outlet /> : <Navigate replace to="/login" />;
};

export default ProtectedLayout;
 
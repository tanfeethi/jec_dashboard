import { Layout } from "antd";
import {
  HomeOutlined,
  CustomerServiceOutlined,
  PictureOutlined,
  ReadOutlined,
  StarOutlined,
  CommentOutlined,
  QuestionCircleOutlined,
  ProjectOutlined,
  FileTextOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore } from "../../store/authStore";

const { Sider } = Layout;

const Sidebar = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const menuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/services",
      icon: <CustomerServiceOutlined />,
      label: "Services",
    },
    {
      key: "/sliders",
      icon: <PictureOutlined />,
      label: "Sliders",
    },
    {
      key: "/blogs",
      icon: <ReadOutlined />,
      label: "Blogs",
    },
    {
      key: "/testimonials",
      icon: <StarOutlined />,
      label: "Testimonials",
    },
    {
      key: "/reviews",
      icon: <CommentOutlined />,
      label: "Reviews",
    },
    {
      key: "/faqs",
      icon: <QuestionCircleOutlined />,
      label: "Faqs",
    },
    {
      key: "/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
    {
      key: "/static-pages",
      icon: <FileTextOutlined />,
      label: "Static Pages",
    },
    {
      key: "/teams",
      icon: <TeamOutlined />,
      label: "Teams",
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      key: "/settings",
      icon: <LogoutOutlined />,
      label: "Logout",
    },
  ];

  return (
    <Sider
      breakpoint="lg"
      width={250}
      collapsedWidth="0"
      className="!min-h-screen !shadow-xl !fixed !left-0 !top-0 !z-10"
      style={{
        background: `linear-gradient(135deg, var(--mainColor) 0%, var(--secondaryColor) 100%)`,
        borderRight: "none",
      }}
    >
      {/* Header/Logo Section */}
      <div
        onClick={() => navigate("/")}
        className="!p-6 !text-center !border-b !border-white/10 cursor-pointer"
      >
        <div className=" !backdrop-blur-sm !rounded-xl">
          <h1 className="!text-2xl !font-bold !text-white !tracking-wider">
            JEC
          </h1>

          <span className="text-white">Custom Dashboard</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <div
        className="!px-4 !py-6 !space-y-2"
        style={{ height: "calc(100vh - 180px)" }}
      >
        {menuItems.map((item, index) => {
          const isLogout = item.label === "Logout";
          return isLogout ? (
            <div
              key={index}
              onClick={() => {
                logout();
                navigate("/login"); // Optional: navigate after logout
              }}
              className="!flex !items-center !gap-4 !px-4 !py-2 !rounded-xl !text-white/80 hover:!text-white hover:!bg-white/10 hover:!backdrop-blur-sm !transition-all !duration-200 hover:!transform hover:!translate-x-1 cursor-pointer"
            >
              <span className="!text-lg !flex-shrink-0">{item.icon}</span>
              <span className="!font-medium">{item.label}</span>
            </div>
          ) : (
            <NavLink
              key={index}
              to={item.key}
              className={({ isActive }) =>
                isActive
                  ? "!flex !items-center !gap-4 !px-4 !py-2 !rounded-xl !bg-white/20 !backdrop-blur-sm !text-white !font-semibold !border !border-white/20 !shadow-lg !transform !transition-all !duration-200"
                  : "!flex !items-center !gap-4 !px-4 !py-2 !rounded-xl !text-white/80 hover:!text-white hover:!bg-white/10 hover:!backdrop-blur-sm !transition-all !duration-200 hover:!transform hover:!translate-x-1"
              }
            >
              <span className="!text-lg !flex-shrink-0">{item.icon}</span>
              <span className="!font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </Sider>
  );
};

export default Sidebar;

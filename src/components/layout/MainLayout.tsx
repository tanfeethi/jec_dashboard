import { Outlet } from "react-router";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Check if screen is below lg breakpoint (1024px)
      setSidebarCollapsed(window.innerWidth < 1024);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div
          className="w-full transition-all duration-200"
          style={{
            marginLeft: sidebarCollapsed ? "0" : "250px",
          }}
        >
          <div className="min-h-screen">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;

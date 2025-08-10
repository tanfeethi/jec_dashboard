import { useEffect, useState } from "react";
import type { FormProps } from "antd";
import { Button, Form, Input, Spin } from "antd";
import { useLogin } from "../../hooks/authentication/useLogin";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  MailOutlined,
  LockOutlined,
  DashboardOutlined,
  UserOutlined,
  BuildOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router";

type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="!h-screen !flex !flex-col">
      {/* Main Content */}
      <div className="!flex !flex-1 !min-h-0">
        {/* Left Side - Company Information */}
        <div
          className="hidden xl:!flex-1 xl:!relative xl:!overflow-hidden xl:!flex xl:!flex-col xl:!justify-center xl:!items-center"
          style={{
            background:
              "linear-gradient(135deg, var(--mainColor) 0%, 25%, var(--secondaryColor) 75%, var(--secondaryColor) 100%)",
          }}
        >
          {/* Enhanced Animated Background Elements */}
          <div className="!absolute !inset-0 !overflow-hidden">
            {/* Large floating orbs */}
            <div
              className="!absolute !top-20 !left-20 !w-48 !h-48 !bg-white/10 !rounded-full !blur-3xl"
              style={{
                animation:
                  "float 8s ease-in-out infinite, pulse 4s ease-in-out infinite",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="!absolute !bottom-20 !right-20 !w-64 !h-64 !bg-white/8 !rounded-full !blur-3xl"
              style={{
                animation:
                  "float 10s ease-in-out infinite reverse, pulse 5s ease-in-out infinite",
                animationDelay: "1s",
              }}
            ></div>
            <div
              className="!absolute !top-1/3 !left-8 !w-40 !h-40 !bg-white/12 !rounded-full !blur-2xl"
              style={{
                animation:
                  "float 6s ease-in-out infinite, pulse 3s ease-in-out infinite",
                animationDelay: "2s",
              }}
            ></div>
            <div
              className="!absolute !top-40 !right-1/4 !w-52 !h-52 !bg-white/9 !rounded-full !blur-3xl"
              style={{
                animation:
                  "float 12s ease-in-out infinite reverse, pulse 6s ease-in-out infinite",
                animationDelay: "3s",
              }}
            ></div>
            <div
              className="!absolute !bottom-1/3 !left-1/4 !w-36 !h-36 !bg-white/14 !rounded-full !blur-xl"
              style={{
                animation:
                  "float 7s ease-in-out infinite, pulse 4s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            ></div>
            <div
              className="!absolute !top-2/3 !right-12 !w-44 !h-44 !bg-white/11 !rounded-full !blur-2xl"
              style={{
                animation:
                  "float 9s ease-in-out infinite reverse, pulse 3.5s ease-in-out infinite",
                animationDelay: "2.5s",
              }}
            ></div>

            {/* Medium floating elements */}
            <div
              className="!absolute !top-10 !left-1/3 !w-28 !h-28 !bg-white/7 !rounded-full !blur-xl"
              style={{
                animation:
                  "float 5s ease-in-out infinite, glow 3s ease-in-out infinite",
                animationDelay: "0.5s",
              }}
            ></div>
            <div
              className="!absolute !bottom-10 !left-12 !w-32 !h-32 !bg-white/9 !rounded-full !blur-xl"
              style={{
                animation:
                  "float 8s ease-in-out infinite reverse, glow 4s ease-in-out infinite",
                animationDelay: "2.2s",
              }}
            ></div>
            <div
              className="!absolute !top-1/2 !right-8 !w-24 !h-24 !bg-white/13 !rounded-full !blur-lg"
              style={{
                animation:
                  "float 6s ease-in-out infinite, glow 2.5s ease-in-out infinite",
                animationDelay: "3.8s",
              }}
            ></div>
            <div
              className="!absolute !bottom-1/2 !left-16 !w-20 !h-20 !bg-white/15 !rounded-full !blur-lg"
              style={{
                animation:
                  "float 7s ease-in-out infinite reverse, glow 3.2s ease-in-out infinite",
                animationDelay: "1.8s",
              }}
            ></div>

            {/* Small sparkle elements */}
            <div
              className="!absolute !top-32 !right-1/3 !w-16 !h-16 !bg-white/20 !rounded-full !blur-md"
              style={{
                animation:
                  "sparkle 4s ease-in-out infinite, drift 8s linear infinite",
                animationDelay: "0.3s",
              }}
            ></div>
            <div
              className="!absolute !bottom-32 !right-1/2 !w-12 !h-12 !bg-white/25 !rounded-full !blur-sm"
              style={{
                animation:
                  "sparkle 3s ease-in-out infinite, drift 10s linear infinite reverse",
                animationDelay: "2.1s",
              }}
            ></div>
            <div
              className="!absolute !top-3/4 !left-1/3 !w-14 !h-14 !bg-white/18 !rounded-full !blur-md"
              style={{
                animation:
                  "sparkle 5s ease-in-out infinite, drift 6s linear infinite",
                animationDelay: "1.7s",
              }}
            ></div>
            <div
              className="!absolute !top-16 !left-2/3 !w-10 !h-10 !bg-white/30 !rounded-full !blur-sm"
              style={{
                animation:
                  "sparkle 2.5s ease-in-out infinite, drift 12s linear infinite reverse",
                animationDelay: "3.4s",
              }}
            ></div>

            {/* Gradient overlay shapes */}
            <div
              className="!absolute !top-1/4 !left-1/2 !w-72 !h-72 !opacity-20 !rounded-full !blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                animation:
                  "breathe 15s ease-in-out infinite, rotate 30s linear infinite",
                animationDelay: "0s",
              }}
            ></div>
            <div
              className="!absolute !bottom-1/4 !right-1/2 !w-80 !h-80 !opacity-15 !rounded-full !blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
                animation:
                  "breathe 18s ease-in-out infinite reverse, rotate 40s linear infinite reverse",
                animationDelay: "3s",
              }}
            ></div>
          </div>

          {/* Custom CSS Animations */}
          <style>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) translateX(0px);
              }
              25% {
                transform: translateY(-20px) translateX(10px);
              }
              50% {
                transform: translateY(-40px) translateX(-5px);
              }
              75% {
                transform: translateY(-20px) translateX(-15px);
              }
            }

            @keyframes pulse {
              0%,
              100% {
                opacity: 0.3;
                transform: scale(1);
              }
              50% {
                opacity: 0.8;
                transform: scale(1.1);
              }
            }

            @keyframes glow {
              0%,
              100% {
                opacity: 0.4;
                box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
              }
              50% {
                opacity: 0.9;
                box-shadow: 0 0 40px rgba(255, 255, 255, 0.6);
              }
            }

            @keyframes sparkle {
              0%,
              100% {
                opacity: 0.2;
                transform: scale(0.8);
              }
              50% {
                opacity: 1;
                transform: scale(1.3);
              }
            }

            @keyframes drift {
              0% {
                transform: translateX(-10px);
              }
              25% {
                transform: translateX(15px);
              }
              50% {
                transform: translateX(-5px);
              }
              75% {
                transform: translateX(20px);
              }
              100% {
                transform: translateX(-10px);
              }
            }

            @keyframes breathe {
              0%,
              100% {
                transform: scale(1) rotate(0deg);
                opacity: 0.3;
              }
              50% {
                transform: scale(1.2) rotate(5deg);
                opacity: 0.6;
              }
            }

            @keyframes rotate {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
          `}</style>

          {/* Content Container */}
          <div className="!relative !z-10 !max-w-lg !px-12 !text-center">
            {/* Company Brand */}
            <div className="!mb-8">
              <h1 className="!text-5xl !font-black !text-white !tracking-wide !mb-4 !drop-shadow-2xl">
                JEC
              </h1>
              <h2 className="!text-2xl !font-bold !text-white/95 !mb-2">
                Joint Executive Company
              </h2>
              <p className="!text-white/80 !text-lg !font-medium !leading-relaxed">
                Custom Dashboard Solutions & Digital Management Platform
              </p>
            </div>

            {/* Client Information */}
            <div className="!bg-white/20 !backdrop-blur-xl !rounded-3xl !p-6 !border !border-white/30 !shadow-2xl !mb-8">
              <div className="!flex !items-center !justify-center !gap-3 !mb-4">
                <UserOutlined className="!text-white/90 !text-xl" />
                <span className="!text-white/90 !text-sm !font-bold !uppercase !tracking-widest">
                  Client Dashboard
                </span>
              </div>
              <h3 className="!text-white !text-3xl !font-bold !mb-3">
                ABC Corporation
              </h3>
              <p className="!text-white/80 !text-base !font-medium !leading-relaxed">
                Comprehensive Website Management Portal & Content Administration
                System
              </p>
            </div>

            {/* Features */}
            <div className="!grid !grid-cols-1 !gap-4 !mb-6">
              <div className="!flex !items-center !gap-4 !bg-white/15 !backdrop-blur-md !rounded-2xl !p-4 !border !border-white/25">
                <BuildOutlined className="!text-white !text-xl" />
                <span className="!text-white/90 !font-medium">
                  Advanced Content Management
                </span>
              </div>
            </div>

            {/* Footer */}
            <p className="!text-white/60 !text-sm !font-medium">
              © {new Date().getFullYear()} Joint Executive Company •
              Professional Web Solutions. All rights reserved to JEC.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="!flex-1 !bg-gray-50 !flex !flex-col !justify-center !items-center !px-12 !py-6">
          {/* Form Container */}
          <div className="!w-full !max-w-md">
            {/* Welcome Header */}
            <div className="!text-center !mb-8">
              <h1 className="!text-4xl !font-bold !text-gray-800 !mb-3">
                Welcome Back
              </h1>
              <p className="!text-gray-600 !text-lg !font-medium">
                Sign in to access your dashboard and manage your digital
                presence
              </p>
            </div>

            {/* Login Form */}
            <div className="!bg-white !rounded-3xl !p-8 !shadow-2xl !border !border-gray-100">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                className="!space-y-6"
              >
                {/* Email Field */}
                <Form.Item<FieldType>
                  label={
                    <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                      <MailOutlined className="!text-[var(--mainColor)]" />
                      Email Address
                    </span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please Enter your email!" },
                    { type: "email", message: "Please enter a valid email!" },
                  ]}
                  className="!mb-6"
                >
                  <Input
                    placeholder="Enter your email address"
                    className="!w-full !rounded-xl !border-2 !border-gray-200 !py-4 !px-4 !text-gray-800 !text-base !font-semibold !transition-all !duration-300 placeholder:!text-gray-400 hover:!border-blue-400 focus:!border-blue-600 focus:!shadow-lg"
                    style={{
                      fontSize: "16px",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                {/* Password Field */}
                <Form.Item<FieldType>
                  label={
                    <span className="!text-base !font-semibold !text-gray-700 !flex !items-center !gap-2">
                      <LockOutlined className="!text-[var(--mainColor)]" />
                      Password
                    </span>
                  }
                  name="password"
                  rules={[
                    { required: true, message: "Please Enter your password!" },
                  ]}
                  className="!mb-8"
                >
                  <Input.Password
                    placeholder="Enter your password"
                    visibilityToggle={{
                      visible: showPassword,
                      onVisibleChange: setShowPassword,
                    }}
                    iconRender={(visible) =>
                      visible ? (
                        <EyeInvisibleOutlined className="!text-gray-500 !text-lg" />
                      ) : (
                        <EyeOutlined className="!text-gray-500 !text-lg" />
                      )
                    }
                    className="!w-full !rounded-xl !border-2 !border-gray-200 !py-4 !px-4 !text-gray-800 !text-base !font-medium !transition-all !duration-300 placeholder:!text-gray-400 hover:!border-blue-400 focus:!border-blue-600 focus:!shadow-lg"
                    style={{
                      fontSize: "16px",
                      height: "56px",
                    }}
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item className="!mb-0">
                  <Button
                    disabled={isPending}
                    type="primary"
                    htmlType="submit"
                    className="!w-full !h-14 !rounded-xl !font-bold !text-lg !transition-all !duration-300 hover:!scale-[1.02] active:!scale-[0.98] !shadow-xl hover:!shadow-2xl"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      background:
                        "linear-gradient(135deg, var(--mainColor) 0%, var(--secondaryColor) 100%)",
                      border: "none",
                    }}
                  >
                    {isPending ? (
                      <div className="!flex !items-center !justify-center !gap-3">
                        <Spin size="default" />
                        <span className="!font-bold">Signing In...</span>
                      </div>
                    ) : (
                      <span className="!flex !items-center !justify-center !gap-2">
                        <DashboardOutlined className="!text-xl" />
                        Login
                      </span>
                    )}
                  </Button>
                </Form.Item>
              </Form>
            </div>

            {/* Security Note */}
            <div className="!text-center !mt-6">
              <p className="!text-gray-500 !text-sm !font-medium">
                🔒 Your connection is secure and encrypted
              </p>
              <p className="!text-gray-400 !text-xs !mt-2">
                Protected by enterprise-grade security protocols
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

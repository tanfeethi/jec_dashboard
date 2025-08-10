import { useLocation } from "react-router";
import { Button, Form, Input, Typography, Divider, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import useUpdateSettings from "../../hooks/settings/useUpdateSettings";
import Loader from "../../components/reuse/Loader";
import PhoneList from "../../components/once/PhoneList";

const { Title } = Typography;

const UpdateSettings = () => {
  const [form] = Form.useForm();
  const { state } = useLocation();
  const {
    mutate: updateSettingsMutate,
    isPending,
    isError,
    error,
  } = useUpdateSettings();

  useEffect(() => {
    if (state?.setting) {
      const setting = state.setting;
      form.setFieldsValue({
        title_en: setting.title?.en || "",
        title_ar: setting.title?.ar || "",
        address_en: setting.address?.en || "",
        address_ar: setting.address?.ar || "",
        email: setting.email || "",
        phones: {
          phones: setting.phones?.phones || [],
          mobiles: setting.phones?.mobiles || [],
        },
        social_media: Object.entries(setting.social_media || {}).map(
          ([platform, url]) => ({ platform, url })
        ),
        statistics: Object.entries(setting.statistics || {}).map(
          ([key, value]) => ({ key, value })
        ),
      });
    }
  }, [form, state]);

  const onFinish = (values: any) => {
    const payload = {
      values: {
        title: {
          en: values.title_en,
          ar: values.title_ar,
        },
        address: {
          en: values.address_en,
          ar: values.address_ar,
        },
        email: values.email,
        phones: {
          phones: values.phones?.phones?.filter((v: string) => v),
          mobiles: values.phones?.mobiles?.filter((v: string) => v),
        },
        social_media: values.social_media
          ?.filter((curr: any) => curr.platform && curr.url)
          .reduce((acc: any, curr: any) => {
            acc[curr.platform] = curr.url;
            return acc;
          }, {}),
        statistics: values.statistics
          ?.filter((entry: any) => entry.key && entry.value)
          .reduce((acc: any, curr: any) => {
            acc[curr.key] = curr.value;
            return acc;
          }, {}),
      },
    };
    updateSettingsMutate(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 w-full">
      <div className="mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <Title level={2} className="!text-slate-800 !mb-2">
            Update Settings
          </Title>
          <p className="text-slate-600">
            Update system settings with multilingual support
          </p>
        </div>

        {/* Form */}
        <div className="relative bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200/50 overflow-hidden">
          {isPending && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-100/80 bg-opacity-50">
              <Loader />
            </div>
          )}
          <div className="p-8">
            <Form
              layout="vertical"
              form={form}
              onFinish={onFinish}
              onFinishFailed={(err) => console.log("Validation Errors:", err)} // Add this
              autoComplete="off"
              className="space-y-6"
            >
              {/* Title Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Title
                  level={4}
                  className="!text-slate-700 !mb-4 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    />
                  </svg>
                  Title
                </Title>
                <div className="grid md:grid-cols-2 gap-6">
                  <Form.Item
                    label={
                      <span className="text-slate-700 font-medium">
                        Title (English)
                      </span>
                    }
                    name={["title_en"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter title in English",
                      },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="Enter English title"
                      className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="text-slate-700 font-medium">
                        Title (Arabic)
                      </span>
                    }
                    name={["title_ar"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter title in Arabic",
                      },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="ادخل العنوان بالعربية"
                      className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                    />
                  </Form.Item>
                </div>
              </div>

              {/* Address Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Title
                  level={4}
                  className="!text-slate-700 !mb-4 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Address
                </Title>
                <div className="grid md:grid-cols-2 gap-6">
                  <Form.Item
                    label={
                      <span className="text-slate-700 font-medium">
                        Address (English)
                      </span>
                    }
                    name={["address_en"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter address in English",
                      },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="Enter English address"
                      className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="text-slate-700 font-medium">
                        Address (Arabic)
                      </span>
                    }
                    name={["address_ar"]}
                    rules={[
                      {
                        required: true,
                        message: "Please enter address in Arabic",
                      },
                    ]}
                    className="!mb-0"
                  >
                    <Input
                      placeholder="ادخل العنوان بالعربية"
                      className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">Email</span>
                  }
                  name="email"
                  rules={[
                    { required: true, message: "Please enter the email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                  className="!mb-0"
                >
                  <Input
                    placeholder="Enter email address"
                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                  />
                </Form.Item>
              </div>

              {/* Phones Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <PhoneList name={["phones", "phones"]} label="Phone" />
                <Divider />
                <PhoneList name={["phones", "mobiles"]} label="Mobile" />
              </div>

              {/* Social Media Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Title
                  level={4}
                  className="!text-slate-700 !mb-4 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  Social Media
                </Title>
                <Form.List name="social_media">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <div
                          key={key}
                          className="bg-white rounded-lg p-4 mb-4 border border-slate-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <Form.Item
                              name={[name, "platform"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Platform required",
                                },
                              ]}
                              className="!mb-0"
                            >
                              <Select
                                placeholder="Select platform"
                                className="!w-full !h-12 !rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 [&_.ant-select-selector]:!h-12 [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center"
                                options={[
                                  { label: "Facebook", value: "facebook" },
                                  { label: "LinkedIn", value: "linkedin" },
                                  { label: "Instagram", value: "instagram" },
                                  { label: "X (Twitter)", value: "x" },
                                  { label: "YouTube", value: "youtube" },
                                  { label: "TikTok", value: "tiktok" },
                                ]}
                              />
                            </Form.Item>
                            <div className="flex gap-2">
                              <Form.Item
                                name={[name, "url"]}
                                rules={[
                                  { required: true, message: "URL required" },
                                ]}
                                className="!mb-0 flex-1"
                              >
                                <Input
                                  placeholder="URL (e.g., https://...)"
                                  className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                              </Form.Item>
                              <Button
                                type="text"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                                className="!text-red-500 hover:!text-red-700 !border-0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Form.Item className="!mb-0">
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          className="!rounded-lg !border-slate-300 hover:!border-blue-400 !text-slate-600 hover:!text-blue-600"
                        >
                          Add Social Media
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              {/* Statistics Section */}
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <Title
                  level={4}
                  className="!text-slate-700 !mb-4 flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 17a4 4 0 100-8 4 4 0 000 8zm-7 4a7 7 0 1114 0H4z"
                    />
                  </svg>
                  Statistics
                </Title>
                <Form.List name="statistics">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name }) => (
                        <div
                          key={key}
                          className="bg-white rounded-lg p-4 mb-4 border border-slate-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <Form.Item
                              name={[name, "key"]}
                              rules={[
                                { required: true, message: "Key is required" },
                              ]}
                              className="!mb-0"
                            >
                              <Input
                                placeholder="Statistic Key (e.g., Clients)"
                                className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                              />
                            </Form.Item>
                            <div className="flex gap-2">
                              <Form.Item
                                name={[name, "value"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Value is required",
                                  },
                                ]}
                                className="!mb-0 flex-1"
                              >
                                <Input
                                  placeholder="Value (e.g., 1500)"
                                  className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                              </Form.Item>
                              <Button
                                type="text"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                                className="!text-red-500 hover:!text-red-700 !border-0"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <Form.Item className="!mb-0">
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                          className="!rounded-lg !border-slate-300 hover:!border-blue-400 !text-slate-600 hover:!text-blue-600"
                        >
                          Add Statistic
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200">
                <Form.Item className="!mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="!w-full !h-12 !rounded-lg !bg-gradient-to-br from-[var(--mainColor)] to-[var(--secondaryColor)] text-white text-sm px-4 py-2 hover:!bg-blue-700 transition cursor-pointer"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                        />
                      </svg>
                      Update Settings
                    </span>
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          {isError && (
            <div className="bg-red-200 text-center p-3 rounded-sm text-red-900 font-semibold">
              {error?.response?.data.error || "Network Error"}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-sm">
            Make sure all fields are filled correctly before submitting
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateSettings;

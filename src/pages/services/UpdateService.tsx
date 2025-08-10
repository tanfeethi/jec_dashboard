import { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import { useLocation, useParams } from "react-router";
import useUpdateService from "../../hooks/services/useUpdateService";
import QuillEditor from "../../components/reuse/QuillEditor";

const { Title } = Typography;

const UpdateService = () => {
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state.service.icon);

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>(
    state.service?.icon
      ? [
          {
            uid: "-1", // A unique negative UID for existing files
            name: "existing-image.png", // Displayed filename
            status: "done", // Mark as uploaded
            url: state.service.icon, // URL from backend
          },
        ]
      : []
  );

  const {
    mutate: updateServiceMutate,
    isPending,
    isError,
    error,
  } = useUpdateService();

  useEffect(() => {
    if (state?.service) {
      const { title, text, icon } = state.service;

      form.setFieldsValue({
        title_en: title?.en || "",
        title_ar: title?.ar || "",
        text_en: text?.en || "",
        text_ar: text?.ar || "",
      });

      // Optional: Preload the uploaded image if you have a preview URL
      if (icon) {
        const initialFileList = [
          {
            uid: "-1",
            name: "existing-image.jpg",
            status: "done",
            url: icon,
          } as UploadFile,
        ];

        setFileList(initialFileList);
        form.setFieldsValue({ icon: initialFileList });
      }
    }
  }, [state, form]);

  const onFinish = (values: any) => {
    const iconFile = fileList[0]?.originFileObj || null;

    updateServiceMutate({
      id: Number(id),
      values: {
        title_en: values.title_en,
        title_ar: values.title_ar,
        text_en: values.text_en,
        text_ar: values.text_ar,
        icon: iconFile,
      },
    });
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <Title level={2} className="!text-slate-800 !mb-2">
            Update Service
          </Title>
          <p className="text-slate-600">
            update service with multilingual support
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
              form={form}
              layout="vertical"
              onFinish={onFinish}
              className="space-y-6"
            >
              {/* Title Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">
                      Title (English)
                    </span>
                  }
                  name="title_en"
                  rules={[
                    {
                      required: true,
                      message: "Please enter title in English",
                    },
                  ]}
                  className="!mb-0"
                >
                  <Input
                    placeholder="Enter title in English"
                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">
                      Title (Arabic)
                    </span>
                  }
                  name="title_ar"
                  rules={[
                    { required: true, message: "Please enter title in Arabic" },
                  ]}
                  className="!mb-0"
                >
                  <Input
                    placeholder="Enter title in Arabic"
                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                  />
                </Form.Item>
              </div>

              {/* Text Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">
                      Description (English)
                    </span>
                  }
                  name="text_en"
                  rules={[
                    { required: true, message: "Please enter text in English" },
                  ]}
                  className="!mb-0"
                >
                  <QuillEditor
                    value={form.getFieldValue("text_en")}
                    onChange={(val) => form.setFieldsValue({ text_en: val })}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">
                      Description (Arabic)
                    </span>
                  }
                  name="text_ar"
                  rules={[
                    { required: true, message: "Please enter text in Arabic" },
                  ]}
                  className="!mb-0"
                >
                  <QuillEditor
                    value={form.getFieldValue("text_ar")}
                    onChange={(val) => form.setFieldsValue({ text_ar: val })}
                  />
                </Form.Item>
              </div>

              {/* Upload */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium text-lg">
                      Service Icon
                    </span>
                  }
                  name="icon"
                  rules={[
                    { required: true, message: "Please upload an icon image" },
                  ]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e?.fileList;
                  }}
                  className="!mb-0"
                >
                  <CustomUpload
                    fileList={fileList}
                    onChange={({ fileList }) => {
                      setFileList(fileList.slice(-1));
                      form.setFieldsValue({ icon: fileList }); // Update form value manually
                    }}
                    maxCount={1}
                    accept="image/*"
                  />
                </Form.Item>
              </div>

              {isError && (
                <div className="bg-red-200 text-center p-3 rounded-sm text-red-900 font-semibold">
                  {error?.response?.data.error || "Network Error"}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-slate-200">
                <Form.Item className="!mb-0">
                  <Button
                    disabled={isPending}
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
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                      Update Service
                    </span>
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
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

export default UpdateService;

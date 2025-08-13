import { useState, useEffect } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import QuillEditor from "../../components/reuse/QuillEditor";
import { useParams, useLocation } from "react-router";

const { Title } = Typography;

const UpdateTeam = () => {
  const [form] = Form.useForm();
  const { id } = useParams<{ id: string }>();
  const { state } = useLocation();
  const teamData = state.team;

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [textEn, setTextEn] = useState("");
  const [textAr, setTextAr] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const isEmptyHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.trim() === "";
  };

  // Prefill form
  useEffect(() => {
    if (teamData) {
      form.setFieldsValue({
        name_en: teamData.name?.en || "",
        name_ar: teamData.name?.ar || "",
        position_en: teamData.position?.en || "",
        position_ar: teamData.position?.ar || "",
      });

      setTextEn(teamData.text?.en || "");
      setTextAr(teamData.text?.ar || "");

      if (teamData.image) {
        setFileList([
          {
            uid: "-1",
            name: "current-image.png",
            status: "done",
            url: teamData.image,
          } as UploadFile,
        ]);
      }
    }
  }, [teamData, form]);

  const onFinish = (values: any) => {
    setSubmitted(true);

    if (isEmptyHtml(textEn) || isEmptyHtml(textAr)) {
      message.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      id,
      name_en: values.name_en,
      name_ar: values.name_ar,
      position_en: values.position_en,
      position_ar: values.position_ar,
      text_en: textEn,
      text_ar: textAr,
      image: fileList[0]?.originFileObj || null,
    };

    console.log("Update payload:", payload);
  };

  const onFinishFailed = () => {
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 w-full">
      <div className="mx-auto">
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
            Update Team
          </Title>
          <p className="text-slate-600">
            Edit team member details with multilingual support
          </p>
        </div>

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
              onFinishFailed={onFinishFailed}
              className="space-y-6"
            >
              {/* Name Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label="Name (English)"
                  name="name_en"
                  rules={[
                    { required: true, message: "Please enter name in English" },
                  ]}
                  className="!mb-0"
                >
                  <Input placeholder="Enter name in English" />
                </Form.Item>

                <Form.Item
                  label="Name (Arabic)"
                  name="name_ar"
                  rules={[
                    { required: true, message: "Please enter name in Arabic" },
                  ]}
                  className="!mb-0"
                >
                  <Input placeholder="Enter name in Arabic" />
                </Form.Item>
              </div>

              {/* Position Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label="Position (English)"
                  name="position_en"
                  rules={[
                    {
                      required: true,
                      message: "Please enter position in English",
                    },
                  ]}
                  className="!mb-0"
                >
                  <Input placeholder="Enter position in English" />
                </Form.Item>

                <Form.Item
                  label="Position (Arabic)"
                  name="position_ar"
                  rules={[
                    {
                      required: true,
                      message: "Please enter position in Arabic",
                    },
                  ]}
                  className="!mb-0"
                >
                  <Input placeholder="Enter position in Arabic" />
                </Form.Item>
              </div>

              {/* Rich Text Editors */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label="Text (English)"
                  required
                  validateStatus={
                    submitted && isEmptyHtml(textEn) ? "error" : ""
                  }
                  help={
                    submitted && isEmptyHtml(textEn)
                      ? "Please enter text in English"
                      : ""
                  }
                  className="!mb-0"
                >
                  <QuillEditor value={textEn} onChange={setTextEn} />
                </Form.Item>

                <Form.Item
                  label="Text (Arabic)"
                  required
                  validateStatus={
                    submitted && isEmptyHtml(textAr) ? "error" : ""
                  }
                  help={
                    submitted && isEmptyHtml(textAr)
                      ? "Please enter text in Arabic"
                      : ""
                  }
                  className="!mb-0"
                >
                  <QuillEditor value={textAr} onChange={setTextAr} />
                </Form.Item>
              </div>

              {/* Upload */}
              <Form.Item
                label="Team Image"
                name="image"
                rules={[
                  { required: true, message: "Please upload a team image" },
                ]}
                className="mb-5"
              >
                <CustomUpload
                  fileList={fileList}
                  onChange={({ fileList }) => setFileList(fileList.slice(-1))}
                  maxCount={1}
                  accept="image/*"
                />
              </Form.Item>

              {/* Submit Button */}
              <Form.Item className="!mb-0">
                <Button
                  disabled={isPending}
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="!w-full"
                >
                  Update Team
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeam;

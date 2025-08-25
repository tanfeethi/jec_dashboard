import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import QuillEditor from "../../components/reuse/QuillEditor";
import { useLocation, useParams } from "react-router";
import useUpdateProject from "../../hooks/projects/useUpdateProject";

const { Title } = Typography;

const UpdateProject = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [form] = Form.useForm();
  const [fileListThumbnail, setFileListThumbnail] = useState<UploadFile[]>([]);
  const [fileListImages, setFileListImages] = useState<UploadFile[]>([]);
  const [textEn, setTextEn] = useState("");
  const [textAr, setTextAr] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const {
    mutate: UpdateProjectMutate,
    isError,
    error,
    isPending,
  } = useUpdateProject();

  const isEmptyHtml = (html: string) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.trim() === "";
  };

  const onFinish = (values: any) => {
    setSubmitted(true);

    if (isEmptyHtml(textEn) || isEmptyHtml(textAr)) {
      message.error("Please fill in all required fields.");
      return;
    }

    const payload = {
      id: Number(id),
      title_en: values.title_en,
      title_ar: values.title_ar,
      text_en: textEn,
      text_ar: textAr,
      thumbnail: fileListThumbnail.length
        ? fileListThumbnail.map((f) => f.originFileObj as File)
        : null,
      images: fileListImages.length
        ? fileListImages.map((f) => f.originFileObj as File)
        : null,
    };

    console.log("Payload being sent to mutation:", payload);
    UpdateProjectMutate(payload);
  };

  const onFinishFailed = () => setSubmitted(true);

  // Pre-fill form when editing
  useEffect(() => {
    if (state?.project) {
      const { title, text, thumbnail, images } = state.project;

      // set text editors
      setTextEn(text?.en || "");
      setTextAr(text?.ar || "");

      // set titles
      form.setFieldsValue({
        title_en: title?.en || "",
        title_ar: title?.ar || "",
      });

      // preload thumbnail
      if (thumbnail) {
        const initialThumbnail: UploadFile[] = [
          {
            uid: "-1", // unique negative id
            name: "thumbnail.jpg",
            status: "done",
            url: thumbnail, // make sure this is a valid image URL
          },
        ];
        setFileListThumbnail(initialThumbnail);
        form.setFieldsValue({ thumbnail: initialThumbnail });
      }

      // preload images
      if (images && Array.isArray(images) && images.length > 0) {
        const initialImages: UploadFile[] = images.map((url, index) => ({
          uid: String(-index - 1),
          name: `existing-image-${index + 1}.jpg`,
          status: "done",
          url,
        }));
        setFileListImages(initialImages);
        form.setFieldsValue({ images: initialImages });
      }
    }
  }, [state, form]);

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
            Update Project
          </Title>
          <p className="text-slate-600">
            Update project with multilingual support
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
              onFinishFailed={onFinishFailed}
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

              {/* Rich Text Editors */}
              <div className="grid md:grid-cols-2 gap-6">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium">
                      Description (English)
                    </span>
                  }
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
                  label={
                    <span className="text-slate-700 font-medium">
                      Description (Arabic)
                    </span>
                  }
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

              {/* Thumbnail Upload */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium text-lg">
                      Thumbnail Image
                    </span>
                  }
                  name="thumbnail"
                  className="!mb-0"
                >
                  <CustomUpload
                    fileList={fileListThumbnail}
                    onChange={({ fileList }) =>
                      setFileListThumbnail(fileList.slice(-1))
                    }
                    maxCount={1}
                    accept="image/*"
                  />
                </Form.Item>
              </div>

              {/* Project Images Upload */}
              <div className="bg-white rounded-xl p-6 border border-slate-200">
                <Form.Item
                  label={
                    <span className="text-slate-700 font-medium text-lg">
                      Project Images
                    </span>
                  }
                  name="images"
                  className="!mb-0"
                >
                  <CustomUpload
                    listType="picture-card"
                    fileList={fileListImages}
                    onChange={({ fileList }) => setFileListImages(fileList)}
                    maxCount={5} // or whatever limit you want
                    accept="image/*"
                    multiple
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
                    Update Project
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

export default UpdateProject;

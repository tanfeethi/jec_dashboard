import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import { useCreateClient } from "../../hooks/clients/createClient";

const { Title } = Typography;

const AddClient = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const { mutate: createClientMutate, isError, error, isPending } =
        useCreateClient();

    const onFinish = (values: any) => {
        setSubmitted(true);

        if (!fileList.length) {
            message.error("Please upload a logo image.");
            return;
        }

        const payload = {
            logo: fileList[0]?.originFileObj as File,
            link: values.link,
        };

        createClientMutate(payload);
    };

    const onFinishFailed = () => {
        setSubmitted(true);
        console.log(submitted);
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
                        Add New Client
                    </Title>
                    <p className="text-slate-600">Add a client with a logo and link</p>
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
                            {/* Client Link */}
                            <Form.Item
                                label={
                                    <span className="text-slate-700 font-medium">Client Link</span>
                                }
                                name="link"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter the client link",
                                    },
                                    {
                                        type: "url",
                                        message: "Please enter a valid URL",
                                    },
                                ]}
                                className="!mb-0"
                            >
                                <Input
                                    placeholder="https://example.com"
                                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                            </Form.Item>

                            {/* Upload Logo */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 my-4">
                                <Form.Item
                                    label={
                                        <span className="text-slate-700 font-medium text-lg">
                                            Client Logo
                                        </span>
                                    }
                                    name="logo"
                                    rules={[
                                        { required: true, message: "Please upload a client logo" },
                                    ]}
                                    className="!mb-0"
                                >
                                    <CustomUpload
                                        fileList={fileList}
                                        onChange={({ fileList }) => setFileList(fileList.slice(-1))}
                                        maxCount={1}
                                        accept="image/*"
                                    />
                                </Form.Item>
                            </div>

                            {/* Error Message */}
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
                                            Create Client
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
                        Ensure the logo and link are correct before submitting
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddClient;
import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import { useLocation, useParams } from "react-router";
import { useUpdateClient } from "../../hooks/clients/updateClient";

const { Title } = Typography;

const UpdateClient = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const {
        mutate: updateClientMutate,
        isError,
        error,
        isPending,
    } = useUpdateClient();

    const onFinish = (values: any) => {
        setSubmitted(true);

        if (!values.link) {
            message.error("Please enter the client link.");
            return;
        }

        const payload = {
            id: Number(id),
            link: values.link,
            logo: fileList[0]?.originFileObj || undefined,
        };

        updateClientMutate(payload);
    };

    const onFinishFailed = () => {
        setSubmitted(true);
        console.log(submitted);
    };

    useEffect(() => {
        if (state?.client) {
            const { link, logo } = state.client;

            form.setFieldsValue({
                link: link || "",
            });

            if (logo) {
                const initialFileList = [
                    {
                        uid: "-1",
                        name: "existing-logo.jpg",
                        status: "done",
                        url: logo,
                    } as UploadFile,
                ];
                setFileList(initialFileList);
                form.setFieldsValue({ logo: initialFileList });
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
                        Update Client
                    </Title>
                    <p className="text-slate-600">
                        Update client logo and link
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
                            {/* Link Field */}
                            <Form.Item
                                label={
                                    <span className="text-slate-700 font-medium">
                                        Client Link
                                    </span>
                                }
                                name="link"
                                rules={[
                                    { required: true, message: "Please enter client link" },
                                    { type: "url", message: "Please enter a valid URL" },
                                ]}
                                className="!mb-0"
                            >
                                <Input
                                    placeholder="https://example.com"
                                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                            </Form.Item>

                            {/* Upload */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 my-4">
                                <Form.Item
                                    label={
                                        <span className="text-slate-700 font-medium text-lg">
                                            Client Logo
                                        </span>
                                    }
                                    name="logo"
                                    rules={[
                                        { required: true, message: "Please upload a logo" },
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
                                            Update Client
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
                        Make sure the logo and link are correct before submitting
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdateClient;
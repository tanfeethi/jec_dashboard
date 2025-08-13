import { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import { useCreateEvent } from "../../hooks/events/createEvent";

const { Title } = Typography;

const AddEvent = () => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const { mutate: createEventMutate, isError, error, isPending } = useCreateEvent();

    const onFinish = (values: any) => {
        setSubmitted(true);

        if (!fileList.length) {
            message.error("Please upload an event image.");
            return;
        }

        const payload = {
            titleEn: values.titleEn,
            titleAr: values.titleAr,
            image: fileList[0]?.originFileObj as File,
        };

        createEventMutate(payload);
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
                        Add New Event
                    </Title>
                    <p className="text-slate-600">Create an event with English & Arabic titles and an image</p>
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
                            {/* Title EN */}
                            <Form.Item
                                label={<span className="text-slate-700 font-medium">Title (English)</span>}
                                name="titleEn"
                                rules={[{ required: true, message: "Please enter the English title" }]}
                                className="!mb-2"
                            >
                                <Input
                                    placeholder="Event title in English"
                                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                            </Form.Item>

                            {/* Title AR */}
                            <Form.Item
                                label={<span className="text-slate-700 font-medium">Title (Arabic)</span>}
                                name="titleAr"
                                rules={[{ required: true, message: "Please enter the Arabic title" }]}
                                className="!mb-2"
                            >
                                <Input
                                    placeholder="عنوان الفعالية بالعربية"
                                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                            </Form.Item>

                            {/* Upload Image */}
                            <div className="bg-white rounded-xl p-6 border border-slate-200 my-4">
                                <Form.Item
                                    label={<span className="text-slate-700 font-medium text-lg">Event Image</span>}
                                    name="image"
                                    rules={[{ required: true, message: "Please upload an event image" }]}
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
                                            Create Event
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
                        Ensure the titles and image are correct before submitting
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AddEvent;
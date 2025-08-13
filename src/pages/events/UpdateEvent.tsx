import { useEffect, useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import type { UploadFile } from "antd";
import CustomUpload from "../../components/reuse/CustomUpload";
import Loader from "../../components/reuse/Loader";
import { useLocation, useParams } from "react-router";
import { useUpdateEvent } from "../../hooks/events/updateEvent";

const { Title } = Typography;

const UpdateEvent = () => {
    const { id } = useParams<{ id: string }>();
    const { state } = useLocation();

    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitted, setSubmitted] = useState(false);

    const {
        mutate: updateEventMutate,
        isError,
        error,
        isPending,
    } = useUpdateEvent();

    const onFinish = (values: any) => {
        setSubmitted(true);

        if (!values.titleEn || !values.titleAr) {
            message.error("Please fill in both English and Arabic titles.");
            return;
        }

        const payload = {
            id: Number(id),
            titleEn: values.titleEn,
            titleAr: values.titleAr,
            image: fileList[0]?.originFileObj || undefined,
        };

        updateEventMutate(payload);
    };

    const onFinishFailed = () => {
        setSubmitted(true);
        console.log(submitted);
    };

    useEffect(() => {
        if (state?.event) {
            const { titleEn, titleAr, image } = state.event;

            form.setFieldsValue({
                titleEn: titleEn || "",
                titleAr: titleAr || "",
            });

            if (image) {
                const initialFileList = [
                    {
                        uid: "-1",
                        name: "existing-image.jpg",
                        status: "done",
                        url: image,
                    } as UploadFile,
                ];
                setFileList(initialFileList);
                form.setFieldsValue({ image: initialFileList });
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
                        Update Event
                    </Title>
                    <p className="text-slate-600">
                        Update event title and image
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
                            {/* English Title */}
                            <Form.Item
                                label={<span className="text-slate-700 font-medium">Title (English)</span>}
                                name="titleEn"
                                rules={[{ required: true, message: "Please enter the English title" }]}
                                className="!mb-2"
                            >
                                <Input
                                    placeholder="Enter English title"
                                    className="!rounded-lg !border-slate-300 hover:!border-blue-400 focus:!border-blue-500 !py-3"
                                />
                            </Form.Item>

                            {/* Arabic Title */}
                            <Form.Item
                                label={<span className="text-slate-700 font-medium">Title (Arabic)</span>}
                                name="titleAr"
                                rules={[{ required: true, message: "Please enter the Arabic title" }]}
                                className="!mb-2"
                            >
                                <Input
                                    placeholder="أدخل العنوان بالعربية"
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

                            {/* Error */}
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
                                            Update Event
                                        </span>
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-slate-500 text-sm">
                        Make sure the title and image are correct before submitting
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UpdateEvent;
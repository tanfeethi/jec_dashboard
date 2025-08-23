import { Modal, Input, Button, Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect } from "react";
import useUpdateServiceType from "../../hooks/servicesTypes/useUpdateServiceType";

interface UpdateServiceTypeModalProps {
  open: boolean;
  onClose: () => void;
  serviceType?: any | null;
}

const UpdateServiceTypeModal = ({
  open,
  onClose,
  serviceType,
}: UpdateServiceTypeModalProps) => {
  const { mutate, isPending } = useUpdateServiceType();
  const [form] = Form.useForm();

  // 👇 pre-fill form when serviceType changes
  useEffect(() => {
    if (serviceType) {
      form.setFieldsValue({
        name_en: serviceType.name?.en,
        name_ar: serviceType.name?.ar,
      });
    } else {
      form.resetFields();
    }
  }, [serviceType, form]);

  const handleSubmit = async () => {
    form.validateFields().then((values) => {
      mutate(
        {
          id: serviceType.id,
          name: {
            name_en: values.name_en,
            name_ar: values.name_ar,
          },
        },
        {
          onSuccess: () => {
            form.resetFields();
            onClose();
          },
        }
      );
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={<AiOutlineClose />}
      className="rounded-xl"
      destroyOnClose
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#13476D] mb-4">
          Update Service Type
        </h2>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Type Name (English)"
            name="name_en"
            rules={[
              { required: true, message: "Please enter the English name" },
            ]}
          >
            <Input placeholder="Enter Type name in English" />
          </Form.Item>

          <Form.Item
            label="Type Name (Arabic)"
            name="name_ar"
            rules={[
              { required: true, message: "Please enter the Arabic name" },
            ]}
          >
            <Input placeholder="Enter Type name in Arabic" />
          </Form.Item>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              onClick={onClose}
              className="border-[#13476D] text-[#13476D]"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              className="bg-[#13476D] text-white"
              onClick={handleSubmit}
              loading={isPending}
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateServiceTypeModal;

import { Modal, Input, Button, Form } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import useAddServiceType from "../../hooks/servicesTypes/useAddServiceType";

interface AddDepartmentModalProps {
  open: boolean;
  onClose: () => void;
}

const AddServiceTypeModal = ({ open, onClose }: AddDepartmentModalProps) => {
  const { mutate, isPending } = useAddServiceType();

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    form.validateFields().then((values) => {
      mutate(values, {
        onSuccess: () => {
          form.resetFields(); // ✅ reset form
          onClose(); // ✅ close modal
        },
      });
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={<AiOutlineClose />}
      className="rounded-xl"
      style={{ backdropFilter: "blur(5px)" }}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-[#13476D] mb-4">
          Add Service Types
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
            >
              {isPending ? "Adding..." : "Add"}
            </Button>
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddServiceTypeModal;

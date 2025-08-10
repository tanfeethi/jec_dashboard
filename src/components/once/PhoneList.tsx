// components/PhoneList.tsx
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const PhoneList = ({ name, label }: { name: any; label: string }) => (
  <>
    <h5 className="text-slate-600 font-medium mb-3">{label}</h5>
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ key, name }) => (
              <div key={key} className="flex gap-2 items-center">
                <Form.Item
                  name={name}
                  rules={[{ required: true, message: `Enter ${label}` }]}
                  className="!mb-0 flex-1"
                >
                  <Input className="!rounded-lg !border-slate-300" />
                </Form.Item>
                <Button
                  type="text"
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(name)}
                  className="!text-red-500"
                />
              </div>
            ))}
          </div>
          <Form.Item className="!mb-0 !my-4">
            <Button
              type="dashed"
              onClick={() => add()}
              icon={<PlusOutlined />}
              className="!rounded-lg"
            >
              Add {label}
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default React.memo(PhoneList);

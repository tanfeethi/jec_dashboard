// components/reuse/CustomUpload.tsx
import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { Upload } from "antd";

const { Dragger } = Upload;

type CustomUploadProps = UploadProps & {
  fileList?: UploadFile[];
};

const CustomUpload: React.FC<CustomUploadProps> = ({ fileList, ...rest }) => {
  return (
    <Dragger
      style={{
        background: "#fff",
      }}
      fileList={fileList}
      showUploadList={true}
      beforeUpload={() => false} // prevent automatic upload
      {...rest}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Only image files (JPG, PNG) are allowed. Max 5MB.
      </p>
    </Dragger>
  );
};

export default CustomUpload;

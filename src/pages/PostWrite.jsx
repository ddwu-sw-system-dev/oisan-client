import React, { useState } from "react";
import { Form, Input, Button, InputNumber, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./PostWrite.scss";

const { TextArea } = Input;

const normFile = (e) => {
  console.log("Upload event:", e);

  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

const PostWrite = () => {
  const [componentDisabled, setComponentDisabled] = useState(true);

  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };

  return (
    <div className="post-write-section">
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          disabled: componentDisabled,
        }}
        onValuesChange={onFormLayoutChange}
        disabled={componentDisabled}
      >
        <Form.Item
          label="제목"
          name="제목"
          rules={[
            {
              required: true,
              message: "제목을 입력해주세요!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="내용"
          name="내용"
          rules={[
            {
              required: true,
              message: "내용을 입력해주세요!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="사진"
          label="사진"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: "이미지를 업로드하세요!",
            },
          ]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="너비">
          <InputNumber />
        </Form.Item>
        <Form.Item label="깊이">
          <InputNumber />
        </Form.Item>
        <Form.Item label="높이">
          <InputNumber />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 14,
          }}
        >
          <Button type="primary" htmlType="submit">
            작성
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostWrite;

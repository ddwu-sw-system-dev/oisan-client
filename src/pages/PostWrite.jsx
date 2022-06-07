import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Button, InputNumber, Upload, Tag, Tooltip } from "antd";
// import { TweenOneGroup } from "rc-tween-one";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
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
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue("");
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
        <Form.Item label="태그">
          {tags.map((tag, index) => {
            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  className="tag-input"
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                className="edit-tag"
                key={tag}
                closable
                onClose={() => handleClose(tag)}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
          {inputVisible && (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              className="tag-input"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleInputConfirm}
              onPressEnter={handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag className="site-tag-plus" onClick={showInput}>
              <PlusOutlined /> New Tag
            </Tag>
          )}
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

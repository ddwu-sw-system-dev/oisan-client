import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Upload,
  Tag,
  Tooltip,
  Divider,
  message,
  Cascader,
  Select,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import "./PostWrite.scss";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
const { Option } = Select;
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

  const { id } = useParams();

  const [form] = Form.useForm();
  const { getFieldValue, validateFields } = form;
  const [customer, setCustomer] = useState();

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  const writePost = async (
    categId,
    title,
    desc,
    price,
    width,
    height,
    depth,
    file,
    image
  ) => {
    const frm = new FormData();
    frm.append("customerId", customer.customerId);
    frm.append("image", image);
    frm.append("categId", categId);
    frm.append("title", title);
    frm.append("desc", desc);
    frm.append("price", price);
    frm.append("width", width);
    frm.append("height", height);
    frm.append("depth", depth);
    frm.append("tagList", tags);

    await axios
      .post(
        "http://localhost:8080/post/new",
        // {
        //   customerId: customer.customerId,
        //   categId: categId,
        //   title: title,
        //   desc: desc,
        //   price: price,
        //   imageUrl: file,
        //   width: width,
        //   height: height,
        //   depth: depth,
        //   tagList: tags,
        // }
        frm,
        {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=----WebKitFormBoundarynHlbq58vtkmKcQMl",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        document.location.href = `/post`;
      });
  };

  const onCheck = async () => {
    try {
      const values = await validateFields();

      const categId = parseInt(getFieldValue(["categId"]));
      const title = getFieldValue(["title"]);
      const desc = getFieldValue(["desc"]);
      const price = getFieldValue(["price"]);
      const width = getFieldValue(["width"]);
      const height = getFieldValue(["height"]);
      const depth = getFieldValue(["depth"]);
      const file = getFieldValue(["picture"]);
      const image = document.getElementById("file").files[0];

      const response = await writePost(
        categId,
        title,
        desc,
        price,
        width,
        height,
        depth,
        file,
        image
      );

      console.log("Success:", values, response);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error("??? ????????? ?????????????????????");
    }
  };

  return (
    <div className="post-write-section">
      <Divider>??? ??????</Divider>
      <Form
        enctype="multipart/form-data"
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
      >
        <Form.Item
          name="categId"
          label="????????????"
          rules={[
            {
              required: true,
              message: "??????????????? ???????????????!",
            },
          ]}
        >
          <Select style={{ width: 80 }}>
            <Option value="1">??????</Option>
            <Option value="2">??????</Option>
            <Option value="3">??????</Option>
            <Option value="4">??????</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="??????"
          name="title"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="??????"
          name="desc"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="??????"
          name="price"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="picture"
          label="??????"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // rules={[
          //   {
          //     required: true,
          //     message: "???????????? ??????????????????!",
          //   },
          // ]}
        >
          {/* <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload> */}
          <input type="file" name="file" id="file" />
        </Form.Item>
        <Form.Item
          label="??????"
          name="width"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="??????"
          name="height"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="??????"
          name="depth"
          rules={[
            {
              required: true,
              message: "????????? ??????????????????!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="??????" name="tagList">
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
          <Button type="primary" onClick={onCheck}>
            ??????
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostWrite;

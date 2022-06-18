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

  const [postContent, setPostContent] = useState([]);
  const [form] = Form.useForm();
  const { getFieldValue, validateFields } = form;
  const [customer, setCustomer] = useState();
  const categList = ["모두", "책상", "의자", "침대", "서랍"];

  const editPost = async () => {
    const response = await axios.get(
      `http://localhost:8080/post?postId=${id}`
    );
    setPostContent(response.data);
    console.log(response.data);
  };

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
    editPost();
  }, []);

  useEffect(() => {
    if (postContent) {
      console.log("postContent", postContent);

      form.setFieldsValue({
        categId: categList[postContent.categId],
        title: postContent.title,
        desc: postContent.desc,
        price: postContent.price,
        width: postContent.width,
        height: postContent.height,
        depth: postContent.depth,
      });
    }
  }, [postContent]);

  const updatePost = async (
    categId,
    title,
    desc,
    price,
    width,
    height,
    depth
  ) => {
    // category 코드로 바꾸기 (setFieldValue 할때 숫자->문자로 변하는 경우가 있으므로)
		let convertCategory;
		if(isNaN(categId)) convertCategory = categList.indexOf(categId);
		else convertCategory = categId;

    await axios
      .put("http://localhost:8080/post/edit", {
        postId: id,
        customerId: customer.customerId,
        categId: convertCategory,
        title: title,
        desc: desc,
        price: price,
        imageUrl: null,
        width: width,
        height: height,
        depth: depth,
      })
      .then((response) => {
        console.log(response.data);
        document.location.href = `/post/${id}`;
        message.success("글을 수정하였습니다.");
      });
  };

  const onCheck = async () => {
    try {
      const values = await validateFields();

      const categId = getFieldValue(["categId"]);
      const title = getFieldValue(["title"]);
      const desc = getFieldValue(["desc"]);
      const price = getFieldValue(["price"]);
      const width = getFieldValue(["width"]);
      const height = getFieldValue(["height"]);
      const depth = getFieldValue(["depth"]);

      const response = await updatePost(
        categId,
        title,
        desc,
        price,
        width,
        height,
        depth
      );

      console.log("Success:", values, response);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error("글 작성에 실패하였습니다");
    }
  };

  return (
    <div className="post-write-section">
      <Divider>글 수정</Divider>
      <Form
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
          label="카테고리"
          rules={[
            {
              required: true,
              message: "카테고리를 선택하세요!",
            },
          ]}
        >
          <Select style={{ width: 80 }}>
            <Option value="1">책상</Option>
            <Option value="2">의자</Option>
            <Option value="3">침대</Option>
            <Option value="4">서랍</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="제목"
          name="title"
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
          name="desc"
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
          label="가격"
          name="price"
          rules={[
            {
              required: true,
              message: "가격을 입력해주세요!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/* <Form.Item
          name="picture"
          label="사진"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          // rules={[
          //   {
          //     required: true,
          //     message: "이미지를 업로드하세요!",
          //   },
          // ]}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item> */}
        <Form.Item
          label="너비"
          name="width"
          rules={[
            {
              required: true,
              message: "너비를 입력해주세요!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="높이"
          name="height"
          rules={[
            {
              required: true,
              message: "높이를 입력해주세요!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="깊이"
          name="depth"
          rules={[
            {
              required: true,
              message: "깊이를 입력해주세요!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        {/* <Form.Item label="태그" name="tagList">
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
        </Form.Item> */}
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 14,
          }}
        >
          <Button type="primary" onClick={onCheck}>
            수정
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostWrite;

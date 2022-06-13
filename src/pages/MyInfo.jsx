import {
  Button,
  Checkbox,
  Form,
  Input,
  Divider,
  message,
  Cascader,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 6,
  },
};

const formTailLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 6,
    offset: 2,
  },
};

const residences = [
  {
    value: "서울",
    label: "서울",
    children: [
      { value: "강남구", label: "강남구" },
      { value: "강동구", label: "강동구" },
      { value: "강북구", label: "강북구" },
      { value: "강서구", label: "강서구" },
      { value: "관악구", label: "관악구" },
      { value: "광진구", label: "광진구" },
      { value: "구로구", label: "구로구" },
      { value: "금천구", label: "금천구" },
      { value: "도봉구", label: "도봉구" },
      { value: "동대문구", label: "동대문구" },
      { value: "동작구", label: "동작구" },
      { value: "마포구", label: "마포구" },
      { value: "서대문구", label: "서대문구" },
      { value: "서초구", label: "서초구" },
      { value: "성동구", label: "성동구" },
      { value: "성북구", label: "성북구" },
      { value: "송파구", label: "송파구" },
      { value: "양천구", label: "양천구" },
      { value: "영등포구", label: "영등포구" },
      { value: "용산구", label: "용산구" },
      { value: "은평구", label: "은평구" },
      { value: "종로구", label: "종로구" },
      { value: "중구", label: "중구" },
      { value: "중랑구", label: "중랑구" },
    ],
  },
  {
    value: "경기",
    label: "경기",
    children: [
      { value: "수원", label: "수원" },
      { value: "용인", label: "용인" },
      { value: "성남", label: "성남" },
      { value: "부천", label: "부천" },
      { value: "화성", label: "화성" },
      { value: "안산", label: "안산" },
      { value: "안양", label: "안양" },
      { value: "평택", label: "평택" },
      { value: "시흥", label: "시흥" },
      { value: "김포", label: "김포" },
      { value: "광주", label: "광주" },
      { value: "광명", label: "광명" },
      { value: "군포", label: "군포" },
      { value: "하남", label: "하남" },
      { value: "오산", label: "오산" },
      { value: "이천", label: "이천" },
      { value: "안성", label: "안성" },
      { value: "의왕", label: "의왕" },
      { value: "양평", label: "양평" },
      { value: "여주", label: "여주" },
      { value: "과천", label: "과천" },
      { value: "고양", label: "고양" },
      { value: "남양주", label: "남양주" },
      { value: "파주", label: "파주" },
      { value: "의정부", label: "의정부" },
      { value: "양주", label: "양주" },
      { value: "구리", label: "구리" },
      { value: "포천", label: "포천" },
      { value: "동두천", label: "동두천" },
      { value: "가평", label: "가평" },
      { value: "연천", label: "연천" },
    ],
  },
];

function MyInfo() {
  const [form] = Form.useForm();
  const { getFieldValue, validateFields } = form;

  const [customer, setCustomer] = useState();

  useEffect(() => {
    if (sessionStorage.getItem("customer") !== null) {
      console.log("myinfo", JSON.parse(sessionStorage.getItem("customer")));
      setCustomer(JSON.parse(sessionStorage.getItem("customer")));
    }
  }, []);

  return (
    <div className="login-section">
      <Divider>내 정보 수정</Divider>
      <Form form={form}>
        <Form.Item {...formItemLayout} name="name" label="이름">
          <Input disabled />
        </Form.Item>
        <Form.Item {...formItemLayout} name="email" label="이메일">
          <Input disabled />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: "password is required",
            },
            {
              type: "string",
              min: 4,
              message: "비밀번호는 4자리 이상이여야합니다",
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="confirm"
          label="비밀번호 확인"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="nickname"
          label="닉네임"
          tooltip="사용할 별명을 적어주세요"
          rules={[
            {
              required: true,
              message: "Please input your nickname!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="phone"
          label="전화번호"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            {
              pattern: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
              message: "Please input phone number format!",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="residence"
          label="거주지"
          rules={[
            {
              type: "array",
              required: true,
              message: "Please select your residence!",
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary">수정</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default MyInfo;

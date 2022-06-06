import { Button, Checkbox, Form, Input, Divider } from 'antd';
import { useEffect, useState } from 'react';
import "./Login.scss";

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};

const formTailLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
    offset: 4,
  },
};


const Login = () => {
  const [form] = Form.useForm();


  // TODO: 로그인 버튼 누르면 sumbit 함수에서 onCheck하고 true면 로그인 하는 식으로?
  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      console.log('Success:', values);
      //로그인 하는 부분 

    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
      //실패 시 메시지 띄우기~
    }

  };

  // const validation = () => new Promise((resolve) => {
  //   validateFields((err) => {
  //     if (err) {
  //       resolve(false);
  //       return;
  //     }

  //     resolve(true);
  //   });
  // });

  // const onSubmit = async() => {
  //   const valid = await validation();
  //   if(!valid) {
  //     return ;
  //   }
  //   // isEmailDuplicate(getFieldValue('email'));

  // };

  return (
    <div className="login-section">
      <Divider>로그인</Divider>
      <Form form={form}>
        <Form.Item
          {...formItemLayout}
          name="email"
          label="이메일"
          rules={[
            {
              required: true,
              message: 'email is required',
            },
            {
              type: 'email',
              message: '유효한 이메일 형식이 아닙니다.',
            },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="password"
          label="비밀번호"
          rules={[
            {
              required: true,
              message: 'password is required',
            },
            {
              type: 'string',
              min: 8,
              message: '비밀번호는 8자리 이상이여야합니다',
            },
          ]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>
        <Form.Item {...formTailLayout}>
          <Button type="primary" onClick={onCheck}>
            로그인
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
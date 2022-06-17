import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Divider,
  message,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import axios from "axios";

const OiPayUse = (props) => {
  const { remain, biddingPrice } = props;
  const [form] = Form.useForm();
  const { getFieldValue, validateFields } = form;
  const [customer, setCustomer] = useState();

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  const spendOipay = async (amount) => {
    await axios
      .post("http://localhost:8080/oipay/use", {
        customerId: customer.customerId,
        amount: amount,
      })
      .then((response) => {
        message.success(`${response.data.amount}원을 사용하였습니다.`);

        customer.oiPay -= amount;
        sessionStorage.removeItem("customer");
        sessionStorage.setItem("customer", JSON.stringify(customer));
        setCustomer(JSON.parse(sessionStorage.getItem("customer")));
      });
  };

  const onCheck = async () => {
    try {
      const values = await validateFields();

      const amount = getFieldValue(["price"]);
      console.log(amount);

      const response = await spendOipay(amount);
      console.log("Success:", values, response);
    } catch (errorInfo) {
      message.success("사용에 실패하였습니다.");
      console.log("Failed:", errorInfo);
      //실패 시 메시지 띄우기~
    }
  };

  const priceValidate = (input, value) => {
    if (!value || value < 100) {
      return Promise.reject(new Error(input.message));
    }
    return Promise.resolve();
  };

  return (
    <div className="oipay-use-section">
      <Divider>오이페이 사용하기</Divider>
      {remain ? <p>잔여금액{remain}</p> : null}
      <Form form={form}>
        <Form.Item
          name="price"
          label="금액"
          initialValue={biddingPrice ? biddingPrice : 0}
          rules={[
            {
              validator: priceValidate,
              message: "100원 이상의 금액을 입력하세요",
            },
          ]}
        >
          <InputNumber placeholder="금액을 입력하세요" />
          {/* <Input type='number' placeholder="금액을 입력하세요" allowClear={true}/> */}
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={onCheck} icon={<DollarOutlined />}>
            사용하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default OiPayUse;

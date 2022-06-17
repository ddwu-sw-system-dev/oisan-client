import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Divider,
  Input,
  Radio,
  Space,
  InputNumber,
  message,
  Typography,
} from "antd";
import { DollarOutlined } from "@ant-design/icons";
import axios from "axios";
import OiPayUse from "../components/OiPayUse";
import "./OiPayCharge.scss";

const OipayCharge = () => {
  const [form] = Form.useForm();
  const { getFieldValue, validateFields } = form;
  const [customer, setCustomer] = useState();

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  const chargeOipay = async (amount) => {
    await axios
      .post("http://localhost:8080/oipay/charge", {
        customerId: customer.customerId,
        amount: amount,
      })
      .then((response) => {
        message.success(`${amount}원이 충전되었습니다.`);

        customer.oiPay += amount;
        sessionStorage.removeItem("customer");
        sessionStorage.setItem("customer", JSON.stringify(customer));
        setCustomer(JSON.parse(sessionStorage.getItem("customer")));
      });
  };

  const onCheck = async () => {
    try {
      const values = await validateFields();

      //충전시키는 부분
      const amount = getFieldValue(["price-group"]);
      console.log(amount);
      const response = await chargeOipay(amount);

      console.log("Success:", values, response);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
      message.error("충전에 실패하였습니다.");
    }
  };

  return (
    <div className="oipay-charge-section">
      <Divider>오이페이 충전하기</Divider>
      <Form form={form}>
        <Form.Item
          name="price-group"
          rules={[
            {
              required: true,
              message: "금액을 선택하세요",
            },
          ]}
        >
          <Radio.Group label="충전 금액">
            <Space direction="vertical">
              <Radio value={1000}>1,000원</Radio>
              <Radio value={3000}>3,000원</Radio>
              <Radio value={5000}>5,000원</Radio>
              <Radio value={10000}>10,000원</Radio>
              <Radio value={30000}>30,000원</Radio>
              <Radio value={50000}>50,000원</Radio>
              <Radio value={100000}>100,000원</Radio>
              <Radio value={1000000}>1,000,000원</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={onCheck} icon={<DollarOutlined />}>
            충전하기
          </Button>
        </Form.Item>
      </Form>

      {/* 오이페이 사용하기 */}
      <OiPayUse />
    </div>
  );
};

OipayCharge.propTypes = {};

export default OipayCharge;

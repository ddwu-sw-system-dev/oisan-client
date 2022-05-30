import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Divider, Input, Radio, Space, InputNumber } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import axios from 'axios';
import OipayUse from '../components/OiPayUse';

const OipayCharge = () => {
	const [form] = Form.useForm();
	const {
		getFieldValue,
		validateFields,
	} = form;
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

	const chargeOipay = async (amount) => {
		const response = await axios.post('http://localhost:8080/oisan/oipay/use', {
			userId: 1,
			oiPayId: 1,
			type: 1,
			amount: amount,
		});

		console.log("response", response.data);		
	};

	const onCheck = async () => {
		try {
			const values = await validateFields();
			
			//충전시키는 부분
			const amount = getFieldValue(['price-group']);
			console.log(amount);
			const response = await chargeOipay(amount);

			console.log('Success:', values, response);
	
		} catch (errorInfo) {
			console.log('Failed:', errorInfo);

		}
	};

	return (
		<div>
			<Divider>오이페이 충전하기</Divider>
			<Form form={form}>
				<Form.Item
					name="price-group"
					rules={[
						{
							required: true,
							message: '금액을 선택하세요',
						}
					]}
				>
					<Radio.Group>
						<Space direction="vertical">
							<Radio value={1000}>1000</Radio>
							<Radio value={3000}>3000</Radio>
							<Radio value={5000}>5000</Radio>
							<Radio value={10000}>10000</Radio>
							<Radio value={30000}>30000</Radio>
							<Radio value={50000}>50000</Radio>
							<Radio value={100000}>100000</Radio>
							<Radio value={1000000}>1000000</Radio>
						</Space>
					</Radio.Group>
				</Form.Item>

				<Form.Item {...formTailLayout}>
					<Button type="primary" onClick={onCheck} icon={<DollarOutlined />}>
						충전하기
					</Button>
				</Form.Item>
			</Form>

			<OipayUse />
		</div>
	);
};

OipayCharge.propTypes = {

};

export default OipayCharge;
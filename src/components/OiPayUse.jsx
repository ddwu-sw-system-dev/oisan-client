import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import axios from 'axios';

const OipayUse = (props) => {
	const {
		remain,
		biddingPrice,
	} = props;
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

	const useOipay = async (amount) => {
		const response = await axios.post('http://localhost:8080/oisan/oipay/charge', {
			userId: 1,
			oiPayId: 1,
			type: 0,
			amount: amount,
		});

		console.log("response", response.data);		
	};

	const onCheck = async () => {
		try {
			const values = await validateFields();

			console.log('Success:', values); 

		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
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
			{remain ? <p>잔여금액{remain}</p> : null}
			<Form form={form}>
				<Form.Item
					{...formItemLayout}
					name="price"
					label="금액"
					initialValue={biddingPrice ? biddingPrice : 0}
					rules={[
						{
							validator: priceValidate,
							message: '100원 이상의 금액을 입력하세요',
						}
					]}
				>
					<InputNumber placeholder="금액을 입력하세요" />
					{/* <Input type='number' placeholder="금액을 입력하세요" allowClear={true}/> */}
				</Form.Item>

				<Form.Item {...formTailLayout}>
					<Button type="primary" onClick={onCheck} icon={<DollarOutlined />}>
						사용하기
					</Button>
				</Form.Item>
			</Form>
		</div>
  );
};

export default OipayUse;
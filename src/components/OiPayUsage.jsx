import axios from 'axios';
import { useState, useEffect } from 'react';
import { List, Typography, Divider } from 'antd';
const { Text } = Typography;

const OiPayUsage = () => {
    const userId = 1;
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);

	const getOipay = async() => {
		const response = await axios.get(`http://localhost:8080/oisan/oipay/${userId}`);
        setHistory(response.data);	
        setLoading(false);	
	};

	useEffect(() => {
		getOipay();
	}, []);

    const mSecToDate = (milliseconds) => {
        const date = new Date(milliseconds);
        const convert = date.toDateString();
        return convert;
    };

    return (
        <div>
            {loading ? "Loading..." : null}
            {!loading &&
                <div>
                    <List
                    header={<div>오이페이 사용내역</div>}
                    bordered
                    dataSource={history.sort((a, b) => {
                        if (a.createAt > b.createAt) return 1;
                        if (a.createAt < b.createAt) return -1;
                        return 0;
                    })}
                    renderItem={({type, amount, createAt}) => (
                        <List.Item>
                        <Typography.Text mark>{type ? '사용' : '충전'}</Typography.Text>
                        {amount}원
                        <Text code>{mSecToDate(createAt)}</Text>
                        </List.Item>
                    )}
                    />
                </div>
            }
        </div>
    );
};

export default OiPayUsage;
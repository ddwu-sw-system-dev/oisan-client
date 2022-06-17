import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { Avatar, List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import "./ChatRoomList.scss";

const ChatRoomList = () => {
	
	const [loading, setLoading] = useState(true);
	const [chatRoomList, setChatRoomList] = useState([]);
	const [loginUser, setLoginUser] = useState();	

	useEffect(() => {
		if (sessionStorage.getItem("customer") !== null) {
			setLoginUser(JSON.parse(sessionStorage.getItem("customer")));
		}
	}, []);	

	const getChatRoomListData = async() => {
		if(loginUser && loginUser.customerId) {
			const response = await axios.get(`http://localhost:8080/chatRooms/list/${loginUser.customerId}`);
			setChatRoomList(response.data);
			// console.log(response.data);
			setLoading(false);
		}
	};

	useEffect(() => {
		getChatRoomListData();
	}, [loginUser]);

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 24,
			}}
			spin
		/>
	);


	const whoIsChatReceiver = useCallback((item) => {
		if(loginUser && loginUser.customerId && chatRoomList) { 
			if (loginUser.customerId === item.customer1Id) return item.cutomer2.nickname;
			if (loginUser.customerId === item.customer2Id) return item.cutomer1.nickname;
		}
	}, [loginUser, chatRoomList]);


	return (
		<div>
			{loading ? <Spin indicator={antIcon} /> :
				<List
					className="chat-room-list"
					itemLayout="horizontal"
					dataSource={chatRoomList}
					renderItem={(item) => (
						<List.Item>
							<List.Item.Meta
								key={item.chatRoomId}
								avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
								title={<Link to={`/chatroom/${item.chatRoomId}/${whoIsChatReceiver(item)}`}>{`${whoIsChatReceiver(item)} 과의 채팅방`}</Link>}
								// description="Ant Design, a design language for background applications, is refined by Ant UED Team"
							/>
						</List.Item>
					)}
				/>
			}
		</div>
		);
};

export default ChatRoomList;
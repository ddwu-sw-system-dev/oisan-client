import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { Input, Spin, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import MessageBubble from '../components/MessageBubble';
import "./ChatRoomDetail.scss";
const { Search } = Input;

const ChatRoomDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams(); // chatRoomId
	const [loginUser, setLoginUser] = useState();
	const [receiverId, setReceiverId] = useState();
	const [loading, setLoading] = useState(true);
	const [chats, setChats] = useState([]);	

	const getChatsData = async() => {
		const response = await axios.get(`http://localhost:8080/chatRooms/getChatList/${id}`);
		setChats(response.data);	
		// console.log(response.data);
		setLoading(false);
	};

	useEffect(() => {
		getChatsData();
	}, []);

	const isMyMessage = (senderId) => {
		if (loginUser.customerId === senderId) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (sessionStorage.getItem("customer") !== null) {
			setLoginUser(JSON.parse(sessionStorage.getItem("customer")));
		}
		else {
			navigate(-1);
		}
	}, []);

	const sendChat = async(content) => {
		const newChat = {
			chatRoomId: id,
			content: content,
			senderId: loginUser.customerId,
		}
		// console.log("newchat=", newChat);
		const response = await axios.post(`http://localhost:8080/chatRooms/sendChat/${id}?content=${content}&senderId=${loginUser.customerId}&chatRoomId=${id}`, newChat);
		
		// response 응답코드보고 성공하면
		if(response.data) {
			navigate(`/chatroom/${id}`);
			window.location.reload();
		}
	};

	const onSearch = (value) => {
		sendChat(value);
	};

	const antIcon = (
		<LoadingOutlined
			style={{
				fontSize: 24,
			}}
			spin
		/>
	);


	const message_section = (
		<div className="message-section">
			{chats.sort((a, b) =>{ 
				if (a.createAt > b.createAt) return 1; 
				if (a.createAt < b.createAt) return -1; 
				return 0;
			}).map((chat) => (
				<MessageBubble 
					key={chat.chatId}
					isSender={isMyMessage(chat.senderId)}
					message={chat.content}
				/>
			))}
		</div>
	)

	return (
    <div className="chat-detail-section">
			{loading ? <Spin indicator={antIcon} /> :
				<div className="chat-content-section">
					{/* <h2>누구누구와의 채팅방</h2> */}
					{message_section}
					<Search
						placeholder="채팅을 입력하세요"
						enterButton="전송"
						size="large"
						onSearch={onSearch}
					/>
				</div>
			}
    </div>
	);
}


// ChatRoomDetail.propTypes = {

// };

export default ChatRoomDetail;
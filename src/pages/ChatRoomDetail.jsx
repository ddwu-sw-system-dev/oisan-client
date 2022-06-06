import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Input } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import MessageBubble from '../components/MessageBubble';
import "./ChatRoomDetail.scss";
const { Search } = Input;

const ChatRoomDetail = () => {
	const { id } = useParams();

  const onSearch = (value) => console.log(value);

	const chatings = [
		{
			isSender: true,
			message: '안녕하세여',
		},
		{
			isSender: false,
			message: '에눌안됨',
		},
		{
			isSender: true,
			message: '수고염',
		}
	];

	const message_section = (
		<div className="message-section">
			{chatings.map((msg) => (
				<MessageBubble 
					isSender={msg.isSender}
					message={msg.message}
				/>
			))}
		</div>
	)

  return (
    <div className="chat-detail-section">
      <div className="chat-content-section">
        <h2>누구누구와의 채팅방</h2>
        {message_section}
        <Search
          placeholder="채팅을 입력하세요"
          enterButton="전송"
          size="large"
          onSearch={onSearch}
        />
      </div>
      
    </div>
  );
}


// ChatRoomDetail.propTypes = {

// };

export default ChatRoomDetail;
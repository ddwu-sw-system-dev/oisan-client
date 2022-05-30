import React from 'react';
// import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import MessageBubble from '../components/MessageBubble';

const ChatRoomDetail = () => {
	const { id } = useParams();

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
		<div>
			{chatings.map((msg) => (
				<MessageBubble 
					isSender={msg.isSender}
					message={msg.message}
				/>
			))}
		</div>
	)

  return (
    <div>
			<h2>누구누구와의 채팅방</h2>
			{message_section}
    </div>
  );
}


// ChatRoomDetail.propTypes = {

// };

export default ChatRoomDetail;
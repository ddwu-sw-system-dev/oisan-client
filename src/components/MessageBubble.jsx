import "./MessageBubble.scss";

const MessageBubble = ({isSender, message}) => {
    return (
        <div className={`speech-bubble ${isSender ? 'sender' : 'receiver'}`}>
            {message}
        </div>
    );

};

export default MessageBubble;
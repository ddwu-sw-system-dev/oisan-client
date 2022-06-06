import "./MessageBubble.scss";

const MessageBubble = ({isSender, message}) => {
    return (
        <div className={`speech-bubble ${isSender ? 'sender' : 'receiver'}`}>
            <span>{message}</span>
        </div>
    );

};

export default MessageBubble;
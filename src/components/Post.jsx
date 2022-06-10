import { Card } from 'antd';
import { Link } from "react-router-dom";

const Post = (props) => {
	const {
		id,
		title,
		description,
		imgSrc
	} = props;

	return (
		<Link to={`/post/${id}`}>
			<Card
				className="post-item"
				hoverable
				style={{ width: 240 }}
				cover={<img alt="가구 사진" src={imgSrc} />}
			>
				<Card.Meta title={title} description={description} />
			</Card>
		</Link>
	);
};

export default Post;
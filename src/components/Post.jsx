import { Card } from 'antd';
import { Link } from "react-router-dom";

const Post = (props) => {
	const {
		id,
		category,
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
				cover={<img alt="example" src={imgSrc} />}
			>
				<Card.Meta title={title} description={`${category} ${description}`} />
			</Card>
		</Link>
	);
};

export default Post;
import { Image, Tag, Divider } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import { WechatOutlined, UserOutlined, DollarCircleOutlined } from '@ant-design/icons';

import './PostDetail.scss';

const PostDetail = () => {
  const { id } = useParams();

  const POST_DATA = [
		{ 
			postId: 1, 
			userId: 1,
			username: 'aria',
			category: '책상', 
			title: '5년된 책상',
			price: 15000,
			description: '롸..', 
			imgSrc: 'https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F50e606b8f8ff41628b4440ca2a0017ef.jpg',
		}, 
		{ 
			postId: 2,
			userId: 2,
			username: '냥',
			category: '의자', 
			title: '1년된 의자', 
			price: 15000,
			description: '느아..', 
			imgSrc: 'https://image.hanssem.com/hsimg/gds/368/773/773575_A1.jpg?v=20210624133711',
		}, 
		{ 
			postId: 3, 
			userId: 3,
			username: '병아리',
			category: '침대', 
			title: '2년된 침대', 
			price: 15000,
			description: '끄아악..', 
			imgSrc: 'https://image.ajunews.com/content/image/2021/12/24/20211224145900660054.jpg',
		}, 
	];

  const currentPost = POST_DATA.filter((post) => post.postId === parseInt(id))[0];

  return (
    <div className="post-detail">
			<div className="content-wrapper">
				<Image
					src={currentPost.imgSrc}
				/>
				<div className="post-user-info">
					<div className="avatar">
						<Avatar shape="square" icon={<UserOutlined />} />
						{currentPost.username}
					</div>
					<Button>
						<Link to={`/chatroom/${currentPost.userId}`}>{currentPost.username} 님과 채팅하기</Link>
					</Button>
				</div>

				<Divider />

				<Tag color="geekblue">{currentPost.category}</Tag>
				<span className="post-title">{currentPost.title}</span>

				<br/>

				<Tag color="default">가격</Tag>
				<span className="post-price">{currentPost.price} 원</span>
				
				<p className="post-desc">{currentPost.description}</p>
				<Divider />
      </div>
    </div>
  );
};

export default PostDetail;
import { Image, Tag, Divider } from 'antd';
import { useParams } from 'react-router-dom';
import { Button } from 'antd';
import { WechatOutlined } from '@ant-design/icons';

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
        <Tag color="geekblue">{currentPost.category}</Tag>
        <h3>{currentPost.title}</h3>
				<h3>{currentPost.price}</h3>
        <Divider />
        <Image
          src={currentPost.imgSrc}
        />
        <Divider />
        <p>{currentPost.description}</p>
      </div>

			<div className="button-wrapper">
				<Button type="primary" icon={<WechatOutlined />} size="large" href={`/chatroom/${currentPost.userId}`}>
					{currentPost.username} 님과 채팅하기
				</Button>
			</div>
    </div>
  );
};

export default PostDetail;
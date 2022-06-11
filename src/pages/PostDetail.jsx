import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Tag, Divider } from 'antd';
import { useParams, Link } from 'react-router-dom';
import { Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './PostDetail.scss';

const PostDetail = () => {
	const { id } = useParams();

  // const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);

  const getPostData = async() => {
		const response = await axios.get(`http://localhost:8080/post?postId=${id}`);
		setPost(response.data);	
		// setLoading(false);
		//TODO: api에서 customer 정보가 추가되면 수정해야하는 부분 있음
  };

  useEffect(() => {
		getPostData();
  }, []);

  const changeDateFormat = (date) => {
    if (date) {
      const [createDay] = date.split("T");
			return createDay.replaceAll("-", "/");
    }
    return date;
  }

  const convertCategory = (categoryId) => {
    const categList = ['모두', '책상', '의자', '침대', '서랍'];
    return categList[categoryId];
  };

  return (
    <div className="post-detail">
			<div className="content-wrapper">
				<Image
					src={post.imageUrl}
				/>
				<div className="post-user-info">
					<div className="avatar">
						<Avatar shape="square" icon={<UserOutlined />} />
						{post.nickname}
					</div>
					<Button>
						<Link to={`/chatroom/${post.customerId}`}>{post.nickname} 님과 채팅하기</Link>
					</Button>
				</div>

				<Divider />

				<Tag color="geekblue">{convertCategory(post.categId)}</Tag>
				<span className="post-title">{post.title}</span>

				<br/>

				<Tag color="default">가격</Tag>
				<span className="post-price">{post.price}원</span>
				
				<br/>

				<Tag color="default">크기</Tag>
				<span className="post-furniture-size">W{post.width} * D{post.depth} * H{post.height}</span>
				
				<p className="post-desc">{post.desc}</p>
				<p className="post-create_at">{changeDateFormat(post.createAt)}</p>
				<Divider />
      </div>
    </div>
  );
};

export default PostDetail;
import { useState, useEffect } from "react";
import axios from "axios";
import { Image, Tag, Divider, message } from "antd";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button, Avatar, Spin } from "antd";
import { UserOutlined, LoadingOutlined } from "@ant-design/icons";

import "./PostDetail.scss";

const PostDetail = () => {
  const { id } = useParams(); //postId
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
	const [chatRoom, setChatRoom] = useState();

  const [loginCustomer, setloginCustomer] = useState();
  const [myPost, setMyPost] = useState(false);

  const getPostData = async () => {
    const response = await axios.get(`http://localhost:8080/post?postId=${id}`);
    setPost(response.data);
    setLoading(false);
    //TODO: api에서 customer 정보가 추가되면 수정해야하는 부분 있음
    // console.log(response.data);
  };

	const getChatRoomData = async () => {
		const response = await axios.get(`http://localhost:8080/chatRooms/find/${post.customer.customerId}/${loginCustomer.customerId}`);
		setChatRoom(response.data);
		// console.log("chatRoom:", response.data);
	}

  useEffect(() => {
    setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
    getPostData();
  }, []);

  useEffect(() => {
    if (
      post.customer &&
      loginCustomer &&
      post.customer.customerId === loginCustomer.customerId
    ) {
      console.log(post.customer.customerId === loginCustomer.customerId);
      setMyPost(true);
    }
  }, [post, loginCustomer]);

	useEffect(() => {
		if (
			post.customer &&
      loginCustomer
    ) {
			getChatRoomData();
		}
	}, [post, loginCustomer]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const changeDateFormat = (date) => {
    if (date) {
      const [createDay] = date.split("T");
      return createDay.replaceAll("-", "/");
    }
    return date;
  };

  const convertCategory = (categoryId) => {
    const categList = ["모두", "책상", "의자", "침대", "서랍"];
    return categList[categoryId];
  };

  const onClickChatButton = () => {
    if (sessionStorage.getItem("customer") !== null) {
      navigate(`/chatroom/${chatRoom.chatRoomId}`);
    } else {
      message.warning("채팅은 로그인 후에 이용할 수 있습니다.");
      // navigate(-1);
    }
  };

  const editPost = () => {
    navigate(`/post/write/${id}`);
  };

  const deletePost = async () => {
    await axios
      .delete(`http://localhost:8080/post/delete?postId=${id}`)
      .then(() => {
        document.location.href = "/post";
      });
  };

  return (
    <div className="post-detail">
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <div className="content-wrapper">
          <Image src={post.imageUrl} />
          <div className="post-user-info">
            <div className="avatar">
              <Avatar shape="square" icon={<UserOutlined />} />
              {post.customer.nickname}
            </div>
            <Button onClick={onClickChatButton}>
              {loginCustomer && post.customer.customerId == loginCustomer.customerId ? null : <span>{post.customer.nickname} 님과 채팅하기</span>}
            </Button>
          </div>

          <Divider />

          <Tag color="geekblue">{convertCategory(post.categId)}</Tag>
          <span className="post-title">{post.title}</span>

          <br />

          <Tag color="default">가격</Tag>
          <span className="post-price">{post.price}원</span>

          <br />

          <Tag color="default">크기</Tag>
          <span className="post-furniture-size">
            W{post.width} * D{post.depth} * H{post.height}
          </span>

          <p className="post-desc">{post.desc}</p>
          <p className="post-create_at">{changeDateFormat(post.createAt)}</p>

          {myPost ? (
            <>
              <Button onClick={editPost}>수정</Button>
              <Button onClick={deletePost}>삭제</Button>
            </>
          ) : null}

          <Divider />
        </div>
      )}
    </div>
  );
};

export default PostDetail;

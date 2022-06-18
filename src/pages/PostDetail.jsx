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
  const [moodTags, setMoodTags] = useState([]);
  const [chatRoom, setChatRoom] = useState();

  const [loginCustomer, setloginCustomer] = useState();
  const [myPost, setMyPost] = useState(false);

  const [complete, setComplete] = useState(1);

  const getPostData = async () => {
    const response = await axios.get(`http://localhost:8080/post?postId=${id}`);
    setPost(response.data);
    setComplete(response.data.status);

    //TODO: tags
    const tagResponse = await axios.get(`http://localhost:8080/post/tag/list?postId=${id}`);
    setMoodTags(tagResponse.data);
    console.log(tagResponse.data);
    setLoading(false);
  };

  const getChatRoomData = async () => {
    if (!chatRoom) {
      const response = await axios.get(
        `http://localhost:8080/chatRooms/find/${post.customer.customerId}/${loginCustomer.customerId}`
      );

      // console.log("chatRoom:", response.data);

      if (!response.data) {
        if (post.customer.customerId !== loginCustomer.customerId) {
          const createdRoom = await axios.post(
            `http://localhost:8080/chatRooms/create/${post.customer.customerId}/${loginCustomer.customerId}`
          );
          setChatRoom(createdRoom.data);
          console.log("created chatRoom:", createdRoom.data);
        }
        return;
      } else {
        setChatRoom(response.data);
      }
    }
  };

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
      // console.log(post.customer.customerId === loginCustomer.customerId);
      setMyPost(true);
    }
  }, [post, loginCustomer]);

  useEffect(() => {
    if (post.customer && loginCustomer) {
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

  const completeButton = async () => {
    await axios
      .put(`http://localhost:8080/post/complete?postId=${id}`)
      .then((response) => {
        console.log(response);
        setComplete(0);
      });
  };

  const openButton = async () => {
    await axios
      .put(`http://localhost:8080/post/open?postId=${id}`)
      .then((response) => {
        console.log(response);
        setComplete(1);
      });
  };

  const onClickChatButton = () => {
    if (sessionStorage.getItem("customer") !== null && chatRoom) {
      navigate(`/chatroom/${chatRoom.chatRoomId}/${post.customer.nickname}`);
    } else {
      message.warning("채팅은 로그인 후에 이용할 수 있습니다.");
      // navigate(-1);
    }
  };

  const editPost = () => {
    navigate(`/post/edit/${id}`);
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
          <Image src={"https://oisan.s3.ap-northeast-2.amazonaws.com/" + post.imageUrl} />
          <div className="post-user-info">
            <div className="avatar">
              <Avatar shape="square" icon={<UserOutlined />} />
              {post.customer.nickname}
            </div>
            {console.log("complete", complete)}
            {loginCustomer &&
            post.customer.customerId === loginCustomer.customerId ? (
              complete ? (
                <Button type="primary" onClick={completeButton}>
                  거래완료로 변경
                </Button>
              ) : (
                <Button onClick={openButton}>거래중으로 변경</Button>
              )
            ) : (
              <Button onClick={onClickChatButton}>
                <span>{post.customer.nickname} 님과 채팅하기</span>
              </Button>
            )}
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
          <p className="post-tags">
            {moodTags.map(tag => 
              <Link to={`/post/search?type=tag&tagname=${tag.name}&tagid=${tag.moodtagId}`}>
                <Tag color="lime">#{tag.name}</Tag>
              </Link>)}
          </p>
          <p className="post-create_at">{changeDateFormat(post.createAt)}</p>

          {myPost ? (
            <>
              <Button type="primary" onClick={editPost} style={{marginRight: '8px'}}>수정</Button>
              <Button type="danger" onClick={deletePost}>삭제</Button>
            </>
          ) : null}

          <Divider />
        </div>
      )}
    </div>
  );
};

export default PostDetail;

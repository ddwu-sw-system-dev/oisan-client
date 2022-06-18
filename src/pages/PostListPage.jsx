import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Button } from "antd";
import Category from "../components/Category";
import PostList from "../components/PostList";
import "./PostListPage.scss";
import { Link } from "react-router-dom";

const PostListPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  const getPostData = async () => {
    const response = await axios.get(`http://localhost:8080/post/list`);
    setPosts(response.data);
    setLoading(false);
  };
  

  useEffect(() => {
    getPostData();
    if(sessionStorage.getItem("customer") !== null) {
      setIsLogin(true);
    }
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const [categId, setCategId] = useState(0);

  const getCategId = (id) => {
    setCategId(id);
  };

  return (
    <div className="post-list-page">
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          <Category getCategId={getCategId} />
          <div className="post-list-wrapper">
            {isLogin ? 
            <Link to="/post/write">
              <Button>글 작성</Button>
            </Link> : null}
            <PostList data={posts} id={categId} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostListPage;

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

  const getPostData = async () => {
    const response = await axios.get(`http://localhost:8080/post/list`);
    setPosts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <div className="post-list-page">
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          <Category />
          <div className="post-list-wrapper">
            <Link to="/post/write">
              <Button>글 작성</Button>
            </Link>
            <PostList data={posts} />
          </div>
        </>
      )}
    </div>
  );
};

export default PostListPage;

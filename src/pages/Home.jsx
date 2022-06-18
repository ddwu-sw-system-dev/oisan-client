import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Divider, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Category from "../components/Category";
import PostList from "../components/PostList";
import AuctionList from "../components/AuctionList";
import "./Home.scss";

const contentStyle = {
  height: "300px",
  color: "#fff",
  lineHeight: "300px",
  textAlign: "center",
  background: "#364d79",
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [auctions, setAuctions] = useState([]);

  const getPostData = async () => {
    const response = await axios.get(`http://localhost:8080/post/list`);
    setPosts(response.data.slice(0, 4));
  };

  const getAuctionsData = async () => {
    const response = await axios.get(
      `http://localhost:8080/auction/list?categoryId=0&minWidth=-1&maxWidth=-1&minDepth=-1&maxDepth=-1&minHeight=-1&maxHeight=-1`
    );
    setAuctions(response.data.sort((a, b) => {
      if(a.status > b.status) return -1;
      if(a.status === b.status) return 0;
      if(a.status < b.status) return 1;
    }).slice(0, 4));
  };

  useEffect(() => {
    getPostData();
    getAuctionsData();
  }, []);

  useEffect(() => {
    if (posts.length > 0 && auctions.length > 0) {
      setLoading(false);
    }
  }, [posts, auctions]);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  return (
    <div className="Home">
      <div className="banner-section">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}><img src="furniture6.jpg" /></h3>
          </div>
          <div>
            <h3 style={contentStyle}><img src="furniture5.jpg" /></h3>
          </div>
          <div>
            <h3 style={contentStyle}><img src="furniture2.jpg" /></h3>
          </div>
          <div>
            <h3 style={contentStyle}><img src="furniture3.jpg" /></h3>
          </div>
          <div>
            <h3 style={contentStyle}><img src="furniture7.jpg" /></h3>
          </div>
        </Carousel>
      </div>
      <div className="post-of-today-section">
        <Divider orientation="left">오늘의 중고 가구</Divider>
        <div className="post-list-wrapper">
          <PostList data={posts} />
        </div>
      </div>
      <div className="auction-close-soon-section">
        <Divider orientation="left">경매 마감임박</Divider>
        <div className="auction-list-wrapper">
          <AuctionList data={auctions} />
        </div>
      </div>
    </div>
  );
}

export default Home;

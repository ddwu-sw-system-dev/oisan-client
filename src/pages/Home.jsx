import React from 'react';
import { Carousel, Divider } from 'antd';
import Category from '../components/Category';
import "./Home.scss";

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '300px',
  textAlign: 'center',
  background: '#364d79',
};

function Home() {
  return (<div className="Home">
    <div className="banner-section" >
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
    </div>
    <div className="post-by-category-section">
      <Divider orientation="left">
        카테고리별 상품 찾기
      </Divider>
      <Category />
    </div>
    <div className="post-of-today-section">
      <Divider orientation="left">
        오늘의 중고 가구
      </Divider>
    </div>
    <div className="auction-close-soon-section">
      <Divider orientation="left">
        경매 마감임박
      </Divider>
    </div>
    
  </div>);
}

export default Home;

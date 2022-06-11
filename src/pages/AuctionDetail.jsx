import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Tag, Divider, Button, Avatar } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from '@ant-design/icons';

const AuctionDetail = () => {
  const { id } = useParams();

  const [auction, setAuction] = useState([]);

  const getAuctionData = async() => {
		const response = await axios.get(`http://localhost:8080/auction/${id}`);
		setAuction(response.data);
  };

  useEffect(() => {
		getAuctionData();
  }, []);

  const changeDateFormat = (date) => {
    if (date) {
      return date.replace('T', ' ').substring(0, 19);
    }
    return date;
  }

  const convertCategory = (categoryId) => {
    const categList = ['모두', '책상', '의자', '침대', '서랍'];
    return categList[categoryId];
  };

  return (
    <StyledRoot>
      <StyledImage>
        <Image className="auction-detail-image" src={auction.imageUrl} />
      </StyledImage>
      <div>
        <Tag color="geekblue">{convertCategory(auction.categoryId)}</Tag>
        <h3>{auction.title}</h3>
				작성자 : {auction.customer && auction.customer.nickname}
        <p>크기 : {auction.furniture && `W${auction.furniture.width} * D${auction.furniture.depth} * H${auction.furniture.height}`}</p>
        <Divider />
        <p>{auction.desc}</p>
        <Divider />
        <StyledTable>
          <tbody>
          <tr>
            <td>시작일</td>
            <td>{changeDateFormat(auction.createAt)}</td>
          </tr>
          <tr>
            <td>마감일</td>
            <td>{changeDateFormat(auction.closingTime)}</td>
          </tr>
          <tr>
            <td>시작 가격</td>
            <td>{auction.startBid}</td>
          </tr>
          <tr>
            <td>현재 가격</td>
            <td>{auction.winningBid}</td>
          </tr>
          </tbody>
        </StyledTable>
        <Divider />
        <Button>구매하기</Button>
      </div>
    </StyledRoot>
  );
};

export default AuctionDetail;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledImage = styled.div`
  .auction-detail-image {
    width: 450px;
    height: 400px;
  }
`;

const StyledTable = styled.table`
  td {
    width: 150px;
  }
`;

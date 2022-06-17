import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Tag, Divider, Button, Avatar, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined } from '@ant-design/icons';
import "./AuctionDetail.scss";

const AuctionDetail = () => {
  const { id } = useParams();
  const [isMyPost, setIsMyPost] = useState(false);
  const [auction, setAuction] = useState([]);
  const [loginCustomer, setloginCustomer] = useState();
  const navigate = useNavigate();

  const getAuctionData = async() => {
		const response = await axios.get(`http://localhost:8080/auction/${id}`);
		setAuction(response.data);
  };

  useEffect(() => {
		getAuctionData();
    setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  useEffect(() => {
    if (
      auction.customer &&
      loginCustomer &&
      auction.customer.customerId === loginCustomer.customerId
    ) {
      console.log(auction.customer.customerId === loginCustomer.customerId);
      setIsMyPost(true);
    }
  }, [auction, loginCustomer]);

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

  const editPost = () => {
    navigate(`/auction/edit/${id}`);
  };

  const deletePost = async () => {
    await axios
      .delete(`http://localhost:8080/auction/${id}`)
      .then(() => {
        document.location.href = "/auction";
        message.success("글을 삭제했습니다");
      });
  };


  return (
    <StyledRoot>
      <StyledImage>
        <Image className="auction-detail-image" src={auction.imageUrl} />
      </StyledImage>
      <div className="auction-info-section">
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
        {isMyPost ? (
          <div className="my-auction-edit-delete-button-section">
            <Button type="primary" onClick={editPost}>수정</Button>
            <Button type="danger" onClick={deletePost}>삭제</Button>
          </div>
        ) : null}
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

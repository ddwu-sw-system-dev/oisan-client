import { Image, Tag, Divider, Button } from "antd";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const AuctionDetail = () => {
  const { id } = useParams();

  const AUCTION_DATA = [
    {
      auctionId: 1,
      category: "책상",
      title: "5년된 책상",
      description: "책상은 책상책상",
      imgSrc:
        "https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F50e606b8f8ff41628b4440ca2a0017ef.jpg",
    },
    {
      auctionId: 2,
      category: "의자",
      title: "중고 의자 팔아요~^^ 한 번 썼읍니다.",
      description: "중고의자 팝니다. 검은색. 연식 3년.",
      imgSrc:
        "https://image.hanssem.com/hsimg/gds/368/773/773575_A1.jpg?v=20210624133711",
    },
    {
      auctionId: 3,
      category: "침대",
      title: "2년된 침대",
      description: "푹신푹신 합니다.. 만오처넌",
      imgSrc:
        "https://image.ajunews.com/content/image/2021/12/24/20211224145900660054.jpg",
    },
  ];

  const currentAuction = AUCTION_DATA.filter(
    (auction) => auction.auctionId === parseInt(id)
  )[0];

  return (
    <StyledRoot>
      <StyledImage>
        <Image className="auction-detail-image" src={currentAuction.imgSrc} />
      </StyledImage>
      <div>
        <Tag color="geekblue">{currentAuction.category}</Tag>
        <h3>{currentAuction.title}</h3>
        <Divider />
        <p>{currentAuction.description}</p>
        <Divider />
        <StyledTable>
          <tr>
            <td>시작일</td>
            <td>06/01 00:00</td>
          </tr>
          <tr>
            <td>자동 할인 시간</td>
            <td>4시간</td>
          </tr>
          <tr>
            <td>경매 단위</td>
            <td>1,000</td>
          </tr>
          <tr>
            <td>시작 가격</td>
            <td>15,000</td>
          </tr>
          <tr>
            <td>현재 가격</td>
            <td>10,000</td>
          </tr>
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

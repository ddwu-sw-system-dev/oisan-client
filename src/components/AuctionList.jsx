import Auction from "./Auction";
import "./AuctionList.scss";

const AuctionList = () => {
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

  return (
    <div className="auction-list-section">
      {AUCTION_DATA.map((item) => (
        <Auction
          key={item.auctionId}
          id={item.auctionId}
          category={item.category}
          title={item.title}
          description={item.description}
          imgSrc={item.imgSrc}
        />
      ))}
    </div>
  );
};

export default AuctionList;

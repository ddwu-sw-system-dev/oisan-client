import Auction from "./Auction";
import "./AuctionList.scss";

const AuctionList = ({ data }) => {
  return (
    <div className="auction-list-section">
      {data.map((item) => (
        <Auction
          key={item.auctionId}
          id={item.auctionId}
          category={item.categoryId}
          title={item.title}
          description={item.desc}
          imgSrc={item.imageUrl}
        />
      ))}
    </div>
  );
};

export default AuctionList;

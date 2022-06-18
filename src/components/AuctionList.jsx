import Auction from "./Auction";
import "./AuctionList.scss";

const AuctionList = ({ data, id }) => {
  return (
    <div className="auction-list-section">
      {id
        ? data
            .filter((data) => data.categoryId === id)
            .map((item) => (
              <Auction
                key={item.auctionId}
                id={item.auctionId}
                category={item.categoryId}
                title={item.title}
                description={item.desc}
                imgSrc={item.imageUrl}
                status={item.status}
              />
            ))
        : data.map((item) => (
            <Auction
              key={item.auctionId}
              id={item.auctionId}
              category={item.categoryId}
              title={item.title}
              description={item.desc}
              imgSrc={item.imageUrl}
              status={item.status}
            />
          ))}
    </div>
  );
};

export default AuctionList;

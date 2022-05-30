import Category from "../components/Category";
import AuctionList from "../components/AuctionList";

import "./AuctionListPage.scss";

const AuctionListPage = () => {
  return (
    <div className="auction-list-page">
      <Category />
      <div className="auction-list-wrapper">
        <AuctionList />
      </div>
    </div>
  );
};

export default AuctionListPage;

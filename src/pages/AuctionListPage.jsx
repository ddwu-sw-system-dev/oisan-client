import { useState, useEffect } from "react";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import Category from "../components/Category";
import AuctionList from "../components/AuctionList";

import "./AuctionListPage.scss";

const AuctionListPage = () => {
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);

  const getAuctionsData = async () => {
    const response = await axios.get(
      `http://localhost:8080/auction/list?categoryId=0&minWidth=-1&maxWidth=-1&minDepth=-1&maxDepth=-1&minHeight=-1&maxHeight=-1`
    );
    setAuctions(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getAuctionsData();
  }, []);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );

  const [categId, setCategId] = useState(0);

  const getCategId = (id) => {
    console.log("id", id);
    setCategId(id);
  };

  return (
    <div className="auction-list-page">
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          <Category getCategId={getCategId} />
          <div className="auction-list-wrapper">
            <AuctionList data={auctions} id={categId} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionListPage;

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';
import Category from "../components/Category";
import AuctionList from "../components/AuctionList";
import useExist from "../hooks/useExist";
import "./AuctionListPage.scss";

const AuctionListPage = () => {
  const [loading, setLoading] = useState(true);
  const [auctions, setAuctions] = useState([]);
	const { loginCustomer } = useExist();

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
						{loginCustomer ? 
							<Link to="/auction/write">
								<Button>경매 새 글 작성</Button>
							</Link> 
							: null
						}
            <AuctionList 
            data={auctions.sort((a, b) => {
                if(a.status > b.status) return -1;
                if(a.status === b.status) return 0;
                if(a.status < b.status) return 1;
              })} 
            id={categId} />
          </div>
        </>
      )}
    </div>
  );
};

export default AuctionListPage;

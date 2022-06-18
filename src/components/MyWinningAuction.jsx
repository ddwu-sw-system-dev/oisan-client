import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { List, Typography, Divider, Pagination } from "antd";
import "./MyWinningAuction.scss";

const { Text } = Typography;


const MyWinningAuction = () => {
	const [winningAuction, setWinningAuction] = useState([]);
	const [customer, setCustomer] = useState();

  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const pageSize = 5;

	const getWinninAuctionList = async () => {
    if (customer) {
      const response = await axios.get(
        `http://localhost:8080/auction/list/winning?customerId=${customer.customerId}`
      );
      setWinningAuction(response.data);
      setTotalPage(response.data.length / pageSize);
      setMinIndex(0);
      setMaxIndex(pageSize);
			console.log(response.data);
    }
  };

	useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  useEffect(() => {
    getWinninAuctionList();
  }, [customer]);

	const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

	const convertCategory = (categoryId) => {
    const categList = ["모두", "책상", "의자", "침대", "서랍"];
    return categList[categoryId];
  };

	return (
		<div className="my-winning-auction">
		<List
			footer={
				<div>
					<Pagination
						defaultCurrent={1}
						pageSize={pageSize}
						current={current}
						total={winningAuction.length}
						onChange={handleChange}
					/>
				</div>
			}
			header={
				<div className="winning-bid-history-title">
					<span>낙찰받은 경매 목록</span>
				</div>
			}
			bordered
			dataSource={winningAuction.map(
				(auction, index) => index >= minIndex && index < maxIndex && auction
			)}
			renderItem={(auction) => {
				if (auction) {
					return (
						<List.Item>
							<Typography.Text mark>
								{convertCategory(auction.categoryId)}
							</Typography.Text>
							<Link to={`/auction/${auction.auctionId}`}>{auction.title}</Link>
						</List.Item>
					);
				}
			}}
		/>
	</div>
	)
};

export default MyWinningAuction;


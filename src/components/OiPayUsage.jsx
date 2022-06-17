import axios from "axios";
import "./OiPayUsage.scss";
import { useState, useEffect } from "react";
import { List, Typography, Divider, Pagination } from "antd";
import useExist from "../hooks/useExist";
const { Text } = Typography;

const OiPayUsage = () => {
  const { loginCustomer } = useExist();

  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const pageSize = 10;

  // const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const getOipay = async () => {
    // if (loginCustomer) {
    // console.log(loginCustomer.customerId);

    const response = await axios.get(`http://localhost:8080/oipay/6`);
    console.log(response.data);
    setHistory(response.data);
    // setLoading(false);
    setTotalPage(response.data.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);
    // }
  };

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  useEffect(() => {
    getOipay();
  }, []);

  const mSecToDate = (milliseconds) => {
    const date = new Date(milliseconds);
    const convert = date.toDateString();
    return convert;
  };

  return (
    <div className="oipay-history-section">
      {/* {loading ? "Loading..." : null} */}
      {/* {!loading && */}
      <div>
        <List
          footer={
            <div>
              <Pagination
                defaultCurrent={1}
                pageSize={pageSize}
                current={current}
                total={history.length}
                onChange={handleChange}
              />
            </div>
          }
          header={<div>오이페이 사용내역</div>}
          bordered
          dataSource={history
            .map((item, index) => index >= minIndex && index < maxIndex && item)
            .sort((a, b) => {
              if (a.createAt > b.createAt) return 1;
              if (a.createAt < b.createAt) return -1;
              return 0;
            })}
          renderItem={(item) => {
            if (item) {
              return (
                <List.Item>
                  <Typography.Text mark>
                    {item.type ? "사용" : "충전"}
                  </Typography.Text>
                  <span className="amount-text">{item.amount}원</span>
                  <Text code>{mSecToDate(item.createAt)}</Text>
                </List.Item>
              );
            }
          }}
        />
      </div>
      {/* } */}
    </div>
  );
};

export default OiPayUsage;

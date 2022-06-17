import axios from "axios";
import "./OiPayUsage.scss";
import { useState, useEffect } from "react";
import { List, Typography, Divider, Pagination } from "antd";
import useAuth from "../hooks/useExist";
const { Text } = Typography;

const OiPayUsage = () => {
  const [customer, setCustomer] = useState();

  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const pageSize = 10;

  // const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);

  const getOipay = async () => {
    if (customer) {
      const response = await axios.get(
        `http://localhost:8080/oipay/${customer.customerId}`
      );
      console.log(response.data);
      setHistory(response.data);
      // setLoading(false);
      setTotalPage(response.data.length / pageSize);
      setMinIndex(0);
      setMaxIndex(pageSize);
    }
  };

  const handleChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  useEffect(() => {
    getOipay();
  }, [customer]);

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
          header={
            <div className="oipay-history-title">
              <p>오이페이 사용내역</p>
              <Typography.Text type="danger">
                [잔액] {customer ? customer.oiPay : null}
              </Typography.Text>
            </div>
          }
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
                  {item.type ? (
                    <Typography.Text type="secondary">[사용]</Typography.Text>
                  ) : (
                    <Typography.Text type="success">[충전]</Typography.Text>
                  )}
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

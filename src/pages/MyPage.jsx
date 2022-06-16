import "./MyPage.scss";
import { Card, List, Typography, Divider, Tabs, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { TabPane } = Tabs;

const gridStyle = {
  width: "50%",
  textAlign: "center",
  height: "10rem",
};

function MyPage() {
  const [customer, setCustomer] = useState();
  const [posts, setPosts] = useState([]);

  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const pageSize = 10;

  const getPostList = async () => {
    if (customer) {
      const response = await axios.get(
        `http://localhost:8080/post/list/${customer.customerId}`
      );
      setPosts(response.data);
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

  const convertCategory = (categoryId) => {
    const categList = ["모두", "책상", "의자", "침대", "서랍"];
    return categList[categoryId];
  };

  useEffect(() => {
    setCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  useEffect(() => {
    getPostList();
  }, [customer]);

  return (
    <div className="mypage-section">
      <div className="mypage-profile">
        <Card
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
          actions={[
            <Link to={`/myInfo/edit`}>
              <EditOutlined key="edit" />
            </Link>,
          ]}
        >
          <Meta
            title={!customer ? "default" : customer.customerName}
            description={!customer ? "default" : customer.nickname}
          />
        </Card>
      </div>
      <div className="mypage-list">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="나의 글" key="1">
            <div className="mypage-post">
              <List
                footer={
                  <div>
                    <Pagination
                      defaultCurrent={1}
                      pageSize={pageSize}
                      current={current}
                      total={posts.length}
                      onChange={handleChange}
                    />
                  </div>
                }
                bordered
                dataSource={posts.map(
                  (post, index) => index >= minIndex && index < maxIndex && post
                )}
                renderItem={(post) => {
                  if (post) {
                    return (
                      <List.Item>
                        {post.status === 1 ? (
                          <Typography.Text type="success">
                            [판매중]
                          </Typography.Text>
                        ) : (
                          <Typography.Text type="secondary">
                            [판매완료]
                          </Typography.Text>
                        )}
                        <Typography.Text mark>
                          {convertCategory(post.categId)}
                        </Typography.Text>
                        <Link to={`/post/${post.postId}`}>{post.title}</Link>
                      </List.Item>
                    );
                  }
                }}
              />
            </div>
          </TabPane>
          <TabPane tab="좋아요" key="2">
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default MyPage;

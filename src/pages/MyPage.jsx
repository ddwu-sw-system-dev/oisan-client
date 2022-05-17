import "./MyPage.scss";
import { Card, List, Typography, Divider, Tabs, Pagination } from "antd";
import { EditOutlined } from "@ant-design/icons";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const { Meta } = Card;
const { TabPane } = Tabs;

const gridStyle = {
  width: "50%",
  textAlign: "center",
  height: "10rem",
};

function MyPage() {
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
          actions={[<EditOutlined key="edit" />]}
        >
          <Meta title="닉네임" description="헬로 나는 프로 가구 판매꾼" />
        </Card>
      </div>
      <div className="mypage-list">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="나의 글" key="1">
            <div className="mypage-post">
              <Divider orientation="left">판매 중</Divider>
              <List
                footer={
                  <div>
                    <Pagination defaultCurrent={1} total={50} />
                  </div>
                }
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
              <Divider orientation="left">거래 완료</Divider>
              <List
                footer={
                  <div>
                    <Pagination defaultCurrent={1} total={50} />
                  </div>
                }
                bordered
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </div>
          </TabPane>
          <TabPane tab="좋아요" key="2">
            <Card.Grid style={gridStyle}>Content</Card.Grid>
            <Card.Grid style={gridStyle}>Content</Card.Grid>
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

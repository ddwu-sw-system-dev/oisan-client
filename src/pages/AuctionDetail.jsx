import { useState, useEffect } from 'react';
import axios from 'axios';
import { Image, Tag, Divider, Button, Avatar, Modal, Form, InputNumber, message, Spin, Typography, List, Pagination } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserOutlined, LoadingOutlined } from '@ant-design/icons';
import "./AuctionDetail.scss";
// import useExist from '../hooks/useExist';
const { Text } = Typography;

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const AuctionDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [isMyPost, setIsMyPost] = useState(false);
  const [auction, setAuction] = useState([]);
  const [loginCustomer, setloginCustomer] = useState();
  const [biddingList, setBiddingList] = useState([]);
  const navigate = useNavigate();

  const pageSize = 5;
  const [totalPage, setTotalPage] = useState(0);
  const [current, setCurrent] = useState(1);
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');
  // const { loginCustomer, isLogin } = useExist();

  const [form] = Form.useForm();
	const {
		getFieldValue,
		validateFields,
	} = form;
	const formItemLayout = {
		labelCol: {
			span: 4,
		},
		wrapperCol: {
			span: 8,
		},
	};

  const getAuctionData = async() => {
		const response = await axios.get(`http://localhost:8080/auction/${id}`);
		setAuction(response.data);
    console.log(response.data);

    const biddingHistory = await axios.get(`http://localhost:8080/bidding/${id}`);
		setBiddingList(biddingHistory.data);
    console.log(biddingHistory.data);

    setTotalPage(biddingHistory.data.length / pageSize);
    setMinIndex(0);
    setMaxIndex(pageSize);

    setLoading(false);
  };

  const handleBiddingPageChange = (page) => {
    setCurrent(page);
    setMinIndex((page - 1) * pageSize);
    setMaxIndex(page * pageSize);
  };

  useEffect(() => {
		getAuctionData();
    setloginCustomer(JSON.parse(sessionStorage.getItem("customer")));
  }, []);

  useEffect(() => {
    if (
      auction.customer &&
      loginCustomer &&
      auction.customer.customerId === loginCustomer.customerId
    ) {
      console.log(auction.customer.customerId === loginCustomer.customerId);
      setIsMyPost(true);
    }
  }, [auction, loginCustomer]);


  const changeDateFormat = (date) => {
    if (date) {
      return date.replace('T', ' ').substring(0, 19);
    }
    return date;
  }

  const convertCategory = (categoryId) => {
    const categList = ['??????', '??????', '??????', '??????', '??????'];
    return categList[categoryId];
  };

  const editPost = () => {
    navigate(`/auction/edit/${id}`);
  };

  const deletePost = async () => {
    if(!biddingList.length) {
      await axios
      .delete(`http://localhost:8080/auction/${id}`)
      .then(() => {
        document.location.href = "/auction";
        message.success("?????? ??????????????????");
      });
      return;
    }
    message.warning("????????? ???????????? ????????? ????????? ??? ????????????.");
  };

  const showModal = () => {
    if (!loginCustomer) {
      message.warning("????????? ??? ????????? ????????? ??? ????????????.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);

    try {
			const values = await validateFields();
			const amount = getFieldValue(['price']);

      if(loginCustomer.oiPay < amount) {
        setConfirmLoading(false);
        setIsModalVisible(false);
        message.error("???????????? ????????? ???????????????. ?????? ??? ??????????????????.");
        return;
      }

      const response = await axios.post(`http://localhost:8080/bidding/${auction.auctionId}?price=${amount}&customerId=${loginCustomer.customerId}`);
			console.log('Success:', values, response); //???????????? ?????????
      message.success("????????? ?????????????????????");

      setIsModalVisible(false);
      setConfirmLoading(false);

			window.location.reload();

		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
      message.error("????????? ?????????????????????");
      setIsModalVisible(false);
      setConfirmLoading(false);
		}
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const priceValidate = (input, value) => {
		if (!value || value <= auction.winningBid) {
			return Promise.reject(new Error(input.message));
		}
		return Promise.resolve();
	};

  const biddingModal = (
    <Modal title="????????????" 
      visible={isModalVisible} 
      okText="??????"
      cancelText="??????"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form}>
				<Form.Item
					{...formItemLayout}
					name="price"
					label="??????"
					initialValue={auction.winningBid ? auction.winningBid + 500 : 0}
					rules={[
						{
							validator: priceValidate,
							message: '????????? ????????? ????????? ???????????????',
						}
					]}
				>
					<InputNumber placeholder="????????? ???????????????" />

				</Form.Item>
      </Form>

      <p>??? ???????????? ?????????????????????????</p>
      <p>?????????????????? ??????????????? ????????????, ?????? ????????? ?????? ?????? ???????????????.</p>
    </Modal>
  );

  const mSecToDate = (milliseconds) => {
    const date = new Date(milliseconds);
    const convert = date.toDateString();
    return convert;
  };

  const biddingHistorySection = (
    <div>
        <List
          footer={
            <div>
              <Pagination
                defaultCurrent={1}
                pageSize={pageSize}
                current={current}
                total={biddingList.length}
                onChange={handleBiddingPageChange}
              />
            </div>
          }
          header={
            <span>?????? ??????</span>
          }
          bordered
          dataSource={biddingList.sort((a, b) => {
              if (a.createAt > b.createAt) return -1;
              if (a.createAt < b.createAt) return 1;
              return 0;
            })}
          renderItem={(item) => {
            if (item) {
              return (
                <List.Item>
                  <Typography.Text type="secondary">[?????????]</Typography.Text>
                  <span className="amount-text">{item.price.toLocaleString('ko-KR')}???</span>
                  <Text code>{mSecToDate(item.createAt)}</Text>
                </List.Item>
              );
            }
          }}
        />
      </div>
  );

  return (
    <div className="auction-detail-section">
      {loading ? <Spin indicator={antIcon} /> : (
      <>
        <StyledRoot>
          <StyledImage>
            <Image className="auction-detail-image" src={"https://oisan.s3.ap-northeast-2.amazonaws.com/" + auction.imageUrl} />
          </StyledImage>
          <div className="auction-info-section">
            <Tag color="geekblue">{convertCategory(auction.categoryId)}</Tag>
            <h3>{auction.title}</h3>
            ????????? : {auction.customer && auction.customer.nickname}
            <p>?????? : {auction.furniture && `W${auction.furniture.width} * D${auction.furniture.depth} * H${auction.furniture.height}`}</p>
            <Divider />
            <p>{auction.desc}</p>
            <Divider />
            <StyledTable>
              <tbody>
              <tr>
                <td>?????????</td>
                <td>{changeDateFormat(auction.createAt)}</td>
              </tr>
              <tr>
                <td>?????????</td>
                <td>{changeDateFormat(auction.closingTime)}</td>
              </tr>
              <tr>
                <td>?????? ??????</td>
                <td>{auction.startBid.toLocaleString('ko-KR')}???</td>
              </tr>
              <tr>
                <td>?????? ??????</td>
                <td>{auction.winningBid.toLocaleString('ko-KR')}???</td>
              </tr>
              </tbody>
            </StyledTable>
            <Divider />
            {isMyPost ? (
              <div className="my-auction-edit-delete-button-section">
                <Button type="primary" onClick={editPost}>??????</Button>
                <Button type="danger" onClick={deletePost}>??????</Button>
              </div>
            ) 
            : <Button
                onClick={showModal}
                disabled={!auction.status}
              >
                {auction.status ? '????????????' : '????????? ???????????????'}
              </Button>
            }
            {biddingModal}
            
          </div>
        </StyledRoot>
        <div className="bidding-list-section">
          {biddingHistorySection}
        </div>
      </>
      )}
    </div>
  );
};

export default AuctionDetail;

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const StyledImage = styled.div`
  .auction-detail-image {
    width: 450px;
    height: 400px;
  }
`;

const StyledTable = styled.table`
  td {
    width: 150px;
  }
`;

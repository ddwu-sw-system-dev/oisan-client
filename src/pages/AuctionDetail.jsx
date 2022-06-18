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
    const categList = ['모두', '책상', '의자', '침대', '서랍'];
    return categList[categoryId];
  };

  const editPost = () => {
    navigate(`/auction/edit/${id}`);
  };

  const deletePost = async () => {
    await axios
      .delete(`http://localhost:8080/auction/${id}`)
      .then(() => {
        document.location.href = "/auction";
        message.success("글을 삭제했습니다");
      });
  };

  const showModal = () => {
    if (!loginCustomer) {
      message.warning("로그인 후 입찰에 참여할 수 있습니다.");
      return;
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);

    try {
			const values = await validateFields();
			const amount = getFieldValue(['price']);

      const response = await axios.post(`http://localhost:8080/bidding/${auction.auctionId}?price=${amount}&customerId=${loginCustomer.customerId}`);
			console.log('Success:', values, response); //성공코드 살피기
      message.success("입찰에 성공하였습니다");

      setIsModalVisible(false);
      setConfirmLoading(false);

			window.location.reload();

		} catch (errorInfo) {
			console.log('Failed:', errorInfo);
      message.error("입찰에 실패하였습니다");
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
    <Modal title="입찰하기" 
      visible={isModalVisible} 
      okText="입찰"
      cancelText="취소"
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
      <Form form={form}>
				<Form.Item
					{...formItemLayout}
					name="price"
					label="금액"
					initialValue={auction.winningBid ? auction.winningBid + 500 : 0}
					rules={[
						{
							validator: priceValidate,
							message: '현재가 이상의 금액을 입력하세요',
						}
					]}
				>
					<InputNumber placeholder="금액을 입력하세요" />

				</Form.Item>
      </Form>

      <p>위 가격으로 입찰하시겠습니까?</p>
      <p>입찰가만큼의 오이페이가 소모되며, 낙찰 실패한 경우 환불 처리됩니다.</p>
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
            <p>입찰 내역</p>
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
                  <Typography.Text type="secondary">[입찰가]</Typography.Text>
                  <span className="amount-text">{item.price}원</span>
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
            <Image className="auction-detail-image" src={auction.imageUrl} />
          </StyledImage>
          <div className="auction-info-section">
            <Tag color="geekblue">{convertCategory(auction.categoryId)}</Tag>
            <h3>{auction.title}</h3>
            작성자 : {auction.customer && auction.customer.nickname}
            <p>크기 : {auction.furniture && `W${auction.furniture.width} * D${auction.furniture.depth} * H${auction.furniture.height}`}</p>
            <Divider />
            <p>{auction.desc}</p>
            <Divider />
            <StyledTable>
              <tbody>
              <tr>
                <td>시작일</td>
                <td>{changeDateFormat(auction.createAt)}</td>
              </tr>
              <tr>
                <td>마감일</td>
                <td>{changeDateFormat(auction.closingTime)}</td>
              </tr>
              <tr>
                <td>시작 가격</td>
                <td>{auction.startBid}</td>
              </tr>
              <tr>
                <td>현재 가격</td>
                <td>{auction.winningBid}</td>
              </tr>
              </tbody>
            </StyledTable>
            <Divider />
            {isMyPost ? (
              <div className="my-auction-edit-delete-button-section">
                <Button type="primary" onClick={editPost}>수정</Button>
                <Button type="danger" onClick={deletePost}>삭제</Button>
              </div>
            ) 
            : <Button
                onClick={showModal}
              >
                입찰하기
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

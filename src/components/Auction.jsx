import { Card } from "antd";
import { Link } from "react-router-dom";

const Auction = (props) => {
  const { id, category, title, description, imgSrc, status } = props;

  return (
    <Link to={`/auction/${id}`}>
      <Card
        className="auction-item"
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" 
                    src={"https://oisan.s3.ap-northeast-2.amazonaws.com/"+imgSrc} 
                    style={status ? {} :{opacity:0.5}}
                />}
      >
        <Card.Meta title={title} description={description.length > 12 ? description.slice(0, 12) + "..." : description} />
      </Card>
    </Link>
  );
};

export default Auction;

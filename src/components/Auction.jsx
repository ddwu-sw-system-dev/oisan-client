import { Card } from "antd";
import { Link } from "react-router-dom";

const Auction = (props) => {
  const { id, category, title, description, imgSrc } = props;

  return (
    <Link to={`/auction/${id}`}>
      <Card
        className="auction-item"
        hoverable
        style={{ width: 240 }}
        cover={<img alt="example" src={imgSrc} />}
      >
        <Card.Meta title={title} description={description} />
      </Card>
    </Link>
  );
};

export default Auction;

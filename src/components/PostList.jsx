import { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";
import "./PostList.scss";

const PostList = () => {
  const [datas, setDatas] = useState([]);

  const getList = async () => {
    const response = await axios.get(`http://localhost:8080/post/list`);
    console.log(response.data);
    setDatas(response.data);
  };

  useEffect(() => {
    getList();
  }, []);

  const POST_DATA = [
    {
      postId: 1,
      category: "책상",
      title: "5년된 책상",
      description: "롸..",
      imgSrc:
        "https://img1.daumcdn.net/thumb/R720x0/?fname=https%3A%2F%2Ft1.daumcdn.net%2Fliveboard%2Fdailylife%2F50e606b8f8ff41628b4440ca2a0017ef.jpg",
    },
    {
      postId: 2,
      category: "의자",
      title: "1년된 의자",
      description: "느아..",
      imgSrc:
        "https://image.hanssem.com/hsimg/gds/368/773/773575_A1.jpg?v=20210624133711",
    },
    {
      postId: 3,
      category: "침대",
      title: "2년된 침대",
      description: "끄아악..",
      imgSrc:
        "https://image.ajunews.com/content/image/2021/12/24/20211224145900660054.jpg",
    },
  ];

  return (
    <div className="post-list-section">
      {POST_DATA.map((item) => (
        <Post
          key={item.postId}
          id={item.postId}
          category={item.category}
          title={item.title}
          description={item.description}
          imgSrc={item.imgSrc}
        />
      ))}
    </div>
  );
};

export default PostList;

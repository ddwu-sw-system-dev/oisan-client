import Post from "./Post";
import "./PostList.scss";

const PostList = ({ data, id }) => {
  return (
    <div className="post-list-section">
      {id
        ? data
            .filter((data) => data.categId === id)
            .map((item) => (
              <Post
                key={item.postId}
                id={item.postId}
                category={item.categId}
                title={item.title}
                description={item.desc}
                imgSrc={item.imageUrl}
              />
            ))
        : data.map((item) => (
            <Post
              key={item.postId}
              id={item.postId}
              category={item.categId}
              title={item.title}
              description={item.desc}
              imgSrc={item.imageUrl}
            />
          ))}
    </div>
  );
};

export default PostList;

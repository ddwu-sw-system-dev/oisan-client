import Category from "../components/Category";
import PostList from "../components/PostList";

import "./PostListPage.scss";

const PostListPage = () => {
  return (
		<div className="post-list-page">
			<Category />
			<div className="post-list-wrapper">
				<PostList />
			</div>
		</div>
    );
};

export default PostListPage;
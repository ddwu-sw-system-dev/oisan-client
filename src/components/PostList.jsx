const PostList = () => {
	const POST_DATA = [
		{ postId: 1, category: '책상', title: '5년된 책상', description: '롸..'}
	];

	return (
		<div className="post-list-section">
			<Post
				title={title}
				description={title}
				imgSrc={imgSrc}
			/>
		</div>
	);
};

export default PostList;
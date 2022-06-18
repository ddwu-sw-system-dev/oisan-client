import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Divider, Spin } from "antd";
import PostList from "../components/PostList";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import "./SearchListPage.scss";
// import qs from 'qs';

const antIcon = (
	<LoadingOutlined
		style={{
			fontSize: 24,
		}}
		spin
	/>
);

const SearchListPage = () => {
	const [searchParams] = useSearchParams();
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const type = searchParams.get('type');
	const tagName = searchParams.get('tagname');
	const tagId = searchParams.get('tagid');
	const keyword = searchParams.get('keyword');

	const getTagPostsData = async () => {
		axios.defaults.headers['Content-Type'] = 'application/json';
    const response = await axios.get(
		`http://localhost:8080/tag/list?moodtagId=${tagId}`,
    );
    setPosts(response.data);
    setLoading(false);
	};

	const getSearchPostsData = async () => {
    const response = await axios.get(
      `http://localhost:8080/search/post/${keyword}`, {
				'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			}
    );
    setPosts(response.data);
    setLoading(false);
  };

	useEffect(() => {
		if (type === "tag") {
			getTagPostsData();
		}
		if (type === "default") {
			getSearchPostsData();
		}
	}, [keyword]);

	return (
		<div className="search-list-page">
      {loading ? (
        <Spin indicator={antIcon} />
      ) : (
        <>
          <div className="search-list-wrapper">
						{type === "tag" && <Divider>#{tagName} 에 대한 검색 결과</Divider>}
						{type === "default" && <Divider>'{keyword}' 에 대한 검색 결과</Divider>}
            <PostList data={posts} />
          </div>
        </>
      )}
    </div>
	);
};

export default SearchListPage;
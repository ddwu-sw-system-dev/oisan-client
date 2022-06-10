import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostListPage from "./pages/PostListPage";
import PostWrite from "./pages/PostWrite";
import MyPage from "./pages/MyPage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionDetail from "./pages/AuctionDetail";
import Header from "./components/Header";
import ChatRoomDetail from "./pages/ChatRoomDetail";
import ChatRoomList from "./pages/ChatRoomList";
import OipayCharge from "./pages/OiPayCharge";
import Login from "./pages/Login";
import OiPayUsage from "./components/OiPayUsage";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/write" element={<PostWrite />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatroom/:id" element={<ChatRoomDetail />} />
        <Route path="/chatroomlist" element={<ChatRoomList />} />
        <Route path="/oipay/charge" element={<OipayCharge />} />
        <Route path="/oipay/usage" element={<OiPayUsage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/auction" element={<AuctionListPage />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

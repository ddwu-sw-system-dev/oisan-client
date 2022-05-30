import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostListPage from "./pages/PostListPage";
import MyPage from "./pages/MyPage";
import Header from "./components/Header";
import ChatRoomDetail from "./pages/ChatRoomDetail";
import ChatRoomList from "./pages/ChatRoomList";
import OipayCharge from "./pages/OiPayCharge";
import Login from "./pages/Login";
import OiPayUsage from "./components/OiPayUsage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chatroom/:id" element={<ChatRoomDetail />} />
        <Route path="/chatroomlist" element={<ChatRoomList />} />
        <Route path="/oipay/charge" element={<OipayCharge />} />
        <Route path="/oipay/usage" element={<OiPayUsage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

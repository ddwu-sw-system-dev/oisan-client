import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import PostListPage from "./pages/PostListPage";
import MyPage from "./pages/MyPage";
import AuctionListPage from "./pages/AuctionListPage";
import AuctionDetail from "./pages/AuctionDetail";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/auction" element={<AuctionListPage />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

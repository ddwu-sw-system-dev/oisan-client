import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import "antd/dist/antd.css";

import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import PostListPage from './pages/PostListPage';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />    
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        <Route path="/post" element={<PostListPage />}>
        </Route>
        <Route path="/post/:id" element={<PostDetail/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

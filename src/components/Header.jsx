import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="home-header">
      <ul>
        <Link to={"/"}>
          <li>
            <div className="logo">오늘은 이렇게 산다</div>
          </li>
        </Link>
        <Link to={"/post"}>
          <li>중고</li>
        </Link>
        <Link to={"/auction"}>
          <li>경매</li>
        </Link>
        <li>
          <input type="text" placeholder="검색어를 입력하세요" />
        </li>
        <Link to={"/login"}>
          <li>로그인</li>
        </Link>
        <li>회원가입</li>
      </ul>
    </div>
  );
};

export default Header;

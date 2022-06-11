import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  const [customer, setCustomer] = useState();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("customer") !== null) {
      console.log(JSON.parse(sessionStorage.getItem("customer")));
      setCustomer(JSON.parse(sessionStorage.getItem("customer")));
      setIsLogin(true);
    }
  }, []);

  const onLogout = () => {
    sessionStorage.removeItem("customer");
    document.location.href = "/";
  };

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
        {isLogin ? (
          <>
            <li>{customer.customerName}님 반갑습니다!</li>
            <li onClick={onLogout}>로그아웃</li>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <li>로그인</li>
            </Link>
            <Link to={"/signup"}>
              <li>회원가입</li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default Header;

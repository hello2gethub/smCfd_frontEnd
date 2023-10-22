import "../../App.css";
import "./Headers.css";
import React from "react";
import { useNavigate } from "react-router-dom";

// 引入静态图片
import szmLogo from "../../static/img/szml.jpg";

export default function Headers() {
  const navigate = useNavigate();
  const toLading = () => {
    // document.location.href = "http://localhost:3000/lading";
    navigate("/lading");
  };
  return (
    <header>
      <div className="left">
        <img className="szmLogo" src={szmLogo} alt="" />
        <div className="TeamName">数马冲锋队</div>
      </div>
      <div className="right">
        <ul className="headerItem">
          <li>
            <span>关于我们</span>
          </li>
          <li>
            <span>业务发展</span>
          </li>
          <li>
            <span>科技创新</span>
          </li>
          <li>
            <span>ESG</span>
          </li>
          <li>
            <span>更新动态</span>
          </li>
        </ul>
        <button className="loginBtn" onClick={toLading}>
          登录 / 注册
        </button>
      </div>
    </header>
  );
}

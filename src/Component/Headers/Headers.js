import "../../App.css";
import "./Headers.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

// 引入静态图片
import szmLogo from "../../static/img/szml.jpg";

export default function Headers() {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(false);

  const avatar = localStorage.getItem("avatar"); // 头像
  const username = localStorage.getItem("username"); // 昵称

  useEffect(() => {
    if (localStorage.getItem("avatar") && localStorage.getItem("username")) {
      setLogin(true);
    }
  }, [navigate]);

  let content = (
    <>
      <div className="header-userinfo">
        <img className="userAvatar" src={avatar} alt="" />
        <div className="greet">{username} 你好~</div>
        <div className="dropDom">
          <div className="toUserSelf">个人信息</div>
          <div
            className="logOut"
            onClick={() => {
              localStorage.clear();
              navigate("/");
            }}
          >
            退出登录
          </div>
        </div>
      </div>
    </>
  );
  return (
    <header className="headers">
      <div className="header-left">
        <img className="szmLogo" src={szmLogo} alt="" />
        <div className="TeamName">数马冲锋队</div>
      </div>
      <div className="header-right">
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
        {isLogin ? (
          content
        ) : (
          <Button
            type="primary"
            size={"default"}
            onClick={() => {
              navigate("/lading");
            }}
          >
            登录 / 注册
          </Button>
        )}
      </div>
    </header>
  );
}

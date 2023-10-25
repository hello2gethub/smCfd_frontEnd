import "./Index.css";
import "../../App.css";
import React, { useEffect } from "react";

import { Carousel } from "antd";

// 引入组件
import Footers from "../../Component/Footers/Footers";
import Headers from "../../Component/Headers/Headers";

// 引入静态资源
import staticIndexLogo1 from "../../static/img/AI.jpg";
import staticIndexLogo2 from "../../static/img/haoduoren.jpg";
import staticIndexLogo3 from "../../static/img/蒲公英和女孩.jpeg";
import staticIndexLogo4 from "../../static/img/guang.jpg";
import { useNavigate } from "react-router";

class Indexs extends React.Component {
  state = {
    listData: [
      {
        id: 1,
        username: "渠道运营",
        intro: "内外拉新，促进渠道建设",
        avtar: staticIndexLogo1,
      },
      {
        id: 2,
        username: "活跃运营",
        intro: "活跃场景，MAU等场景活跃",
        avtar: staticIndexLogo2,
      },
      {
        id: 3,
        username: "支付宝会员",
        intro: "会员等级、积分兑换、权益体系、商户合作",
        avtar: staticIndexLogo3,
      },
    ],
  };

  userList = this.state.listData.map((item) => {
    return (
      <li key={item.id} className="userItem">
        <div>
          <div className="username">{item.username}</div>
          <div className="intro">{item.intro}</div>
        </div>
        <img className="userImg" src={item.avtar} alt="" />
      </li>
    );
  });

  render() {
    return (
      <>
        <Headers />
        <div className="app-index">
          <Carousel autoplay>
            <img className="indexLogo" src={staticIndexLogo1} alt="" />
            <img className="indexLogo" src={staticIndexLogo2} alt="" />
            <img className="indexLogo" src={staticIndexLogo3} alt="" />
            <img className="indexLogo" src={staticIndexLogo4} alt="" />
          </Carousel>
          <div className="box">
            <div className="box-title">
              <div className="title">用户运营</div>
              <section>
                渠道运营、活跃运营、忠诚度运营，贯穿运营生命周期的全栈运营
              </section>
            </div>
            <ul className="box-info">{this.userList}</ul>
          </div>
        </div>
        <Footers />
      </>
    );
  }
}

export default function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userId") || localStorage.getItem("token")) {
      // 如果是自动登录则自动跳转页面
      navigate("/feature");
    }
  }, [navigate]);
  return (
    <>
      <Indexs navigate={navigate} />
    </>
  );
}

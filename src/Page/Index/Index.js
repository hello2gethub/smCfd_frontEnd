import "./Index.css";
import "../../App.css";
import React from "react";

// 引入静态资源
import staticIndexLogo from "../../static/img/AI.jpg";

class Index extends React.Component {
  state = {
    listData: [
      {
        id: 1,
        username: "渠道运营",
        intro: "内外拉新，促进渠道建设",
        avtar: staticIndexLogo,
      },
      {
        id: 2,
        username: "活跃运营",
        intro: "活跃场景，MAU等场景活跃",
        avtar: staticIndexLogo,
      },
      {
        id: 3,
        username: "支付宝会员",
        intro: "会员等级、积分兑换、权益体系、商户合作",
        avtar: staticIndexLogo,
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
        <div className="content">
          <img className="indexLogo" src={staticIndexLogo} alt="" />
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
      </>
    );
  }
}

export default Index;

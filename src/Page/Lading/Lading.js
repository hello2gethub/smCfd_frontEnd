import "../../App.css";
import "./Lading.css";

import { useNavigate } from "react-router-dom";

import React from "react";
import Login from "../../api/login";

class Ladings extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleSubmit = (event) => {
    event.preventDefault(); // 阻止表单默认提交事件
    Login(this.state.username, this.state.password)
      .then((res) => {
        console.log(res);
        alert("调用成功");
        // 跳转页面
        this.props.navigate("/details");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  getPassWord = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <>
        <form action="#" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="用户名"
            onChange={this.getUserName}
            required
          />
          <input
            type="text"
            placeholder="密码"
            onChange={this.getPassWord}
            required
          />
          <button>登录</button>
        </form>
      </>
    );
  }
}

export default function Lading() {
  const navigate = useNavigate();
  return (
    <>
      <Ladings navigate={navigate} />
    </>
  );
}

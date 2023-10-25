import "../../App.css";
import "./Lading.css";

import { useNavigate } from "react-router-dom";

import { Button, Input } from "antd";
import {
  UserOutlined,
  SmileOutlined,
  SafetyOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import React from "react";

// 引入子组件
import Footers from "../../Component/Footers/Footers";
import Headers from "../../Component/Headers/Headers";

// 引入api接口
import Login from "../../api/login";

class Ladings extends React.Component {
  state = {
    username: "",
    password: "",
    password2: "",
    autoLogin: false, //自动登录复选框
    register: false, // 是否点击了注册
    eyeStatus: false, // 输入框眼镜的状态
  };

  // 调用登录接口
  postLogin = () => {
    Login(this.state.username, this.state.password)
      .then((res) => {
        // console.log(res.data.data);
        const { token, userId, avatar, username, grade } = res.data.data;
        localStorage.setItem("username", username);
        localStorage.setItem("avatar", avatar);
        localStorage.setItem("grade", grade);

        if (this.state.autoLogin) {
          // 勾选了自动登录，保存唯一标识符
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
        }
        // 跳转到功能页面
        this.props.navigate("/feature");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 注册接口
  postRegister = () => {
    console.log("注册接口");
    this.setState({ register: false }); //注册成功后返回登录
  };

  // 表单提交事件
  handleSubmit = (event) => {
    event.preventDefault(); // 阻止表单默认提交事件
    if (this.state.register) {
      // 注册登录调用不同的接口
      this.postRegister();
    } else {
      this.postLogin();
    }
  };

  getUserName = (event) => {
    this.setState({ username: event.target.value });
  };

  getPassWord = (event) => {
    this.setState({ password: event.target.value });
  };

  getPassWord2 = (e) => {
    this.setState({ password2: e.target.value });
  };

  // 点击复选框
  handleAutoLogin = () => {
    this.setState({ autoLogin: !this.state.autoLogin });
  };

  // 点击眼睛
  changeEye = () => {
    this.setState({ eyeStatus: !this.state.eyeStatus });
  };

  render() {
    return (
      <>
        <Headers />
        <div className="lading-container">
          <div className="lading-title">
            <strong>数字马力</strong>
            <span className="author">数字马力培训大作业-数马冲锋队</span>
          </div>
          <form action="#" onSubmit={this.handleSubmit} className="form">
            <Input
              className="lading-Input"
              prefix={<UserOutlined />}
              type="text"
              placeholder="用户名"
              onChange={this.getUserName}
              required
            />
            <Input
              className="lading-Input"
              prefix={<SmileOutlined />}
              suffix={
                <span onClick={this.changeEye}>
                  {this.state.eyeStatus ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              }
              type={this.state.eyeStatus ? "text" : "password"}
              placeholder="密码"
              onChange={this.getPassWord}
              required
            />
            {this.state.register ? (
              <>
                <Input
                  className="lading-Input"
                  prefix={<SafetyOutlined />}
                  suffix={
                    <span onClick={this.changeEye}>
                      {this.state.eyeStatus ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </span>
                  }
                  type={this.state.eyeStatus ? "text" : "password"}
                  placeholder="确认密码"
                  onChange={this.getPassWord2}
                  required
                />
                <span
                  className="toRegister"
                  onClick={() => {
                    this.setState({ register: false });
                  }}
                >
                  不注册了？ 返回登录~
                </span>
              </>
            ) : (
              <>
                <div className="form-bottom">
                  <label htmlFor="autoLogins" onClick={this.handleAutoLogin}>
                    <input
                      style={{ cursor: "pointer" }}
                      name="autoLogins"
                      type="checkbox"
                      checked={this.state.autoLogin}
                    />
                    自动登录
                  </label>
                  <label>忘记密码？</label>
                </div>
                <span
                  className="toRegister"
                  onClick={() => {
                    this.setState({ register: true });
                  }}
                >
                  还没有账户？ 快去注册~
                </span>
              </>
            )}
            <Button type="primary" htmlType="submit" className="Btn">
              {this.state.register ? "注册" : "登录"}
            </Button>
          </form>
        </div>
        <Footers />
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

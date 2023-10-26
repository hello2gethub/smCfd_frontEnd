import "../../App.css";
import "./Lading.css";

import { useNavigate } from "react-router-dom";

import { Button, Input, Select, message } from "antd";
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
import Register from "../../api/register";

const sexList = [
  { value: "男", label: "男" },
  { value: "女", label: "女" },
  { value: "未知", label: "未知" },
];

class Ladings extends React.Component {
  initState = {
    nickname: "",
    username: "",
    password: "",
    password2: "",
    autoLogin: false, //自动登录复选框
    register: false, // 是否点击了注册
    eyeStatus1: false, // 输入框眼镜的状态
    eyeStatus2: false,
    sex: null, // 性别
    telephone: "", // 手机号
  };

  state = this.initState;

  // 调用登录接口
  postLogin = () => {
    Login(this.state.username, this.state.password)
      .then((res) => {
        console.log(res.data);
        if (res.data.code !== 200) {
          this.setState({ username: "", password: "" });
          message.error("账户或密码错误");
        } else {
          const { role, token } = res.data.data;
          message.success("登录成功！");
          localStorage.setItem("username", this.state.username);
          localStorage.setItem(
            "avatar",
            "https://cdn.pixabay.com/photo/2023/10/16/07/55/animal-8318650_1280.jpg"
          );
          localStorage.setItem("grade", role.roleKey);
          localStorage.setItem("userId", role.id);
          localStorage.setItem("token", token);

          if (this.state.autoLogin) {
            // 勾选了自动登录，保存唯一标识符
            localStorage.setItem("autoLogin", true);
          }
          // 跳转到功能页面
          setTimeout(() => {
            this.props.navigate("/feature");
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 注册接口
  postRegister = () => {
    console.log("注册接口", this.state);
    const state = this.state;
    const phoneRegex = /^[1-9]\d{10}$/; // 最简陋的手机号正则表达式
    if (state.password !== state.password2) {
      this.setState({ password: "", password2: "" });
      message.error("两次密码不同,请重新输入");
    } else if (!phoneRegex.test(state.telephone) && state.telephone !== "") {
      this.setState({ telephone: "" });
      message.error("手机号格式错误,请重新输入");
    } else {
      // 对sex进行处理
      if (state.sex === "男") {
        this.setState({ sex: 0 });
      } else if (state.sex === "女") {
        this.setState({ sex: 1 });
      } else {
        this.setState({ sex: 2 });
      }
      // 发起注册请求
      Register(state).then((res) => {
        if (res.data.code !== 200) {
          message.error("很抱歉,用户名已存在");
          this.setState({ username: "" });
        } else {
          message.success("注册成功！");
          this.setState({ register: false }); //变成登录页
        }
      });
    }
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
  changeEye1 = () => {
    this.setState({ eyeStatus1: !this.state.eyeStatus1 });
  };

  changeEye2 = () => {
    this.setState({ eyeStatus2: !this.state.eyeStatus2 });
  };

  render() {
    const state = this.state;
    return (
      <>
        <Headers />
        <div className="lading-container">
          <div className="lading-title">
            <strong>数字马力</strong>
            <span className="author">数字马力培训大作业-数马冲锋队</span>
          </div>
          <form action="#" onSubmit={this.handleSubmit} className="form">
            {this.state.register && (
              <Input
                className="lading-Input"
                value={state.nickname}
                prefix={<UserOutlined />}
                type="text"
                placeholder="昵称"
                onChange={(e) => {
                  this.setState({ nickname: e.target.value });
                }}
                required
              />
            )}
            <Input
              className="lading-Input"
              value={state.username}
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
                <span onClick={this.changeEye1}>
                  {this.state.eyeStatus1 ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )}
                </span>
              }
              type={this.state.eyeStatus1 ? "text" : "password"}
              placeholder="密码"
              value={state.password}
              onChange={this.getPassWord}
              required
            />
            {this.state.register ? (
              <>
                <Input
                  className="lading-Input"
                  prefix={<SafetyOutlined />}
                  suffix={
                    <span onClick={this.changeEye2}>
                      {this.state.eyeStatus2 ? (
                        <EyeOutlined />
                      ) : (
                        <EyeInvisibleOutlined />
                      )}
                    </span>
                  }
                  type={this.state.eyeStatus2 ? "text" : "password"}
                  placeholder="确认密码"
                  onChange={this.getPassWord2}
                  value={state.password2}
                  required
                />
                <Input
                  className="lading-Input"
                  type="number"
                  placeholder="手机号(可空)"
                  value={state.telephone}
                  onChange={(e) => {
                    this.setState({ ...this.state, telephone: e.target.value });
                  }}
                />
                <Select
                  required
                  placeholder="请选择性别"
                  className="lading-Input"
                  options={sexList}
                  onChange={(value, option) => {
                    this.setState({ ...this.state, sex: value });
                  }}
                />
                <span
                  className="toRegister"
                  onClick={() => {
                    this.setState({ ...this.initState, register: false });
                  }}
                >
                  不注册了？ 返回登录~
                </span>
              </>
            ) : (
              <>
                <div className="form-bottom">
                  <label htmlFor="autoLogins">
                    <input
                      style={{ cursor: "pointer" }}
                      name="autoLogins"
                      type="checkbox"
                      checked={this.state.autoLogin}
                      onChange={this.handleAutoLogin}
                    />
                    自动登录
                  </label>
                  <label>忘记密码？</label>
                </div>
                <span
                  className="toRegister"
                  onClick={() => {
                    this.setState({ ...this.initState, register: true });
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

import "../../App.css";
import "./Feature.css";

import React from "react";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

// 引入子组件
import Headers from "../../Component/Headers/Headers"; // 头部
import Footers from "../../Component/Footers/Footers"; // 底部
// import SearchForm from "../../Component/SearchForm/SearchForm"; // 商品搜索栏
import ShopList from "../../Component/ShopList/ShopList"; // 商品列表
import DataShow from "../DataShow/DataShow";

// 导航栏相关
import { AppstoreTwoTone, PlaySquareTwoTone } from "@ant-design/icons";
import { Layout, Menu, DatePicker, Select, Button, Input } from "antd";
dayjs.extend(customParseFormat);
const { Sider } = Layout;
let menuList = [
  { key: "control", icon: <AppstoreTwoTone />, text: "商品管理" },
  { key: "dataShow", icon: <PlaySquareTwoTone />, text: "数据大盘" },
];

/**
 * 功能页面---登录进来看到的首页
 */

export default class Feature extends React.Component {
  initState = {
    selected: "control", // 默认选中侧边栏第一行,
    isFirst: true, // 默认显示商品管理
    menuListShow: [],
  };
  initFormData = {
    formData: {
      shopId: "", // 商品ID
      shopName: "", // 商品名称
      starTime: "", // 开始时间 -- 最大为当天
      endTime: "", // 结束时间 -- 最小为开始时间
      shopStatus: null, // 商品状态
      custodian: "", // 管理人
      agent: "", //代理人
    },
    fromName: [
      // 表单的name信息(便于后面传参存储)
      "shopId",
      "shopName",
      "starTime",
      "endTime",
      "shopStatus",
      "custodian",
      "agent",
    ],
    shopStatusList: [
      // 商品状态信息
      { value: "已上线", label: "已上线" },
      { value: "已下线", label: "已下线" },
    ],
  };
  state = { ...this.initState, ...this.initFormData, obj: {} };
  /*--------------------  导航栏  ------------------- */
  menuClick = (e) => {
    // console.log(e);
    const tmp = e.key === "control" ? true : false;
    this.setState({ selected: e.key, isFirst: tmp });
  };

  // 这里虽然被弃用了，但是用onMount的话，会获取不到menuList，如果用Effect就可以解决这个问题。
  // 之后还是用函数式组件吧，但是类式更像vue
  componentWillMount = () => {
    // 通过用户身份进行布局处理
    const grade = localStorage.getItem("grade");
    console.log("grade--", grade);
    if (grade !== "admin" && menuList.length === 2) {
      menuList.pop();
    } else if (grade === "admin" && menuList.length === 1) {
      menuList.push({
        key: "dataShow",
        icon: <PlaySquareTwoTone />,
        text: "数据大盘",
      });
    }
    this.setState({ menuListShow: menuList });
  };

  /*--------------------  搜索栏事件处理函数  ------------------- */

  // 更新表单的state信息 只对没有封装的input有用,不过也可以通过传参来解决封装的input,试试
  // handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   this.setState((prevState) => ({
  //     formData: {
  //       ...prevState.formData,
  //       [name]: value,
  //     },
  //   }));
  // };

  // 重写handleInputChange 更新表单信息
  // 这里我们所有的输入框收集信息的更新全在这里，包括ant组件
  handleInputChange = (name, value) => {
    // console.log(args);
    if (name === "starTime" || name === "endTime") {
      // ant日期选择器的value要得到moment对象，不然报错。绝了搞了我几个小时这个问题
      value = moment(value);
    }
    this.setState((preState) => ({
      formData: {
        ...preState.formData,
        [name]: value,
      },
    }));
    // console.log(this.state.formData);
  };

  // 重置表单
  resetForm = () => {
    this.setState({ ...this.state, ...this.initFormData, obj: {} });
  };

  // 提交表单查询
  handleSubmit = (e) => {
    e.preventDefault();
    const formData = this.state.formData;
    this.setState({
      ...this.state,
      ...this.initFormData,
      obj: {
        ...this.state.formData,
        starTime: formData.starTime._i,
        endTime: formData.endTime._i,
      },
    });
  };

  // 开始时间禁用选择，大于当天的不可选。
  disabledDate1 = (current) => {
    if (!current) return false;
    const targetDate = new Date();
    const currentDate = current.toDate(); // 获取可选时间的时间戳
    return currentDate > targetDate;
  };

  // 结束时间禁用选择：小于开始时间的不可选
  disabledDate2 = (current) => {
    if (!current) return false;
    const targetDate = new Date(this.state.formData.starTime); // 获取最小时间的时间戳
    const currentDate = current.toDate(); // 获取可选时间的时间戳
    return currentDate < targetDate; // 当可选时间小于最小时间则为禁用
  };

  render() {
    const { formData, fromName, obj } = this.state;
    return (
      <>
        <Headers />
        <div className="feature-container">
          {/* 左侧导航栏 */}
          <Layout>
            <Sider width={300} theme="dark" style={{ height: "auto" }}>
              {this.state.menuListShow.map((item) => (
                <Menu
                  style={{
                    fontSize: "16px",
                    height: "60px",
                  }}
                  key={item.key}
                  mode="vertical"
                  theme="dark"
                  selectedKeys={[this.state.selected]}
                  onClick={this.menuClick}
                  items={[
                    {
                      key: item.key,
                      icon: item.icon,
                      label: item.text,
                    },
                  ]}
                />
              ))}
            </Sider>
          </Layout>

          {this.state.isFirst ? (
            <div className="feature-content">
              {/* 搜索商品组件 */}
              <form
                action="#"
                className="searchShop"
                onSubmit={this.handleSubmit}
              >
                <label htmlFor="shopId">
                  商品ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    required
                    className="inputCss"
                    id={fromName[0]}
                    name={fromName[0]}
                    value={formData[fromName[0]]}
                    type="text"
                    placeholder="请输入"
                    onChange={(e) => {
                      this.handleInputChange(
                        this.state.fromName[0],
                        e.target.value
                      );
                    }}
                  />
                </label>
                <label htmlFor="shopName">
                  商品名称:&nbsp;&nbsp;&nbsp;
                  <Input
                    required
                    className="inputCss"
                    id={fromName[1]}
                    name={fromName[1]}
                    value={formData[fromName[1]]}
                    type="text"
                    placeholder="请输入"
                    onChange={(e) => {
                      this.handleInputChange(
                        this.state.fromName[1],
                        e.target.value
                      );
                    }}
                  />
                </label>
                <label htmlFor="starTime">
                  开始时间:
                  {/* 开始时间最大应该为当天 */}
                  &nbsp;&nbsp;&nbsp;
                  <DatePicker
                    required
                    defaultValue={null}
                    id={fromName[2]}
                    name={fromName[2]}
                    value={formData[fromName[2]]}
                    className="inputCss"
                    placeholder="请选择"
                    disabledDate={this.disabledDate1}
                    onChange={(date, dateString) =>
                      this.handleInputChange(this.state.fromName[2], dateString)
                    }
                  />
                </label>
                <label htmlFor="endTime">
                  结束时间: {/* 结束时间可选择的范围应该在开始时间之后 */}
                  &nbsp;&nbsp;&nbsp;
                  <DatePicker
                    required
                    id={fromName[3]}
                    name={fromName[3]}
                    value={formData[fromName[3]]}
                    className="inputCss"
                    placeholder="请选择"
                    disabledDate={this.disabledDate2}
                    onChange={(date, dateString) =>
                      this.handleInputChange(this.state.fromName[3], dateString)
                    }
                  />
                </label>
                <label htmlFor="shopStatus">
                  商品状态:&nbsp;&nbsp;&nbsp;
                  <Select
                    required
                    id={fromName[4]}
                    name={fromName[4]}
                    value={formData[fromName[4]]}
                    placeholder="请选择"
                    className="inputCss"
                    options={this.state.shopStatusList}
                    onChange={(value, option) => {
                      this.handleInputChange(this.state.fromName[4], value);
                    }}
                  />
                </label>
                <label htmlFor="custodian">
                  管理人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    className="inputCss"
                    id={fromName[5]}
                    name={fromName[5]}
                    value={formData[fromName[5]]}
                    type="text"
                    placeholder="请输入"
                    onChange={(e) => {
                      this.handleInputChange(
                        this.state.fromName[5],
                        e.target.value
                      );
                    }}
                    required
                  />
                </label>
                <label htmlFor="agent">
                  代理人:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Input
                    className="inputCss"
                    id={fromName[6]}
                    name={fromName[6]}
                    value={formData[fromName[6]]}
                    type="text"
                    placeholder="请输入"
                    onChange={(e) => {
                      this.handleInputChange(
                        this.state.fromName[6],
                        e.target.value
                      );
                    }}
                  />
                </label>
                <div className="searchShopBtn">
                  <Button onClick={this.resetForm}>重置</Button>
                  <Button
                    type="primary"
                    className="searchBtn"
                    htmlType="submit"
                  >
                    查询
                  </Button>
                </div>
              </form>
              {/* 商品列表组件 */}
              <ShopList formData={obj} />
            </div>
          ) : (
            <DataShow />
          )}
        </div>
        <Footers />
      </>
    );
  }
}

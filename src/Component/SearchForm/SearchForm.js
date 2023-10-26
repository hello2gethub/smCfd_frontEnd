import "./SearchForm.css";
import React from "react";

// 引入ant 组件库中的日期选择器
import { DatePicker, Select, Button, Input } from "antd";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

/**
 * 搜索商品组件
 */

export default class SearchForm extends React.Component {
  /*--------------------  状态信息state  ------------------- */
  initState = {
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
      { value: "待申请", label: "待申请" },
      { value: "审核中", label: "审核中" },
      { value: "已驳回", label: "已驳回" },
    ],
  }; // initState留着给表单重置

  state = { ...this.initState };

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
    this.setState({ ...this.initState }, () => {
      console.log(this.state);
    });
  };

  // 提交表单查询
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
    alert("提交表单");
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
    const { formData, fromName } = this.state;
    return (
      <>
        <form action="#" className="searchShop" onSubmit={this.handleSubmit}>
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
                this.handleInputChange(this.state.fromName[0], e.target.value);
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
                this.handleInputChange(this.state.fromName[1], e.target.value);
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
                this.handleInputChange(this.state.fromName[5], e.target.value);
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
                this.handleInputChange(this.state.fromName[6], e.target.value);
              }}
              required
            />
          </label>
          <div className="searchShopBtn">
            <Button onClick={this.resetForm}>重置</Button>
            <Button type="primary" className="searchBtn" htmlType="submit">
              查询
            </Button>
          </div>
        </form>
      </>
    );
  }
}

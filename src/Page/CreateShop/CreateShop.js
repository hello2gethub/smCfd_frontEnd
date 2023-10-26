import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Select,
  DatePicker,
  Space,
  Button,
  Input,
  message,
  Upload,
  InputNumber,
} from "antd";
import moment from "moment";
import { LeftOutlined } from "@ant-design/icons";
import Headers from "../../Component/Headers/Headers";
import Footers from "../../Component/Footers/Footers";

import "./CreateShop.css";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const { TextArea } = Input;
// 图片获取
const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function CreateShop() {
  const navigate = useNavigate();

  // 初始化form所有数据
  const initState = {
    addressArr: [
      {
        value: "长沙",
        label: "长沙",
      },
      {
        value: "武汉",
        label: "武汉",
      },
      {
        value: "杭州",
        label: "杭州",
      },
    ],
    shopClass: [
      // 商品类型options
      {
        value: "服装",
        label: "服装",
      },
      {
        value: "数码电子",
        label: "数码电子",
      },
      {
        value: "家电",
        label: "家电",
      },
    ],
    shopCategory: [
      {
        value: "西装",
        label: "西装",
      },
      {
        value: "汉服",
        label: "汉服",
      },
      {
        value: "睡衣",
        label: "睡衣",
      },
    ],
    inputObj: {
      shopName: null, // 商品名字
      shopImg: null, // 商品图片
      shopDescription: null, // 商品描述
      shopClass: null, // 商品类型
      shopDetails: null, // 商品详情
      shopCategory: null, // 商品类别
      supplierName: null, //供应商名称
      supplierTelephone: null, // 供应商联系方式
      serviceGuarantee: null, // 服务保障
      priceClass: null, // 价格类型
      points: null, // 所需积分数量
      price: null, // 所需现金数量
      addressDisabled: null, // 不支持发货的地址
      maxTimes: null, //最大兑换次数,
      starTime: "", // 上线时间
      endTime: "", // 结束时间
      addressPut: null, // 投放城市
    },
  };
  const [state, setState] = useState({
    ...initState,
    formName: Object.keys(initState.inputObj),
  });

  // 提交表单
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("提交表单");
  };

  // 重置表单
  const resetForm = () => {
    setState({
      ...initState,
      formName: Object.keys(initState.inputObj),
    });
  };

  // 处理用户输入完手机号失去焦点时候，校验手机号格式
  const handleBlur = () => {
    const phoneRegex = /^[1-9]\d{10}$/; // 最简陋的手机号正则表达式
    if (!phoneRegex.test(state.inputObj.supplierTelephone)) {
      message.error("请输入正确的手机号");
      let inputObj2 = {
        ...state.inputObj,
        supplierTelephone: "",
      };
      setState({
        ...state,
        inputObj: inputObj2,
      });
    }
  };

  // 处理所有输入事件
  const handleInputChange = (name, value) => {
    if (name === "starTime" || name === "endTime") {
      value = moment(value);
    }
    const inputObjUpdate = {
      ...state.inputObj,
      [name]: value,
    };

    setState({
      ...state,
      inputObj: inputObjUpdate,
    });

    console.log(state.inputObj);
  };

  // 开始时间禁用选择，大于当天的不可选。
  const disabledDate1 = (current) => {
    if (!current) return false;
    const targetDate = new Date();
    const currentDate = current.toDate(); // 获取可选时间的时间戳
    return currentDate > targetDate;
  };

  // 结束时间禁用选择：小于开始时间的不可选
  const disabledDate2 = (current) => {
    if (!current) return false;
    const targetDate = new Date(state.inputObj.starTime); // 获取最小时间的时间戳
    const currentDate = current.toDate(); // 获取可选时间的时间戳
    return currentDate < targetDate; // 当可选时间小于最小时间则为禁用
  };

  return (
    <>
      <Headers />
      <form action="#" onSubmit={handleSubmit} className="w">
        <div
          className="w-toFeature"
          onClick={() => {
            navigate("/feature");
          }}
        >
          <LeftOutlined style={{ marginRight: "3px" }} />
          返回
        </div>
        {/* 基本信息与服务条款  start*/}
        <div className="box box1 ">
          {/* 基本信息 start*/}
          <div>
            <h2>基本信息</h2>
            <ul className="mingcheng clearfix">
              <li>
                <h3>
                  <i>*</i>商品名称
                </h3>
                <Input
                  name={state.formName[0]}
                  value={state.inputObj.shopName}
                  onChange={(e) =>
                    handleInputChange(state.formName[0], e.target.value)
                  }
                  placeholder="请输入商品名称(20字以内)"
                  className="inPut"
                  required
                  maxLength={20}
                />
              </li>
              <li>
                <h3>商品头图</h3>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>上传图片</Button>
                </Upload>
              </li>
            </ul>

            {/* 商品文字描 */}
            <div className="miaoshu">
              <h3>
                <i>*</i>商品文字描述
              </h3>
              <TextArea
                name={state.formName[2]}
                showCount
                value={state.inputObj.shopDescription}
                maxLength={100}
                style={{
                  height: 100,
                  width: 500,
                  resize: "none",
                }}
                onChange={(e) =>
                  handleInputChange(state.formName[2], e.target.value)
                }
                placeholder="请输入详细文字描述，最大不超过100字"
                required
              />
            </div>

            {/* 商品类型 */}
            <div className="leixing">
              <ul className="clearfix">
                <li>
                  <h3>
                    <i>*</i>商品类型
                  </h3>
                  <div className="shangping">
                    <Select
                      name={state.formName[3]}
                      value={state.inputObj.shopClass}
                      style={{ width: 300 }}
                      onChange={(value, option) =>
                        handleInputChange(state.formName[3], value)
                      }
                      required
                      options={state.shopClass}
                      placeholder="请选择"
                    />
                  </div>
                </li>

                <li>
                  <h3>
                    <i>*</i>商品详情
                  </h3>
                  <Input
                    name={state.formName[4]}
                    placeholder="商品详情"
                    className="inPut"
                    required
                    value={state.inputObj.shopDetails}
                    onChange={(e) =>
                      handleInputChange(state.formName[4], e.target.value)
                    }
                  />
                </li>

                <li>
                  <h3>
                    <i>*</i>商品分类
                  </h3>
                  <div>
                    <Select
                      name={state.formName[5]}
                      value={state.inputObj.shopCategory}
                      style={{ width: 300 }}
                      placeholder="请选择商品分类"
                      required
                      options={state.shopCategory}
                      onChange={(value, option) =>
                        handleInputChange(state.formName[5], value)
                      }
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
          {/* 基本信息 end*/}

          {/* 服务条款 start */}
          <div>
            <h2>服务条款</h2>
            <ul className="gongyingshang clearfix">
              <li>
                <h3>
                  <i>*</i>供应商名称
                </h3>
                <Input
                  name={state.formName[6]}
                  value={state.inputObj.supplierName}
                  placeholder="请输入供应商名称"
                  className="inPut"
                  required
                  onChange={(e) =>
                    handleInputChange(state.formName[6], e.target.value)
                  }
                />
              </li>
              <li>
                <h3>
                  <i>*</i>供应商
                </h3>
                <Input
                  onBlur={handleBlur}
                  name={state.formName[7]}
                  value={state.inputObj.supplierTelephone}
                  type="number"
                  placeholder="请输入供应商的手机号"
                  className="inPut"
                  required
                  onChange={(e) =>
                    handleInputChange(state.formName[7], e.target.value)
                  }
                />
              </li>
            </ul>
            {/* 服务保障 */}
            <div className="biaozhang">
              <h3>
                <i>*</i>服务保障
              </h3>
              <TextArea
                name={state.formName[8]}
                value={state.inputObj.serviceGuarantee}
                showCount
                maxLength={100}
                style={{
                  height: 100,
                  width: 500,
                  resize: "none",
                }}
                onChange={(e) =>
                  handleInputChange(state.formName[8], e.target.value)
                }
                placeholder="请输入详细文字描述，最大不超过100字"
                required
              />
            </div>
          </div>
          {/* 服务条款 end */}
        </div>
        {/* 基本信息与服务条款  end*/}

        {/* 会员的相关设置 start */}
        <div className="box box3">
          <ul className="clearfix">
            {/* 黄金会员价格类型 */}
            <li>
              <div className="huangjing">
                <h3>
                  <i>*</i>黄金会员价格类型
                </h3>
                <Select
                  name={state.formName[9]}
                  value={state.inputObj.priceClass}
                  style={{ width: 300 }}
                  placeholder="请选择"
                  onChange={(value, option) =>
                    handleInputChange(state.formName[9], value)
                  }
                  required
                  options={[
                    {
                      value: "纯积分",
                      label: "纯积分",
                    },
                    {
                      value: "积分加钱",
                      label: "积分加钱",
                    },
                    {
                      value: "现金购买",
                      label: "现金购买",
                    },
                  ]}
                />
              </div>
            </li>

            <li>
              <h3>
                <i>*</i>积分数量
              </h3>
              <InputNumber
                name={state.formName[10]}
                value={state.inputObj.points}
                min={1}
                max={100000}
                placeholder="请输入"
                onChange={(e) => handleInputChange(state.formName[10], e)}
                className="amount"
                required
              />
            </li>
            <li>
              <h3>
                <i>*</i>现金价格
              </h3>
              <InputNumber
                name={state.formName[11]}
                value={state.inputObj.price}
                min={1}
                max={100000}
                placeholder="请输入"
                onChange={(e) => handleInputChange(state.formName[11], e)}
                className="amount"
                required
              />
            </li>
          </ul>
          <div className="addType">
            <em>+</em>添加一行价格类型
          </div>
        </div>
        {/* 会员的相关设置 end */}

        {/* 快递与投放  start*/}
        <div className="box box2">
          {/* 快递区域 */}
          <div>
            <h2>快递</h2>
            <h3>不能发货地区</h3>
            {/* 选择城市 */}
            <div style={{ marginBottom: "30px" }}>
              <Select
                style={{ width: 300 }}
                name={state.formName[12]}
                value={state.inputObj.addressDisabled}
                placeholder="选择城市"
                onChange={(value, option) =>
                  handleInputChange(state.formName[12], value)
                }
                options={state.addressArr}
              />
            </div>
            {/* 选择城市 end */}
          </div>
          {/* 兑换限制 */}
          <div>
            <h2>兑换限制</h2>
            <h3>
              <i>
                <Input
                  name={state.formName[13]}
                  value={state.inputObj.maxTimes}
                  type="number"
                  placeholder="兑换上限"
                  className="inPut"
                  required
                  onChange={(e) =>
                    handleInputChange(state.formName[13], e.target.value)
                  }
                />
              </i>
            </h3>

            {/* <Input placeholder="Basic usage " className='shuru' /> */}
            {/* <input value={'请输入'} readOnly={true} ></input> */}
          </div>
          {/* 投放 */}

          <div className="toufang">
            <h2>投放</h2>
            <ul className="toufang_1 clearfix">
              <li>
                <h3>
                  <i>*</i>上线时间
                </h3>
                <Space direction="请选择">
                  <DatePicker
                    name={state.formName[14]}
                    value={state.inputObj.starTime}
                    onChange={(date, dateString) =>
                      handleInputChange(state.formName[14], dateString)
                    }
                    placeholder="请选择"
                    className="shijian"
                    disabledDate={disabledDate1}
                    required
                  />
                </Space>
              </li>
              <li>
                <h3>
                  <i>*</i>下线时间
                </h3>
                <Space>
                  <DatePicker
                    name={state.formName[15]}
                    value={state.inputObj.endTime}
                    disabledDate={disabledDate2}
                    onChange={(date, dateString) =>
                      handleInputChange(state.formName[15], dateString)
                    }
                    placeholder="请选择"
                    className="shijian"
                    required
                  />
                </Space>
              </li>
              <li>
                <h3>
                  <i>*</i>选择城市
                </h3>
                <div>
                  <Select
                    name={state.formName[16]}
                    value={state.inputObj.addressPut}
                    placeholder="选择城市"
                    style={{ width: 200 }}
                    onChange={(value, option) =>
                      handleInputChange(state.formName[16], value)
                    }
                    required
                    options={state.addressArr}
                  />
                </div>
              </li>
            </ul>
          </div>

          {/* 提交和重置 */}
          <div className="anniu">
            <button type="submit" className="tijiao">
              提 交
            </button>
            <button type="reset" className="reset" onClick={resetForm}>
              重 置
            </button>
          </div>
        </div>
        {/* 快递与投放  start*/}
      </form>
      <Footers />
    </>
  );
}

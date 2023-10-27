import React, { useEffect } from "react";
import { useState } from "react";
import {
  Button,
  Modal,
  Avatar,
  Image,
  Table,
  Divider,
  Input,
  Tabs,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ShopDetail.css";
import { useLocation } from "react-router";
// 引入子组件
import Footers from "../../Component/Footers/Footers";
import Headers from "../../Component/Headers/Headers";
import ShopPreview from "../../Component/ShopPreview/ShopPreview";

//输入框所需
const { TextArea } = Input;
const onChange = (e) => {
  console.log("Change:", e.target.value);
};

// 表格所需
const columns = [
  {
    title: "ID",
    dataIndex: "name",
  },
  {
    title: "状态",
    dataIndex: "age",
  },
  {
    title: "操作时间",
    dataIndex: "address",
  },
  {
    title: "操作人",
    dataIndex: "address",
  },
];

// Tabs标签栏
const tabList = [
  { key: "1", label: "基础信息", children: "" },
  { key: "2", label: "商品预览", children: "" },
];

export default function ShopDetail() {
  const location = useLocation();
  const shopId = location.state; // 拿到商品Id
  const identity = localStorage.getItem("grade"); // 获取身份
  const initState = {
    grade: "", // 身份
    activeTab: "1", // 用于切换预览与商品信息
    custodian: "1812739", // 管理人Id
    createMan: "1282891", // 创建人Id，
    equityId: "129387104981239", //权益Id
    shopStatus: "未知",
    shopDetails: {
      shopName: "爱奇艺会员",
      fwb: "tip",
      dhxz: "1年",
      showTime: "2022-05-18",
      qyId: "虚拟",
      shopClass: "个人护理",
      starTime: "2022-05-18",
      msMsg: "文字描述",
      serveSave: "服务保障",
      updateTime: "2022-05-18",
      shopImg1:
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      shopImg2:
        "https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg",
      cityB: "无限制",
      cityH: "无限制",
      supplierName: "供应商",
      supplierTelephone: "16587659812",
      tableData: [
        {
          key: "1",
          name: "123456",
          age: "下线",
          address: "200-06-02",
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park",
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sydney No. 1 Lake Park",
        },
      ],
    }, // 商品信息
    shopPreview: {}, // 预览信息
  };
  const [state, setState] = useState({ ...initState, grade: identity });

  useEffect(() => {}, []);
  //提交按钮所需

  //编辑按钮
  const [redact1, setredact] = useState(false);
  const redact = () => {
    setredact(true);
  };
  const redactOk = () => {
    setredact(false);
  };
  const redactCancel = () => {
    setredact(false);
  };

  //发起审核
  const [audit1, setaudit] = useState(false);
  const audit = () => {
    setaudit(true);
  };
  const auditOk = () => {
    setaudit(false);
  };
  const auditCancel = () => {
    setaudit(false);
  };

  //审核通过
  const [pass1, setpass] = useState(false);
  const pass = () => {
    setpass(true);
  };
  const passOk = () => {
    setpass(false);
  };
  const passCancel = () => {
    setpass(false);
  };

  //审核驳回
  const [reject1, setreject] = useState(false);
  const reject = () => {
    setreject(true);
  };
  const rejectOk = () => {
    setreject(false);
  };
  const rejectCancel = () => {
    setreject(false);
  };

  //上线
  const [submit1, setsubmit] = useState(false);
  const submit = () => {
    setsubmit(true);
  };
  const submitOk = () => {
    setsubmit(false);
  };
  const submitCancel = () => {
    setsubmit(false);
  };

  //下线
  const [withdraw1, setWithdraw] = useState(false);
  const withdraw = () => {
    setWithdraw(true);
  };
  const withdrawOk = () => {
    setWithdraw(false);
  };
  const withdrawCancel = () => {
    setWithdraw(false);
  };

  //基础信息和商品预览转换
  const shopDetails = state.shopDetails;
  const grade = state.grade;
  return (
    <>
      <Headers />
      <div className="ShopDetail">
        <div className="Message">
          {/* 头部  start*/}
          <div className="header box">
            <div className="headerUser">
              <div className="user">
                <Avatar size="large" icon={<UserOutlined />} />
                <h2>用户名</h2>
              </div>

              {/* 按钮 */}
              <ul className="button">
                {grade !== "admin" ? (
                  <>
                    {/* 编辑  下线状态使用 */}
                    <li>
                      <Button type="primary" onClick={redact}>
                        编辑
                      </Button>
                      <Modal
                        title="编辑"
                        open={redact1}
                        onOk={redactOk}
                        onCancel={redactCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否进行编辑</p>
                        <p>确认，将会跳转到信息编辑页面</p>
                      </Modal>
                    </li>
                    {/* 发起审核 进入审核不可使用 */}
                    <li>
                      <Button type="primary" onClick={audit}>
                        发起审核
                      </Button>
                      <Modal
                        title="发起审核"
                        open={audit1}
                        onOk={auditOk}
                        onCancel={auditCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否发起审核</p>
                        <h4 style={{ marginTop: "10px" }}>备注：</h4>
                        <TextArea
                          showCount
                          maxLength={100}
                          style={{
                            height: 50,
                            resize: "none",
                            marginBottom: "10px",
                          }}
                          onChange={onChange}
                          placeholder="备注"
                        />
                      </Modal>
                    </li>
                  </>
                ) : (
                  <>
                    {/* 审核通过 仅超级管理员可见 */}
                    <li>
                      <Button type="primary" onClick={pass}>
                        审核通过
                      </Button>
                      <Modal
                        title="审核通过"
                        open={pass1}
                        onOk={passOk}
                        onCancel={passCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否审核通过</p>
                        <h4 style={{ marginTop: "10px" }}>备注：</h4>
                        <TextArea
                          showCount
                          maxLength={100}
                          style={{
                            height: 50,
                            resize: "none",
                            marginBottom: "10px",
                          }}
                          onChange={onChange}
                          placeholder="备注"
                        />
                      </Modal>
                    </li>
                    {/* 审核驳回 仅超级管理员可见 */}
                    <li>
                      <Button type="primary" onClick={reject}>
                        审核驳回
                      </Button>
                      <Modal
                        title="审核驳回"
                        open={reject1}
                        onOk={rejectOk}
                        onCancel={rejectCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否审核驳回</p>
                        <h4 style={{ marginTop: "10px" }}>备注：</h4>
                        <TextArea
                          showCount
                          maxLength={100}
                          style={{
                            height: 50,
                            resize: "none",
                            marginBottom: "10px",
                          }}
                          onChange={onChange}
                          placeholder="备注"
                        />
                      </Modal>
                    </li>
                    {/* 上线 未审批禁止使用 */}
                    <li>
                      <Button
                        type="primary"
                        onClick={submit}
                        style={{ backgroundColor: "#ff5252" }}
                      >
                        上线
                      </Button>
                      <Modal
                        title="上线"
                        open={submit1}
                        onOk={submitOk}
                        onCancel={submitCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否上线</p>
                      </Modal>
                    </li>
                    {/* 下线 未上线不展示 */}
                    <li>
                      <Button
                        type="primary"
                        onClick={withdraw}
                        style={{ backgroundColor: "#ff5252" }}
                      >
                        下线
                      </Button>
                      <Modal
                        title="下线"
                        open={withdraw1}
                        onOk={withdrawOk}
                        onCancel={withdrawCancel}
                      >
                        <p style={{ color: "#ff5252" }}>请确认是否下线</p>
                      </Modal>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="custodian">
              <div className="custodian-item">
                <div className="top-1">
                  <strong>管理人: </strong>
                  <span className="small">{state.custodian}</span>
                </div>
                <div className="top-2">
                  <strong>创建人: </strong>
                  <span className="small">{state.createMan}</span>
                </div>
              </div>
              <div className="custodian-item">
                <div className="btm-1">
                  <strong>权益Id: </strong>
                  <span className="small">{state.equityId}</span>
                </div>
                <div className="btm-2">
                  <div className="small">状态</div>
                  <div className="bigFont">{state.shopStatus}</div>
                </div>
              </div>
            </div>
          </div>
          {/* 头部  end*/}
          <div className="message2">
            <Tabs
              activeKey={state.activeTab}
              items={tabList}
              onChange={(key) => {
                setState({ ...state, activeTab: key });
              }}
            />
          </div>
          {state.activeTab === "1" ? (
            <>
              <div className="message box">
                <div>
                  <h3>基础信息</h3>
                  <ul className=" details">
                    <li>
                      商品信息:<span>{shopDetails.shopName}</span>
                    </li>
                    <li>
                      权益类型:<span>{shopDetails.qyId}</span>
                    </li>
                    <li>
                      描述信息:<span>{shopDetails.msMsg}</span>
                    </li>
                    <li>
                      富文本:<span>{shopDetails.fwb}</span>
                    </li>
                    <li>
                      类目:<span>{shopDetails.shopClass}</span>
                    </li>
                    <li>
                      服务保障:<span>{shopDetails.serveSave}</span>
                    </li>
                    <li>
                      兑换限制:<span>{shopDetails.dhxz}</span>
                    </li>
                    <li>
                      创建时间:<span>{shopDetails.updateTime}</span>
                    </li>
                    <li>
                      修改时间:<span>{shopDetails.updateTime}</span>
                    </li>
                    <li>
                      展示时间:<span>{shopDetails.showTime}</span>
                    </li>
                  </ul>

                  <h3>
                    商品图片<i>(2)</i>
                  </h3>
                  {/* <div className='picture'>这是一张图片</div> */}
                  <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) =>
                        console.log(
                          `current index: ${current}, prev index: ${prev}`
                        ),
                    }}
                  >
                    <Image width={200} src={shopDetails.shopImg1} />
                    <Image width={200} src={shopDetails.shopImg2} />
                  </Image.PreviewGroup>

                  <div>
                    <h3>投放城市</h3>
                    <p className="city">
                      城市白名单:<span>{shopDetails.cityB}</span>
                    </p>
                    <p>
                      城市黑名单:<span>{shopDetails.cityH}</span>
                    </p>
                  </div>

                  <h3>供应商信息</h3>
                  <ul className="supplier">
                    <li>
                      供应商名称:<span>{shopDetails.supplierName}</span>
                    </li>
                    <li>
                      供应商联系方式:
                      <span>{shopDetails.supplierTelephone}</span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* 基础信息和商品预览  end*/}

              {/* 当前ID操作的详细记录 start */}
              <div className="record box">
                <Divider className="tabulation">操作记录</Divider>
                <Table
                  columns={columns}
                  dataSource={shopDetails.tableData}
                  size="middle"
                />
              </div>
            </>
          ) : (
            <>
              <ShopPreview />
            </>
          )}

          {/* 商品预览  start*/}

          {/* 商品预览  end*/}
        </div>
      </div>
      <Footers />
    </>
  );
}

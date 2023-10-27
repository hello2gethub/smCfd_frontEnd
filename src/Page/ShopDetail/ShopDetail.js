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
  message,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./ShopDetail.css";
import { useLocation, useNavigate } from "react-router";
// 引入子组件
import Footers from "../../Component/Footers/Footers";
import Headers from "../../Component/Headers/Headers";
import ShopPreview from "../../Component/ShopPreview/ShopPreview";

// api
import getShopDetails from "../../api/getShopDetails"; // 获取商品详情
import getDarctDetails from "../../api/getDarctDetails"; // 获取草稿详情
import submitApproval from "../../api/submitApproval"; // 发起审核
import Approve from "../../api/Approve"; // 审批
import changeShopStatus from "../../api/changeShopStatus"; // 上线or下线

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
  const shopId = location.state.shopId; // 拿到商品Id
  const darctId = location.state.darctId; // 拿到草稿Id
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const identity = localStorage.getItem("grade"); // 获取身份
  const initState = {
    grade: "", // 身份
    activeTab: "1", // 用于切换预览与商品信息
    custodian: "1812739", // 代理人Id
    createMan: "1282891", // 创建人Id，
    equityId: "129387104981239", //权益Id
    shopStatus: "未知",
    shopDetails: {
      shopName: "爱奇艺会员",
      fwb: "tip",
      dhxz: "1年",
      qyId: "虚拟",
      shopClass: "个人护理",
      starTime: "2022-05-18",
      msMsg: "文字描述",
      serveSave: "服务保障",
      updateTime: "2022-05-18",
      shopImg1:
        "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
      cityB: "无限制",
      cityH: "无限制",
      supplierName: "供应商",
      supplierTelephone: "16587659812",
    }, // 商品信息
    shopPreview: {}, // 预览信息
    tableData: [
      {
        key: "1",
        name: "2",
        age: "下线",
        address: "1",
      },
      {
        key: "2",
        name: "2",
        age: "下线",
        address: "1",
      },
      {
        key: "3",
        name: "2",
        age: "下线",
        address: "1",
      },
    ],
  };
  const [state, setState] = useState({ ...initState, grade: identity });

  const navigate = useNavigate();

  // 三个生命周期
  useEffect(() => {
    // 校验是否登录
    if (!userId || !token) {
      message.error("请先登录~");
      navigate("/lading");
    }

    // 处理接收到的后端数据
    const handleData = (data) => {
      // console.log("data", Object.prototype.toString.call(data));
      setState((prevState) => ({
        ...prevState,
        custodian: data.id,
        createMan: data.caretaker,
        equityId: data.id,
      }));
      let newData = {};
      Object.keys(data).forEach((key) => {
        switch (key) {
          case "name":
            newData["shopName"] = data[key];
            break;
          case "image":
            newData["shopImg1"] = data[key];
            break;
          case "description":
            newData["msMsg"] = data[key];
            break;
          case "details":
            newData["fwb"] = data[key];
            break;
          case "category":
            newData["shopClass"] = data[key];
            break;
          case "startTime":
            newData["starTime"] = data[key].slice(0, 10);
            break;
          case "endTime":
            newData["updateTime"] = data[key].slice(0, 10);
            break;
          case "status":
            newData["shopStatus"] = data[key];
            break;
          case "exchangeLimit":
            newData["dhxz"] = data[key];
            break;
          default:
        }
      });
      // 没有数据的直接给假的。
      newData["serveSave"] = "服务保障";
      newData["cityB"] = "无限制";
      newData["cityH"] = "无限制";
      newData["supplierName"] = "供应商";
      newData["supplierTelephone"] = "16587659812";
      setState((prevState) => ({
        ...prevState,
        shopDetails: newData,
      }));
    };

    // 获取商品或草稿详情的数据
    const getDetailsData = () => {
      if (darctId) {
        // 获取草稿详情数据
        getDarctDetails(darctId)
          .then((res) => {
            console.log("草稿详情", res);
            handleData(res.data.data);
          })
          .catch((err) => {
            console.log("请求草稿详情", err);
          });
      } else if (shopId) {
        // 获取商品Id数据
        getShopDetails(shopId)
          .then((res) => {
            console.log("商品详情", res);
            handleData(res.data.data);
          })
          .catch((err) => {
            console.log("请求商品详情出错", err);
          });
      }
    };
    getDetailsData();
  }, [token, userId, navigate, darctId, shopId]);
  //提交按钮所需

  //编辑按钮
  const [redact1, setredact] = useState(false);
  const redact = () => {
    setredact(true);
  };
  const redactOk = () => {
    setredact(false);
    navigate("/createShop", { state: darctId });
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
    submitApproval(darctId)
      .then((res) => {
        if (res.data.code === 200) {
          message.success("提交审批成功");
          navigate("/feature");
        }
      })
      .catch((err) => {
        console.log("提交审批失败", err);
      });
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
    console.log("aa");
    Approve(3, darctId)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            message.success("审批成功");
            navigate("./feature");
          } else {
            message.error(res.data.msg);
          }
        }
      })
      .catch((err) => {
        console.log("审批通过失败", err);
      });
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
    Approve(2, darctId)
      .then((res) => {
        console.log("审批驳回", res);
        if (res.status === 200) {
          if (res.data.code === 200) {
            message.success("驳回成功");
            navigate("./feature");
          } else {
            message.error(res.data.msg);
          }
        }
      })
      .catch((err) => {
        console.log("审批驳回请求失败", err);
      });
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
    changeShopStatus(1, [shopId])
      .then((res) => {
        if (res.data.code === 200) {
          message.success("上线成功");
          navigate("/feature");
        }
      })
      .catch((err) => {
        console.log("上线失败", err);
      });
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
    changeShopStatus(2, [shopId])
      .then((res) => {
        if (res.data.code === 200) {
          message.success("下线成功");
          navigate("/feature");
        }
      })
      .catch((err) => {
        console.log("下线失败", err);
      });
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
                {grade !== "admin" && darctId && (
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
                )}
                {darctId && grade === "admin" && (
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
                  </>
                )}
                {shopId && grade === "admin" && (
                  <>
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
                  <strong>{shopId ? "商品Id" : "草稿Id"} :</strong>
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
                      创建时间:<span>{shopDetails.starTime}</span>
                    </li>
                    <li>
                      结束时间:<span>{shopDetails.updateTime}</span>
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
                  dataSource={state.tableData}
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

import "./ShopList.css";
import React, { useEffect, useState } from "react";

// 引入ant组件
import { Button, Tabs, Table, Pagination, Modal, message } from "antd";
import copy from "copy-to-clipboard";
// 引入icon图标
import {
  RedoOutlined,
  ItalicOutlined,
  SettingOutlined,
  CopyTwoTone,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

// 引入getShopList API
import getShopList from "../../api/getShopList";
import changeShopStatus from "../../api/changeShopStatus";

/**
 * 处理不同身份显示不同的商品列表
 * 不同身份应该显示不同的表头和数据以及不同的按钮
 * - 按钮
 * 管理人和代理商都有 全部、已上线、已下线按钮
 * 管理人 应该新增一个按钮，待审核(提交了申请没审核的)
 * 代理商应该新增一个按钮，待申请(草稿)
 * - table表格
 * 代理商应该不能看见操作这个字段
 */

// Tabs标签栏
const tabList = [
  { key: "1", label: "全部", children: "" },
  { key: "2", label: "已上线", children: "" },
  { key: "3", label: "已下线", children: "" },
];

class ShopLists extends React.Component {
  state = {
    activeTab: "1", // 当前的tabs
    tableTitle: [],
    tableData: [], // 商品数据
    page: {
      // 分页信息
      currentPage: 1,
      pageSize: 6,
      total: 0, // 总数据条数
    },
    selectedRowKeys: [], //选择表格行的数量
    showBox: false, // 二次确认框是否显示
    grade: null,
    record: null, // 操作的行
  };

  // 管理员的表头
  tableTitle1 = [
    {
      title: "商品ID",
      dataIndex: "shopId",
      key: "shopId",
      align: "center",
      render: (text) => <span style={{ color: "#1677FF" }}>{text}</span>,
    },
    {
      title: "商品名称",
      dataIndex: "shopName",
      key: "shopName",
      align: "center",
      render: (text) => (
        <span>
          {text}
          <CopyTwoTone
            size="small"
            className="iconFont"
            onClick={(e) => {
              e.stopPropagation();
              copy(text);
              message.success("复制成功");
            }}
          />
        </span>
      ),
    },
    {
      title: "库存",
      dataIndex: "repertory",
      key: "repertory",
      align: "center",
    },
    {
      title: "开始时间",
      dataIndex: "starTime",
      key: "starTime",
      align: "center",
    },
    {
      title: "结束时间",
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
    },
    {
      title: "商品状态",
      dataIndex: "shopStatus",
      key: "shopStatus",
      align: "center",
    },
    {
      title: "管理人",
      dataIndex: "agent",
      key: "agent",
      align: "center",
      render: (text) => (
        <span>
          {text}
          <CopyTwoTone
            size="small"
            className="iconFont"
            onClick={(e) => {
              e.stopPropagation();
              copy(text);
              message.success("复制成功");
            }}
          />
        </span>
      ),
    },
    {
      title: "操作",
      dataIndex: "control",
      key: "control",
      align: "center",
      render: (text, record) => (
        <>
          <Button
            onClick={(e) => {
              console.log("record1", record);
              this.setState({ showBox: true, record: record });
              e.stopPropagation(); //阻止事件冒泡
            }} //开启二次确认框
            style={
              text === "上线"
                ? {
                    width: "80px",
                    height: "30px",
                    borderColor: "#1677FF",
                    color: "#1677FF",
                  }
                : {
                    width: "80px",
                    height: "30px",
                    borderColor: "red",
                    color: "red",
                  }
            }
          >
            {text}
          </Button>
          <Modal
            title="二次确认"
            open={this.state.showBox}
            onOk={(e) => {
              e.stopPropagation();
              this.putRequest();
            }}
            onCancel={(e) => {
              e.stopPropagation();
              this.setState({ showBox: false });
            }}
          >
            <p>{`请在次确认或点击取消`}</p>
          </Modal>
        </>
      ),
    }, // 代理商没有这个字段
  ];

  // 相当于vue的onBeforeMonuted
  componentWillMount() {
    const grade = localStorage.getItem("grade");
    this.setState({ ...this.state, grade: grade });
    this.getTableData(); //执行请求数据函数
    // 根据身份信息来选择表头
    if (
      grade !== "admin" &&
      this.tableTitle1[this.tableTitle1.length - 1].title === "操作"
    ) {
      this.tableTitle1.pop();
    }
    this.setState({ tableTitle: this.tableTitle1 });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.obj !== this.props.obj) {
      console.log(this.props.obj);
      this.getTableData(this.props.obj);
    }
  }

  // 请求数据函数
  getTableData = (formData) => {
    const { currentPage, pageSize } = this.state.page;
    const category =
      this.state.activeTab === "1" ? 0 : this.state.activeTab === "2" ? 1 : 2; // 配合后端修改一下类别
    let obj = {};
    if (formData) {
      obj = {
        category: category,
        currentPage: currentPage,
        pageSize: pageSize,
        ...formData,
      };
    } else {
      obj = {
        category: category,
        currentPage: currentPage,
        pageSize: pageSize,
      };
    }
    // console.log("obj", obj);
    getShopList(obj)
      .then((res) => {
        // console.log("商品列表--", res.data.data);
        const total = res.data.data.total; // 数据总条数
        let data = res.data.data.records.slice(0, pageSize); // 数据切片只展示相应条数
        // 处理后端返回的数据,跟自己的对上
        let newData = Array.from({ length: data.length }, () => ({})); // 创建空对象数组
        data.forEach((item, index) => {
          // 保险一下，怕自动转化为string，用== eslint就警告了O.O
          if (parseInt(item.status) === 1) {
            newData[index]["control"] = "下线";
            newData[index]["shopStatus"] = "运行中";
          } else {
            newData[index]["control"] = "上线";
            newData[index]["shopStatus"] = "已下线";
          }
          Object.entries(item).forEach(([key, value]) => {
            // 每一条的key都要变成我们的
            switch (key) {
              case "id":
                newData[index]["shopId"] = value;
                newData[index]["id"] = value; // 用于循环的唯一标识
                break;
              case "name":
                newData[index]["shopName"] = value;
                break;
              case "stock":
                newData[index]["repertory"] = value;
                break;
              case "startTime":
                newData[index]["starTime"] = value.slice(0, 10);
                break;
              case "endTime":
                newData[index]["endTime"] = value.slice(0, 10);
                break;
              case "caretaker":
                newData[index]["agent"] = value;
                break;
              default:
              // console.log(`商品列表不需要的数据--${key}: ${value}`);
            }
          });
        });
        this.setState({
          tableData: newData,
          page: {
            ...this.state.page,
            total,
          },
        }); //更新商品数据 和 总数据条数
      })
      .catch((err) => {
        console.log("请求商品列表出错：", err);
        return new Error(err);
      });
  };

  // 更新上下线后表格的数据
  updateStatus = (arr) => {
    console.log(this.state.tableData);
    let newData = Array.from(
      { length: this.state.tableData.length },
      () => ({})
    ); // 创建空对象数组
    for (let i = 0; i < arr.length; i++) {
      this.state.tableData.forEach((item, index) => {
        if (item.shopId === arr[i]) {
          newData[index] = {
            ...item,
            shopStatus: item.shopStatus === "运行中" ? "已下线" : "运行中",
            control: item.control === "上线" ? "下线" : "上线",
          };
        } else {
          newData[index] = item;
        }
      });
    }
    this.setState({ ...this.state, tableData: newData });
  };

  // 单次点击：用户点击了二次确认，发起上线或下线请求函数
  putRequest = () => {
    const { record } = this.state;
    this.setState({ showBox: false, record: null });
    const status = record.control === "下线" ? 1 : 2;
    changeShopStatus(status, [record.shopId])
      .then((res) => {
        if (res.data.code === 200) {
          message.success(`${record.control}成功`);
          this.updateStatus([record.shopId]);
        } else {
          message.error("没有相应权限");
        }
      })
      .catch((err) => {
        console.log("上线下线请求出错", err);
      });
  };

  // tabs click事件
  // 每一次选择，页码都要重新置为1
  tabClick = (key) => {
    this.setState(
      {
        activeTab: key,
        page: { ...this.state.page, currentPage: 1 },
      },
      () => {
        this.getTableData();
      }
    );
  };

  // 选择页面事件
  pageChange = (currentPage, pageSize) => {
    this.setState(
      {
        page: {
          ...this.state.page,
          currentPage: currentPage,
          pageSize: pageSize,
        },
      },
      () => {
        // console.log(this.state);
        this.getTableData(); //重新获取数据
      }
    );
  };

  // 处理复选框
  selectChange = (newRowKeys) => {
    this.setState({ selectedRowKeys: newRowKeys });
  };

  // 批量操作
  batch = () => {
    console.log("选中的批量操作的行", this.state.selectedRowKeys);
    this.setState({ selectedRowKeys: [] }); //批量操作完了，复选框重置
    console.log("批量操作");
  };

  // 跳转到新建商品页面
  goToCreateShop = () => {
    this.props.navigate("/createShop");
  };

  // 跳转到商品详情页
  goToShopDetail = (record) => {
    console.log("record---", record);
    this.props.navigate(`/shopDetail`, { state: record.shopId });
  };

  render() {
    const { activeTab, tableData, tableTitle, page, selectedRowKeys } =
      this.state;
    const btnText = activeTab === "2" ? "批量下线" : "批量上线"; //设置批量按钮的文本
    const rowSelection =
      activeTab !== "1"
        ? {
            selectedRowKeys,
            onChange: this.selectChange,
          }
        : null; // 只有tabs为已上线或者已下线才有复选框
    const hasSelected = selectedRowKeys.length > 0; // 用于判断是否显示选中条数
    return (
      <>
        <div className="shopList">
          <div className="shopList-title">
            <strong>商品列表</strong>
            <div>
              {this.state.grade !== "admin" && (
                <Button
                  type="primary"
                  className="iconList"
                  onClick={this.goToCreateShop}
                >
                  新建商品
                </Button>
              )}
              <RedoOutlined className="iconList" />
              <ItalicOutlined className="iconList" />
              <SettingOutlined className="iconList" />
            </div>
          </div>
          <Tabs
            className="tabs"
            activeKey={activeTab}
            items={tabList}
            onChange={this.tabClick}
          />
          <div
            className="batchCss"
            style={
              activeTab !== "1" ? { display: "flex" } : { display: "none" }
            }
          >
            <span className="selectedNum">
              {hasSelected ? `已选择${selectedRowKeys.length}项` : ""}
            </span>
            <Button className="batchBtn" type="primary" onClick={this.batch}>
              {btnText}
            </Button>
          </div>
          <Table
            onRow={(record) => ({
              onClick: () => this.goToShopDetail(record),
            })}
            rowSelection={rowSelection}
            dataSource={tableData}
            columns={tableTitle}
            pagination={false}
            rowKey="id"
          />
          <Pagination
            className="pagination"
            current={page.currentPage}
            pageSize={page.pageSize}
            total={page.total}
            onChange={this.pageChange}
            showSizeChanger
            pageSizeOptions={["2", "4", "6", "8"]}
            style={{ marginTop: 16, textAlign: "right" }}
          />
        </div>
      </>
    );
  }
}

export default function ShopList({ formData }) {
  const navigate = useNavigate();
  const [obj, setObj] = useState(null);
  useEffect(() => {
    setObj(formData);
  }, [formData]);
  return (
    <>
      <ShopLists navigate={navigate} obj={obj} />
    </>
  );
}

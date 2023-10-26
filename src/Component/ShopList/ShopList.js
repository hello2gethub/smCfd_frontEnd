import "./ShopList.css";
import React from "react";

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

// 引入getShopList API
import getShopList from "../../api/getShopList";
import { useNavigate } from "react-router";
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
            onClick={() => {
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
            onClick={() => {
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
      render: (text) => (
        <>
          <Button
            onClick={() => {
              this.setState({ showBox: true });
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
            onOk={() => {
              this.putRequest(text);
            }}
            onCancel={() => {
              this.setState({ showBox: false });
            }}
          >
            <p>{`确认${text}吗？`}</p>
          </Modal>
        </>
      ),
    }, // 代理商没有这个字段
  ];

  // 相当于vue的onBeforeMonuted
  componentWillMount() {
    this.getTableData(); //执行请求数据函数
    // 根据身份信息来选择表头
    const grade = localStorage.getItem("grade");
    if (
      grade !== "admin" &&
      this.tableTitle1[this.tableTitle1.length - 1].title === "操作"
    ) {
      this.tableTitle1.pop();
    }
    this.setState({ tableTitle: this.tableTitle1 });
  }

  // 请求数据函数
  getTableData = () => {
    const { currentPage, pageSize } = this.state.page;
    getShopList(currentPage, pageSize)
      .then((res) => {
        // console.log("商品列表--", res.data.data);
        let data = res.data.data.slice(0, pageSize); // 数据切片只展示相应条数
        // 给商品列表加上操作字段的值
        data.forEach((item) => {
          item.shopStatus === "运行中"
            ? (item.control = "下线")
            : (item.control = "上线");
        });

        const total = res.data.data.length; // 数据总条数
        this.setState({
          tableData: data,
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

  // 用户点击了二次确认，发起上线或下线请求函数
  putRequest = (text) => {
    console.log(text);
    this.setState({ showBox: false });
    console.log(`发起${text}请求`);
  };

  // tabs click事件
  // 每一次选择，页码都要重新置为1
  tabClick = (key) => {
    this.setState({
      activeTab: key,
      page: { ...this.state.page, currentPage: 1 },
    });
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
    this.setState({ selectedRowKeys: [] }); //批量操作完了，复选框重置
    console.log("批量操作");
  };

  // 跳转到新建商品页面
  goToCreateShop = () => {
    this.props.navigate("/createShop");
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
              {/* {this.props.grade !== "admin" && (
                <Button
                  type="primary"
                  className="iconList"
                  onClick={this.goToCreateShop}
                >
                  新建商品
                </Button>
              )} */}
              <Button
                type="primary"
                className="iconList"
                onClick={this.goToCreateShop}
              >
                新建商品
              </Button>
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

export default function ShopList() {
  const navigate = useNavigate();
  return (
    <>
      <ShopLists navigate={navigate} />
    </>
  );
}

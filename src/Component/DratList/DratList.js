import "./DratList.css";
import React from "react";

// 引入ant组件
import { Table, Pagination, message } from "antd";
import copy from "copy-to-clipboard";
// 引入icon图标
import { CopyTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router";

import getDractList from "../../api/getDractList";
import getAdminDractList from "../../api/getAdminDractList";

class DratLists extends React.Component {
  state = {
    tableTitle: [
      {
        title: "草稿ID",
        dataIndex: "shopId",
        key: "shopId",
        align: "center",
        render: (text) => <span style={{ color: "#1677FF" }}>{text}</span>,
      },
      {
        title: "草稿名称",
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
        title: "草稿状态",
        dataIndex: "shopStatus",
        key: "shopStatus",
        align: "center",
      },
      {
        title: "创建人",
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
    ],
    tableData: [], // 商品数据
    page: {
      // 分页信息
      currentPage: 1,
      pageSize: 6,
      total: 0, // 总数据条数
    },
    grade: null,
  };

  // 相当于vue的onBeforeMonuted
  componentWillMount() {
    const grade = localStorage.getItem("grade");
    this.setState({ ...this.state, grade: grade }, () => {
      if (grade !== "admin") {
        this.getSlefDract();
      } else {
        this.getAdminDract();
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.obj !== this.props.obj) {
      console.log(this.props.obj);
      // this.getTableData(this.props.obj);
    }
  }

  // 获取个人草稿列表
  getSlefDract = () => {
    const { currentPage, pageSize } = this.state.page;
    getDractList(currentPage, pageSize)
      .then((res) => {
        console.log("个人");
        this.handleData(res.data.data);
      })
      .catch((err) => {
        console.log("获取个人草稿列表失败", err);
      });
  };
  // 获取待审批草稿列表
  getAdminDract = () => {
    const { currentPage, pageSize } = this.state.page;
    getAdminDractList(currentPage, pageSize)
      .then((res) => {
        console.log("待审批");
        this.handleData(res.data.data);
      })
      .catch((err) => {
        console.log("获取待审批草稿列表失败", err);
      });
  };

  // 处理接收到的数据
  handleData = (data) => {
    const total = data.total;
    const records = data.records.slice(0, this.state.page.pageSize);
    let newData = Array.from({ length: records.length }, () => ({})); // 创建空对象数组
    records.forEach((item, index) => {
      newData[index]["shopStatus"] =
        this.state.grade !== "admin" ? "待申请" : "待审批";
      Object.entries(item).forEach(([key, value]) => {
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

  // 跳转到商品详情页
  goToShopDetail = (record) => {
    console.log("record---", record);
    this.props.navigate(`/shopDetail`, { state: { darctId: record.shopId } });
  };

  render() {
    const { tableData, tableTitle, page } = this.state;
    return (
      <>
        <div className="dractList">
          <div className="dractList-title">
            <strong>草稿列表</strong>
          </div>
          <Table
            onRow={(record) => ({
              onClick: () => this.goToShopDetail(record),
            })}
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

export default function DratList() {
  const navigate = useNavigate();
  return (
    <>
      <DratLists navigate={navigate} />
    </>
  );
}

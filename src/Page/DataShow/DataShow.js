import React from "react";
// import * as echarts from 'echarts';
import { DatePicker, Space, Tabs } from "antd";

import ReactEcharts from "echarts-for-react";
import "./DataShow.css";

//api
import getAmount from "../../api/getAmount"; //日期兑换量
import getRanking from "../../api/getRanking"; // 排名
import getWays from "../../api/getWays"; // 方式

const { RangePicker } = DatePicker;

const items = [
  {
    key: "1",
    label: "日期兑换量",
    children: "",
  },
  {
    key: "2",
    label: "销量Top20",
    children: "",
  },
  {
    key: "3",
    label: "兑换方式",
    children: "",
  },
];

export default class DataShow extends React.Component {
  state = {
    startTime: "",
    endTime: "",
    activeTab: "1",
    option1: {
      // 曲线
      xAxis: {
        type: "category",
        data: [
          "2023-10-13",
          "2023-10-14",
          "2023-10-15",
          "2023-10-16",
          "2023-10-17",
          "2023-10-18",
          "2023-10-19",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [500, 1000, 1500, 1554, 1290, 1330, 2500],
          type: "line",
          smooth: true,
        },
      ],
    },
    option2: {
      xAxis: {
        type: "category",
        data: [
          "2023-10-13",
          "2023-10-14",
          "2023-10-15",
          "2023-10-16",
          "2023-10-17",
          "2023-10-18",
          "2023-10-19",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
    },
    option3: {
      title: {
        text: "",
        subtext: "",
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: {
        name: "",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1000, name: "纯积分" },
          { value: 899, name: "积分+现金" },
          { value: 100, name: "纯现金" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    },
  };

  //

  // 选择时间
  handleDate = (dates, dateString) => {
    const { activeTab } = this.state;
    this.setState(
      {
        startTime: dateString[0],
        endTime: dateString[1],
      },
      () => {
        if (this.state.startTime && this.state.endTime) {
          if (activeTab === "1") {
            this.getAmountData();
            console.log("1");
          } else if (activeTab === "2") {
            this.getRankings();
            console.log("2");
          } else {
            this.getWay();
            console.log("3");
          }
        }
      }
    );
  };

  // 获取兑换量数据
  getAmountData = () => {
    const { startTime, endTime } = this.state;
    getAmount(startTime, endTime)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.code === 200) {
            const arr = res.data.data;
            let data1 = [];
            let data2 = [];
            arr.forEach((item) => {
              data1.push(item.time.slice(5, 10));
              data2.push(item.nums);
            });
            this.setState({
              ...this.state,
              option1: {
                ...this.state.option1,
                xAxis: {
                  data: data1,
                },
                series: {
                  data: data2,
                },
              },
            });
          }
        }
      })
      .catch((err) => {
        console.log("获取日期兑换量失败", err);
      });
  };

  // 获取排名
  getRankings = () => {
    const { startTime, endTime } = this.state;
    getRanking(startTime, endTime).then((res) => {
      console.log(res);
      if (res.status === 200) {
        if (res.data.code === 200) {
          console.log(res.data.data);
          const arr = res.data.data;
          let data1 = [];
          let data2 = [];
          arr.forEach((item) => {
            data1.push(item.name);
            data2.push(item.nums);
          });
          this.setState({
            ...this.state,
            option2: {
              ...this.state.option2,
              xAxis: {
                data: data1,
              },
              series: {
                data: data2,
              },
            },
          });
        }
      }
    });
  };

  // 获取方法
  getWay = () => {
    const { startTime, endTime } = this.state;
    getWays(startTime, endTime)
      .then((res) => {
        if (res.data.code === 200) {
          const data = res.data.data;
          console.log("方式", data);
          let arr = [];
          data.forEach((item) => {
            let obj = { name: null, value: null };
            if (item.priceType === 0) {
              obj.name = "纯积分";
            } else if (item.priceType === 1) {
              obj.name = "积分 + 现金";
            } else {
              obj.name = "纯现金";
            }
            obj.value = item.nums;
            arr.push(obj);
          });
          this.setState({
            ...this.state,
            option3: {
              ...this.state.option3,
              series: {
                ...this.state.option3.series,
                data: arr,
              },
            },
          });
        }
      })
      .catch((err) => {
        console.log("请求兑换方式出错", err);
      });
  };

  tabClick = (key) => {
    this.setState(
      {
        activeTab: key,
      },
      () => {
        if (this.state.startTime && this.state.endTime) {
          if (key === "1") {
            this.getAmountData();
            console.log("1");
          } else if (key === "2") {
            this.getRankings();
            console.log("2");
          } else {
            this.getWay();
            console.log("3");
          }
        }
      }
    );
  };

  render() {
    items[0].children = (
      <div className="tap tap2">
        <ReactEcharts
          option={this.state.option1}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    );
    items[1].children = (
      <div className="tap tap2">
        <ReactEcharts
          option={this.state.option2}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    );
    items[2].children = (
      <div className="tap tap3">
        <ReactEcharts
          option={this.state.option3}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    );
    return (
      <>
        <div className="datashow">
          <div className="data">
            <div>
              <Space direction="vertical" size={12} className="date">
                <RangePicker onChange={this.handleDate} />
              </Space>
            </div>
          </div>

          <div className="database">
            <Tabs
              size={"large"}
              centered
              activeKey={this.state.activeTab}
              items={items}
              onChange={(key) => {
                this.tabClick(key);
              }}
              style={{ textAlign: "center" }}
            />
          </div>
        </div>
      </>
    );
  }
}

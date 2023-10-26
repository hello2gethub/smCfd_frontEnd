import React from "react";
// import * as echarts from 'echarts';
import { DatePicker, Space, Tabs } from "antd";

import ReactEcharts from "echarts-for-react";
import "./DataShow.css";

const { RangePicker } = DatePicker;

//标签页
const onChange = (key) => {
  console.log(key);
  console.log(items);
};
const items = [
  {
    key: "1",
    label: "兑换量",
    children: "",
  },
  {
    key: "2",
    label: "销量Top20",
    children: "",
  },
  {
    key: "3",
    label: "兑换时间",
    children: "",
  },
];

export default class DataShow extends React.Component {
  tabClick = (key) => {
    this.setState({
      activeTab: key,
    });
  };

  // 兑换量  曲线
  getOption1 = () => {
    let option = {
      xAxis: {
        type: "category",
        data: ["2021", "2021", "2021", "2021", "2021", "2021", "2021"],
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
    };
    return option;
  };

  //   矩形 销量Top20
  getOption2 = () => {
    let option = {
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
    };
    return option;
  };
  //兑换时间 圆盘
  getOption3 = () => {
    let option = {
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
      series: [
        {
          name: "",
          type: "pie",
          radius: "50%",
          data: [
            { value: 1000, name: "纯积分" },
            { value: 899, name: "积分+现金" },
            { value: 100, name: "纯现金" },
            // { value: 484, name: 'Union Ads' },
            // { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    return option;
  };

  render() {
    items[0].children = (
      <div className="tap tap2">
        <ReactEcharts
          option={this.getOption1()}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    );
    items[1].children = (
      <div className="tap tap2">
        <ReactEcharts
          option={this.getOption2()}
          style={{ width: "800px", height: "400px" }}
        />
      </div>
    );
    items[2].children = (
      <div className="tap tap3">
        <ReactEcharts
          option={this.getOption3()}
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
                <RangePicker />
              </Space>
            </div>
          </div>

          <div className="database">
            <Tabs
              size={"large"}
              centered
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
              style={{ textAlign: "center" }}
            />
          </div>
        </div>
      </>
    );
  }
}

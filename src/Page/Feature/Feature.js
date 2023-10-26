import "../../App.css";
import "./Feature.css";

import React from "react";

// 引入子组件
import Headers from "../../Component/Headers/Headers"; // 头部
import Footers from "../../Component/Footers/Footers"; // 底部
import SearchForm from "../../Component/SearchForm/SearchForm"; // 商品搜索栏
import ShopList from "../../Component/ShopList/ShopList"; // 商品列表
import DataShow from "../DataShow/DataShow";

// 导航栏相关
import { AppstoreTwoTone, PlaySquareTwoTone } from "@ant-design/icons";
import { Layout, Menu } from "antd";
const { Sider } = Layout;
let menuList = [
  { key: "control", icon: <AppstoreTwoTone />, text: "商品管理" },
  { key: "dataShow", icon: <PlaySquareTwoTone />, text: "数据大盘" },
];

/**
 * 功能页面---登录进来看到的首页
 */

export default class Feature extends React.Component {
  /*--------------------  导航栏  ------------------- */
  state = {
    selected: "control", // 默认选中侧边栏第一行,
    isFirst: true, // 默认显示商品管理
    menuListShow: [],
  };
  menuClick = (e) => {
    // console.log(e);
    const tmp = e.key === "control" ? true : false;
    this.setState({ selected: e.key, isFirst: tmp });
  };

  // 这里虽然被弃用了，但是用onMount的话，会获取不到menuList，如果用Effect就可以解决这个问题。
  // 之后还是用函数式组件吧，但是类式更像vue
  componentWillMount = () => {
    const grade = localStorage.getItem("grade");
    console.log("grade--", grade);
    if (grade !== "admin") {
      menuList.pop();
    }
    console.log("menuList", menuList);
    this.setState({ menuListShow: menuList }, () => {
      console.log("menuListShow", this.state.menuListShow);
    });
  };

  render() {
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
              <SearchForm />
              {/* 商品列表组件 */}
              <ShopList />
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

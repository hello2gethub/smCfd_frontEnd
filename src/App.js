import "./App.css";

// npm install --save react-router-dom 下载路由的包
// 引入路由
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 新版的react-router Switch改成了Routes，并且Route中的Component改成了element

// 引入子组件页面
import Index from "./Page/Index/Index"; // 首页
import Lading from "./Page/Lading/Lading"; //登录注册页面
import Details from "./Page/Details/Details"; // 功能页面

import Footers from "./Component/Footers/Footers"; // 头部组件
import Headers from "./Component/Headers/Headers"; // 底部组件

function App() {
  return (
    <div className="App">
      <Router>
        <Headers />
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/lading" element={<Lading />} />
          <Route path="details" element={<Details />} />
        </Routes>
        <Footers />
      </Router>
    </div>
  );
}

export default App;

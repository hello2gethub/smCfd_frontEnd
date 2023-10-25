import "./App.css";

// npm install --save react-router-dom 下载路由的包
// 引入路由
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 新版的react-router Switch改成了Routes，并且Route中的Component改成了element

// 引入子组件页面
import Index from "./Page/Index/Index"; // 首页
import Lading from "./Page/Lading/Lading"; //登录注册页面
import Feature from "./Page/Feature/Feature"; // 功能页面
import CreateShop from "./Page/CreateShop/CreateShop";
import { Loading } from "./utils/myAxios";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Index />} />
          <Route path="/lading" element={<Lading />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/createShop" element={<CreateShop />} />
        </Routes>
      </Router>
      <Loading />
    </div>
  );
}

export default App;

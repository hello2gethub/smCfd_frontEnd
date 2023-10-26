import "./App.css";

// npm install --save react-router-dom 下载路由的包
// 引入路由
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // 新版的react-router Switch改成了Routes，并且Route中的Component改成了element

// 引入子组件页面
import Index from "./Page/Index/Index"; // 首页
import Lading from "./Page/Lading/Lading"; //登录注册页面
import Feature from "./Page/Feature/Feature"; // 功能页面
import CreateShop from "./Page/CreateShop/CreateShop"; // 创建商品页面
import ShopDetail from "./Page/ShopDetail/ShopDetail"; // 商品详情页面
import { Loading } from "./utils/myAxios";

import CalcRate from "./utils/ScreenDraw";

function App() {
  return (
    <>
      <CalcRate>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route path="/lading" element={<Lading />} />
              <Route path="/feature" element={<Feature />} />
              <Route path="/createShop" element={<CreateShop />} />
              <Route path="/shopDetail" element={<ShopDetail />} />
            </Routes>
          </Router>
          <Loading />
        </div>
      </CalcRate>
    </>
  );
}

export default App;

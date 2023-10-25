import axios from "axios";
import React from "react";
import { Spin } from "antd";

//加载中的事件处理函数
let loading = false;

// 基本配置 baseURL,timeout,header,responseType,withCredentials
const myAxios = axios.create({
  baseURL: "http://127.0.0.1:3000/", //  /api/bulletinBoard
  timeout: 10 * 1000,
});

//请求拦截器 ------>  即发送请求要干啥子(常见的token、密钥的设置)
myAxios.interceptors.request.use(
  (config) => {
    loading = true; // 显示加载组件
    return config;
  },
  (err) => {
    loading = false; // 关闭加载组件
    return Promise.reject(err);
  }
);

// 响应拦截器  ------>  即拿到数据后要干啥子
myAxios.interceptors.response.use(
  (res) => {
    loading = false; // 关闭加载组件

    // 请求成功错误处理
    const status = res.status || 200;
    const msg = res.data.msg || "未知错误";
    if (status === 401) {
      alert("您没有操作权限");
      return Promise.reject(new Error(msg));
    }
    if (status !== 200) {
      alert("错误码" + status + "  " + msg);
      return Promise.reject(new Error(msg));
    }
    return res;
  },
  (err) => {
    loading = false; // 关闭加载组件
    return Promise.reject(err);
  }
);

// 避免短时间内对同一个url重复请求，即第一个请求还没返回就又请求了。
const myAxiosComplexity = (function () {
  let hasRequest = []; // 用于存储发送了请求但是还没有接受到的url
  return function (config) {
    let url = config.url;
    if (hasRequest.indexOf(url) !== -1) {
      // 如果这个已经发送请求了
      return Promise.reject(
        new Error("请求已经提交，请等待回应后再发送新的请求")
      );
    }
    hasRequest.push(url);
    // 如果还没有发送请求,就直接发送请求
    return myAxios({
      // 使用我们基本的myAxios
      ...config,
    }).then((res) => {
      // 请求成功后过滤掉这个url
      hasRequest = hasRequest.filter((item) => {
        if (item !== url) {
          return item;
        }
        return null;
      });
      return res; //返回请求成功后后端返回的数据
    });
  };
})();

// 加载提示组件
function Loading() {
  return (
    <>
      {loading && (
        <Spin
          size="large"
          style={{ position: "absolute", left: "50%", top: "50%" }}
        />
      )}
    </>
  );
}

export { myAxios, myAxiosComplexity, Loading };

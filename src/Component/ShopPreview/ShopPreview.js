import React from "react";
import { Image } from "antd";
import "./ShopPreview.css";

export default function ShopPreview() {
  return (
    <>
      {/* 商品预览  start*/}
      <div className="Preview">
        <button className="return">&lt;</button>
        <div className="picture2">
          <Image
            width={386}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="shopsMsg">
          <h1>59积分 + 24.9元</h1>
          <s>基础价53.90元</s>
          <h2>六色高颜值冰川杯</h2>
          <div className="bottom">
            <span>月兑3955</span>
            <i>支付宝会员</i>
          </div>
        </div>
      </div>
      {/* 商品预览  end*/}
    </>
  );
}

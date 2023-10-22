import React from "react";
import "./Footers.css";
import szmLogo from "../../static/img/szml.jpg";

export default function Footers() {
  return (
    <>
      <footer>
        <div className="footer-left">数马冲锋队</div>
        <div className="footer-cen">
          <img className="szmLogo2" src={szmLogo} alt="" />
          <span className="company-szml">数字马力</span>
        </div>
        <ul className="footer-right">
          <li>
            <span>联系我们</span>
          </li>
          <li>
            <span>帮助文档</span>
          </li>
        </ul>
      </footer>
    </>
  );
}

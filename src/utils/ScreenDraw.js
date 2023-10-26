import React, { Component } from "react";
import debounce from "lodash.debounce";
import "./ScreenDraw.css";

export default class CalcRate extends Component {
  constructor(p) {
    super(p);
    this.state = {
      scale: this.getScale(),
    };
  }
  componentDidMount() {
    window.addEventListener("resize", this.setScale);
  } //得到呈现的屏幕宽高比
  getScale = () => {
    const { width = 1920, height = 931 } = this.props;
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
  };
  setScale = debounce(() => {
    let scale = this.getScale();
    this.setState({ scale });
  }, 500);
  render() {
    const { width = 1920, height = 931, children } = this.props;
    const { scale } = this.state;
    return (
      <div
        className={"scale-box"}
        style={{
          transform: `scale(${scale}) translate(-50%, -50%)`,
          WebkitTransform: `scale(${scale}) translate(-50%, -50%)`,
          width,
          height,
        }}
      >
        {children}
      </div>
    );
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.setScale);
  }
}

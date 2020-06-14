import React, { Component } from "react";

import s from "./Overlay.module.scss";

class Overlay extends Component {
  render() {
    var overlayDisplay = this.props.isDisplay ? "block" : "none";

    return (
      <div style={{ display: overlayDisplay }} className={s.overlay}></div>
    );
  }
}

export default Overlay;

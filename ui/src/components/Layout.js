import React, { Component } from "react";

import s from "./Layout.module.scss";

class Layout extends Component {
  render() {
    return <div className={s.layout}>{this.props.children}</div>;
  }
}

export default Layout;

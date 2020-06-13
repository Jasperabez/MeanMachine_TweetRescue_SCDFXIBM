import React, { Component } from "react";

import s from "./MainPanel.module.scss";

class MainPanel extends Component {
  render() {
    return <div className={s.mainPanel}>{this.props.children}</div>;
  }
}

export default MainPanel;

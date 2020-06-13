import React, { Component } from "react";

import s from "./TweetListPanel.module.scss";

class TweetListPanel extends Component {
  render() {
    return (
      <div className={s.tweetListPanel}>
        <input
          placeholder="Search"
          className={s.searchBar}
          stype="text"
          name="text"
          id="text"
        />
        <div className={s.tweetHolder}>{this.props.children}</div>
      </div>
    );
  }
}

export default TweetListPanel;

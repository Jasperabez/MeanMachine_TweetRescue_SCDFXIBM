import React, { Component } from "react";

import s from "./SmallTweet.module.scss";

class SmallTweet extends Component {
  render() {
    return (
      <div className={s.smallTweet}>
        <p className={s.tweet}>{this.props.desc}</p>
        <p className={s.timestamp}>{this.props.time}</p>
      </div>
    );
  }
}

export default SmallTweet;

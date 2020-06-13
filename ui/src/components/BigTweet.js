import React, { Component } from "react";

import s from "./BigTweet.module.scss";

class BigTweet extends Component {
  render() {
    var image = "";
    if (this.props.tweet.imageUrl[0]) {
      image = this.props.tweet.imageUrl[0];
    }

    return (
      <div className={s.bigTweet}>
        <img className={s.image} src={image} alt="" />
        <div className={s.tweetHolder}>
          <p className={s.tweet}>{this.props.tweet.tweetText}</p>
          <div className={s.metadataHolder}>
            <img className={s.locationIcon} src="/assets/location.svg" alt="" />
            <p className={s.metadata}>{/* {this.props.bigTweet.} */}</p>
            <img className={s.calendarIcon} src="/assets/calendar.svg" alt="" />
            <p className={s.metadata}>{this.props.tweet.tweetDate}</p>
            <p className={s.metadata}>{this.props.tweet.tweetDate}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BigTweet;

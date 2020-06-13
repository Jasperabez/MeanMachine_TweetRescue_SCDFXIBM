import React, { Component } from "react";

import s from "./BigTweet.module.scss";

class BigTweet extends Component {
  render() {
    return (
      <div className={s.bigTweet}>
        <img className={s.image} src="/assets/street.jpg" alt="" />
        <div className={s.tweetHolder}>
          <p className={s.tweet}>
            Was walking down the road when I see this. Sometimes I wonder,
            Singapore is one of the most educated country in the world and yet,
            some people just refuses to use their brain #SpecificSCDFHashtag
          </p>
          <div className={s.metadataHolder}>
            <img className={s.locationIcon} src="/assets/location.svg" alt="" />
            <p className={s.metadata}>
              230 Victoria St #01-105 Bugis Junction, 188024
            </p>
            <img className={s.calendarIcon} src="/assets/calendar.svg" alt="" />
            <p className={s.metadata}>13/6/2020</p>
            <p className={s.metadata}>1:01pm</p>
          </div>
        </div>
      </div>
    );
  }
}

export default BigTweet;

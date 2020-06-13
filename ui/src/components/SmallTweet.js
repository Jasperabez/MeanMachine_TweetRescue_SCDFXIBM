import React, { Component } from "react";

import s from "./SmallTweet.module.scss";

class SmallTweet extends Component {
  render() {
    return (
      <div className={s.smallTweet}>
        <p className={s.tweet}>
          This corner looks like it's going to go up in flames in just a bit,
          might want to look into it #SpecificSCDFHashtag
        </p>
        <p className={s.timestamp}>13/6/2020 - 4:00pm</p>
      </div>
    );
  }
}

export default SmallTweet;

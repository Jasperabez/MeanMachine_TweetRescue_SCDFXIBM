import React from "react";
import SmallTweet from "../components/SmallTweet";

import mockLocations from "./mockLocations";

function loadSmallTweet(tweets) {
  return tweets.map((tweet) => {
    return (
      <SmallTweet desc={tweet.tweetText} time={tweet.tweetDate}></SmallTweet>
    );
  });
}

function loadMockSmallTweet() {
  return loadSmallTweet(mockLocations);
}

export default { loadMockSmallTweet, loadSmallTweet };

import React from "react";
import SmallTweet from "../components/SmallTweet";

import mockLocations from "./mockLocations";

function loadSmallTweets(tweets) {
  return tweets.map((tweet) => {
    return (
      <SmallTweet desc={tweet.tweetText} time={tweet.tweetDate}></SmallTweet>
    );
  });
}

function loadSmallTweet(tweet) {
  return (
    <SmallTweet desc={tweet.tweetText} time={tweet.tweetDate}></SmallTweet>
  );
}

function loadMockSmallTweets() {
  return loadSmallTweets(mockLocations);
}

export default { loadMockSmallTweets, loadSmallTweets, loadSmallTweet };

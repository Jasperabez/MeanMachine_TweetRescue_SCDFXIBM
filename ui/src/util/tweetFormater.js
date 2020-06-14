import React from "react";

const locationTag = "LOCATION:";
const noLocationMsg = "LOCATION WILL BE SHOWN HERE";

const hashtag = "#scdftweetrescue";
const highlightedHashtag = (
  <span style={{ color: "#1da1f2" }}>#scdftweetrescue</span>
);

var getLocation = (tweetText) => {
  var locationTagIndex = tweetText.toUpperCase().search(locationTag);

  if (locationTagIndex < 0) return noLocationMsg;

  var startIndex = locationTagIndex + locationTag.length;
  var endIndex = tweetText.length - 1;

  return tweetText.substring(startIndex, endIndex);
};

var removeLocationTag = (tweetText) => {
  var locationTagIndex = tweetText.toUpperCase().search(locationTag);

  if (locationTagIndex < 0) return tweetText;
  return tweetText.substring(0, locationTagIndex);
};

var highlightTag = (tweetText) => {
  var hashtagIndex = tweetText.toLowerCase().search(hashtag);

  if (hashtagIndex < 0) return tweetText;

  var firstHalfOfTweet = tweetText.substring(0, hashtagIndex);
  var secondHalfOfTweet = tweetText.substring(hashtagIndex + hashtag.length);

  return (
    <span>
      {firstHalfOfTweet}
      {highlightedHashtag}
      {secondHalfOfTweet}
    </span>
  );
};

var formatTweet = (tweetText) => {
  tweetText = removeLocationTag(tweetText);
  tweetText = highlightTag(tweetText);
  return tweetText;
};

export default { getLocation, formatTweet };

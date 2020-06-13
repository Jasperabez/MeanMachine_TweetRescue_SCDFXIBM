import React, { Component } from "react";
import openSocket from "socket.io-client";

import markerLoader from "./util/markerLoader";
import smallTweetLoader from "./util/smallTweetLoader";
import mockLocations from "./util/mockLocations";

import "./App.scss";
import Layout from "./components/Layout";
import NavPanel from "./components/NavPanel";
import MainPanel from "./components/MainPanel";
import MyMap from "./components/MyMap";
import BigTweet from "./components/BigTweet";
import TweetListPanel from "./components/TweetListPanel";

const ENDPOINT = "http://138.75.49.118:3797";
// const socket = openSocket(ENDPOINT);

const defaultTweet = {
  tweetId: "1271771728520155136",
  tweetUrl: "https://twitter.com/JabezTho/status/1271771728520155136",
  imageUrl: ["https://pbs.twimg.com/media/EaY9pHpVcAE6f_e.jpg"],
  tweetUsername: "JabezTho",
  tweetText: "#scdftweetrescue\n\nLocation : Singapore Polytechnic ",
  tweetDate: "2020-06-13 19:49:43",
  tweetLat: 1.357136,
  tweetLong: 103.824106,
};

const newTweet = {
  tweetId: "1271771728520155136",
  tweetUrl: "https://twitter.com/JabezTho/status/1271771728520155136",
  imageUrl: [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Buona_Vista_MRT_Station_with_New_Signage.jpg/220px-Buona_Vista_MRT_Station_with_New_Signage.jpg",
  ],
  tweetUsername: "JabezTho",
  tweetText: "PLEASE SHOW UP",
  tweetDate: "2020-06-13 19:49:43",
  tweetLat: 1.357136,
  tweetLong: 103.824106,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bigTweet: defaultTweet,
      tweetList: [],
      smallTweetList: [],
      markerList: [],
    };

    var count = 0;
    setInterval(() => {
      this.updateTweet(mockLocations[count]);
      if (count !== mockLocations.length - 1) count++;
    }, 1000);

    // socket.on("my_response", (msg, cb) => {
    //   this.updateTweet(msg);
    // });
  }

  updateTweet = (tweet) => {
    console.log("Updating tweets");

    var tweetList = this.state.tweetList;
    tweetList.push(tweet);

    const newSmallTweet = smallTweetLoader.loadSmallTweet(tweet);
    var newSmallTweetList = this.state.smallTweetList;
    newSmallTweetList.push(newSmallTweet);

    const newMarker = markerLoader.loadLocation(tweet, this.setBigTweet);
    var newMarkerList = this.state.markerList;
    newMarkerList.push(newMarker);

    this.setState({
      smallTweetList: newSmallTweetList,
      markerList: newMarkerList,
      tweetList: tweetList,
    });
  };

  setBigTweet = (tweet) => {
    this.setState({
      bigTweet: tweet,
    });
  };

  render() {
    return (
      <Layout>
        <NavPanel></NavPanel>
        <MainPanel>
          <MyMap>{this.state.markerList}</MyMap>
          <BigTweet tweet={this.state.bigTweet}></BigTweet>
        </MainPanel>
        <TweetListPanel>{this.state.smallTweetList}</TweetListPanel>
      </Layout>
    );
  }
}

export default App;

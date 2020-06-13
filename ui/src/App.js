import React, { Component } from "react";
import openSocket from "socket.io-client";

import markerLoader from "./util/markerLoader";
import smallTweetLoader from "./util/smallTweetLoader";

import "./App.scss";
import Layout from "./components/Layout";
import NavPanel from "./components/NavPanel";
import MainPanel from "./components/MainPanel";
import MyMap from "./components/MyMap";
import BigTweet from "./components/BigTweet";
import TweetListPanel from "./components/TweetListPanel";

const ENDPOINT = "";
const socket = openSocket(ENDPOINT);

const defaultTweet = {
  tweetId: "1271771728520155136",
  tweetUrl: "https://twitter.com/JabezTho/status/1271771728520155136",
  imageUrl: ["https://pbs.twimg.com/media/EaY9pHpVcAE6f_e.jpg"],
  tweetUsername: "JabezTho",
  tweetText: "#scdftweetrescue\n\nLocation : Singapore Polytechnic ",
  tweetDate: "2020-06-13 19:49:43",
  tweetLat: 1.3098,
  tweetLong: 103.7775,
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

    socket.on("my_response", (msg, cb) => {
      var tweetList = this.state.tweetList;
      tweetList.push(msg);
      this.setState({
        tweetList: tweetList,
      });
      this.updateTweet();
    });
  }

  updateTweet = () => {
    var smallTweetList = smallTweetLoader.loadSmallTweet(this.state.tweetList);
    var markerList = markerLoader.loadLocations(
      this.state.tweetList,
      this.setBigTweet
    );
    this.setState({
      smallTweetList: smallTweetList,
      markerList: markerList,
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

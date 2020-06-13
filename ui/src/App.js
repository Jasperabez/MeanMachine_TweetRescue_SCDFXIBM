import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import openSocket from "socket.io-client";

import markerLoader from "./util/markerLoader";
import smallTweetLoader from "./util/smallTweetLoader";
import mockLocations from "./util/mockLocations";

import "./App.scss";
import s from "./components/MyMap.module.scss";

import Layout from "./components/Layout";
import NavPanel from "./components/NavPanel";
import MainPanel from "./components/MainPanel";
import BigTweet from "./components/BigTweet";
import TweetListPanel from "./components/TweetListPanel";

const ENDPOINT = "http://localhost:5000";
const socket = openSocket(ENDPOINT);

const defaultTweet = {
  tweetId: "1271771728520155136",
  tweetUrl: "https://twitter.com/JabezTho/status/1271771728520155136",
  imageUrl: [""],
  tweetUsername: "JabezTho",
  tweetText: "Click on a marker to show more details",
  tweetDate: "",
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

    socket.on("my_response", (msg, cb) => {
      console.log(msg.data);
      if (msg.data != "Connected") this.updateTweet(msg.data);
    });
  }

  updateTweet = (tweet) => {
    console.log("Updating tweets");

    var tweetList = this.state.tweetList;
    tweetList.push(tweet);

    this.setState({
      tweetList: tweetList,
    });
  };

  setBigTweet = (tweet) => {
    this.setState({
      bigTweet: tweet,
    });
  };

  static defaultProps = {
    position: [1.355858, 103.814679],
    zoom: 11.8,
  };

  render() {
    return (
      <Layout>
        <NavPanel></NavPanel>
        <MainPanel>
          <Map center={this.props.position} zoom={11} className={s.map}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerLoader.loadLocations(this.state.tweetList, this.setBigTweet)}
          </Map>
          <BigTweet tweet={this.state.bigTweet}></BigTweet>
        </MainPanel>
        <TweetListPanel>
          {smallTweetLoader.loadSmallTweets(this.state.tweetList)}
        </TweetListPanel>
      </Layout>
    );
  }
}

export default App;

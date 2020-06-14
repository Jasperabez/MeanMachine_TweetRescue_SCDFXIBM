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
import RectificationPopup from "./components/RectificationPopup";
import BigTweet from "./components/BigTweet";
import TweetListPanel from "./components/TweetListPanel";
import Overlay from "./components/Overlay";

const ENDPOINT = "http://localhost:5000";
const socket = openSocket(ENDPOINT);

const isDebugging = false;

const defaultTweet = {
  tweetId: "1271771728520155136",
  tweetUrl: "https://twitter.com/JabezTho/status/1271771728520155136",
  imageUrl: [""],
  tweetUsername: "JabezTho",
  tweetText: "Click on a marker to show more details",
  tweetDate: "Date will be shown here",
  tweetLat: 1.357136,
  tweetLong: 103.824106,
};

class App extends Component {
  constructor(props) {
    super(props);

    var locationIni = isDebugging ? mockLocations : [];

    this.state = {
      bigTweet: defaultTweet,
      tweetList: locationIni,
      smallTweetList: [],
      markerList: [],
      isRectify: false,
    };

    if (!isDebugging) {
      socket.on("my_response", (msg, cb) => {
        console.log(msg.data);
        if (msg.data != "Connected") this.updateTweet(msg.data);
      });
    }
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

  showRectify = () => {
    this.setState({
      isRectify: true,
    });
  };

  closeRectify = () => {
    this.setState({
      isRectify: false,
    });
  };

  doneRectify = () => {
    console.log("Problem rectified");

    var rectifiedTweet = this.state.bigTweet;
    var currentTweetList = this.state.tweetList;

    var newTweetList = currentTweetList.filter((tweet) => {
      return tweet.tweetId !== rectifiedTweet.tweetId;
    });

    this.setState({
      isRectify: false,
      tweetList: newTweetList,
      bigTweet: defaultTweet,
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
          <RectificationPopup
            isDisplay={this.state.isRectify}
            onClick={this.doneRectify}
          ></RectificationPopup>
          <Map center={this.props.position} zoom={11} className={s.map}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markerLoader.loadLocations(
              this.state.tweetList,
              this.setBigTweet,
              this.showRectify
            )}
          </Map>
          <BigTweet tweet={this.state.bigTweet}></BigTweet>
        </MainPanel>
        <TweetListPanel>
          {smallTweetLoader.loadSmallTweets(this.state.tweetList)}
        </TweetListPanel>
        <Overlay
          isDisplay={this.state.isRectify}
          onClick={this.closeRectify}
        ></Overlay>
      </Layout>
    );
  }
}

export default App;

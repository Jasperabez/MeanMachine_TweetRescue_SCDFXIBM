import React, { Component } from "react";

import markerLoader from "./util/markerLoader";

import "./App.scss";
import Layout from "./components/Layout";
import NavPanel from "./components/NavPanel";
import MainPanel from "./components/MainPanel";
import Map from "./components/Map";
import BigTweet from "./components/BigTweet";
import TweetListPanel from "./components/TweetListPanel";
import SmallTweet from "./components/SmallTweet";

class App extends Component {
  render() {
    return (
      <Layout>
        <NavPanel></NavPanel>
        <MainPanel>
          {/* <Map>{markerLoader.loadMockLocations()}</Map> */}
          <BigTweet></BigTweet>
        </MainPanel>
        <TweetListPanel>
          <SmallTweet></SmallTweet>
          <SmallTweet></SmallTweet>
          <SmallTweet></SmallTweet>
          <SmallTweet></SmallTweet>
          <SmallTweet></SmallTweet>
          <SmallTweet></SmallTweet>
        </TweetListPanel>
      </Layout>
    );
  }
}

export default App;

import React, { Component } from "react";

import "./App.scss";

import Map from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Map></Map>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";

import markerLoader from "./util/markerLoader";

import "./App.scss";

import Map from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="container">
        <Map>{markerLoader.loadMockLocations()}</Map>
      </div>
    );
  }
}

export default App;

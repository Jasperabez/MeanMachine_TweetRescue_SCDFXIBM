import React from "react";
import { Map, TileLayer } from "react-leaflet";

import s from "./MyMap.module.scss";

class MyMap extends React.Component {
  static defaultProps = {
    position: [1.355858, 103.814679],
    zoom: 11.8,
  };

  render() {
    return (
      <Map center={this.props.position} zoom={11} className={s.map}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <div>{this.props.children}</div>
      </Map>
    );
  }
}

export default MyMap;

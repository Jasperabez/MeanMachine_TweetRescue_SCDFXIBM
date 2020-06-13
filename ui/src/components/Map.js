import React from "react";
import GoogleMapReact from "google-map-react";

import s from "./Map.module.scss";

class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: 1.355858,
      lng: 103.814679,
    },
    zoom: 11.8,
  };

  render() {
    return (
      <div className={s.map}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDjszZAHFsBliasnxU1_KjJ3xlgEBulozg" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {this.props.children}
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;

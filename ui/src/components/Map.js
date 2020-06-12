import React from "react";
import GoogleMapReact from "google-map-react";

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
      <div style={{ height: "100%", width: "100%" }}>
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

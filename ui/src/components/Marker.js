import React from "react";

import s from "./Marker.module.scss";

class Marker extends React.Component {
  render() {
    return (
      <div className={s.marker} lat={this.props.lat} lng={this.props.lng}></div>
    );
  }
}

export default Marker;

import React from "react";
import L from "leaflet";
import { Marker, Popup } from "react-leaflet";

import s from "./MyMarker.module.scss";

const markerIcon = new L.icon({
  iconUrl: "/assets/marker.svg",
  iconRetinaUrl: "/assets/marker.svg",
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  iconSize: [40, 40],
});

class MyMarker extends React.Component {
  render() {
    return (
      <Marker position={this.props.position} icon={markerIcon}>
        <Popup
          onOpen={() => {
            console.log("Popup clicked");
            this.props.onClick(this.props.tweet);
          }}
        >
          <div className={s.popupInfoHolder}>
            <p className={s.popupTime}>{this.props.time}</p>
            <img src={this.props.image} alt="" className={s.popupImage} />
            <button className={s.button} onClick={this.props.rectifyOnClick}>
              Rectify
            </button>
          </div>
        </Popup>
      </Marker>
    );
  }
}

export default MyMarker;

import React from "react";
import Marker from "../components/Marker";

var mockLocations = [
  {
    lat: 1.310796,
    lng: 103.778066,
    name: "Singapore Polytechnic",
    desc: "Road is blocked",
  },
  {
    lat: 1.361127,
    lng: 103.92978,
    name: "Tampines Fire Station",
    desc: "Fire station got fire",
  },
  {
    lat: 1.373536,
    lng: 103.752636,
    name: "Bukit Batok Fire Station",
    desc: "Fire station got fire",
  },
  {
    lat: 1.264453,
    lng: 103.822205,
    name: "Harbour Front",
    desc: "Got water also got fire",
  },
];

function loadMockLocations() {
  return loadLocations(mockLocations);
}

function loadLocations(locations) {
  return locations.map((location) => {
    return (
      <Marker
        lat={location.lat}
        lng={location.lng}
        name={location.name}
        desc={location.desc}
      ></Marker>
    );
  });
}

export default { loadLocations, loadMockLocations };

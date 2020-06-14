import React from "react";
import MyMarker from "../components/MyMarker";

import mockLocations from "./mockLocations";

function loadMockLocations(onClick, rectifyOnClick) {
  return loadLocations(mockLocations, onClick, rectifyOnClick);
}

function loadLocation(location, onClick, rectifyOnClick) {
  var locationPosition = [location.tweetLat, location.tweetLong];

  var image = location.imageUrl[0] || "";

  return (
    <MyMarker
      position={locationPosition}
      time={location.tweetDate}
      image={image}
      onClick={onClick}
      rectifyOnClick={rectifyOnClick}
      tweet={location}
    ></MyMarker>
  );
}

function loadLocations(locations, onClick, rectifyOnClick) {
  return locations.map((location) => {
    return loadLocation(location, onClick, rectifyOnClick);
  });
}

export default { loadLocations, loadLocation, loadMockLocations };

import React from "react";
import MyMarker from "../components/MyMarker";

import mockLocations from "./mockLocations";

function loadMockLocations(onClick) {
  return loadLocations(mockLocations, onClick);
}

function loadLocations(locations, onClick) {
  return locations.map((location) => {
    var locationPosition = [location.tweetLat, location.tweetLong];

    var image = location.imageUrl[0] || "";

    return (
      <MyMarker
        position={locationPosition}
        time={location.tweetDate}
        image={image}
        onClick={onClick}
        tweet={location}
      ></MyMarker>
    );
  });
}

export default { loadLocations, loadMockLocations };

import React, { useState, useEffect } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
import Select from "react-select";

const source = [
  { value: [26.8467, 80.9462], label: "Lucknow" },
  { value: [28.7041, 77.1025], label: "Delhi" },
  { value: [25.3176, 82.9739], label: "Varanasi" },
];

const dest = [
  { value: [27.8974, 78.088], label: "Aligarh" },
  { value: [25.4358, 81.8463], label: "Prayagraj" },
  { value: [27.1767, 78.0081], label: "Agra" },
];

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjvdxLcV0nMOPwZqybUPkDL_HdbYlIrsY&v=3.exp&libraries=geometry,drawing,places", //  props for "withScriptjs" HOC.
    loadingElement: <div style={{ height: `100%` }} />, // props for "withScriptjs" HOC.
    containerElement: <div style={{ height: `600px` }} />, // props for "withGoogleMap"
    mapElement: <div style={{ height: `100%` }} />, // props for "withGoogleMap"
  }),
  withScriptjs, // to correctly load Google Maps JavaScript API v3
  withGoogleMap // initialize the MapWithADirectionsRenderer with DOM instances
)(() => {
  const [direction, setDirection] = useState();
  const [selectedSourceLocation, setSelectedSourceLocation] = useState({
    value: [26.8467, 80.9462],
    label: "Lucknow",
  });
  const [selectedDestLocation, setSelectedDestLocation] = useState({
    value: [25.4358, 81.8463],
    label: "Prayagraj",
  });

  const handleSelectedSourceLocation = (location) => {
    console.log(location);
    setSelectedSourceLocation(location);
  };

  const handleSelectedDestLocation = (location) => {
    setSelectedDestLocation(location);
  };
  useEffect(() => {
    const DirectionsService = new window.google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: new window.google.maps.LatLng(
          selectedSourceLocation.value[0],
          selectedSourceLocation.value[1]
        ),
        destination: new window.google.maps.LatLng(
          selectedDestLocation.value[0],
          selectedDestLocation.value[1]
        ),
        travelMode: window.google.maps.TravelMode.DRIVING, //[ DRIVING, WALKING, BICYCLING, TRANSIT]
      }, // google.maps.DirectionsService [ API call returning DirectionsResult, DirectionsStatus]
      (result, status) => {
        console.log(result);
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirection(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [selectedSourceLocation, selectedDestLocation]);

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          width: 200,
          background: "#fff",
          padding: 10,
          borderRadius: 5,
          boxShadow: " 0 0 10px 0 lightgrey",
        }}
      >
        <div style={{ position: "relative" }}>
          <span style={{ position: "relative" }}>Source </span>
          <Select
            options={source}
            onChange={handleSelectedSourceLocation}
            value={selectedSourceLocation}
          />
        </div>
        <div style={{ position: "relative", marginTop: 10 }}>
          <span style={{ position: "relative" }}>Destination </span>
          <Select
            options={dest}
            onChange={handleSelectedDestLocation}
            value={selectedDestLocation}
          />
        </div>
      </div>

      <GoogleMap
        defaultZoom={7}
        defaultCenter={new window.google.maps.LatLng(27.8974, 78.088)}
      >
        {direction && <DirectionsRenderer directions={direction} />}
      </GoogleMap>
    </>
  );
});

export default MapWithADirectionsRenderer;

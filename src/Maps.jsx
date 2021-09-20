import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCjvdxLcV0nMOPwZqybUPkDL_HdbYlIrsY&v=3.exp&libraries=geometry,drawing,places", //  props for "withScriptjs" HOC.
    loadingElement: <div style={{ height: `100%` }} />, // props for "withScriptjs" HOC.
    containerElement: <div style={{ height: `600px` }} />, // props for "withGoogleMap"
    mapElement: <div style={{ height: `100%` }} />, // props for "withGoogleMap"
  }),
  withScriptjs, // to correctly load Google Maps JavaScript API v3
  withGoogleMap, // initialize the MapWithADirectionsRenderer with DOM instances
  lifecycle({
    componentDidMount() {
      const DirectionsService = new window.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new window.google.maps.LatLng(26.8467, 80.9462),
          destination: new window.google.maps.LatLng(28.7041, 77.1025),
          travelMode: window.google.maps.TravelMode.DRIVING,
        }, // google.maps.DirectionsService [ API call returning DirectionsResult, DirectionsStatus]
        (result, status) => {
          console.log(result);
          if (status === window.google.maps.DirectionsStatus.OK) {
            this.setState({
              directions: result,
            });
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    },
  })
)((props) => (
  <>
    <GoogleMap
      defaultZoom={7}
      defaultCenter={new window.google.maps.LatLng(27.8974, 78.088)}
    >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  </>
));

export default MapWithADirectionsRenderer;

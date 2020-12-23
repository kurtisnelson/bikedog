import React from "react"
import { geolocated } from "react-geolocated"
import Closest from "../components/closest"

class Parks extends React.Component {
  constructor(props) {
          super(props)
  }

  render() {
    return (
            <div>
    <h2>Your Parks</h2>
    <p>Find your 10-minute parks to you in San Francisco.</p>
    {!this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation.</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled.</div>
    ) : this.props.coords ? (
      <Closest lat={this.props.coords.latitude} lng={this.props.coords.longitude} />
    ) : (
      <div>Fetching location</div>
    )}
      </div>
    )
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
})(Parks)

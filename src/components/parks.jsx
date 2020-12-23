import React from "react"
import { geolocated } from "react-geolocated"
import Closest from "../components/closest"
import firebase from "gatsby-plugin-firebase"
import PropTypes from "prop-types"

class Parks extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      parkRadiusKm: 0.5,
    }
  }

  static get propTypes() {
    return {
      coords: PropTypes.shape({
        latitude: PropTypes.number,
        longitude: PropTypes.number,
      }),
      isGeolocationAvailable: PropTypes.bool,
      isGeolocationEnabled: PropTypes.bool,
    }
  }

  useEffect() {
    this.setState({
      parkRadiusKm: firebase.remoteConfig().getValue("park_radius_km"),
    })
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
          <Closest
            userLoc={{lat: this.props.coords.latitude, lng: this.props.coords.longitude}}
            parkRadiusKm={this.state.parkRadiusKm}
          />
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

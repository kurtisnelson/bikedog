import React from "react"
import PropTypes from "prop-types"

class Park extends React.Component {
  static get propTypes() {
    return {
      id: PropTypes.string.isRequired,
      data: PropTypes.object,
      userLoc: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number,
      }),
    }
  }

  link() {
    const data = this.props.data
    return (
      "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(data.address + "," + data.city + "," + data.zipcode)
    )
  }

  render() {
    const data = this.props.data
    const distance = this.getDistanceFromLatLonInKm(
      this.props.userLoc,
      this.props.data.location
    )
    return (
      <div>
        <a href={this.link()}>{data.map_label}</a>
        &nbsp;({distance} km)
      </div>
    )
  }

  getDistanceFromLatLonInKm(from, to) {
    const R = 6371 // Radius of the earth in km
    const dLat = this.deg2rad(to.latitude - from.lat) // deg2rad below
    const dLon = this.deg2rad(to.longitude - from.lng)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(from.lat)) *
        Math.cos(this.deg2rad(to.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d.toFixed(2)
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }
}

export default Park
